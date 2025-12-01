'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui';
import {
  Star,
  ChevronDown,
  Download,
  Filter,
  Columns,
  ExternalLink,
  MoreVertical,
  Activity,
  AlertTriangle,
  TrendingUp,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createBrowserClient } from '@/lib/supabase/client';
import { useWorkspace } from '@/lib/workspace';
import type { AdAccount, Campaign, Alert, Suggestion, AuditScore } from '@/types/database.types';

// Types for aggregated account data
interface AccountWithMetrics {
  id: string;
  name: string;
  platform: string;
  status: string;
  isFavorite: boolean;
  health: 'healthy' | 'warning' | 'critical';
  suggestions: number;
  auditScore: number | null;
  alerts: number;
  budget: number | null;
  cost: number;
  impressions: number;
  clicks: number;
  avgCpc: number;
  conversions: number;
  costPerConv: number;
  roas: number | null;
}

const healthColors = {
  healthy: 'var(--color-signal-green)',
  warning: 'var(--color-signal-yellow)',
  critical: 'var(--color-signal-red)',
};

const healthLabels = {
  healthy: 'NOMINAL',
  warning: 'CAUTION',
  critical: 'CRITICAL',
};

const platformIcons: Record<string, string> = {
  google_ads: 'G',
  meta_ads: 'M',
  microsoft_ads: 'MS',
  amazon_ads: 'A',
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export default function AllAccountsDashboard() {
  const { workspace, workspaceId, isLoading: workspaceLoading } = useWorkspace();
  const [accounts, setAccounts] = useState<AccountWithMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createBrowserClient();

  useEffect(() => {
    async function fetchAccounts() {
      if (!workspaceId) {
        setAccounts([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Fetch ad accounts for the current workspace
        const { data: adAccounts, error: accountsError } = await supabase
          .from('ad_accounts')
          .select('*')
          .eq('workspace_id', workspaceId)
          .order('is_favorite', { ascending: false })
          .order('current_spend', { ascending: false });

        if (accountsError) throw accountsError;

        if (!adAccounts || adAccounts.length === 0) {
          setAccounts([]);
          setIsLoading(false);
          return;
        }

        // Fetch campaigns for all accounts
        const accountIds = adAccounts.map(a => a.id);
        
        const { data: campaigns } = await supabase
          .from('campaigns')
          .select('*')
          .in('ad_account_id', accountIds);

        // Fetch alerts for all accounts
        const { data: alerts } = await supabase
          .from('alerts')
          .select('*')
          .in('ad_account_id', accountIds)
          .eq('status', 'active');

        // Fetch suggestions for all accounts
        const { data: suggestions } = await supabase
          .from('suggestions')
          .select('*')
          .in('ad_account_id', accountIds)
          .eq('status', 'pending');

        // Fetch latest audit scores for all accounts
        const { data: auditScores } = await supabase
          .from('audit_scores')
          .select('*')
          .in('ad_account_id', accountIds)
          .order('created_at', { ascending: false });

        // Aggregate metrics per account
        const accountsWithMetrics: AccountWithMetrics[] = adAccounts.map(account => {
          const accountCampaigns = campaigns?.filter(c => c.ad_account_id === account.id) || [];
          const accountAlerts = alerts?.filter(a => a.ad_account_id === account.id) || [];
          const accountSuggestions = suggestions?.filter(s => s.ad_account_id === account.id) || [];
          const latestAudit = auditScores?.find(a => a.ad_account_id === account.id);

          // Aggregate campaign metrics
          const totalCost = accountCampaigns.reduce((sum, c) => sum + (c.cost || 0), 0);
          const totalImpressions = accountCampaigns.reduce((sum, c) => sum + (c.impressions || 0), 0);
          const totalClicks = accountCampaigns.reduce((sum, c) => sum + (c.clicks || 0), 0);
          const totalConversions = accountCampaigns.reduce((sum, c) => sum + (c.conversions || 0), 0);
          const totalConversionValue = accountCampaigns.reduce((sum, c) => sum + (c.conversion_value || 0), 0);

          const avgCpc = totalClicks > 0 ? totalCost / totalClicks : 0;
          const costPerConv = totalConversions > 0 ? totalCost / totalConversions : 0;
          const roas = totalCost > 0 ? totalConversionValue / totalCost : null;

          return {
            id: account.id,
            name: account.name,
            platform: account.platform,
            status: account.status || 'active',
            isFavorite: account.is_favorite || false,
            health: (account.health_status as 'healthy' | 'warning' | 'critical') || 'healthy',
            suggestions: accountSuggestions.length,
            auditScore: latestAudit?.overall_score ?? account.audit_score,
            alerts: accountAlerts.length,
            budget: account.monthly_budget,
            cost: totalCost || (account.current_spend || 0),
            impressions: totalImpressions,
            clicks: totalClicks,
            avgCpc,
            conversions: totalConversions,
            costPerConv,
            roas,
          };
        });

        setAccounts(accountsWithMetrics);
      } catch (err) {
        console.error('Error fetching accounts:', err);
        setError('Failed to load accounts');
      } finally {
        setIsLoading(false);
      }
    }

    if (!workspaceLoading) {
      fetchAccounts();
    }
  }, [workspaceId, workspaceLoading, supabase]);

  const handleToggleFavorite = async (accountId: string, currentFavorite: boolean) => {
    // Optimistic update
    setAccounts(prev => prev.map(a => 
      a.id === accountId ? { ...a, isFavorite: !currentFavorite } : a
    ));

    const { error } = await supabase
      .from('ad_accounts')
      .update({ is_favorite: !currentFavorite })
      .eq('id', accountId);

    if (error) {
      // Revert on error
      setAccounts(prev => prev.map(a => 
        a.id === accountId ? { ...a, isFavorite: currentFavorite } : a
      ));
    }
  };

  if (workspaceLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[var(--color-signal-green)] animate-spin mx-auto mb-4" />
          <p className="text-[11px] font-mono text-[var(--color-text-muted)]">LOADING_ACCOUNTS...</p>
        </div>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 text-[var(--color-signal-yellow)] mx-auto mb-4" />
          <p className="text-[11px] font-mono text-[var(--color-text-muted)]">NO_WORKSPACE_SELECTED</p>
          <p className="text-[9px] font-mono text-[var(--color-text-dim)] mt-2">Select a workspace from the sidebar</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 text-[var(--color-signal-red)] mx-auto mb-4" />
          <p className="text-[11px] font-mono text-[var(--color-text-muted)]">{error.toUpperCase().replace(/ /g, '_')}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border-harsh)] text-[10px] font-mono text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)] flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-3 h-3" />
            RETRY
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-display text-2xl text-[var(--color-text-raw)]">ALL_ACCOUNTS_DASHBOARD</h1>
              <Badge variant="signal" size="sm">
                <Activity className="w-3 h-3 mr-1" />
                LIVE
              </Badge>
            </div>
            <p className="text-xs font-mono text-[var(--color-text-muted)]">
              &gt; {workspace.name.toUpperCase().replace(/ /g, '_')} • {accounts.length} ACCOUNTS
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 text-[10px] font-mono text-[var(--color-text-muted)] border border-[var(--color-border-harsh)] hover:border-[var(--color-signal-green)] transition-colors">
              VIEW_BY_PORTFOLIO
              <div className="w-8 h-4 bg-[var(--color-surface)] border border-[var(--color-border-harsh)] relative">
                <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-[var(--color-text-dim)]" />
              </div>
            </button>
            <button className="px-4 py-2 bg-[var(--color-signal-green)] text-[var(--color-void)] text-[10px] font-mono font-bold hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-shadow">
              LINK_ACCOUNTS
            </button>
          </div>
        </div>

        {accounts.length > 0 && (
          <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-metric-positive)] px-4 py-3 flex items-center justify-between">
            <p className="text-[11px] font-mono text-[var(--color-metric-positive)]">
              <TrendingUp className="w-4 h-4 inline mr-2" />
              <span className="font-bold">WORKSPACE:</span>{' '}
              <span className="text-[var(--color-text-raw)]">{workspace.name}</span> •{' '}
              Total Spend: <span className="font-bold text-[var(--color-text-raw)]">{formatCurrency(accounts.reduce((sum, a) => sum + a.cost, 0))}</span>
            </p>
            <span className="text-[9px] font-mono text-[var(--color-text-dim)]">{workspace.plan?.toUpperCase()} PLAN</span>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-[8px] font-mono text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">SCOPE</label>
              <button className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)] hover:border-[var(--color-signal-green)]">
                <span>ALL_ACCOUNTS</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            <div>
              <label className="block text-[8px] font-mono text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">DATE_RANGE</label>
              <button className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)] hover:border-[var(--color-signal-green)]">
                <span>LAST_30_DAYS</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            <div>
              <label className="block text-[8px] font-mono text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">COMPARE</label>
              <button className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)] hover:border-[var(--color-signal-green)]">
                <span>NONE</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            <div>
              <label className="block text-[8px] font-mono text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">&nbsp;</label>
              <button className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)]">
                <Filter className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-[9px] font-mono text-[var(--color-text-dim)]">
              LAST_30_DAYS
            </p>
          </div>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <label className="block text-[8px] font-mono text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">VIEW</label>
          <button className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)] hover:border-[var(--color-signal-green)]">
            <span>SYSTEM_DEFAULT</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="SEARCH_ACCOUNTS..."
              className="pl-3 pr-10 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] text-[10px] font-mono text-[var(--color-text-raw)] w-48 focus:outline-none focus:border-[var(--color-signal-green)] placeholder:text-[var(--color-text-dim)]"
            />
          </div>
          <button className="p-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)]">
            <ExternalLink className="w-3 h-3" />
          </button>
          <button className="p-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)]">
            <Download className="w-3 h-3" />
          </button>
          <button className="p-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)]">
            <Columns className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Empty State */}
      {accounts.length === 0 ? (
        <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-2 border-[var(--color-border-harsh)] flex items-center justify-center">
            <Activity className="w-8 h-8 text-[var(--color-text-dim)]" />
          </div>
          <h3 className="text-sm font-mono font-bold text-[var(--color-text-raw)] mb-2">NO_ACCOUNTS_LINKED</h3>
          <p className="text-[10px] font-mono text-[var(--color-text-muted)] mb-6">
            Connect your ad accounts to start tracking performance
          </p>
          <button className="px-6 py-3 bg-[var(--color-signal-green)] text-[var(--color-void)] text-[11px] font-mono font-bold hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-shadow">
            LINK_YOUR_FIRST_ACCOUNT
          </button>
        </div>
      ) : (
        /* Data Table */
        <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--color-surface)] border-b-2 border-[var(--color-border-harsh)]">
                  <th className="px-4 py-3 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider w-8">
                    <input type="checkbox" className="border-[var(--color-border-harsh)] bg-[var(--color-terminal)]" />
                  </th>
                  <th className="px-4 py-3 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    ACCOUNT_NAME
                  </th>
                  <th className="px-4 py-3 text-center text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    PLATFORM
                  </th>
                  <th className="px-4 py-3 text-center text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    HEALTH
                  </th>
                  <th className="px-4 py-3 text-center text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    SUGGEST
                  </th>
                  <th className="px-4 py-3 text-center text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    AUDIT
                  </th>
                  <th className="px-4 py-3 text-center text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    ALERTS
                  </th>
                  <th className="px-4 py-3 text-right text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    COST ↓
                  </th>
                  <th className="px-4 py-3 text-right text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    IMPR
                  </th>
                  <th className="px-4 py-3 text-right text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    CLICKS
                  </th>
                  <th className="px-4 py-3 text-right text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    CPC
                  </th>
                  <th className="px-4 py-3 text-right text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    CONV
                  </th>
                  <th className="px-4 py-3 text-right text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    CPA
                  </th>
                  <th className="px-4 py-3 text-right text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    ROAS
                  </th>
                  <th className="px-4 py-3 w-8"></th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id} className="border-b border-[var(--color-grid)] hover:bg-[var(--color-surface)] transition-colors">
                    <td className="px-4 py-4">
                      <Star
                        onClick={() => handleToggleFavorite(account.id, account.isFavorite)}
                        className={cn(
                          'w-3 h-3 cursor-pointer transition-colors',
                          account.isFavorite
                            ? 'text-[var(--color-signal-yellow)] fill-[var(--color-signal-yellow)]'
                            : 'text-[var(--color-text-dim)] hover:text-[var(--color-signal-yellow)]'
                        )}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        href={`/dashboard/accounts/${account.id}`}
                        className="text-[11px] font-mono font-bold text-[var(--color-text-raw)] hover:text-[var(--color-signal-green)] transition-colors"
                      >
                        {account.name}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 text-[9px] font-mono font-bold border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[var(--color-text-muted)]">
                        {platformIcons[account.platform] || '?'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span
                          className="w-2 h-2"
                          style={{ backgroundColor: healthColors[account.health] }}
                        />
                        <span className="text-[8px] font-mono" style={{ color: healthColors[account.health] }}>
                          {healthLabels[account.health]}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-[11px] font-mono text-[var(--color-signal-cyan)]">
                        {account.suggestions}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={cn(
                        'text-[11px] font-mono font-bold',
                        account.auditScore && account.auditScore >= 70 ? 'text-[var(--color-metric-positive)]' :
                        account.auditScore && account.auditScore >= 50 ? 'text-[var(--color-signal-yellow)]' :
                        account.auditScore ? 'text-[var(--color-signal-red)]' : 'text-[var(--color-text-dim)]'
                      )}>
                        {account.auditScore ?? '—'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      {account.alerts > 0 ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[var(--color-signal-red)]">
                          <AlertTriangle className="w-3 h-3" />
                          {account.alerts}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-[var(--color-text-dim)]">0</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-right text-[11px] font-mono text-[var(--color-text-raw)]">
                      {formatCurrency(account.cost)}
                    </td>
                    <td className="px-4 py-4 text-right text-[11px] font-mono text-[var(--color-text-muted)]">
                      {formatNumber(account.impressions)}
                    </td>
                    <td className="px-4 py-4 text-right text-[11px] font-mono text-[var(--color-text-muted)]">
                      {formatNumber(account.clicks)}
                    </td>
                    <td className="px-4 py-4 text-right text-[11px] font-mono text-[var(--color-text-muted)]">
                      {account.avgCpc > 0 ? formatCurrency(account.avgCpc) : '—'}
                    </td>
                    <td className="px-4 py-4 text-right text-[11px] font-mono text-[var(--color-text-raw)]">
                      {account.conversions}
                    </td>
                    <td className="px-4 py-4 text-right text-[11px] font-mono text-[var(--color-text-muted)]">
                      {account.costPerConv > 0 ? formatCurrency(account.costPerConv) : '—'}
                    </td>
                    <td className={cn(
                      'px-4 py-4 text-right text-[11px] font-mono font-bold',
                      account.roas && account.roas >= 2 ? 'text-[var(--color-metric-positive)] bg-[var(--color-metric-positive)]/10' :
                      account.roas && account.roas >= 1.5 ? 'text-[var(--color-signal-yellow)] bg-[var(--color-signal-yellow)]/10' :
                      account.roas ? 'text-[var(--color-signal-red)] bg-[var(--color-signal-red)]/10' : 'text-[var(--color-text-dim)]'
                    )}>
                      {account.roas ? `${account.roas.toFixed(1)}x` : '—'}
                    </td>
                    <td className="px-4 py-4">
                      <button className="p-1 text-[var(--color-text-dim)] hover:text-[var(--color-text-raw)] transition-colors">
                        <MoreVertical className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 border-t-2 border-[var(--color-border-harsh)] flex items-center justify-between bg-[var(--color-surface)]">
            <p className="text-[9px] font-mono text-[var(--color-text-dim)]">
              SHOWING 1-{accounts.length} OF {accounts.length} ACCOUNTS
            </p>
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 border border-[var(--color-border-harsh)] text-[var(--color-text-dim)] text-[10px] font-mono disabled:opacity-50" disabled>
                ‹ PREV
              </button>
              <span className="px-3 py-1 bg-[var(--color-signal-green)] text-[var(--color-void)] text-[10px] font-mono font-bold">1</span>
              <button className="px-2 py-1 border border-[var(--color-border-harsh)] text-[var(--color-text-dim)] text-[10px] font-mono disabled:opacity-50" disabled>
                NEXT ›
              </button>
              <select className="ml-4 text-[9px] font-mono border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] text-[var(--color-text-muted)] px-2 py-1">
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span className="text-[9px] font-mono text-[var(--color-text-dim)]">PER_PAGE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

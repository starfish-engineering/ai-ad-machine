'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { KPICard } from '@/components/ui/kpi-card';
import { AuditScore } from '@/components/ui/audit-score';
import { createBrowserClient } from '@/lib/supabase/client';
import { useWorkspace } from '@/lib/workspace';
import type { AdAccount, Campaign, AuditScore as AuditScoreType, Alert, PerformanceDaily } from '@/types/database.types';
import {
  Eye,
  MousePointer,
  DollarSign,
  Target,
  Percent,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  Settings,
  Share2,
  Sparkles,
  FileText,
  AlertCircle,
  Zap,
  Loader2,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

interface AccountDetailProps {
  params: Promise<{ id: string }>;
}

interface AccountMetrics {
  impressions: number;
  clicks: number;
  cost: number;
  avgCpc: number;
  ctr: number;
  conversions: number;
  conversionValue: number;
  costPerConversion: number;
  roas: number | null;
}

interface AuditCategory {
  name: string;
  score: number | null;
}

export default function AccountDashboard({ params }: AccountDetailProps) {
  const { id: accountId } = use(params);
  const { workspace, workspaceId, isLoading: workspaceLoading } = useWorkspace();
  
  const [account, setAccount] = useState<AdAccount | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [auditScore, setAuditScore] = useState<AuditScoreType | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceDaily[]>([]);
  const [metrics, setMetrics] = useState<AccountMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'budget' | 'shopping'>('overview');
  
  const supabase = createBrowserClient();

  useEffect(() => {
    async function fetchAccountData() {
      if (!accountId || !workspaceId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Fetch account details
        const { data: accountData, error: accountError } = await supabase
          .from('ad_accounts')
          .select('*')
          .eq('id', accountId)
          .eq('workspace_id', workspaceId)
          .single();

        if (accountError) {
          if (accountError.code === 'PGRST116') {
            setError('Account not found or access denied');
          } else {
            throw accountError;
          }
          return;
        }

        setAccount(accountData);

        // Fetch campaigns
        const { data: campaignsData } = await supabase
          .from('campaigns')
          .select('*')
          .eq('ad_account_id', accountId)
          .order('cost', { ascending: false });

        setCampaigns(campaignsData ?? []);

        // Calculate aggregated metrics from campaigns
        const aggMetrics: AccountMetrics = (campaignsData ?? []).reduce((acc, c) => ({
          impressions: acc.impressions + (c.impressions ?? 0),
          clicks: acc.clicks + (c.clicks ?? 0),
          cost: acc.cost + (c.cost ?? 0),
          avgCpc: 0, // Calculate after
          ctr: 0, // Calculate after
          conversions: acc.conversions + (c.conversions ?? 0),
          conversionValue: acc.conversionValue + (c.conversion_value ?? 0),
          costPerConversion: 0, // Calculate after
          roas: null, // Calculate after
        }), {
          impressions: 0,
          clicks: 0,
          cost: 0,
          avgCpc: 0,
          ctr: 0,
          conversions: 0,
          conversionValue: 0,
          costPerConversion: 0,
          roas: null,
        });

        aggMetrics.avgCpc = aggMetrics.clicks > 0 ? aggMetrics.cost / aggMetrics.clicks : 0;
        aggMetrics.ctr = aggMetrics.impressions > 0 ? (aggMetrics.clicks / aggMetrics.impressions) * 100 : 0;
        aggMetrics.costPerConversion = aggMetrics.conversions > 0 ? aggMetrics.cost / aggMetrics.conversions : 0;
        aggMetrics.roas = aggMetrics.cost > 0 ? aggMetrics.conversionValue / aggMetrics.cost : null;
        
        setMetrics(aggMetrics);

        // Fetch audit score
        const { data: auditData } = await supabase
          .from('audit_scores')
          .select('*')
          .eq('ad_account_id', accountId)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        setAuditScore(auditData);

        // Fetch active alerts
        const { data: alertsData } = await supabase
          .from('alerts')
          .select('*')
          .eq('ad_account_id', accountId)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        setAlerts(alertsData ?? []);

        // Fetch performance data (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const { data: perfData } = await supabase
          .from('performance_daily')
          .select('*')
          .eq('ad_account_id', accountId)
          .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
          .order('date', { ascending: true });

        setPerformanceData(perfData ?? []);

      } catch (err) {
        console.error('Error fetching account data:', err);
        setError('Failed to load account data');
      } finally {
        setIsLoading(false);
      }
    }

    if (!workspaceLoading) {
      fetchAccountData();
    }
  }, [accountId, workspaceId, workspaceLoading, supabase]);

  // Build audit categories from audit score data
  const auditCategories: AuditCategory[] = auditScore ? [
    { name: 'Campaigns', score: auditScore.campaigns_score },
    { name: 'Performance Max', score: auditScore.pmax_score },
    { name: 'Ad Groups', score: auditScore.ad_groups_score },
    { name: 'Responsive Search Ads', score: auditScore.ads_score },
    { name: 'Keywords', score: auditScore.keywords_score },
    { name: 'Performance', score: auditScore.performance_score },
  ] : [];

  // Build KPI data
  const kpiData = metrics ? [
    {
      title: 'Impr',
      value: metrics.impressions.toLocaleString(),
      change: 0, // Would come from comparison data
      icon: <Eye className="w-4 h-4" />,
    },
    {
      title: 'Clicks',
      value: metrics.clicks.toLocaleString(),
      change: 0,
      icon: <MousePointer className="w-4 h-4" />,
    },
    {
      title: 'Cost',
      value: `$${metrics.cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: 0,
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      title: 'Avg CPC',
      value: `$${metrics.avgCpc.toFixed(2)}`,
      change: 0,
      icon: <Target className="w-4 h-4" />,
    },
    {
      title: 'CTR',
      value: `${metrics.ctr.toFixed(2)}%`,
      change: 0,
      icon: <Percent className="w-4 h-4" />,
    },
    {
      title: 'Conv',
      value: metrics.conversions.toString(),
      change: 0,
      icon: <RotateCcw className="w-4 h-4" />,
    },
  ] : [];

  // Build chart data from performance_daily
  const chartData = {
    labels: performanceData.map(p => new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    clicks: performanceData.map(p => p.clicks ?? 0),
    cost: performanceData.map(p => p.cost ?? 0),
  };

  if (workspaceLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[var(--color-signal-green)] animate-spin mx-auto mb-4" />
          <p className="text-[11px] font-mono text-[var(--color-text-muted)]">LOADING_ACCOUNT_DATA...</p>
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
        </div>
      </div>
    );
  }

  if (error || !account) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 text-[var(--color-signal-red)] mx-auto mb-4" />
          <p className="text-[11px] font-mono text-[var(--color-text-muted)]">{(error ?? 'ACCOUNT_NOT_FOUND').toUpperCase().replace(/ /g, '_')}</p>
          <Link 
            href="/dashboard"
            className="mt-4 px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border-harsh)] text-[10px] font-mono text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)] inline-flex items-center gap-2"
          >
            <RefreshCw className="w-3 h-3" />
            BACK_TO_DASHBOARD
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/dashboard" className="text-[var(--color-text-dim)] hover:text-[var(--color-signal-green)] text-[10px] font-mono">
            DASHBOARD
          </Link>
          <span className="text-[var(--color-text-dim)]">/</span>
          <span className="text-[var(--color-signal-green)] text-[10px] font-mono">{account.name.toUpperCase().replace(/ /g, '_')}</span>
        </div>
        <h1 className="font-display text-2xl text-[var(--color-text-raw)]">{account.name}</h1>
        <p className="text-xs font-mono text-[var(--color-text-muted)]">
          &gt; {account.platform.toUpperCase()} • {account.platform_account_id} • {account.status?.toUpperCase() ?? 'ACTIVE'}
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b-2 border-[var(--color-border-harsh)] mb-6">
        <div className="flex gap-8">
          {[
            { id: 'overview', label: 'OVERVIEW' },
            { id: 'budget', label: 'BUDGET' },
            { id: 'shopping', label: 'SHOPPING' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                'pb-3 text-[11px] font-mono font-bold transition-colors relative',
                activeTab === tab.id
                  ? 'text-[var(--color-signal-green)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-raw)]'
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-signal-green)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Badge variant="signal" size="sm">CAMPAIGNS: ENABLED_&_PAUSED</Badge>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)] hover:border-[var(--color-signal-green)]">
            LAST_30_DAYS
            <ChevronDown className="w-3 h-3" />
          </button>
          <button className="p-2 border border-[var(--color-border-harsh)] text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)]">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 border border-[var(--color-border-harsh)] text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)]">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Main Content */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* KPI Cards */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-mono font-bold text-[var(--color-text-raw)] flex items-center gap-2">
                PERFORMANCE_METRICS
                <Settings className="w-4 h-4 text-[var(--color-text-dim)]" />
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {kpiData.map((kpi) => (
                <KPICard
                  key={kpi.title}
                  label={kpi.title}
                  value={kpi.value}
                  change={kpi.change}
                  icon={kpi.icon}
                  sparkline={true}
                />
              ))}
            </div>
          </div>

          {/* Metric Comparison Chart */}
          <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono font-bold text-[var(--color-text-raw)] flex items-center gap-2">
                METRIC_COMPARISON
                <Sparkles className="w-4 h-4 text-[var(--color-signal-magenta)]" />
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)]">
                    CLICKS
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <span className="text-[var(--color-text-dim)] text-[10px] font-mono">BY</span>
                  <button className="flex items-center gap-2 px-3 py-1.5 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)]">
                    COST
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Chart */}
            <div className="h-64 relative">
              {chartData.clicks.length > 0 ? (
                <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 50}
                      x2="600"
                      y2={i * 50}
                      stroke="var(--color-grid)"
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Clicks line (cyan) */}
                  <polyline
                    points={chartData.clicks
                      .map((v, i) => `${(i / Math.max(chartData.clicks.length - 1, 1)) * 600},${200 - (v / (Math.max(...chartData.clicks) || 1)) * 180}`)
                      .join(' ')}
                    fill="none"
                    stroke="var(--color-signal-cyan)"
                    strokeWidth="2"
                  />
                  
                  {/* Cost line (green) */}
                  <polyline
                    points={chartData.cost
                      .map((v, i) => `${(i / Math.max(chartData.cost.length - 1, 1)) * 600},${200 - (v / (Math.max(...chartData.cost) || 1)) * 180}`)
                      .join(' ')}
                    fill="none"
                    stroke="var(--color-signal-green)"
                    strokeWidth="2"
                  />
                </svg>
              ) : (
                <div className="flex items-center justify-center h-full text-[var(--color-text-dim)]">
                  <p className="text-[11px] font-mono">NO_PERFORMANCE_DATA_AVAILABLE</p>
                </div>
              )}
            </div>
            
            {/* Legend */}
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-[var(--color-signal-cyan)]" />
                <span className="text-[10px] font-mono text-[var(--color-text-muted)]">CLICKS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-[var(--color-signal-green)]" />
                <span className="text-[10px] font-mono text-[var(--color-text-muted)]">COST</span>
              </div>
            </div>
          </div>

          {/* Top Campaigns */}
          <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono font-bold text-[var(--color-text-raw)]">TOP_CAMPAIGNS</h3>
              <span className="text-[9px] font-mono text-[var(--color-text-dim)]">BY COST</span>
            </div>
            <div className="space-y-3">
              {campaigns.slice(0, 5).map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-[var(--color-text-raw)]">{campaign.name}</span>
                    <span className={cn(
                      'ml-2 text-[9px] font-mono',
                      campaign.status === 'enabled' ? 'text-[var(--color-signal-green)]' : 'text-[var(--color-text-dim)]'
                    )}>
                      {campaign.status?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-[var(--color-surface)] overflow-hidden">
                      <div 
                        className="h-full bg-[var(--color-signal-green)]" 
                        style={{ width: `${Math.min(((campaign.cost ?? 0) / (campaigns[0]?.cost ?? 1)) * 100, 100)}%` }} 
                      />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[var(--color-text-raw)] w-20 text-right">
                      ${(campaign.cost ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              ))}
              {campaigns.length === 0 && (
                <p className="text-[11px] font-mono text-[var(--color-text-dim)]">NO_CAMPAIGNS_FOUND</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Sidekick & Audit */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* AI Sidekick */}
          <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4">
            <h3 className="text-sm font-mono font-bold text-[var(--color-text-raw)] flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[var(--color-signal-magenta)]" />
              ADPILOT_SIDEKICK
            </h3>
            
            {/* AI Summary */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-border-harsh)] p-3 mb-4">
              <div className="flex items-start gap-2 text-[10px] font-mono text-[var(--color-text-muted)] mb-3">
                <AlertCircle className="w-3 h-3 text-[var(--color-text-dim)] mt-0.5 flex-shrink-0" />
                <span>AI can make mistakes. Review carefully.</span>
              </div>
              <ul className="space-y-2 text-[10px] font-mono">
                {metrics && metrics.roas && (
                  <li className="flex items-start gap-2 text-[var(--color-text-muted)]">
                    <span className="text-[var(--color-signal-green)]">•</span>
                    <span>
                      Achieved <span className="text-[var(--color-text-raw)] font-bold">{(metrics.roas * 100).toFixed(0)}% ROAS</span>, 
                      indicating {metrics.roas >= 1.5 ? 'strong' : 'moderate'} profitability.
                    </span>
                  </li>
                )}
                {metrics && (
                  <li className="flex items-start gap-2 text-[var(--color-text-muted)]">
                    <span className="text-[var(--color-signal-cyan)]">•</span>
                    <span>
                      CTR at <span className="text-[var(--color-text-raw)] font-bold">{metrics.ctr.toFixed(2)}%</span> 
                      {metrics.ctr < 3 ? ' - consider optimizing ad copy or targeting.' : ' - performing well.'}
                    </span>
                  </li>
                )}
                {metrics && metrics.conversions > 0 && (
                  <li className="flex items-start gap-2 text-[var(--color-text-muted)]">
                    <span className="text-[var(--color-signal-yellow)]">•</span>
                    <span>
                      <span className="text-[var(--color-text-raw)] font-bold">{metrics.conversions} conversions</span> achieved; 
                      consider scaling successful campaigns.
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between px-3 py-2.5 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)] transition-colors">
                <span>QUICK_PERFORMANCE_SUMMARY</span>
                <ChevronRight className="w-3 h-3" />
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2.5 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)] transition-colors">
                <span>ASK_CUSTOM_QUERY</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4 text-center">
              <p className="text-[9px] font-mono text-[var(--color-text-dim)] mb-1">CAMPAIGNS</p>
              <p className="text-2xl font-display text-[var(--color-text-raw)]">{campaigns.length}</p>
            </div>
            <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4 text-center">
              <p className="text-[9px] font-mono text-[var(--color-text-dim)] mb-1">ALERTS</p>
              <p className={cn(
                'text-2xl font-display',
                alerts.length > 0 ? 'text-[var(--color-signal-red)]' : 'text-[var(--color-text-raw)]'
              )}>{alerts.length}</p>
            </div>
          </div>

          {/* PPC Audit Score */}
          <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono font-bold text-[var(--color-text-raw)] flex items-center gap-2">
                <FileText className="w-4 h-4" />
                PPC_AUDIT_SCORE
              </h3>
              <Link href="/dashboard/audit" className="text-[var(--color-signal-cyan)] text-[9px] font-mono hover:text-[var(--color-signal-green)]">
                VIEW_AUDITS
              </Link>
            </div>
            
            {auditScore ? (
              <div className="flex items-start gap-4">
                <AuditScore score={auditScore.overall_score ?? 0} />
                <div className="flex-1">
                  <table className="w-full text-[10px] font-mono">
                    <thead>
                      <tr className="text-[var(--color-text-dim)]">
                        <th className="text-left font-medium pb-2">CATEGORY</th>
                        <th className="text-right font-medium pb-2">SCORE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditCategories.map((cat) => (
                        <tr key={cat.name} className="border-t border-[var(--color-grid)]">
                          <td className="py-1.5 text-[var(--color-text-muted)]">{cat.name}</td>
                          <td className={cn(
                            'py-1.5 text-right font-bold',
                            cat.score === null ? 'text-[var(--color-text-dim)]' :
                            cat.score >= 80 ? 'text-[var(--color-signal-green)]' :
                            cat.score >= 60 ? 'text-[var(--color-signal-yellow)]' :
                            'text-[var(--color-signal-red)]'
                          )}>
                            {cat.score ?? '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <FileText className="w-8 h-8 mx-auto mb-2 text-[var(--color-text-dim)]" />
                <p className="text-[10px] font-mono text-[var(--color-text-dim)]">NO_AUDIT_DATA</p>
              </div>
            )}
          </div>

          {/* Express Optimizations */}
          <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4">
            <h3 className="text-sm font-mono font-bold text-[var(--color-text-raw)] flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-[var(--color-signal-yellow)]" />
              EXPRESS_OPTIMIZATIONS
            </h3>
            <div className="space-y-2">
              <Link
                href="/dashboard/express/negative-keywords"
                className="flex items-center justify-between px-3 py-2.5 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)] transition-colors"
              >
                <span>FIX_CONFLICTING_NEGATIVES</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
              <Link
                href="/dashboard/express/ads"
                className="flex items-center justify-between px-3 py-2.5 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)] transition-colors"
              >
                <span>FIX_ADS_WITH_ISSUES</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

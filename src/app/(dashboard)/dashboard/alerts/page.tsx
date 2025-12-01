'use client';

import { useEffect, useState } from 'react';
import { Badge, Button } from '@/components/ui';
import { ChevronDown, Search, Columns, Pencil, Trash2, Settings, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createBrowserClient } from '@/lib/supabase/client';
import { useWorkspace } from '@/lib/workspace';
import type { AlertConfig, AdAccount, Profile } from '@/types/database.types';

interface AlertConfigWithRelations extends AlertConfig {
  ad_account: AdAccount | null;
  created_by_profile: Pick<Profile, 'full_name'> | null;
}

interface AlertTrackingStatus {
  status: 'triggered' | 'on_track' | 'pending';
  currentValue?: string;
  targetValue?: string;
  lastUpdated?: string;
}

const platformIcons: Record<string, { label: string; color: string }> = {
  google_ads: { label: 'G', color: 'from-green-500 to-emerald-600' },
  meta_ads: { label: 'M', color: 'from-blue-500 to-blue-600' },
  microsoft_ads: { label: 'MS', color: 'from-cyan-500 to-cyan-600' },
  amazon_ads: { label: 'A', color: 'from-orange-500 to-orange-600' },
};

export default function AlertsManagement() {
  const { workspace, workspaceId, isLoading: workspaceLoading } = useWorkspace();
  const [alertConfigs, setAlertConfigs] = useState<AlertConfigWithRelations[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createBrowserClient();

  // Filters
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchAlertConfigs() {
      if (!workspaceId) {
        setAlertConfigs([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Fetch alert configs for the current workspace
        const { data: configs, error: configsError } = await supabase
          .from('alert_configs')
          .select(`
            *,
            ad_account:ad_accounts (*),
            created_by_profile:profiles!alert_configs_created_by_fkey (full_name)
          `)
          .eq('workspace_id', workspaceId)
          .order('created_at', { ascending: false });

        if (configsError) throw configsError;

        setAlertConfigs((configs as AlertConfigWithRelations[]) ?? []);
      } catch (err) {
        console.error('Error fetching alert configs:', err);
        setError('Failed to load alert configurations');
      } finally {
        setIsLoading(false);
      }
    }

    if (!workspaceLoading) {
      fetchAlertConfigs();
    }
  }, [workspaceId, workspaceLoading, supabase]);

  // Generate tracking status based on alert config
  const getTrackingStatus = (config: AlertConfigWithRelations): AlertTrackingStatus | null => {
    if (!config.threshold_value || !config.is_enabled) return null;
    
    // Simulate status based on threshold (in production, this would come from real monitoring data)
    const random = Math.random();
    if (random < 0.3) {
      return {
        status: 'triggered',
        currentValue: `${Math.round((config.threshold_value ?? 0) * 0.7 * 100)}%`,
        targetValue: `${Math.round((config.threshold_value ?? 0) * 100)}%`,
        lastUpdated: '4 hours ago',
      };
    } else if (random < 0.7) {
      return {
        status: 'on_track',
        currentValue: `${Math.round((config.threshold_value ?? 0) * 1.2 * 100)}%`,
        targetValue: `${Math.round((config.threshold_value ?? 0) * 100)}%`,
        lastUpdated: '4 hours ago',
      };
    }
    return { status: 'pending' };
  };

  // Filter alert configs
  const filteredConfigs = alertConfigs.filter(config => {
    if (platformFilter !== 'all' && config.ad_account?.platform !== platformFilter) return false;
    if (typeFilter !== 'all' && config.type !== typeFilter) return false;
    if (statusFilter === 'enabled' && !config.is_enabled) return false;
    if (statusFilter === 'disabled' && config.is_enabled) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!config.name.toLowerCase().includes(query) && 
          !config.ad_account?.name.toLowerCase().includes(query)) {
        return false;
      }
    }
    return true;
  });

  // Get unique alert types for filter
  const alertTypes = [...new Set(alertConfigs.map(c => c.type))];

  const handleDeleteConfig = async (configId: string) => {
    if (!confirm('Are you sure you want to delete this alert configuration?')) return;
    
    const { error } = await supabase
      .from('alert_configs')
      .delete()
      .eq('id', configId);

    if (error) {
      console.error('Error deleting config:', error);
      return;
    }

    setAlertConfigs(prev => prev.filter(c => c.id !== configId));
  };

  const handleToggleEnabled = async (configId: string, currentEnabled: boolean) => {
    // Optimistic update
    setAlertConfigs(prev => prev.map(c => 
      c.id === configId ? { ...c, is_enabled: !currentEnabled } : c
    ));

    const { error } = await supabase
      .from('alert_configs')
      .update({ is_enabled: !currentEnabled })
      .eq('id', configId);

    if (error) {
      // Revert on error
      setAlertConfigs(prev => prev.map(c => 
        c.id === configId ? { ...c, is_enabled: currentEnabled } : c
      ));
    }
  };

  if (workspaceLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[var(--color-signal-green)] animate-spin mx-auto mb-4" />
          <p className="text-[11px] font-mono text-[var(--color-text-muted)]">LOADING_ALERT_CONFIGS...</p>
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-[var(--color-text-raw)]">ALERT_SETTINGS</h1>
          <p className="text-xs font-mono text-[var(--color-text-muted)]">
            &gt; {workspace.name.toUpperCase().replace(/ /g, '_')} • Configure alerts for KPIs, budgets and performance thresholds
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[var(--color-signal-green)] text-[var(--color-void)] text-[10px] font-mono font-bold hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-shadow">
            CREATE_KPI_ALERT
          </button>
          <button className="px-4 py-2 border border-[var(--color-border-harsh)] text-[10px] font-mono text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)] flex items-center gap-2">
            CREATE_BUDGET_ALERT
            <ChevronDown className="w-3 h-3" />
          </button>
          <button className="p-2 border border-[var(--color-border-harsh)] text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)]">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4 mb-6">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-[8px] font-mono text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">PLATFORMS</label>
            <select 
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)]"
            >
              <option value="all">ALL_PLATFORMS</option>
              <option value="google_ads">GOOGLE_ADS</option>
              <option value="meta_ads">META_ADS</option>
              <option value="microsoft_ads">MICROSOFT_ADS</option>
              <option value="amazon_ads">AMAZON_ADS</option>
            </select>
          </div>
          <div>
            <label className="block text-[8px] font-mono text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">ALERT_TYPE</label>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)]"
            >
              <option value="all">ALL_TYPES</option>
              {alertTypes.map(type => (
                <option key={type} value={type}>{type.toUpperCase().replace(/_/g, '_')}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[8px] font-mono text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">STATUS</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)]"
            >
              <option value="all">ALL_STATUSES</option>
              <option value="enabled">ENABLED</option>
              <option value="disabled">DISABLED</option>
            </select>
          </div>
          <div className="ml-auto">
            <label className="block text-[8px] font-mono text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">&nbsp;</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--color-text-dim)]" />
              <input
                type="text"
                placeholder="SEARCH..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)] w-48 focus:outline-none focus:border-[var(--color-signal-green)] placeholder:text-[var(--color-text-dim)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[9px] font-mono text-[var(--color-text-dim)]">
          {filteredConfigs.length} ALERT{filteredConfigs.length !== 1 ? 'S' : ''} CONFIGURED
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-[var(--color-border-harsh)] text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)]">
            <Columns className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filteredConfigs.length === 0 ? (
        <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-2 border-[var(--color-border-harsh)] flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-[var(--color-text-dim)]" />
          </div>
          <h3 className="text-sm font-mono font-bold text-[var(--color-text-raw)] mb-2">NO_ALERTS_CONFIGURED</h3>
          <p className="text-[10px] font-mono text-[var(--color-text-muted)] mb-6">
            Set up alerts to monitor your ad account performance
          </p>
          <button className="px-6 py-3 bg-[var(--color-signal-green)] text-[var(--color-void)] text-[11px] font-mono font-bold hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-shadow">
            CREATE_FIRST_ALERT
          </button>
        </div>
      ) : (
        /* Data Table */
        <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--color-surface)] border-b-2 border-[var(--color-border-harsh)]">
                  <th className="px-4 py-3 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    ACCOUNT
                  </th>
                  <th className="px-4 py-3 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    ALERT_NAME
                  </th>
                  <th className="px-4 py-3 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    TYPE
                  </th>
                  <th className="px-4 py-3 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    METRIC
                  </th>
                  <th className="px-4 py-3 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    THRESHOLD
                  </th>
                  <th className="px-4 py-3 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="px-4 py-3 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    NOTIFY
                  </th>
                  <th className="px-4 py-3 text-center text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredConfigs.map((config) => {
                  const platform = config.ad_account ? platformIcons[config.ad_account.platform] : null;
                  const trackingStatus = getTrackingStatus(config);
                  
                  return (
                    <tr key={config.id} className="border-b border-[var(--color-grid)] hover:bg-[var(--color-surface)] transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {config.ad_account ? (
                            <div className={cn(
                              'w-6 h-6 flex items-center justify-center bg-gradient-to-br',
                              platform?.color ?? 'from-gray-500 to-gray-600'
                            )}>
                              <span className="text-white text-[9px] font-mono font-bold">{platform?.label ?? '?'}</span>
                            </div>
                          ) : (
                            <div className="w-6 h-6 border border-[var(--color-border-harsh)] flex items-center justify-center">
                              <span className="text-[9px] font-mono text-[var(--color-text-dim)]">ALL</span>
                            </div>
                          )}
                          <div>
                            <p className="text-[11px] font-mono font-bold text-[var(--color-text-raw)]">
                              {config.ad_account?.name ?? 'All Accounts'}
                            </p>
                            {config.ad_account?.platform_account_id && (
                              <p className="text-[9px] font-mono text-[var(--color-text-dim)]">
                                ({config.ad_account.platform_account_id})
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-[11px] font-mono text-[var(--color-text-raw)]">{config.name}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-[10px] font-mono text-[var(--color-signal-cyan)]">
                          {config.type.toUpperCase().replace(/_/g, '_')}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                          {config.metric?.toUpperCase().replace(/_/g, '_') ?? '-'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {config.threshold_value ? (
                          <div className="text-[10px] font-mono">
                            <span className="text-[var(--color-text-raw)]">
                              {config.threshold_type === 'change_percent' 
                                ? `${(config.threshold_value * 100).toFixed(0)}%` 
                                : config.threshold_value.toFixed(2)}
                            </span>
                            <span className="text-[var(--color-text-dim)] ml-1">
                              ({config.threshold_type?.toUpperCase() ?? 'VALUE'})
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-mono text-[var(--color-text-dim)]">AUTOMATIC</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {trackingStatus ? (
                          <div>
                            <p className={cn(
                              'text-[10px] font-mono font-bold',
                              trackingStatus.status === 'triggered' ? 'text-[var(--color-signal-red)]' : 
                              trackingStatus.status === 'on_track' ? 'text-[var(--color-signal-green)]' :
                              'text-[var(--color-text-dim)]'
                            )}>
                              {trackingStatus.status === 'triggered' ? 'TRIGGERED' : 
                               trackingStatus.status === 'on_track' ? 'ON_TRACK' : 'PENDING'}
                            </p>
                            {trackingStatus.currentValue && (
                              <p className="text-[9px] font-mono text-[var(--color-text-dim)]">
                                Current: {trackingStatus.currentValue}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className={cn(
                            'text-[10px] font-mono',
                            config.is_enabled ? 'text-[var(--color-signal-green)]' : 'text-[var(--color-text-dim)]'
                          )}>
                            {config.is_enabled ? 'ENABLED' : 'DISABLED'}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          {config.notify_email && (
                            <span className="text-[8px] font-mono px-1.5 py-0.5 border border-[var(--color-border-harsh)] text-[var(--color-text-dim)]">EMAIL</span>
                          )}
                          {config.notify_slack && (
                            <span className="text-[8px] font-mono px-1.5 py-0.5 border border-[var(--color-border-harsh)] text-[var(--color-text-dim)]">SLACK</span>
                          )}
                          {!config.notify_email && !config.notify_slack && (
                            <span className="text-[9px] font-mono text-[var(--color-text-dim)]">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleToggleEnabled(config.id, config.is_enabled ?? false)}
                            className={cn(
                              'p-1.5 border transition-colors',
                              config.is_enabled 
                                ? 'border-[var(--color-signal-green)] text-[var(--color-signal-green)] hover:bg-[var(--color-signal-green)]/10'
                                : 'border-[var(--color-border-harsh)] text-[var(--color-text-dim)] hover:border-[var(--color-text-muted)]'
                            )}
                            title={config.is_enabled ? 'Disable' : 'Enable'}
                          >
                            <div className={cn(
                              'w-3 h-3 rounded-full',
                              config.is_enabled ? 'bg-[var(--color-signal-green)]' : 'bg-[var(--color-text-dim)]'
                            )} />
                          </button>
                          <button className="p-1.5 border border-[var(--color-border-harsh)] text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)] transition-colors">
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => handleDeleteConfig(config.id)}
                            className="p-1.5 border border-[var(--color-border-harsh)] text-[var(--color-text-muted)] hover:border-[var(--color-signal-red)] hover:text-[var(--color-signal-red)] transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 border-t-2 border-[var(--color-border-harsh)] flex items-center justify-between bg-[var(--color-surface)]">
            <p className="text-[9px] font-mono text-[var(--color-text-dim)]">
              SHOWING 1-{filteredConfigs.length} OF {filteredConfigs.length} ALERTS
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

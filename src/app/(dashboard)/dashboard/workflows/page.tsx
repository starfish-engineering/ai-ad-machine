'use client';

import { useEffect, useState } from 'react';
import { 
  Plus, Play, Pause, Settings, Trash2, Copy, Clock,
  Zap, Filter, Search, ChevronDown, Loader2, AlertTriangle, RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createBrowserClient } from '@/lib/supabase/client';
import { useWorkspace } from '@/lib/workspace';
import type { AutomationRule, AdAccount } from '@/types/database.types';

interface RuleWithAccount extends AutomationRule {
  ad_account: AdAccount | null;
}

const templates = [
  { name: 'Budget Protection', description: 'Pause campaigns when daily budget exceeded', icon: '🛡️' },
  { name: 'Performance Alert', description: 'Get notified on major metric changes', icon: '📊' },
  { name: 'Bid Optimizer', description: 'Automatically adjust bids based on performance', icon: '💰' },
  { name: 'Schedule Manager', description: 'Enable/disable campaigns on a schedule', icon: '⏰' },
  { name: 'Negative Keyword Adder', description: 'Auto-add negatives from search queries', icon: '🚫' },
];

export default function WorkflowsPage() {
  const { workspace, workspaceId, isLoading: workspaceLoading } = useWorkspace();
  const [rules, setRules] = useState<RuleWithAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const supabase = createBrowserClient();

  useEffect(() => {
    async function fetchRules() {
      if (!workspaceId) {
        setRules([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { data, error: rulesError } = await supabase
          .from('automation_rules')
          .select(`
            *,
            ad_account:ad_accounts (*)
          `)
          .eq('workspace_id', workspaceId)
          .order('created_at', { ascending: false });

        if (rulesError) throw rulesError;
        setRules((data as RuleWithAccount[]) ?? []);
      } catch (err) {
        console.error('Error fetching rules:', err);
        setError('Failed to load automation rules');
      } finally {
        setIsLoading(false);
      }
    }

    if (!workspaceLoading) {
      fetchRules();
    }
  }, [workspaceId, workspaceLoading, supabase]);

  const filteredRules = rules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (rule.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'active' && rule.is_enabled) ||
                          (statusFilter === 'paused' && !rule.is_enabled);
    return matchesSearch && matchesStatus;
  });

  const activeRules = rules.filter(r => r.is_enabled).length;
  const totalExecutions = rules.reduce((sum, r) => sum + (r.run_count ?? 0), 0);

  const handleToggleEnabled = async (ruleId: string, currentEnabled: boolean) => {
    // Optimistic update
    setRules(prev => prev.map(r => 
      r.id === ruleId ? { ...r, is_enabled: !currentEnabled } : r
    ));

    const { error } = await supabase
      .from('automation_rules')
      .update({ is_enabled: !currentEnabled })
      .eq('id', ruleId);

    if (error) {
      // Revert on error
      setRules(prev => prev.map(r => 
        r.id === ruleId ? { ...r, is_enabled: currentEnabled } : r
      ));
    }
  };

  const handleDeleteRule = async (ruleId: string) => {
    if (!confirm('Are you sure you want to delete this rule?')) return;
    
    const { error } = await supabase
      .from('automation_rules')
      .delete()
      .eq('id', ruleId);

    if (error) {
      console.error('Error deleting rule:', error);
      return;
    }

    setRules(prev => prev.filter(r => r.id !== ruleId));
  };

  const formatTrigger = (rule: RuleWithAccount): string => {
    if (rule.trigger_type === 'schedule') {
      const config = rule.trigger_config as any;
      return `Schedule: ${config?.schedule ?? 'Custom'}`;
    }
    if (rule.trigger_type === 'metric_threshold') {
      const config = rule.trigger_config as any;
      return `${config?.metric ?? 'Metric'} ${config?.operator ?? '>'} ${config?.threshold ?? 'N/A'}`;
    }
    return rule.trigger_type ?? 'Unknown';
  };

  const formatAction = (rule: RuleWithAccount): string => {
    if (rule.action_type === 'pause_campaign') return 'Pause campaign/keyword';
    if (rule.action_type === 'adjust_budget') return 'Adjust budget';
    if (rule.action_type === 'send_alert') return 'Send alert';
    return rule.action_type ?? 'Unknown';
  };

  if (workspaceLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[var(--color-signal-green)] animate-spin mx-auto mb-4" />
          <p className="text-[11px] font-mono text-[var(--color-text-muted)]">LOADING_AUTOMATION_RULES...</p>
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
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-[var(--color-text-raw)]">WORKFLOWS_&_RULES</h1>
          <p className="text-xs font-mono text-[var(--color-text-muted)]">
            &gt; {workspace.name.toUpperCase().replace(/ /g, '_')} • Automate routine tasks with powerful rules
          </p>
        </div>
        <button className="px-4 py-2 bg-[var(--color-signal-green)] text-[var(--color-void)] text-[10px] font-mono font-bold hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-shadow flex items-center gap-2">
          <Plus className="w-3 h-3" />
          CREATE_RULE
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--color-signal-green)]/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-signal-green)]" />
            </div>
            <div>
              <p className="text-2xl font-display text-[var(--color-text-raw)]">{activeRules}</p>
              <p className="text-[9px] font-mono text-[var(--color-text-dim)]">ACTIVE_RULES</p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--color-signal-cyan)]/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[var(--color-signal-cyan)]" />
            </div>
            <div>
              <p className="text-2xl font-display text-[var(--color-text-raw)]">{totalExecutions.toLocaleString()}</p>
              <p className="text-[9px] font-mono text-[var(--color-text-dim)]">TOTAL_EXECUTIONS</p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--color-signal-magenta)]/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[var(--color-signal-magenta)]" />
            </div>
            <div>
              <p className="text-2xl font-display text-[var(--color-text-raw)]">24/7</p>
              <p className="text-[9px] font-mono text-[var(--color-text-dim)]">MONITORING</p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--color-signal-yellow)]/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[var(--color-signal-yellow)]" />
            </div>
            <div>
              <p className="text-2xl font-display text-[var(--color-text-raw)]">{rules.filter(r => !r.is_enabled).length}</p>
              <p className="text-[9px] font-mono text-[var(--color-text-dim)]">PAUSED_RULES</p>
            </div>
          </div>
        </div>
      </div>

      {/* Templates */}
      <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4 mb-6">
        <h3 className="text-sm font-mono font-bold text-[var(--color-text-raw)] mb-4">QUICK_START_TEMPLATES</h3>
        <div className="grid grid-cols-5 gap-4">
          {templates.map((template) => (
            <button
              key={template.name}
              className="p-4 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] hover:border-[var(--color-signal-green)] transition-colors text-left"
            >
              <div className="text-2xl mb-2">{template.icon}</div>
              <div className="text-[11px] font-mono font-bold text-[var(--color-text-raw)]">{template.name}</div>
              <div className="text-[9px] font-mono text-[var(--color-text-dim)] mt-1">{template.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Rules List */}
      <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)]">
        <div className="px-4 py-3 border-b-2 border-[var(--color-border-harsh)] flex items-center justify-between">
          <h3 className="text-sm font-mono font-bold text-[var(--color-text-raw)]">YOUR_RULES</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--color-text-dim)]" />
              <input
                type="text"
                placeholder="SEARCH_RULES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)] w-48 focus:outline-none focus:border-[var(--color-signal-green)] placeholder:text-[var(--color-text-dim)]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)]"
            >
              <option value="all">ALL_STATUS</option>
              <option value="active">ACTIVE</option>
              <option value="paused">PAUSED</option>
            </select>
          </div>
        </div>
        
        {filteredRules.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-2 border-[var(--color-border-harsh)] flex items-center justify-center">
              <Zap className="w-8 h-8 text-[var(--color-text-dim)]" />
            </div>
            <h3 className="text-sm font-mono font-bold text-[var(--color-text-raw)] mb-2">NO_RULES_CONFIGURED</h3>
            <p className="text-[10px] font-mono text-[var(--color-text-muted)] mb-6">
              Create automation rules to optimize your campaigns 24/7
            </p>
            <button className="px-6 py-3 bg-[var(--color-signal-green)] text-[var(--color-void)] text-[11px] font-mono font-bold hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-shadow">
              CREATE_FIRST_RULE
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[var(--color-grid)]">
            {filteredRules.map((rule) => (
              <div key={rule.id} className="p-4 hover:bg-[var(--color-surface)] transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'w-10 h-10 flex items-center justify-center',
                      rule.is_enabled ? 'bg-[var(--color-signal-green)]/20' : 'bg-[var(--color-surface)]'
                    )}>
                      <Zap className={cn(
                        'w-5 h-5',
                        rule.is_enabled ? 'text-[var(--color-signal-green)]' : 'text-[var(--color-text-dim)]'
                      )} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-[11px] font-mono font-bold text-[var(--color-text-raw)]">{rule.name}</h3>
                        <span className={cn(
                          'text-[8px] font-mono px-1.5 py-0.5 border',
                          rule.is_enabled 
                            ? 'border-[var(--color-signal-green)] text-[var(--color-signal-green)]' 
                            : 'border-[var(--color-border-harsh)] text-[var(--color-text-dim)]'
                        )}>
                          {rule.is_enabled ? 'ACTIVE' : 'PAUSED'}
                        </span>
                      </div>
                      {rule.description && (
                        <p className="text-[10px] font-mono text-[var(--color-text-muted)] mt-1">{rule.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-[9px] font-mono text-[var(--color-text-dim)]">
                        <span><span className="text-[var(--color-text-muted)]">WHEN:</span> {formatTrigger(rule)}</span>
                        <span><span className="text-[var(--color-text-muted)]">THEN:</span> {formatAction(rule)}</span>
                        <span><span className="text-[var(--color-text-muted)]">SCOPE:</span> {rule.ad_account?.name ?? 'All Accounts'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-[11px] font-mono font-bold text-[var(--color-text-raw)]">{rule.run_count ?? 0} runs</div>
                      {rule.last_run_at && (
                        <div className="text-[9px] font-mono text-[var(--color-text-dim)]">
                          Last: {new Date(rule.last_run_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleToggleEnabled(rule.id, rule.is_enabled ?? false)}
                        className={cn(
                          'p-2 border transition-colors',
                          rule.is_enabled 
                            ? 'border-[var(--color-signal-yellow)] text-[var(--color-signal-yellow)] hover:bg-[var(--color-signal-yellow)]/10'
                            : 'border-[var(--color-signal-green)] text-[var(--color-signal-green)] hover:bg-[var(--color-signal-green)]/10'
                        )}
                        title={rule.is_enabled ? 'Pause' : 'Enable'}
                      >
                        {rule.is_enabled ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      </button>
                      <button className="p-2 border border-[var(--color-border-harsh)] text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)]">
                        <Settings className="w-3 h-3" />
                      </button>
                      <button className="p-2 border border-[var(--color-border-harsh)] text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)]">
                        <Copy className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={() => handleDeleteRule(rule.id)}
                        className="p-2 border border-[var(--color-border-harsh)] text-[var(--color-text-muted)] hover:border-[var(--color-signal-red)] hover:text-[var(--color-signal-red)]"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

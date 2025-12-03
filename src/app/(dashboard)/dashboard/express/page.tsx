'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Flame,
  CheckCircle,
  XCircle,
  Pause,
  Loader2,
  AlertTriangle,
  RefreshCw,
  Lightbulb,
} from 'lucide-react';
import { createBrowserClient } from '@/lib/supabase/client';
import { useWorkspace } from '@/lib/workspace';
import type { Suggestion, AdAccount, NegativeKeywordConflict } from '@/types/database.types';

interface SuggestionWithRelations extends Suggestion {
  ad_account: AdAccount | null;
  negative_keyword_conflicts?: NegativeKeywordConflict[];
}

interface GroupedSuggestion {
  type: string;
  account: string;
  accountId: string;
  adAccountId: string;
  count: number;
  suggestions: SuggestionWithRelations[];
}

export default function ExpressOptimizations() {
  const { workspace, workspaceId, isLoading: workspaceLoading } = useWorkspace();
  const [suggestions, setSuggestions] = useState<SuggestionWithRelations[]>([]);
  const [conflicts, setConflicts] = useState<NegativeKeywordConflict[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const supabase = createBrowserClient();

  useEffect(() => {
    async function fetchSuggestions() {
      if (!workspaceId) {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Get ad accounts for this workspace first
        const { data: accounts, error: accountsError } = await supabase
          .from('ad_accounts')
          .select('id')
          .eq('workspace_id', workspaceId);

        if (accountsError) throw accountsError;
        
        const accountIds = accounts?.map(a => a.id) ?? [];
        
        if (accountIds.length === 0) {
          setSuggestions([]);
          setIsLoading(false);
          return;
        }

        // Fetch suggestions for these accounts
        const { data: suggestionsData, error: suggestionsError } = await supabase
          .from('suggestions')
          .select(`
            *,
            ad_account:ad_accounts (*)
          `)
          .in('ad_account_id', accountIds)
          .eq('status', 'pending')
          .order('priority', { ascending: true })
          .order('created_at', { ascending: false });

        if (suggestionsError) throw suggestionsError;
        setSuggestions((suggestionsData as SuggestionWithRelations[]) ?? []);

        // Fetch negative keyword conflicts
        const { data: conflictsData, error: conflictsError } = await supabase
          .from('negative_keyword_conflicts')
          .select('*')
          .in('ad_account_id', accountIds)
          .eq('status', 'pending');

        if (conflictsError) throw conflictsError;
        setConflicts(conflictsData ?? []);

        // Select first group by default
        if (suggestionsData && suggestionsData.length > 0) {
          const first = suggestionsData[0];
          setSelectedGroup(`${first.type}-${first.ad_account_id}`);
          
          // Select all items in the first group by default
          const firstGroupConflicts = conflictsData?.filter(c => c.suggestion_id === first.id) ?? [];
          setSelectedItems(new Set(firstGroupConflicts.map(c => c.id)));
        }

      } catch (err) {
        console.error('Error fetching suggestions:', err);
        setError('Failed to load suggestions');
      } finally {
        setIsLoading(false);
      }
    }

    if (!workspaceLoading) {
      fetchSuggestions();
    }
  }, [workspaceId, workspaceLoading, supabase]);

  // Group suggestions by type and account
  const groupedSuggestions: GroupedSuggestion[] = suggestions.reduce((acc, suggestion) => {
    const key = `${suggestion.type}-${suggestion.ad_account_id}`;
    const existing = acc.find(g => `${g.type}-${g.adAccountId}` === key);
    
    if (existing) {
      existing.suggestions.push(suggestion);
      existing.count++;
    } else {
      acc.push({
        type: suggestion.type,
        account: suggestion.ad_account?.name ?? 'Unknown Account',
        accountId: suggestion.ad_account?.platform_account_id ?? '',
        adAccountId: suggestion.ad_account_id,
        count: 1,
        suggestions: [suggestion],
      });
    }
    
    return acc;
  }, [] as GroupedSuggestion[]);

  const currentGroup = groupedSuggestions.find(g => `${g.type}-${g.adAccountId}` === selectedGroup);
  const currentSuggestion = currentGroup?.suggestions[0];
  const currentConflicts = currentSuggestion 
    ? conflicts.filter(c => c.suggestion_id === currentSuggestion.id)
    : [];

  const toggleItem = (conflictId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(conflictId)) {
      newSelected.delete(conflictId);
    } else {
      newSelected.add(conflictId);
    }
    setSelectedItems(newSelected);
  };

  const toggleAll = () => {
    if (selectedItems.size === currentConflicts.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(currentConflicts.map(c => c.id)));
    }
  };

  const handleApplySuggestion = async () => {
    if (!currentSuggestion || selectedItems.size === 0) return;

    // Update selected conflicts as resolved
    const { error: conflictError } = await supabase
      .from('negative_keyword_conflicts')
      .update({ status: 'resolved', resolved_at: new Date().toISOString() })
      .in('id', Array.from(selectedItems));

    if (conflictError) {
      console.error('Error resolving conflicts:', conflictError);
      return;
    }

    // Update suggestion status if all conflicts resolved
    const remainingConflicts = currentConflicts.filter(c => !selectedItems.has(c.id));
    if (remainingConflicts.length === 0) {
      await supabase
        .from('suggestions')
        .update({ status: 'applied', applied_at: new Date().toISOString() })
        .eq('id', currentSuggestion.id);
    }

    // Refresh data
    setConflicts(prev => prev.filter(c => !selectedItems.has(c.id)));
    setSelectedItems(new Set());
  };

  const formatSuggestionType = (type: string): string => {
    return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  if (workspaceLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[var(--color-signal-green)] animate-spin mx-auto mb-4" />
          <p className="text-[11px] font-mono text-[var(--color-text-muted)]">LOADING_SUGGESTIONS...</p>
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
          <h1 className="font-display text-2xl text-[var(--color-text-raw)]">DRAPER_EXPRESS</h1>
          <p className="text-xs font-mono text-[var(--color-text-muted)]">
            &gt; {workspace.name.toUpperCase().replace(/ /g, '_')} • One-click optimizations for your campaigns
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <Flame className="w-4 h-4 text-[var(--color-signal-yellow)]" />
            <span className="text-[var(--color-text-muted)]">1 day streak!</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--color-text-dim)]">
            <CheckCircle className="w-4 h-4" />
            <span><span className="text-[var(--color-text-raw)] font-bold">1</span> Reviewed Today</span>
          </div>
        </div>
      </div>

      {groupedSuggestions.length === 0 ? (
        <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-2 border-[var(--color-signal-green)] flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-[var(--color-signal-green)]" />
          </div>
          <h3 className="text-sm font-mono font-bold text-[var(--color-text-raw)] mb-2">ALL_CAUGHT_UP!</h3>
          <p className="text-[10px] font-mono text-[var(--color-text-muted)]">
            No pending optimization suggestions at this time
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Suggestions List */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] overflow-hidden">
              {/* Filters */}
              <div className="p-4 border-b-2 border-[var(--color-border-harsh)] space-y-3">
                <button className="flex items-center justify-between w-full px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)] hover:border-[var(--color-signal-green)]">
                  <span className="flex items-center gap-2">
                    <span className="text-[var(--color-text-dim)]">👥</span>
                    ALL_ACCOUNTS
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <button className="flex items-center justify-between w-full px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)] hover:border-[var(--color-signal-green)]">
                  <span className="flex items-center gap-2">
                    <span className="text-[var(--color-text-dim)]">💡</span>
                    ALL_SUGGESTION_TYPES
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              {/* Suggestions List */}
              <div className="max-h-[600px] overflow-y-auto">
                {groupedSuggestions.map((group) => {
                  const key = `${group.type}-${group.adAccountId}`;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedGroup(key);
                        const groupConflicts = conflicts.filter(c => 
                          group.suggestions.some(s => s.id === c.suggestion_id)
                        );
                        setSelectedItems(new Set(groupConflicts.map(c => c.id)));
                      }}
                      className={cn(
                        'w-full px-4 py-3 text-left transition-colors border-b border-[var(--color-grid)]',
                        selectedGroup === key 
                          ? 'bg-[var(--color-signal-green)]/10 border-l-2 border-l-[var(--color-signal-green)]' 
                          : 'hover:bg-[var(--color-surface)]'
                      )}
                    >
                      <p className="text-[11px] font-mono font-bold text-[var(--color-text-raw)]">
                        {formatSuggestionType(group.type)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-4 h-4 bg-[var(--color-signal-green)] flex items-center justify-center">
                          <span className="text-[var(--color-void)] text-[8px] font-mono font-bold">G</span>
                        </div>
                        <span className="text-[9px] font-mono text-[var(--color-text-dim)]">
                          {group.account} {group.accountId && `(${group.accountId})`}
                        </span>
                      </div>
                      <span className="text-[8px] font-mono text-[var(--color-signal-cyan)] mt-1 block">
                        {group.count} suggestion{group.count !== 1 ? 's' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel - Suggestion Detail */}
          <div className="col-span-12 lg:col-span-8">
            {currentGroup && currentSuggestion ? (
              <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)]">
                {/* Header */}
                <div className="p-6 border-b-2 border-[var(--color-border-harsh)]">
                  <h2 className="text-sm font-mono font-bold text-[var(--color-text-raw)] mb-2">
                    {formatSuggestionType(currentSuggestion.type)}
                  </h2>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 bg-[var(--color-signal-green)] flex items-center justify-center">
                      <span className="text-[var(--color-void)] text-[10px] font-mono font-bold">G</span>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                      {currentGroup.account}
                      {currentGroup.accountId && ` (${currentGroup.accountId})`}
                    </span>
                  </div>
                  {currentSuggestion.description && (
                    <p className="text-[10px] font-mono text-[var(--color-text-muted)]">
                      {currentSuggestion.description}
                    </p>
                  )}
                  {currentSuggestion.impact_estimate && (
                    <div className="flex items-start gap-2 mt-4 p-3 bg-[var(--color-signal-green)]/10 border border-[var(--color-signal-green)]/30">
                      <Lightbulb className="w-4 h-4 text-[var(--color-signal-green)] flex-shrink-0 mt-0.5" />
                      <p className="text-[10px] font-mono text-[var(--color-signal-green)]">
                        <span className="font-bold">IMPACT:</span> {currentSuggestion.impact_estimate}
                      </p>
                    </div>
                  )}
                </div>

                {/* Table for negative keyword conflicts */}
                {currentConflicts.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[var(--color-surface)] border-b-2 border-[var(--color-border-harsh)]">
                          <th className="px-4 py-3 text-left">
                            <input
                              type="checkbox"
                              checked={selectedItems.size === currentConflicts.length}
                              onChange={toggleAll}
                              className="border-[var(--color-border-harsh)] bg-[var(--color-terminal)]"
                            />
                          </th>
                          <th className="px-4 py-3 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                            {selectedItems.size}/{currentConflicts.length}
                          </th>
                          <th className="px-4 py-3 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                            NEGATIVE_KEYWORD
                          </th>
                          <th className="px-4 py-3 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                            SOURCE
                          </th>
                          <th className="px-4 py-3 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                            CONFLICTING_KEYWORD
                          </th>
                          <th className="px-4 py-3 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                            CAMPAIGN
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--color-grid)]">
                        {currentConflicts.map((conflict) => (
                          <tr key={conflict.id} className="hover:bg-[var(--color-surface)]">
                            <td className="px-4 py-3">
                              <input
                                type="checkbox"
                                checked={selectedItems.has(conflict.id)}
                                onChange={() => toggleItem(conflict.id)}
                                className="border-[var(--color-border-harsh)] bg-[var(--color-terminal)]"
                              />
                            </td>
                            <td className="px-4 py-3"></td>
                            <td className="px-4 py-3 text-[10px] font-mono text-[var(--color-signal-red)]">
                              {conflict.negative_keyword}
                            </td>
                            <td className="px-4 py-3 text-[10px] font-mono text-[var(--color-text-dim)]">
                              {conflict.negative_source ?? 'Unknown'}
                            </td>
                            <td className="px-4 py-3 text-[10px] font-mono text-[var(--color-text-raw)]">
                              {conflict.conflicting_keyword}
                            </td>
                            <td className="px-4 py-3 text-[10px] font-mono text-[var(--color-text-dim)]">
                              {conflict.campaign_name ?? '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* No conflicts state */}
                {currentConflicts.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-[10px] font-mono text-[var(--color-text-dim)]">
                      No detailed items for this suggestion type
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="p-4 border-t-2 border-[var(--color-border-harsh)] flex items-center justify-center gap-3">
                  <button className="px-4 py-2 border border-[var(--color-border-harsh)] text-[10px] font-mono text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)] flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    SNOOZE
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <button className="px-4 py-2 bg-[var(--color-signal-cyan)] text-[var(--color-void)] text-[10px] font-mono font-bold hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] flex items-center gap-2">
                    <Pause className="w-3 h-3" />
                    PAUSE_KEYWORDS
                  </button>
                  <button 
                    onClick={handleApplySuggestion}
                    disabled={selectedItems.size === 0}
                    className="px-4 py-2 bg-[var(--color-signal-green)] text-[var(--color-void)] text-[10px] font-mono font-bold hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <XCircle className="w-3 h-3" />
                    REMOVE_NEGATIVES
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] h-full flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 border-2 border-[var(--color-signal-cyan)] flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[var(--color-signal-cyan)]" />
                  </div>
                  <h3 className="text-sm font-mono font-bold text-[var(--color-text-raw)] mb-2">WELCOME_TO_EXPRESS</h3>
                  <p className="text-[10px] font-mono text-[var(--color-text-dim)]">Select a suggestion to get started</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

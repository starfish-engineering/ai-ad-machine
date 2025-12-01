'use client';

import { useState, useEffect } from 'react';
import { Search, Star, X, ChevronDown, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAccountTabs, AccountTab } from '@/components/layout/account-tabs-context';
import { createBrowserClient } from '@/lib/supabase/client';
import { useWorkspace } from '@/lib/workspace';
import type { AdAccount } from '@/types/database.types';

const platformConfig: Record<string, { color: string; label: string }> = {
  google_ads: { color: 'var(--color-signal-green)', label: 'G' },
  meta_ads: { color: 'var(--color-signal-cyan)', label: 'M' },
  amazon_ads: { color: 'var(--color-signal-yellow)', label: 'A' },
  microsoft_ads: { color: 'var(--color-signal-magenta)', label: 'MS' },
};

interface AccountSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect?: (account: AccountTab) => void;
}

export function AccountSelector({ open, onClose, onSelect }: AccountSelectorProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [accounts, setAccounts] = useState<AdAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { tabs, addTab, activeTabId } = useAccountTabs();
  const { workspaceId, isLoading: workspaceLoading } = useWorkspace();
  const supabase = createBrowserClient();

  useEffect(() => {
    async function fetchAccounts() {
      if (!workspaceId || !open) return;

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('ad_accounts')
          .select('*')
          .eq('workspace_id', workspaceId)
          .order('is_favorite', { ascending: false })
          .order('name', { ascending: true });

        if (error) throw error;
        setAccounts(data ?? []);
      } catch (err) {
        console.error('Error fetching accounts:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAccounts();
  }, [workspaceId, open, supabase]);

  if (!open) return null;

  const openTabIds = new Set(tabs.map((t) => t.id));

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(search.toLowerCase()) ||
      account.platform_account_id.includes(search);
    const matchesFilter = filter === 'all' || (filter === 'favorites' && account.is_favorite);
    return matchesSearch && matchesFilter;
  });

  const handleSelect = (account: AdAccount) => {
    const tab: AccountTab = {
      id: account.id,
      name: account.name,
      accountId: account.platform_account_id,
      platform: account.platform as 'google' | 'meta' | 'amazon' | 'microsoft',
    };
    addTab(tab);
    onSelect?.(tab);
    onClose();
  };

  const handleToggleFavorite = async (accountId: string, currentFavorite: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Optimistic update
    setAccounts(prev => prev.map(a => 
      a.id === accountId ? { ...a, is_favorite: !currentFavorite } : a
    ));

    const { error } = await supabase
      .from('ad_accounts')
      .update({ is_favorite: !currentFavorite })
      .eq('id', accountId);

    if (error) {
      // Revert on error
      setAccounts(prev => prev.map(a => 
        a.id === accountId ? { ...a, is_favorite: currentFavorite } : a
      ));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] w-full max-w-lg mx-4 shadow-[8px_8px_0_var(--color-void)]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-[var(--color-border-harsh)]">
          <h2 className="text-sm font-mono font-bold text-[var(--color-text-raw)] uppercase tracking-wider">SELECT_ACCOUNT</h2>
          <button
            onClick={onClose}
            className="p-1 border border-[var(--color-border-harsh)] hover:border-[var(--color-signal-red)] hover:text-[var(--color-signal-red)] transition-colors"
          >
            <X className="w-4 h-4 text-[var(--color-text-muted)]" />
          </button>
        </div>

        {/* Search and Filter */}
        <div className="p-4 border-b-2 border-[var(--color-border-harsh)]">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-dim)]" />
              <input
                type="text"
                placeholder="SEARCH_ACCOUNTS..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-surface)] border-2 border-[var(--color-border-harsh)] text-[var(--color-text-raw)] font-mono text-[11px] placeholder:text-[var(--color-text-dim)] focus:outline-none focus:border-[var(--color-signal-green)]"
              />
            </div>
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'favorites')}
                className="appearance-none pl-3 pr-8 py-2.5 bg-[var(--color-surface)] border-2 border-[var(--color-border-harsh)] text-[var(--color-text-raw)] font-mono text-[11px] focus:outline-none focus:border-[var(--color-signal-green)] cursor-pointer"
              >
                <option value="all">ALL</option>
                <option value="favorites">★ FAVORITES</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--color-text-muted)] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Open tabs indicator */}
        {tabs.length > 0 && (
          <div className="px-4 py-2 bg-[var(--color-surface)]/50 border-b border-[var(--color-grid)]">
            <p className="text-[10px] font-mono text-[var(--color-text-dim)]">
              <span className="text-[var(--color-signal-green)]">{tabs.length}</span> ACCOUNT{tabs.length !== 1 ? 'S' : ''} OPEN
            </p>
          </div>
        )}

        {/* Account List */}
        <div className="max-h-80 overflow-y-auto">
          {isLoading || workspaceLoading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-6 h-6 text-[var(--color-signal-green)] animate-spin mx-auto mb-2" />
              <p className="text-[11px] font-mono text-[var(--color-text-muted)]">LOADING_ACCOUNTS...</p>
            </div>
          ) : filteredAccounts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-[11px] font-mono text-[var(--color-text-muted)]">
                {accounts.length === 0 ? 'NO_ACCOUNTS_IN_WORKSPACE' : 'NO_ACCOUNTS_FOUND'}
              </p>
            </div>
          ) : (
            <ul>
              {filteredAccounts.map((account) => {
                // Map platform to expected format
                const platformKey = account.platform.replace('_ads', '') as 'google' | 'meta' | 'amazon' | 'microsoft';
                const platform = platformConfig[account.platform] ?? platformConfig.google_ads;
                const isOpen = openTabIds.has(account.id);
                const isActive = account.id === activeTabId;
                const isFavorite = account.is_favorite ?? false;
                
                return (
                  <li key={account.id} className="border-b border-[var(--color-grid)] last:border-b-0">
                    <button
                      onClick={() => handleSelect(account)}
                      className={cn(
                        'w-full flex items-center justify-between px-4 py-3 transition-colors group',
                        isActive ? 'bg-[var(--color-signal-green)]/10' : isOpen ? 'bg-[var(--color-signal-cyan)]/5' : 'hover:bg-[var(--color-surface)]'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 border-2 flex items-center justify-center"
                          style={{ borderColor: platform.color }}
                        >
                          <span 
                            className="text-[10px] font-mono font-bold"
                            style={{ color: platform.color }}
                          >
                            {platform.label}
                          </span>
                        </div>
                        <div className="text-left">
                          <p className="text-[11px] font-mono font-bold text-[var(--color-text-raw)] group-hover:text-[var(--color-signal-green)] flex items-center gap-2">
                            {account.name}
                            {isOpen && (
                              <span className={cn('inline-flex items-center gap-1 px-1.5 py-0.5 text-[8px] font-mono font-bold border',
                                isActive ? 'border-[var(--color-signal-green)] text-[var(--color-signal-green)]' : 'border-[var(--color-signal-cyan)] text-[var(--color-signal-cyan)]')}>
                                {isActive ? <><Check className="w-2.5 h-2.5" />ACTIVE</> : 'OPEN'}
                              </span>
                            )}
                          </p>
                          <p className="text-[9px] font-mono text-[var(--color-text-dim)]">
                            {account.platform_account_id}
                          </p>
                        </div>
                      </div>
                      <Star
                        onClick={(e) => handleToggleFavorite(account.id, isFavorite, e)}
                        className={cn(
                          'w-4 h-4 transition-colors cursor-pointer',
                          isFavorite
                            ? 'text-[var(--color-signal-yellow)] fill-[var(--color-signal-yellow)]'
                            : 'text-[var(--color-text-dim)] hover:text-[var(--color-signal-yellow)]'
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t-2 border-[var(--color-border-harsh)] flex items-center justify-between">
          <span className="text-[9px] font-mono text-[var(--color-text-dim)]">
            {filteredAccounts.length} ACCOUNTS
          </span>
          <button
            onClick={onClose}
            className="text-[10px] font-mono text-[var(--color-text-muted)] hover:text-[var(--color-signal-green)] transition-colors"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

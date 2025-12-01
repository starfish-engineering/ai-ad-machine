'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Star, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Account {
  id: string;
  name: string;
  accountId: string;
  platform: 'google' | 'meta' | 'amazon' | 'microsoft';
  isFavorite: boolean;
}

// Demo accounts data
const demoAccounts: Account[] = [
  { id: '1', name: 'All American Housing Group', accountId: '966-043-4837', platform: 'google', isFavorite: false },
  { id: '2', name: 'SolidOffers - Aspire', accountId: '304-879-7415', platform: 'google', isFavorite: true },
  { id: '3', name: 'Hillcrest Home Solutions', accountId: '941-877-3186', platform: 'google', isFavorite: true },
  { id: '4', name: 'Titan Home Solutions', accountId: '128-261-8691', platform: 'google', isFavorite: true },
  { id: '5', name: 'Real Estate Rescue', accountId: '818-543-7686', platform: 'google', isFavorite: true },
  { id: '6', name: 'Blue Line Home Solutions', accountId: '607-238-6225', platform: 'google', isFavorite: true },
  { id: '7', name: 'Ironclad Equity Group', accountId: '771-275-8594', platform: 'google', isFavorite: false },
  { id: '8', name: 'JTB Homebuyers', accountId: '813-672-1772', platform: 'google', isFavorite: false },
];

const platformConfig: Record<string, { color: string; label: string }> = {
  google: { color: 'var(--color-signal-green)', label: 'G' },
  meta: { color: 'var(--color-signal-cyan)', label: 'M' },
  amazon: { color: 'var(--color-signal-yellow)', label: 'A' },
  microsoft: { color: 'var(--color-signal-magenta)', label: 'MS' },
};

interface AccountSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect?: (account: Account) => void;
}

export function AccountSelector({ open, onClose, onSelect }: AccountSelectorProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  if (!open) return null;

  const filteredAccounts = demoAccounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(search.toLowerCase()) ||
      account.accountId.includes(search);
    const matchesFilter = filter === 'all' || (filter === 'favorites' && account.isFavorite);
    return matchesSearch && matchesFilter;
  });

  const handleSelect = (account: Account) => {
    onSelect?.(account);
    onClose();
    // Navigate to the account detail page
    router.push(`/dashboard/accounts/${account.id}`);
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

        {/* Account List */}
        <div className="max-h-80 overflow-y-auto">
          {filteredAccounts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-[11px] font-mono text-[var(--color-text-muted)]">NO_ACCOUNTS_FOUND</p>
            </div>
          ) : (
            <ul>
              {filteredAccounts.map((account) => {
                const platform = platformConfig[account.platform];
                return (
                  <li key={account.id} className="border-b border-[var(--color-grid)] last:border-b-0">
                    <button
                      onClick={() => handleSelect(account)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-[var(--color-surface)] transition-colors group"
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
                          <p className="text-[11px] font-mono font-bold text-[var(--color-text-raw)] group-hover:text-[var(--color-signal-green)]">
                            {account.name}
                          </p>
                          <p className="text-[9px] font-mono text-[var(--color-text-dim)]">
                            {account.accountId}
                          </p>
                        </div>
                      </div>
                      <Star
                        className={cn(
                          'w-4 h-4 transition-colors',
                          account.isFavorite
                            ? 'text-[var(--color-signal-yellow)] fill-[var(--color-signal-yellow)]'
                            : 'text-[var(--color-text-dim)]'
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

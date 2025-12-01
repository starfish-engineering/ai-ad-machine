'use client';

import { useState } from 'react';
import { Search, Star, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Account {
  id: string;
  name: string;
  accountId: string;
  platform: 'google' | 'meta' | 'amazon' | 'microsoft';
  isFavorite: boolean;
}

// Mock data - replace with real data from Supabase
const mockAccounts: Account[] = [
  { id: '1', name: 'Titan Home Solutions', accountId: '966-043-4837', platform: 'google', isFavorite: true },
  { id: '2', name: 'Blue Line Home Solutions', accountId: '128-261-8691', platform: 'google', isFavorite: true },
  { id: '3', name: 'Hillcrest Home Solutions', accountId: '941-877-3186', platform: 'google', isFavorite: true },
  { id: '4', name: 'SolidOffers - Aspire', accountId: '304-879-7415', platform: 'google', isFavorite: true },
  { id: '5', name: 'Kingdom Property Relief', accountId: '818-543-7686', platform: 'google', isFavorite: true },
  { id: '6', name: 'Palmetto Purchases', accountId: '607-238-6225', platform: 'google', isFavorite: true },
  { id: '7', name: 'Ricci Estates', accountId: '771-275-8594', platform: 'google', isFavorite: true },
  { id: '8', name: 'K&D Holdings', accountId: '813-672-1772', platform: 'google', isFavorite: true },
];

const platformIcons: Record<string, { bg: string; label: string }> = {
  google: { bg: 'from-green-500 to-emerald-600', label: 'G' },
  meta: { bg: 'from-blue-500 to-blue-600', label: 'M' },
  amazon: { bg: 'from-orange-500 to-orange-600', label: 'A' },
  microsoft: { bg: 'from-cyan-500 to-cyan-600', label: 'MS' },
};

interface AccountSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect?: (account: Account) => void;
}

export function AccountSelector({ open, onClose, onSelect }: AccountSelectorProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  if (!open) return null;

  const filteredAccounts = mockAccounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(search.toLowerCase()) ||
      account.accountId.includes(search);
    const matchesFilter = filter === 'all' || (filter === 'favorites' && account.isFavorite);
    return matchesSearch && matchesFilter;
  });

  const handleSelect = (account: Account) => {
    onSelect?.(account);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Select Account</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search and Filter */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search By Account Name or ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'favorites')}
                className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="all">All Accounts</option>
                <option value="favorites">Favorites</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Account List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredAccounts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No accounts found
            </div>
          ) : (
            <ul>
              {filteredAccounts.map((account, index) => {
                const platform = platformIcons[account.platform];
                return (
                  <li key={account.id}>
                    <button
                      onClick={() => handleSelect(account)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'w-7 h-7 rounded flex items-center justify-center bg-gradient-to-br',
                            platform.bg
                          )}
                        >
                          <span className="text-white text-xs font-bold">{platform.label}</span>
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900">
                            {String(index).padStart(3, '0')} - {account.name} ({account.accountId})
                          </p>
                        </div>
                      </div>
                      <Star
                        className={cn(
                          'w-5 h-5',
                          account.isFavorite
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}


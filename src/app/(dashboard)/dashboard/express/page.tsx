'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button, Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import {
  ChevronDown,
  ChevronRight,
  Check,
  Clock,
  Flame,
  CheckCircle,
  XCircle,
  Pause,
} from 'lucide-react';

// Mock suggestions data
const suggestions = [
  {
    id: '1',
    type: 'Fix Conflicting Negative Keywords',
    account: '021 - Palmetto Purchases',
    accountId: '607-238-6225',
    count: 5,
    items: [
      { negativeKeyword: '"realtor"', source: 'Shared List', keyword: '[best way to sell your house without a realtor]', campaign: 'PPCL - South Carolina', adGroup: 'Without A Realtor (EM)' },
      { negativeKeyword: '"avoid foreclosure"', source: 'Shared List', keyword: '"sell house to avoid foreclosure"', campaign: 'PPCL - South Carolina', adGroup: 'Foreclosure (PM)' },
      { negativeKeyword: '"work"', source: 'Shared List', keyword: '[sell house that needs work]', campaign: 'PPCL - South Carolina', adGroup: 'As-Is (EM)' },
      { negativeKeyword: '[we buy ugly houses]', source: 'Shared List', keyword: '[we buy ugly houses]', campaign: 'PPCL - South Carolina', adGroup: 'We Buy [Ugly] Houses (EM)' },
      { negativeKeyword: '"avoid foreclosure"', source: 'Shared List', keyword: '[avoid foreclosure by selling]', campaign: 'PPCL - South Carolina', adGroup: 'Foreclosure (EM)' },
    ],
  },
  {
    id: '2',
    type: 'Fix Impression Share Lost Due To Budget - Campaign Budget',
    account: '018 - All American Housing Group',
    count: 3,
  },
  {
    id: '3',
    type: 'Fix Impression Share Lost Due To Budget - Campaign Budget',
    account: '025 - Real Estate Rescue',
    count: 2,
  },
  {
    id: '4',
    type: 'Fix Impression Share Lost Due To Budget - Campaign Budget',
    account: '026 - JTB Homebuyers',
    count: 1,
  },
  {
    id: '5',
    type: 'Fix Impression Share Lost Due To Budget - Campaign Budget',
    account: '024 - K&D Holdings',
    count: 2,
  },
  {
    id: '6',
    type: 'Fix Conflicting Negative Keywords',
    account: '024 - K&D Holdings',
    count: 3,
  },
  {
    id: '7',
    type: 'Fix Conflicting Negative Keywords',
    account: '001 - Blue Line Home Solutions',
    count: 4,
  },
  {
    id: '8',
    type: 'Add New Keywords',
    account: '019 - SolidOffers - Aspire',
    count: 12,
  },
];

export default function ExpressOptimizations() {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>('1');
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set([0, 1, 2, 3, 4]));

  const currentSuggestion = suggestions.find((s) => s.id === selectedSuggestion);

  const toggleItem = (index: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedItems(newSelected);
  };

  const toggleAll = () => {
    if (currentSuggestion?.items) {
      if (selectedItems.size === currentSuggestion.items.length) {
        setSelectedItems(new Set());
      } else {
        setSelectedItems(new Set(currentSuggestion.items.map((_, i) => i)));
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AdPilot Express</h1>
          <p className="text-gray-600">
            Get one-click PPC suggestions to optimize different aspects of your campaigns in one place
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="font-medium">1 day streak!</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4" />
            <span><strong>1</strong> Suggestions Reviewed Today</span>
          </div>
          <Button variant="outline">
            Enable Suggestions (1)
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Panel - Suggestions List */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Filters */}
            <div className="p-4 border-b border-gray-200 space-y-3">
              <button className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center text-xs">👥</span>
                  All Accounts
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center text-xs">💡</span>
                  All Suggestion Types
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Suggestions List */}
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => setSelectedSuggestion(suggestion.id)}
                  className={cn(
                    'w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors',
                    selectedSuggestion === suggestion.id && 'bg-blue-50 border-l-4 border-blue-600'
                  )}
                >
                  <p className="text-sm font-medium text-gray-900">{suggestion.type}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-4 h-4 rounded bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">G</span>
                    </div>
                    <span className="text-xs text-gray-500">{suggestion.account}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Suggestion Detail */}
        <div className="col-span-12 lg:col-span-8">
          {selectedSuggestion && currentSuggestion ? (
            <div className="bg-white rounded-lg border border-gray-200">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {currentSuggestion.type}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">G</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {currentSuggestion.account}
                    {currentSuggestion.accountId && ` (${currentSuggestion.accountId})`}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Negative keywords can sometimes conflict with some keywords and restrict the traffic from search queries that match these keywords.{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Read more about how negative conflicts work here
                  </a>.
                </p>
                <div className="flex items-start gap-2 mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs">💡</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Resolve these conflicts in one of two ways: 1. Remove the negative keyword that is conflicting so ads can show for keywords that were being blocked by them 2. Pause keywords if you no longer show ads for them.
                  </p>
                </div>
              </div>

              {/* Table */}
              {currentSuggestion.items && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedItems.size === currentSuggestion.items.length}
                            onChange={toggleAll}
                            className="rounded border-gray-300"
                          />
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {selectedItems.size}/{currentSuggestion.items.length}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Negative Keyword
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Keyword Source
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Keyword
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Campaign
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ad Group
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentSuggestion.items.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedItems.has(index)}
                              onChange={() => toggleItem(index)}
                              className="rounded border-gray-300"
                            />
                          </td>
                          <td className="px-4 py-3"></td>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.negativeKeyword}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{item.source}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.keyword}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{item.campaign}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{item.adGroup}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Actions */}
              <div className="p-4 border-t border-gray-200 flex items-center justify-center gap-3">
                <Button variant="outline" className="gap-2">
                  <Clock className="w-4 h-4" />
                  Snooze
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                  <Pause className="w-4 h-4" />
                  Pause Keywords
                </Button>
                <Button className="bg-pink-600 hover:bg-pink-700 gap-2">
                  <XCircle className="w-4 h-4" />
                  Remove Negative Keywords
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 h-full flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to AdPilot Express</h3>
                <p className="text-gray-500">Select a suggestion from left to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


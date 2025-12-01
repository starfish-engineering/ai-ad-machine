'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Search, Filter, Check, X, Clock, ChevronDown,
  AlertTriangle, Trash2, Pause, MoreHorizontal
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';

// Mock data for negative keyword conflicts
const mockConflicts = [
  {
    id: '1',
    negativeKeyword: 'free',
    negativeSource: 'Campaign: Brand - Exact',
    conflictingKeyword: 'free home evaluation',
    campaign: 'Lead Gen - Broad',
    adGroup: 'Home Services',
    matchType: 'Broad',
    impressions: 1250,
    clicks: 45,
    cost: 89.50,
    selected: false,
  },
  {
    id: '2',
    negativeKeyword: 'cheap',
    negativeSource: 'Shared List: Quality Negatives',
    conflictingKeyword: 'cheap home repairs',
    campaign: 'Lead Gen - Broad',
    adGroup: 'Home Repairs',
    matchType: 'Phrase',
    impressions: 890,
    clicks: 32,
    cost: 64.00,
    selected: false,
  },
  {
    id: '3',
    negativeKeyword: 'diy',
    negativeSource: 'Campaign: Services - Exact',
    conflictingKeyword: 'diy vs professional',
    campaign: 'Comparison',
    adGroup: 'DIY Comparison',
    matchType: 'Exact',
    impressions: 450,
    clicks: 18,
    cost: 36.00,
    selected: false,
  },
  {
    id: '4',
    negativeKeyword: 'job',
    negativeSource: 'Shared List: Hiring Negatives',
    conflictingKeyword: 'roofing job cost',
    campaign: 'Services - Roofing',
    adGroup: 'Roofing Costs',
    matchType: 'Broad',
    impressions: 2100,
    clicks: 78,
    cost: 156.00,
    selected: false,
  },
  {
    id: '5',
    negativeKeyword: 'salary',
    negativeSource: 'Shared List: Hiring Negatives',
    conflictingKeyword: 'contractor salary expectations',
    campaign: 'Services - General',
    adGroup: 'Contractor Info',
    matchType: 'Phrase',
    impressions: 320,
    clicks: 12,
    cost: 24.00,
    selected: false,
  },
];

const suggestionTypes: Record<string, { title: string; description: string }> = {
  'negative-keyword-conflicts': {
    title: 'Resolve Negative Keyword Conflicts',
    description: 'These negative keywords are blocking ads from showing for potentially valuable search queries.',
  },
  'add-keywords': {
    title: 'Add New Keywords',
    description: 'Search queries that are converting but don\'t have dedicated keywords.',
  },
  'pause-keywords': {
    title: 'Pause Underperforming Keywords',
    description: 'Keywords with high spend but no conversions in the last 30 days.',
  },
  'impression-share': {
    title: 'Recover Lost Impression Share',
    description: 'Campaigns losing impression share due to budget or rank.',
  },
};

export default function ExpressDetailPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params);
  const [conflicts, setConflicts] = useState(mockConflicts);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const typeInfo = suggestionTypes[type] || {
    title: 'Express Optimization',
    description: 'Review and apply optimizations.',
  };

  const toggleSelect = (id: string) => {
    setConflicts(conflicts.map(c => 
      c.id === id ? { ...c, selected: !c.selected } : c
    ));
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setConflicts(conflicts.map(c => ({ ...c, selected: !selectAll })));
  };

  const selectedCount = conflicts.filter(c => c.selected).length;

  const filteredConflicts = conflicts.filter(c =>
    c.negativeKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.conflictingKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.campaign.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <Link 
          href="/dashboard/express" 
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Express Optimizations
        </Link>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{typeInfo.title}</h1>
            <p className="text-gray-600 mt-1">{typeInfo.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="warning">{conflicts.length} items</Badge>
          </div>
        </div>
      </div>

      {/* Instructions Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900">How to resolve conflicts</h3>
            <p className="text-sm text-blue-700 mt-1">
              Select the negative keywords you want to modify, then choose an action:
              <strong> Remove</strong> deletes the negative keyword entirely,
              <strong> Pause</strong> keeps it but stops blocking, or
              <strong> Snooze</strong> to review later.
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-gray-200 rounded-t-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {selectedCount > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{selectedCount} selected</span>
              <Button variant="outline" size="sm">
                <Clock className="w-4 h-4 mr-2" />
                Snooze
              </Button>
              <Button variant="outline" size="sm">
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
              <Button variant="primary" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Remove ({selectedCount})
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border-x border-b border-gray-200 rounded-b-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Negative Keyword
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Source
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Conflicting Keyword
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Campaign / Ad Group
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Impr
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Clicks
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Cost
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredConflicts.map((conflict) => (
              <tr 
                key={conflict.id} 
                className={`hover:bg-gray-50 ${conflict.selected ? 'bg-blue-50' : ''}`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={conflict.selected}
                    onChange={() => toggleSelect(conflict.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-sm bg-red-100 text-red-700 px-2 py-1 rounded">
                    -{conflict.negativeKeyword}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {conflict.negativeSource}
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                    {conflict.conflictingKeyword}
                  </span>
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {conflict.matchType}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-gray-900">{conflict.campaign}</div>
                  <div className="text-xs text-gray-500">{conflict.adGroup}</div>
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  {conflict.impressions.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  {conflict.clicks}
                </td>
                <td className="px-4 py-3 text-right text-sm text-gray-600">
                  ${conflict.cost.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-green-600" title="Remove negative">
                      <Check className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-red-600" title="Keep negative">
                      <X className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500" title="More options">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 px-4">
        <p className="text-sm text-gray-500">
          Showing {filteredConflicts.length} of {conflicts.length} conflicts
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}


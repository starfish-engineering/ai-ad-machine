'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { ChevronDown, ChevronRight, Sparkles, Eye, EyeOff } from 'lucide-react';

// Tree node data structure
interface TreeNode {
  id: string;
  label: string;
  value: string;
  change: number;
  children?: TreeNode[];
}

const rootCauseTree: TreeNode = {
  id: 'root',
  label: 'Clicks',
  value: '▼ 53',
  change: -48.62,
  children: [
    {
      id: 'ctr',
      label: 'CTR',
      value: '▲ 0.64',
      change: 14.16,
    },
    {
      id: 'avgcpc',
      label: 'Avg CPC',
      value: '▲ 18.14',
      change: 30.0,
    },
    {
      id: 'impressions',
      label: 'Impressions',
      value: '▼ 1,328',
      change: -55.01,
      children: [
        {
          id: 'est-avg-pos',
          label: 'Est. Avg Pos',
          value: '▼ 0.50',
          change: -23.81,
        },
        {
          id: 'cost',
          label: 'Cost',
          value: '▼ 2,188.09',
          change: -33.20,
        },
        {
          id: 'search-impr-share',
          label: 'Search Impr. Share',
          value: '▲ 3.58',
          change: 13.0,
          children: [
            {
              id: 'search-lost-is-rank',
              label: 'Search Lost IS (Rank)',
              value: '▲ 12.42',
              change: 21.99,
            },
            {
              id: 'search-lost-is-budget',
              label: 'Search Lost IS (Budget)',
              value: '▼ 16',
              change: -100.0,
            },
          ],
        },
        {
          id: 'search-query-volume',
          label: 'Search Query Volume',
          value: '▼ 5,277',
          change: -60.18,
        },
        {
          id: 'display-impr-share',
          label: 'Display Impr. Share',
          value: '▲ ▼ 0',
          change: 0,
        },
        {
          id: 'display-query-volume',
          label: 'Display Query Volume',
          value: '▲ ▼ 0',
          change: 0,
        },
      ],
    },
  ],
};

// Campaigns for the sidebar
const campaigns = [
  { id: '1', name: 'PPCL | MaxCon | Central NC', checked: true },
  { id: '2', name: 'Search Campaign 2/21 (Removed)', checked: true },
  { id: '3', name: 'Titan - Central NC', checked: true },
  { id: '4', name: 'Titan - Central NC #2 (Removed)', checked: true },
  { id: '5', name: 'Titan - Central NC | New Ads (Removed)', checked: true },
];

function TreeNodeComponent({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const isPositive = node.change > 0;
  const isNegative = node.change < 0;
  const isNeutral = node.change === 0;

  return (
    <div className="flex flex-col items-center">
      {/* Node */}
      <div
        className={cn(
          'px-4 py-3 rounded-lg border-2 min-w-[140px] text-center',
          isPositive && 'bg-green-50 border-green-500',
          isNegative && 'bg-red-50 border-red-500',
          isNeutral && 'bg-gray-50 border-gray-300'
        )}
      >
        <p className="text-xs text-gray-500 mb-1">{node.label}</p>
        <p
          className={cn(
            'font-bold',
            isPositive && 'text-green-700',
            isNegative && 'text-red-700',
            isNeutral && 'text-gray-500'
          )}
        >
          {node.value}
        </p>
        <p
          className={cn(
            'text-sm',
            isPositive && 'text-green-600',
            isNegative && 'text-red-600',
            isNeutral && 'text-gray-400'
          )}
        >
          {isPositive && '+'}
          {node.change.toFixed(2)}%
        </p>
      </div>

      {/* Children */}
      {node.children && node.children.length > 0 && (
        <>
          {/* Connector line down */}
          <div className="w-0.5 h-6 bg-gray-300" />

          {/* Horizontal line */}
          <div
            className="h-0.5 bg-gray-300"
            style={{ width: `${Math.min(node.children.length * 160, 800)}px` }}
          />

          {/* Children nodes */}
          <div className="flex gap-4 mt-6">
            {node.children.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                {/* Connector line up to child */}
                <div className="w-0.5 h-6 bg-gray-300 -mt-6" />
                <TreeNodeComponent node={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function PPCInvestigator() {
  const [showIcons, setShowIcons] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('Clicks');
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 Days');
  const [comparedTo, setComparedTo] = useState('Previous Period');

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">PPC Investigator</h1>
        <p className="text-gray-600">
          Understand what's causing your performance metrics (KPIs) to change
        </p>
      </div>

      {/* Query Builder */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-gray-600">Why did</span>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              {selectedMetric}
              <ChevronDown className="w-4 h-4" />
            </button>
            <span className="text-gray-600">change during</span>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              {selectedPeriod}
              <ChevronDown className="w-4 h-4" />
            </button>
            <span className="text-gray-600">compared to</span>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              {comparedTo}
              <ChevronDown className="w-4 h-4" />
            </button>
            <span className="text-gray-500 text-sm">
              2 Oct 2025 (Thu) → 31 Oct 2025 (Fri)
            </span>
            <span className="text-gray-400">?</span>
            <Button className="bg-blue-600 hover:bg-blue-700">UPDATE</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Panel - Filters */}
        <div className="col-span-12 lg:col-span-3">
          <Card>
            <CardContent className="p-4">
              {/* Campaign Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Campaigns</h3>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  {campaigns.map((campaign) => (
                    <label key={campaign.id} className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        defaultChecked={campaign.checked}
                        className="mt-1 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{campaign.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Networks Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Networks</h3>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Devices Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Devices</h3>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Analysis */}
        <div className="col-span-12 lg:col-span-9">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button className="px-4 py-2 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300">
              Cause Chart
            </button>
            <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
              Root Cause Analysis
            </button>
          </div>

          {/* AI Summary */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <h3 className="font-medium text-gray-900">Draper AI Summary</h3>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-4/6 animate-pulse" />
              </div>
            </CardContent>
          </Card>

          {/* Show Icons Toggle */}
          <div className="flex justify-end mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showIcons}
                onChange={() => setShowIcons(!showIcons)}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">Show Icons</span>
            </label>
          </div>

          {/* Tree Chart */}
          <Card>
            <CardContent className="p-8 overflow-x-auto">
              <div className="min-w-[900px] flex justify-center">
                <TreeNodeComponent node={rootCauseTree} />
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <div className="mt-4 flex items-center gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-500" />
              <span className="text-gray-600">Positive Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-100 border-2 border-red-500" />
              <span className="text-gray-600">Negative Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-100 border-2 border-gray-300" />
              <span className="text-gray-600">No Change</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


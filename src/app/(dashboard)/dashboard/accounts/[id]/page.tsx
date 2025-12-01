'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { KPICard } from '@/components/ui/kpi-card';
import { AuditScore } from '@/components/ui/audit-score';
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
} from 'lucide-react';

// Mock data
const kpiData = [
  {
    title: 'Impr',
    value: '1,086',
    change: -55,
    icon: <Eye className="w-4 h-4" />,
    showSparkline: true,
  },
  {
    title: 'Clicks',
    value: '56',
    change: -49,
    icon: <MousePointer className="w-4 h-4" />,
    showSparkline: true,
  },
  {
    title: 'Cost',
    value: '$4,402',
    change: -33,
    icon: <DollarSign className="w-4 h-4" />,
    showSparkline: true,
  },
  {
    title: 'Avg CPC',
    value: '$78.60',
    change: 30,
    icon: <Target className="w-4 h-4" />,
    showSparkline: true,
  },
  {
    title: 'CTR',
    value: '5.2%',
    change: 14,
    icon: <Percent className="w-4 h-4" />,
    showSparkline: true,
  },
  {
    title: 'Conv',
    value: '14',
    change: -25,
    icon: <RotateCcw className="w-4 h-4" />,
    showSparkline: true,
  },
];

const auditCategories = [
  { name: 'Campaigns', score: 100 },
  { name: 'Performance Max', score: null },
  { name: 'Ad Groups', score: 87 },
  { name: 'Responsive Search Ads', score: 68 },
  { name: 'Keywords', score: 0 },
  { name: 'Performance', score: 25 },
];

const expressOptimizations = [
  { name: 'Fix Conflicting Negative Keywords', count: 5 },
  { name: 'Fix Ads with Issues (RSA)', count: 1 },
];

// Chart data for the line graph
const chartData = {
  labels: ['Nov 01', 'Nov 03', 'Nov 05', 'Nov 07', 'Nov 09', 'Nov 11', 'Nov 13', 'Nov 15', 'Nov 17', 'Nov 19', 'Nov 21', 'Nov 23', 'Nov 25', 'Nov 27', 'Nov 29'],
  clicks: [2, 4, 6, 5, 7, 6, 8, 6, 5, 4, 6, 5, 4, 3, 4],
  cost: [85, 170, 255, 200, 280, 230, 340, 250, 200, 170, 255, 210, 180, 130, 180],
};

export default function AccountDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'budget' | 'shopping'>('overview');

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Account Dashboard</h1>
        <p className="text-gray-600">View, monitor and optimize account performance.</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'budget', label: 'Budget' },
            { id: 'shopping', label: 'Shopping' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                'pb-3 text-sm font-medium transition-colors relative',
                activeTab === tab.id
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Badge variant="default">Campaigns Included: Enabled & Paused</Badge>
          <button className="text-blue-600 text-sm hover:text-blue-700">
            More Filters
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            Last 30 Days
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            Traffic View
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
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
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                Performance Metrics
                <Settings className="w-4 h-4 text-gray-400" />
              </h2>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {kpiData.map((kpi) => (
                <KPICard
                  key={kpi.title}
                  label={kpi.title}
                  value={kpi.value}
                  change={kpi.change}
                  icon={kpi.icon}
                  sparkline={kpi.showSparkline}
                />
              ))}
            </div>
          </div>

          {/* Metric Comparison Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Metric Comparison
                  <Sparkles className="w-4 h-4 text-purple-500" />
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      Clicks
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <span className="text-gray-500 text-sm">By</span>
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      Cost
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                  <Badge className="bg-blue-600 text-white">Cost</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Simple SVG chart representation */}
              <div className="h-64 relative">
                <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 50}
                      x2="600"
                      y2={i * 50}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Clicks line (blue) */}
                  <polyline
                    points={chartData.clicks
                      .map((v, i) => `${(i / (chartData.clicks.length - 1)) * 600},${200 - (v / 8) * 200}`)
                      .join(' ')}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  
                  {/* Cost line (red) */}
                  <polyline
                    points={chartData.cost
                      .map((v, i) => `${(i / (chartData.cost.length - 1)) * 600},${200 - (v / 340) * 200}`)
                      .join(' ')}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                  />
                </svg>
                
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                  <span>8</span>
                  <span>6</span>
                  <span>4</span>
                  <span>2</span>
                  <span>0</span>
                </div>
                
                {/* Right Y-axis labels */}
                <div className="absolute right-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                  <span>340</span>
                  <span>255</span>
                  <span>170</span>
                  <span>85</span>
                  <span>0</span>
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-blue-500" />
                  <span className="text-sm text-gray-600">Clicks</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-red-500" />
                  <span className="text-sm text-gray-600">Cost</span>
                </div>
              </div>
              
              {/* X-axis labels */}
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                {chartData.labels.filter((_, i) => i % 2 === 0).map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights Section */}
          <div className="grid grid-cols-2 gap-6">
            {/* Top Elements */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Top Elements</CardTitle>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      Campaigns
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <span className="text-gray-500 text-sm">By</span>
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      Cost
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">PPCL - Central NC - v3</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '100%' }} />
                      </div>
                      <span className="text-sm font-medium">$4,402</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Quality Score */}
            <Card>
              <CardHeader>
                <CardTitle>Account Quality Score</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Quality score data</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Sidekick & Audit */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* AI Sidekick */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                AdPilot Sidekick - AI PPC Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* AI Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
                  <AlertCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span>AI can make mistakes. Please review the summary carefully.</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span>Achieved <strong>159% ROAS</strong>, indicating strong profitability with $1.59 return for every dollar spent.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span>Low <strong>CTR at 5.16%</strong> suggests potential for ad copy or targeting improvements.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span><strong>25% conversion rate</strong> highlights effective funnel; consider scaling successful campaigns.</span>
                  </li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-sm">Tell me three good things about my account</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-sm">Quick Performance Summary</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-sm">Ask a custom query</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="text-center py-6">
              <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">No Blueprints.</p>
              <button className="text-blue-600 text-sm hover:text-blue-700">Set Up Now!</button>
            </Card>
            <Card className="text-center py-6">
              <div className="text-3xl font-bold text-red-500 mb-1">1</div>
              <p className="text-sm text-gray-600">Alert</p>
            </Card>
          </div>

          {/* PPC Audit Score */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  PPC Audit Score
                </CardTitle>
                <Link href="/dashboard/audit" className="text-blue-600 text-sm hover:text-blue-700">
                  View All Audits
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-6">
                <div className="pt-4">
                  <AuditScore score={68} />
                </div>
                <div className="flex-1">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500">
                        <th className="text-left font-medium pb-2">Category</th>
                        <th className="text-right font-medium pb-2">Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {auditCategories.map((cat) => (
                        <tr key={cat.name}>
                          <td className="py-2 text-gray-700">{cat.name}</td>
                          <td className={cn(
                            'py-2 text-right font-medium',
                            cat.score === null ? 'text-gray-400' :
                            cat.score >= 80 ? 'text-green-500' :
                            cat.score >= 60 ? 'text-yellow-500' :
                            cat.score > 0 ? 'text-red-500' :
                            'text-red-500'
                          )}>
                            {cat.score ?? '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button className="mt-4 text-blue-600 text-sm hover:text-blue-700 flex items-center gap-1">
                    View Report
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Express Optimizations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Express Optimizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {expressOptimizations.map((opt) => (
                  <Link
                    key={opt.name}
                    href="/dashboard/express"
                    className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm text-gray-900">
                      {opt.name} ({opt.count})
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


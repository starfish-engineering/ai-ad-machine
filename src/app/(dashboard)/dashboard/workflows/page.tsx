'use client';

import { useState } from 'react';
import { 
  Plus, Play, Pause, Settings, Trash2, Copy, Clock,
  Zap, Filter, Search, ChevronDown, MoreHorizontal,
  CheckCircle2, XCircle, AlertTriangle
} from 'lucide-react';
import { Button, Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

const rules = [
  {
    id: '1',
    name: 'Pause high CPC keywords',
    description: 'Automatically pause keywords when CPC exceeds $100',
    trigger: 'CPC > $100',
    action: 'Pause keyword',
    scope: 'All accounts',
    status: 'active',
    lastRun: '2 hours ago',
    runCount: 156,
    successRate: 98,
  },
  {
    id: '2',
    name: 'Budget pacing alert',
    description: 'Send alert when daily spend exceeds 120% of target',
    trigger: 'Daily spend > 120% target',
    action: 'Send email alert',
    scope: 'All accounts',
    status: 'active',
    lastRun: '30 mins ago',
    runCount: 423,
    successRate: 100,
  },
  {
    id: '3',
    name: 'Enable weekend campaigns',
    description: 'Enable weekend-specific campaigns every Friday at 6PM',
    trigger: 'Schedule: Friday 6PM',
    action: 'Enable campaigns',
    scope: 'Weekend Campaigns',
    status: 'active',
    lastRun: '3 days ago',
    runCount: 52,
    successRate: 100,
  },
  {
    id: '4',
    name: 'Bid adjustment for mobile',
    description: 'Increase mobile bids by 20% when CTR is high',
    trigger: 'Mobile CTR > 5%',
    action: 'Adjust bid +20%',
    scope: 'Search campaigns',
    status: 'paused',
    lastRun: '1 week ago',
    runCount: 89,
    successRate: 95,
  },
  {
    id: '5',
    name: 'Low quality score alert',
    description: 'Alert when keyword quality score drops below 4',
    trigger: 'QS < 4',
    action: 'Send Slack notification',
    scope: 'All accounts',
    status: 'active',
    lastRun: '1 hour ago',
    runCount: 234,
    successRate: 99,
  },
];

const templates = [
  { name: 'Budget Protection', description: 'Pause campaigns when daily budget exceeded', icon: '🛡️' },
  { name: 'Performance Alert', description: 'Get notified on major metric changes', icon: '📊' },
  { name: 'Bid Optimizer', description: 'Automatically adjust bids based on performance', icon: '💰' },
  { name: 'Schedule Manager', description: 'Enable/disable campaigns on a schedule', icon: '⏰' },
  { name: 'Negative Keyword Adder', description: 'Auto-add negatives from search queries', icon: '🚫' },
];

export default function WorkflowsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRules = rules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rule.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rule.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeRules = rules.filter(r => r.status === 'active').length;
  const totalExecutions = rules.reduce((sum, r) => sum + r.runCount, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workflows & Rules</h1>
          <p className="text-gray-600 mt-1">
            Automate routine tasks with powerful rules that run 24/7.
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Rule
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{activeRules}</p>
                <p className="text-sm text-gray-500">Active Rules</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalExecutions.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Total Executions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">24/7</p>
                <p className="text-sm text-gray-500">Monitoring</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">2</p>
                <p className="text-sm text-gray-500">Need Attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Templates */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Quick Start Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {templates.map((template) => (
              <button
                key={template.name}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
              >
                <div className="text-2xl mb-2">{template.icon}</div>
                <div className="font-medium text-gray-900 text-sm">{template.name}</div>
                <div className="text-xs text-gray-500 mt-1">{template.description}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rules List */}
      <Card>
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle>Your Rules</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search rules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <div className="divide-y divide-gray-100">
          {filteredRules.map((rule) => (
            <div key={rule.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    rule.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <Zap className={`w-5 h-5 ${
                      rule.status === 'active' ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{rule.name}</h3>
                      <Badge variant={rule.status === 'active' ? 'success' : 'secondary'}>
                        {rule.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{rule.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="font-medium">When:</span> {rule.trigger}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Then:</span> {rule.action}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Scope:</span> {rule.scope}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <div className="text-gray-900 font-medium">{rule.runCount} runs</div>
                    <div className="text-gray-500">{rule.successRate}% success</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {rule.status === 'active' ? (
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-amber-600">
                        <Pause className="w-4 h-4" />
                      </button>
                    ) : (
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-green-600">
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}


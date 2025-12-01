'use client';

import { useState } from 'react';
import { 
  DollarSign, TrendingUp, TrendingDown, AlertTriangle,
  Calendar, Filter, Download, Settings, ChevronDown
} from 'lucide-react';
import { Button, Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

const accounts = [
  {
    id: '1',
    name: 'All American Housing Group',
    monthlyBudget: 15000,
    spent: 10668.54,
    projected: 13890,
    pacing: 'on-track',
    daysRemaining: 8,
    avgDailySpend: 355.62,
    targetDailySpend: 500,
  },
  {
    id: '2',
    name: 'SolidOffers - Aspire',
    monthlyBudget: 8000,
    spent: 6023.74,
    projected: 9120,
    pacing: 'overspending',
    daysRemaining: 8,
    avgDailySpend: 273.81,
    targetDailySpend: 266.67,
  },
  {
    id: '3',
    name: 'Hillcrest Home Solutions',
    monthlyBudget: 6000,
    spent: 4542.26,
    projected: 5890,
    pacing: 'on-track',
    daysRemaining: 8,
    avgDailySpend: 206.47,
    targetDailySpend: 200,
  },
  {
    id: '4',
    name: 'Titan Home Solutions',
    monthlyBudget: 7500,
    spent: 4401.60,
    projected: 5720,
    pacing: 'underspending',
    daysRemaining: 8,
    avgDailySpend: 200.07,
    targetDailySpend: 250,
  },
  {
    id: '5',
    name: 'Real Estate Rescue',
    monthlyBudget: 5000,
    spent: 3278.98,
    projected: 4260,
    pacing: 'underspending',
    daysRemaining: 8,
    avgDailySpend: 149.04,
    targetDailySpend: 166.67,
  },
];

const getPacingBadge = (pacing: string) => {
  switch (pacing) {
    case 'on-track':
      return <Badge variant="success">On Track</Badge>;
    case 'overspending':
      return <Badge variant="error">Overspending</Badge>;
    case 'underspending':
      return <Badge variant="warning">Underspending</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export default function BudgetMonitoringPage() {
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);

  const totalBudget = accounts.reduce((sum, a) => sum + a.monthlyBudget, 0);
  const totalSpent = accounts.reduce((sum, a) => sum + a.spent, 0);
  const totalProjected = accounts.reduce((sum, a) => sum + a.projected, 0);

  const budgetUtilization = (totalSpent / totalBudget) * 100;
  const daysInMonth = 30;
  const daysPassed = 22;
  const expectedUtilization = (daysPassed / daysInMonth) * 100;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget Monitoring</h1>
          <p className="text-gray-600 mt-1">
            Track spend pacing and budget utilization across all accounts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            November 2025
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalBudget.toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {budgetUtilization.toFixed(1)}% of budget
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Projected EOM</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalProjected.toLocaleString()}
                </p>
                <p className={`text-xs mt-1 ${totalProjected > totalBudget ? 'text-red-600' : 'text-green-600'}`}>
                  {totalProjected > totalBudget ? '+' : ''}
                  ${(totalProjected - totalBudget).toLocaleString()} vs budget
                </p>
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${totalProjected > totalBudget ? 'bg-red-100' : 'bg-green-100'}`}>
                {totalProjected > totalBudget ? (
                  <TrendingUp className="w-5 h-5 text-red-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-green-600" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Days Remaining</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-xs text-gray-500 mt-1">
                  {daysPassed} of {daysInMonth} days passed
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Pacing Bar */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Budget Pacing</span>
            <span className="text-sm text-gray-500">
              Expected: {expectedUtilization.toFixed(0)}% | Actual: {budgetUtilization.toFixed(1)}%
            </span>
          </div>
          <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
            {/* Expected marker */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-gray-400 z-10"
              style={{ left: `${expectedUtilization}%` }}
            />
            {/* Actual progress */}
            <div 
              className={`h-full rounded-full transition-all ${
                budgetUtilization > expectedUtilization + 5 ? 'bg-red-500' :
                budgetUtilization < expectedUtilization - 5 ? 'bg-amber-500' :
                'bg-green-500'
              }`}
              style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>$0</span>
            <span>${(totalBudget / 2).toLocaleString()}</span>
            <span>${totalBudget.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Accounts Table */}
      <Card>
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle>Account Budget Status</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Account
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Monthly Budget
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Spent
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Projected
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Pacing
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Progress
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Avg Daily
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Target Daily
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {accounts.map((account) => {
                const utilization = (account.spent / account.monthlyBudget) * 100;
                return (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900">{account.name}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      ${account.monthlyBudget.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      ${account.spent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className={`px-4 py-3 text-right font-medium ${
                      account.projected > account.monthlyBudget ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      ${account.projected.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {getPacingBadge(account.pacing)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-32">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>{utilization.toFixed(0)}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              account.pacing === 'overspending' ? 'bg-red-500' :
                              account.pacing === 'underspending' ? 'bg-amber-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(utilization, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      ${account.avgDailySpend.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      ${account.targetDailySpend.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Alerts Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget Alerts</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div className="flex-1">
              <p className="font-medium text-red-900">SolidOffers - Aspire is projected to overspend</p>
              <p className="text-sm text-red-700">
                At current pace, this account will spend $9,120 vs $8,000 budget (14% over).
              </p>
            </div>
            <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
              Adjust Budget
            </Button>
          </div>
          <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <div className="flex-1">
              <p className="font-medium text-amber-900">Titan Home Solutions is underpacing</p>
              <p className="text-sm text-amber-700">
                This account is spending 20% less than target. Consider increasing bids or budget allocation.
              </p>
            </div>
            <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
              View Suggestions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


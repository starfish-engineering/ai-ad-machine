import { Badge, Button } from '@/components/ui';
import { ChevronDown, Search, Columns, Pencil, Trash2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock alert data
const alerts = [
  {
    id: '1',
    account: 'All Accounts',
    accountIcon: null,
    alertType: 'Anomaly - Impressions',
    alertLevel: 'All Google accounts',
    targetValue: 'Automatic',
    deviationAllowed: '-',
    alertOwner: '-',
    trackingStatus: null,
    usersNotified: 'Account owner + Others',
  },
  {
    id: '2',
    account: 'All Accounts',
    accountIcon: null,
    alertType: 'Anomaly - Clicks',
    alertLevel: 'All Google accounts',
    targetValue: 'Automatic',
    deviationAllowed: '-',
    alertOwner: '-',
    trackingStatus: null,
    usersNotified: 'Account owner + Others',
  },
  {
    id: '3',
    account: 'All Accounts',
    accountIcon: null,
    alertType: 'Anomaly - Cost',
    alertLevel: 'All Google accounts',
    targetValue: 'Automatic',
    deviationAllowed: '-',
    alertOwner: '-',
    trackingStatus: null,
    usersNotified: 'Account owner + Others',
  },
  {
    id: '4',
    account: 'Titan Home Solutions',
    accountId: '966-043-4837',
    alertType: 'KPI - ROAS',
    alertLevel: 'Account',
    targetValue: 'Automatic',
    deviationAllowed: '25',
    alertOwner: '-',
    trackingStatus: {
      status: 'triggered',
      currentValue: '170%',
      targetValue: '642%',
      lastUpdated: '4 hours ago',
    },
    usersNotified: 'Jered Russell',
  },
  {
    id: '5',
    account: 'Hillcrest Home Solutions',
    accountId: '941-877-3186',
    alertType: 'KPI - ROAS',
    alertLevel: 'Account',
    targetValue: 'Automatic',
    deviationAllowed: '25',
    alertOwner: '-',
    trackingStatus: {
      status: 'on_track',
      currentValue: '200%',
      targetValue: '106%',
      lastUpdated: '4 hours ago',
    },
    usersNotified: 'Jered Russell',
  },
  {
    id: '6',
    account: 'Kingdom Property Relief',
    accountId: '818-543-7686',
    alertType: 'KPI - ROAS',
    alertLevel: 'Account',
    targetValue: 'Automatic',
    deviationAllowed: '25',
    alertOwner: '-',
    trackingStatus: {
      status: 'triggered',
      currentValue: '145%',
      targetValue: '244%',
      lastUpdated: '4 hours ago',
    },
    usersNotified: 'Jered Russell',
  },
  {
    id: '7',
    account: 'K&D Holdings',
    accountId: '813-672-1772',
    alertType: 'KPI - ROAS',
    alertLevel: 'Account',
    targetValue: 'Automatic',
    deviationAllowed: '25',
    alertOwner: '-',
    trackingStatus: {
      status: 'triggered',
      currentValue: '242%',
      targetValue: '634%',
      lastUpdated: '4 hours ago',
    },
    usersNotified: 'Jered Russell',
  },
  {
    id: '8',
    account: 'Ricci Estates',
    accountId: '771-275-8594',
    alertType: 'KPI - ROAS',
    alertLevel: 'Account',
    targetValue: 'Automatic',
    deviationAllowed: '25',
    alertOwner: '-',
    trackingStatus: {
      status: 'triggered',
      currentValue: '179%',
      targetValue: '200%',
      lastUpdated: '4 hours ago',
    },
    usersNotified: 'Jered Russell',
  },
];

export default function AlertsManagement() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alert Settings</h1>
          <p className="text-gray-600">
            Set up and review configuration of alerts for Key Performance Indicators, budgets and product feeds.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-pink-600 hover:bg-pink-700">
            Create New KPI Alert
          </Button>
          <Button className="bg-pink-600 hover:bg-pink-700">
            Create New Budget Alert
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Integrations
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Platforms</label>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              All Platforms
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Account & Portfolios</label>
            <button className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm hover:bg-blue-100">
              All Accounts & Portfolios
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Alert Type</label>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              All Types
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Levels</label>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              All Levels
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Status</label>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              All Statuses
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="ml-auto">
            <label className="block text-xs text-gray-500 mb-1">&nbsp;</label>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex items-center justify-end gap-2 mb-4">
        <Button variant="outline" size="sm">
          <Pencil className="w-4 h-4 mr-2" />
          Bulk Actions
        </Button>
        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Columns className="w-4 h-4" />
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alert Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alert Level
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target Value
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deviation Allowed
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alert Owner
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tracking Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users Notified
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {alerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {alert.accountId ? (
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">G</span>
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded bg-gray-200 flex items-center justify-center">
                          <Settings className="w-3 h-3 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{alert.account}</p>
                        {alert.accountId && (
                          <p className="text-xs text-gray-500">({alert.accountId})</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {alert.alertType}
                    {alert.alertType.includes('Anomaly') && (
                      <span className="ml-1 text-gray-400 cursor-help">ⓘ</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{alert.alertLevel}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{alert.targetValue}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{alert.deviationAllowed}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{alert.alertOwner}</td>
                  <td className="px-4 py-4">
                    {alert.trackingStatus ? (
                      <div>
                        <p className={cn(
                          'text-sm font-medium',
                          alert.trackingStatus.status === 'triggered' ? 'text-red-600' : 'text-green-600'
                        )}>
                          {alert.trackingStatus.status === 'triggered' ? 'Alert Triggered' : 'On Track'}
                        </p>
                        <p className="text-xs text-gray-500">
                          Current Value: {alert.trackingStatus.currentValue}
                        </p>
                        <p className="text-xs text-gray-500">
                          Target Value: {alert.trackingStatus.targetValue}
                        </p>
                        <p className="text-xs text-gray-400">
                          Last Updated: {alert.trackingStatus.lastUpdated}
                        </p>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{alert.usersNotified}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                        <Pencil className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


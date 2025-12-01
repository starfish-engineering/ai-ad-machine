import Link from 'next/link';
import { Badge } from '@/components/ui';
import {
  Star,
  ChevronDown,
  Download,
  Filter,
  Columns,
  ExternalLink,
  MoreVertical,
  Activity,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for the All Accounts Dashboard
const accounts = [
  {
    id: '1',
    name: 'All American Housing Group',
    isFavorite: false,
    health: 'good' as const,
    suggestions: 2,
    auditScore: 71,
    alerts: 0,
    tasks: 0,
    budget: null,
    cost: 10668.54,
    impressions: 15909,
    clicks: 336,
    avgCpc: 31.75,
    qualityScore: 4.2,
    conversions: 15,
    costPerConv: 711.24,
    roas: null,
  },
  {
    id: '2',
    name: 'SolidOffers - Aspire',
    isFavorite: true,
    health: 'good' as const,
    suggestions: 4,
    auditScore: 66,
    alerts: 0,
    tasks: 0,
    budget: null,
    cost: 6023.74,
    impressions: 2293,
    clicks: 126,
    avgCpc: 47.81,
    qualityScore: 5.8,
    conversions: 30,
    costPerConv: 200.79,
    roas: 2.4,
  },
  {
    id: '3',
    name: 'Hillcrest Home Solutions',
    isFavorite: true,
    health: 'good' as const,
    suggestions: 3,
    auditScore: 62,
    alerts: 0,
    tasks: 0,
    budget: null,
    cost: 4542.26,
    impressions: 749,
    clicks: 62,
    avgCpc: 73.26,
    qualityScore: 5.9,
    conversions: 17,
    costPerConv: 267.19,
    roas: 1.8,
  },
  {
    id: '4',
    name: 'Titan Home Solutions',
    isFavorite: true,
    health: 'warning' as const,
    suggestions: 2,
    auditScore: 68,
    alerts: 1,
    tasks: 0,
    budget: null,
    cost: 4401.60,
    impressions: 1086,
    clicks: 56,
    avgCpc: 78.60,
    qualityScore: 5.8,
    conversions: 14,
    costPerConv: 314.40,
    roas: 1.5,
  },
  {
    id: '5',
    name: 'Real Estate Rescue',
    isFavorite: true,
    health: 'good' as const,
    suggestions: 2,
    auditScore: 66,
    alerts: 0,
    tasks: 0,
    budget: null,
    cost: 3278.98,
    impressions: 1292,
    clicks: 79,
    avgCpc: 41.51,
    qualityScore: 6.0,
    conversions: 9,
    costPerConv: 364.33,
    roas: 1.3,
  },
  {
    id: '6',
    name: 'Blue Line Home Solutions',
    isFavorite: true,
    health: 'good' as const,
    suggestions: 3,
    auditScore: 65,
    alerts: 0,
    tasks: 0,
    budget: null,
    cost: 2997.61,
    impressions: 1312,
    clicks: 69,
    avgCpc: 43.44,
    qualityScore: 4.4,
    conversions: 13,
    costPerConv: 230.59,
    roas: 2.1,
  },
  {
    id: '7',
    name: 'Ironclad Equity Group',
    isFavorite: false,
    health: 'good' as const,
    suggestions: 3,
    auditScore: 61,
    alerts: 0,
    tasks: 0,
    budget: null,
    cost: 2806.05,
    impressions: 6006,
    clicks: 203,
    avgCpc: 13.82,
    qualityScore: 6.0,
    conversions: 9,
    costPerConv: 311.78,
    roas: 1.0,
  },
  {
    id: '8',
    name: 'JTB Homebuyers',
    isFavorite: false,
    health: 'bad' as const,
    suggestions: 3,
    auditScore: 64,
    alerts: 2,
    tasks: 0,
    budget: null,
    cost: 2791.84,
    impressions: 1794,
    clicks: 76,
    avgCpc: 36.73,
    qualityScore: 6.0,
    conversions: 6,
    costPerConv: 465.31,
    roas: 1.0,
  },
];

const healthColors = {
  good: 'var(--color-signal-green)',
  warning: 'var(--color-signal-yellow)',
  bad: 'var(--color-signal-red)',
};

const healthLabels = {
  good: 'NOMINAL',
  warning: 'CAUTION',
  bad: 'CRITICAL',
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export default function AllAccountsDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-display text-2xl text-[var(--color-text-raw)]">ALL_ACCOUNTS_DASHBOARD</h1>
              <Badge variant="signal" size="sm">
                <Activity className="w-3 h-3 mr-1" />
                LIVE
              </Badge>
            </div>
            <p className="text-xs font-mono text-[var(--color-text-muted)]">
              &gt; GET_AN_OVERVIEW_OF_LINKED_ACCOUNTS_PERFORMANCE_WITH_RECOMMENDED_OPTIMIZATIONS
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 text-[10px] font-mono text-[var(--color-text-muted)] border border-[var(--color-border-harsh)] hover:border-[var(--color-signal-green)] transition-colors">
              VIEW_BY_PORTFOLIO
              <div className="w-8 h-4 bg-[var(--color-surface)] border border-[var(--color-border-harsh)] relative">
                <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-[var(--color-text-dim)]" />
              </div>
            </button>
            <button className="px-4 py-2 bg-[var(--color-signal-green)] text-[var(--color-void)] text-[10px] font-mono font-bold hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-shadow">
              LINK_ACCOUNTS
            </button>
          </div>
        </div>

        {/* Success Banner */}
        <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-metric-positive)] px-4 py-3 flex items-center justify-between">
          <p className="text-[11px] font-mono text-[var(--color-metric-positive)]">
            <TrendingUp className="w-4 h-4 inline mr-2" />
            <span className="font-bold">SUCCESS:</span> You have saved over{' '}
            <span className="font-bold text-[var(--color-text-raw)]">10_HOURS</span> using AdPilot's tools this week!
          </p>
          <button className="text-[var(--color-metric-positive)] hover:text-[var(--color-text-raw)] transition-colors font-mono">×</button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Scope */}
            <div>
              <label className="block text-[8px] font-mono text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">SCOPE</label>
              <button className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)] hover:border-[var(--color-signal-green)]">
                <span>ALL_ACCOUNTS</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-[8px] font-mono text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">DATE_RANGE</label>
              <button className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)] hover:border-[var(--color-signal-green)]">
                <span>LAST_30_DAYS</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Compare With */}
            <div>
              <label className="block text-[8px] font-mono text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">COMPARE</label>
              <button className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)] hover:border-[var(--color-signal-green)]">
                <span>NONE</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Filter button */}
            <div>
              <label className="block text-[8px] font-mono text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">&nbsp;</label>
              <button className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)]">
                <Filter className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-[9px] font-mono text-[var(--color-text-dim)]">
              1_NOV_2025 → 30_NOV_2025
            </p>
          </div>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <label className="block text-[8px] font-mono text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">VIEW</label>
          <button className="flex items-center gap-2 px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-surface)] text-[10px] font-mono text-[var(--color-text-raw)] hover:border-[var(--color-signal-green)]">
            <span>SYSTEM_DEFAULT</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="SEARCH_ACCOUNTS..."
              className="pl-3 pr-10 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] text-[10px] font-mono text-[var(--color-text-raw)] w-48 focus:outline-none focus:border-[var(--color-signal-green)] placeholder:text-[var(--color-text-dim)]"
            />
          </div>
          <button className="p-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)]">
            <ExternalLink className="w-3 h-3" />
          </button>
          <button className="p-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)]">
            <Download className="w-3 h-3" />
          </button>
          <button className="p-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)]">
            <Columns className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--color-surface)] border-b-2 border-[var(--color-border-harsh)]">
                <th className="px-4 py-3 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider w-8">
                  <input type="checkbox" className="border-[var(--color-border-harsh)] bg-[var(--color-terminal)]" />
                </th>
                <th className="px-4 py-3 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                  ACCOUNT_NAME
                </th>
                <th className="px-4 py-3 text-center text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                  HEALTH
                </th>
                <th className="px-4 py-3 text-center text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                  SUGGEST
                </th>
                <th className="px-4 py-3 text-center text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                  AUDIT
                </th>
                <th className="px-4 py-3 text-center text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                  ALERTS
                </th>
                <th className="px-4 py-3 text-right text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                  COST ↓
                </th>
                <th className="px-4 py-3 text-right text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                  IMPR
                </th>
                <th className="px-4 py-3 text-right text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                  CLICKS
                </th>
                <th className="px-4 py-3 text-right text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                  CPC
                </th>
                <th className="px-4 py-3 text-right text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                  CONV
                </th>
                <th className="px-4 py-3 text-right text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                  CPA
                </th>
                <th className="px-4 py-3 text-right text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                  ROAS
                </th>
                <th className="px-4 py-3 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id} className="border-b border-[var(--color-grid)] hover:bg-[var(--color-surface)] transition-colors">
                  <td className="px-4 py-4">
                    <Star
                      className={cn(
                        'w-3 h-3 cursor-pointer transition-colors',
                        account.isFavorite
                          ? 'text-[var(--color-signal-yellow)] fill-[var(--color-signal-yellow)]'
                          : 'text-[var(--color-text-dim)] hover:text-[var(--color-signal-yellow)]'
                      )}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      href={`/dashboard/accounts/${account.id}`}
                      className="text-[11px] font-mono font-bold text-[var(--color-text-raw)] hover:text-[var(--color-signal-green)] transition-colors"
                    >
                      {account.name}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span
                        className="w-2 h-2"
                        style={{ backgroundColor: healthColors[account.health] }}
                      />
                      <span className="text-[8px] font-mono" style={{ color: healthColors[account.health] }}>
                        {healthLabels[account.health]}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-[11px] font-mono text-[var(--color-signal-cyan)]">
                      {account.suggestions}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={cn(
                      'text-[11px] font-mono font-bold',
                      account.auditScore >= 70 ? 'text-[var(--color-metric-positive)]' :
                      account.auditScore >= 50 ? 'text-[var(--color-signal-yellow)]' :
                      'text-[var(--color-signal-red)]'
                    )}>
                      {account.auditScore}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {account.alerts > 0 ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[var(--color-signal-red)]">
                        <AlertTriangle className="w-3 h-3" />
                        {account.alerts}
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[var(--color-text-dim)]">0</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right text-[11px] font-mono text-[var(--color-text-raw)]">
                    {formatCurrency(account.cost)}
                  </td>
                  <td className="px-4 py-4 text-right text-[11px] font-mono text-[var(--color-text-muted)]">
                    {formatNumber(account.impressions)}
                  </td>
                  <td className="px-4 py-4 text-right text-[11px] font-mono text-[var(--color-text-muted)]">
                    {formatNumber(account.clicks)}
                  </td>
                  <td className="px-4 py-4 text-right text-[11px] font-mono text-[var(--color-text-muted)]">
                    {formatCurrency(account.avgCpc)}
                  </td>
                  <td className="px-4 py-4 text-right text-[11px] font-mono text-[var(--color-text-raw)]">
                    {account.conversions}
                  </td>
                  <td className="px-4 py-4 text-right text-[11px] font-mono text-[var(--color-text-muted)]">
                    {formatCurrency(account.costPerConv)}
                  </td>
                  <td className={cn(
                    'px-4 py-4 text-right text-[11px] font-mono font-bold',
                    account.roas && account.roas >= 2 ? 'text-[var(--color-metric-positive)] bg-[var(--color-metric-positive)]/10' :
                    account.roas && account.roas >= 1.5 ? 'text-[var(--color-signal-yellow)] bg-[var(--color-signal-yellow)]/10' :
                    account.roas ? 'text-[var(--color-signal-red)] bg-[var(--color-signal-red)]/10' : 'text-[var(--color-text-dim)]'
                  )}>
                    {account.roas ? `${account.roas.toFixed(1)}x` : '—'}
                  </td>
                  <td className="px-4 py-4">
                    <button className="p-1 text-[var(--color-text-dim)] hover:text-[var(--color-text-raw)] transition-colors">
                      <MoreVertical className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t-2 border-[var(--color-border-harsh)] flex items-center justify-between bg-[var(--color-surface)]">
          <p className="text-[9px] font-mono text-[var(--color-text-dim)]">
            SHOWING 1-{accounts.length} OF {accounts.length} ACCOUNTS
          </p>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 border border-[var(--color-border-harsh)] text-[var(--color-text-dim)] text-[10px] font-mono disabled:opacity-50" disabled>
              ‹ PREV
            </button>
            <span className="px-3 py-1 bg-[var(--color-signal-green)] text-[var(--color-void)] text-[10px] font-mono font-bold">1</span>
            <button className="px-2 py-1 border border-[var(--color-border-harsh)] text-[var(--color-text-dim)] text-[10px] font-mono disabled:opacity-50" disabled>
              NEXT ›
            </button>
            <select className="ml-4 text-[9px] font-mono border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] text-[var(--color-text-muted)] px-2 py-1">
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span className="text-[9px] font-mono text-[var(--color-text-dim)]">PER_PAGE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

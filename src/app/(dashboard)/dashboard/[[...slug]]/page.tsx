'use client';

import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui';
import { 
  PerformanceChart, 
  SpendBreakdownChart, 
  PlatformDistributionChart,
  MetricComparisonChart,
  Sparkline 
} from '@/components/charts';
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  MousePointer,
  Eye,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  BarChart3,
  PieChart,
  Activity,
  Bell,
  Shield,
  Workflow,
  FileText,
  Settings,
  ShoppingCart,
  Search,
  Layers,
} from 'lucide-react';

// Section-specific content configurations
const sectionConfigs: Record<string, {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  metrics: Array<{ label: string; value: string; change: string; positive: boolean }>;
  showPerformanceChart?: boolean;
  showSpendChart?: boolean;
  showDistributionChart?: boolean;
  showMetricComparison?: boolean;
  alerts?: Array<{ type: 'warning' | 'success' | 'info'; message: string }>;
  actions?: Array<{ label: string; count: number }>;
}> = {
  'overview': {
    title: 'DASHBOARD_OVERVIEW',
    description: 'Real-time snapshot of your advertising performance across all platforms.',
    icon: BarChart3,
    metrics: [
      { label: 'TOTAL_SPEND', value: '$47,842', change: '+12.4%', positive: true },
      { label: 'CONVERSIONS', value: '1,847', change: '+8.2%', positive: true },
      { label: 'ROAS', value: '3.2x', change: '+0.4x', positive: true },
      { label: 'CTR', value: '4.8%', change: '-0.3%', positive: false },
    ],
    showPerformanceChart: true,
    showDistributionChart: true,
    alerts: [
      { type: 'success', message: 'Campaign "Summer Sale" exceeded ROAS target by 40%' },
      { type: 'warning', message: '2 campaigns approaching budget limit' },
    ],
  },
  'budget': {
    title: 'BUDGET_DASHBOARD',
    description: 'Track and manage your advertising budgets across all campaigns.',
    icon: DollarSign,
    metrics: [
      { label: 'TOTAL_BUDGET', value: '$150,000', change: 'Monthly', positive: true },
      { label: 'SPENT_MTD', value: '$47,842', change: '31.9%', positive: true },
      { label: 'REMAINING', value: '$102,158', change: '68.1%', positive: true },
      { label: 'DAILY_AVG', value: '$1,595', change: 'On track', positive: true },
    ],
    showSpendChart: true,
    showPerformanceChart: true,
    alerts: [
      { type: 'warning', message: 'Campaign "Brand Awareness" at 85% of budget' },
      { type: 'info', message: 'Budget pacing is optimal for this point in month' },
    ],
  },
  'alerts/triggered': {
    title: 'TRIGGERED_ALERTS',
    description: 'Review and manage alerts that have been triggered across your accounts.',
    icon: Bell,
    metrics: [
      { label: 'ACTIVE_ALERTS', value: '7', change: '+2 today', positive: false },
      { label: 'RESOLVED_TODAY', value: '12', change: '+5', positive: true },
      { label: 'AVG_RESPONSE', value: '2.4h', change: '-0.5h', positive: true },
      { label: 'CRITICAL', value: '1', change: 'Needs action', positive: false },
    ],
    alerts: [
      { type: 'warning', message: 'CPC increased by 25% in "Search - Brand" campaign' },
      { type: 'warning', message: 'CTR dropped below threshold in "Display - Remarketing"' },
      { type: 'success', message: 'Budget alert resolved: "Holiday Campaign"' },
    ],
    actions: [
      { label: 'Acknowledge', count: 3 },
      { label: 'Investigate', count: 2 },
      { label: 'Auto-resolve', count: 2 },
    ],
  },
  'monitor/kpi': {
    title: 'KPI_MONITORING',
    description: 'Set up and track custom KPIs across all your campaigns.',
    icon: Target,
    metrics: [
      { label: 'KPIS_TRACKED', value: '24', change: 'Active', positive: true },
      { label: 'MEETING_TARGET', value: '18', change: '75%', positive: true },
      { label: 'BELOW_TARGET', value: '4', change: 'Attention', positive: false },
      { label: 'ABOVE_TARGET', value: '2', change: 'Exceeding', positive: true },
    ],
    showMetricComparison: true,
    showPerformanceChart: true,
  },
  'monitor/anomaly': {
    title: 'ANOMALY_DETECTOR',
    description: 'AI-powered detection of unusual patterns in your campaign data.',
    icon: Activity,
    metrics: [
      { label: 'ANOMALIES_DETECTED', value: '3', change: 'Last 24h', positive: false },
      { label: 'FALSE_POSITIVES', value: '2%', change: '-1%', positive: true },
      { label: 'AVG_DETECTION', value: '4.2m', change: 'Response time', positive: true },
      { label: 'PATTERNS_LEARNED', value: '847', change: '+12 today', positive: true },
    ],
    showPerformanceChart: true,
    alerts: [
      { type: 'warning', message: 'Unusual spike in impressions detected (Campaign: Search - Generic)' },
      { type: 'info', message: 'New spending pattern identified - analyzing...' },
    ],
  },
  'monitor/projection': {
    title: 'SPEND_PROJECTION',
    description: 'Forecast your advertising spend and performance metrics.',
    icon: TrendingUp,
    metrics: [
      { label: 'PROJECTED_SPEND', value: '$142,500', change: 'This month', positive: true },
      { label: 'CONFIDENCE', value: '94%', change: 'High accuracy', positive: true },
      { label: 'PROJECTED_ROAS', value: '3.4x', change: '+0.2x', positive: true },
      { label: 'VARIANCE', value: '±$4,200', change: '2.9%', positive: true },
    ],
    showPerformanceChart: true,
    showSpendChart: true,
  },
  'audit': {
    title: 'PPC_AUDIT',
    description: 'Comprehensive audit of your PPC accounts with actionable recommendations.',
    icon: Shield,
    metrics: [
      { label: 'AUDIT_SCORE', value: '72', change: '+5 pts', positive: true },
      { label: 'ISSUES_FOUND', value: '23', change: '12 critical', positive: false },
      { label: 'QUICK_WINS', value: '8', change: 'Est. +$4,200', positive: true },
      { label: 'LAST_AUDIT', value: '2d ago', change: 'Schedule next', positive: true },
    ],
    showMetricComparison: true,
    actions: [
      { label: 'Fix Now', count: 8 },
      { label: 'Review', count: 10 },
      { label: 'Dismiss', count: 5 },
    ],
  },
  'insights': {
    title: 'ACCOUNT_INSIGHTS',
    description: 'AI-generated insights about your account performance.',
    icon: Zap,
    metrics: [
      { label: 'NEW_INSIGHTS', value: '12', change: 'This week', positive: true },
      { label: 'IMPLEMENTED', value: '34', change: 'Total', positive: true },
      { label: 'EST_SAVINGS', value: '$8,400', change: 'Monthly', positive: true },
      { label: 'ACCURACY', value: '89%', change: '+3%', positive: true },
    ],
    showPerformanceChart: true,
    showDistributionChart: true,
  },
  'optimize/queries': {
    title: 'SEARCH_QUERIES',
    description: 'Analyze and optimize search query performance.',
    icon: Search,
    metrics: [
      { label: 'QUERIES_ANALYZED', value: '12,847', change: 'Last 30d', positive: true },
      { label: 'NEGATIVE_CANDIDATES', value: '234', change: 'Est. save $1,200', positive: true },
      { label: 'KEYWORD_OPPORTUNITIES', value: '56', change: 'High volume', positive: true },
      { label: 'WASTED_SPEND', value: '$3,420', change: 'Identified', positive: false },
    ],
    showSpendChart: true,
    actions: [
      { label: 'Add Negatives', count: 234 },
      { label: 'Add Keywords', count: 56 },
      { label: 'Review', count: 142 },
    ],
  },
  'optimize/keywords': {
    title: 'KEYWORD_OPTIMIZATION',
    description: 'Manage and optimize keywords across your campaigns.',
    icon: Layers,
    metrics: [
      { label: 'TOTAL_KEYWORDS', value: '4,847', change: 'Active', positive: true },
      { label: 'LOW_QS', value: '324', change: 'Needs attention', positive: false },
      { label: 'HIGH_PERFORMERS', value: '892', change: 'Top 20%', positive: true },
      { label: 'PAUSED', value: '1,247', change: 'Review monthly', positive: true },
    ],
    showMetricComparison: true,
    showPerformanceChart: true,
  },
  'optimize/ads': {
    title: 'ADS_&_CREATIVES',
    description: 'Manage and optimize your ad copy and creatives.',
    icon: FileText,
    metrics: [
      { label: 'ACTIVE_ADS', value: '847', change: 'Running', positive: true },
      { label: 'TOP_PERFORMERS', value: '124', change: 'Above avg CTR', positive: true },
      { label: 'NEEDS_REVIEW', value: '56', change: 'Low engagement', positive: false },
      { label: 'A/B_TESTS', value: '12', change: 'Running', positive: true },
    ],
    showPerformanceChart: true,
  },
  'optimize/bidding': {
    title: 'BIDDING_OPTIMIZATION',
    description: 'Smart bidding strategies and bid adjustments.',
    icon: TrendingUp,
    metrics: [
      { label: 'AVG_CPC', value: '$2.84', change: '-$0.32', positive: true },
      { label: 'BID_ADJUSTMENTS', value: '47', change: 'Active rules', positive: true },
      { label: 'AUTO_BIDS', value: '89%', change: 'Campaigns', positive: true },
      { label: 'SAVINGS', value: '$4,200', change: 'This month', positive: true },
    ],
    showSpendChart: true,
    showPerformanceChart: true,
  },
  'optimize/budgets': {
    title: 'BUDGET_OPTIMIZATION',
    description: 'Optimize budget allocation across campaigns.',
    icon: DollarSign,
    metrics: [
      { label: 'BUDGET_EFFICIENCY', value: '94%', change: '+3%', positive: true },
      { label: 'REALLOCATED', value: '$12,400', change: 'This month', positive: true },
      { label: 'SHARED_BUDGETS', value: '8', change: 'Active', positive: true },
      { label: 'PACING_ISSUES', value: '2', change: 'Needs review', positive: false },
    ],
    showSpendChart: true,
    showDistributionChart: true,
  },
  'shopping/feed': {
    title: 'PRODUCT_FEED',
    description: 'Manage your product feed and attributes.',
    icon: ShoppingCart,
    metrics: [
      { label: 'PRODUCTS', value: '4,847', change: 'In feed', positive: true },
      { label: 'APPROVED', value: '4,623', change: '95.4%', positive: true },
      { label: 'DISAPPROVED', value: '124', change: 'Fix required', positive: false },
      { label: 'PENDING', value: '100', change: 'Processing', positive: true },
    ],
    showDistributionChart: true,
  },
  'shopping/campaigns': {
    title: 'SHOPPING_CAMPAIGNS',
    description: 'Optimize shopping and Performance Max campaigns.',
    icon: ShoppingCart,
    metrics: [
      { label: 'CAMPAIGNS', value: '24', change: 'Active', positive: true },
      { label: 'PMAX_ROAS', value: '4.2x', change: '+0.6x', positive: true },
      { label: 'STANDARD_ROAS', value: '3.1x', change: '+0.2x', positive: true },
      { label: 'PRODUCTS_SHOWN', value: '3,247', change: 'Last 30d', positive: true },
    ],
    showPerformanceChart: true,
    showSpendChart: true,
  },
  'workflows/rules': {
    title: 'RULE_ENGINE',
    description: 'Create automated rules for campaign management.',
    icon: Workflow,
    metrics: [
      { label: 'ACTIVE_RULES', value: '47', change: 'Running', positive: true },
      { label: 'EXECUTIONS_TODAY', value: '234', change: 'Successful', positive: true },
      { label: 'ACTIONS_TAKEN', value: '89', change: 'Automated', positive: true },
      { label: 'ERRORS', value: '2', change: 'Review needed', positive: false },
    ],
    actions: [
      { label: 'Create Rule', count: 0 },
      { label: 'Edit Rules', count: 47 },
      { label: 'View History', count: 234 },
    ],
  },
  'reports/builder': {
    title: 'REPORT_BUILDER',
    description: 'Build custom reports with drag-and-drop.',
    icon: FileText,
    metrics: [
      { label: 'SAVED_REPORTS', value: '24', change: 'Custom', positive: true },
      { label: 'SCHEDULED', value: '12', change: 'Auto-send', positive: true },
      { label: 'LAST_GENERATED', value: '2h ago', change: 'On schedule', positive: true },
      { label: 'RECIPIENTS', value: '18', change: 'Active', positive: true },
    ],
    showPerformanceChart: true,
    showDistributionChart: true,
  },
};

// Default config for unknown sections
const defaultConfig = {
  title: 'MODULE_STATUS',
  description: 'This module is being configured for your account.',
  icon: Settings,
  metrics: [
    { label: 'STATUS', value: 'ACTIVE', change: 'Online', positive: true },
    { label: 'LAST_SYNC', value: '2m ago', change: 'Real-time', positive: true },
    { label: 'DATA_POINTS', value: '1.2M', change: '+24k today', positive: true },
    { label: 'UPTIME', value: '99.9%', change: '30d avg', positive: true },
  ],
  showPerformanceChart: true,
};

export default function DynamicDashboardPage() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const section = segments.slice(1).join('/');
  
  const config = sectionConfigs[section] || defaultConfig;
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[var(--color-surface)] border-2 border-[var(--color-border-harsh)] flex items-center justify-center">
              <Icon className="w-5 h-5 text-[var(--color-signal-green)]" />
            </div>
            <div>
              <h1 className="font-display text-2xl text-[var(--color-text-raw)]">{config.title}</h1>
              <p className="text-[10px] font-mono text-[var(--color-text-muted)]">
                {config.description}
              </p>
            </div>
          </div>
        </div>
        <Badge variant="signal" size="sm">
          <Activity className="w-3 h-3 mr-1" />
          LIVE
        </Badge>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {config.metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-4 relative"
          >
            <div className="text-[9px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
              {metric.label}
            </div>
            <div className="font-display text-2xl text-[var(--color-text-raw)] mb-1">
              {metric.value}
            </div>
            <div className={`text-[10px] font-mono flex items-center gap-1 ${
              metric.positive ? 'text-[var(--color-metric-positive)]' : 'text-[var(--color-metric-negative)]'
            }`}>
              {metric.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {metric.change}
            </div>
            <div className="absolute top-2 right-2">
              <Sparkline 
                color={metric.positive ? 'var(--color-metric-positive)' : 'var(--color-metric-negative)'} 
                width={60} 
                height={20} 
              />
            </div>
          </div>
        ))}
      </div>

      {/* Alerts Section */}
      {config.alerts && config.alerts.length > 0 && (
        <div className="space-y-2">
          {config.alerts.map((alert, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 border-2 ${
                alert.type === 'warning' 
                  ? 'bg-[var(--color-signal-yellow)]/10 border-[var(--color-signal-yellow)]' 
                  : alert.type === 'success'
                  ? 'bg-[var(--color-metric-positive)]/10 border-[var(--color-metric-positive)]'
                  : 'bg-[var(--color-signal-cyan)]/10 border-[var(--color-signal-cyan)]'
              }`}
            >
              {alert.type === 'warning' ? (
                <AlertTriangle className="w-4 h-4 text-[var(--color-signal-yellow)]" />
              ) : alert.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-[var(--color-metric-positive)]" />
              ) : (
                <Clock className="w-4 h-4 text-[var(--color-signal-cyan)]" />
              )}
              <span className="text-[11px] font-mono text-[var(--color-text-raw)]">{alert.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      {config.actions && (
        <div className="flex flex-wrap gap-3">
          {config.actions.map((action) => (
            <button
              key={action.label}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-surface)] border-2 border-[var(--color-border-harsh)] text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-text-raw)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)] transition-colors"
            >
              {action.label}
              {action.count > 0 && (
                <span className="px-1.5 py-0.5 bg-[var(--color-signal-green)] text-[var(--color-void)] text-[8px]">
                  {action.count}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {config.showPerformanceChart && <PerformanceChart height={250} />}
        {config.showSpendChart && <SpendBreakdownChart height={250} />}
        {config.showDistributionChart && <PlatformDistributionChart height={250} />}
        {config.showMetricComparison && <MetricComparisonChart height={200} />}
      </div>

      {/* Data Table Preview */}
      <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)]">
        <div className="px-4 py-3 border-b-2 border-[var(--color-border-harsh)] flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
            RECENT_ACTIVITY
          </span>
          <button className="text-[9px] font-mono text-[var(--color-signal-green)] hover:text-[var(--color-text-raw)]">
            VIEW_ALL →
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--color-surface)]">
              <th className="px-4 py-2 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                TIMESTAMP
              </th>
              <th className="px-4 py-2 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                EVENT
              </th>
              <th className="px-4 py-2 text-left text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                DETAILS
              </th>
              <th className="px-4 py-2 text-right text-[8px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { time: '2m ago', event: 'Rule executed', details: 'Pause low performers', status: 'success' },
              { time: '15m ago', event: 'Budget adjusted', details: 'Campaign: Search - Brand', status: 'success' },
              { time: '1h ago', event: 'Alert triggered', details: 'CPC threshold exceeded', status: 'warning' },
              { time: '2h ago', event: 'Report generated', details: 'Weekly performance', status: 'success' },
              { time: '3h ago', event: 'Sync completed', details: 'Google Ads data', status: 'success' },
            ].map((row, index) => (
              <tr key={index} className="border-t border-[var(--color-grid)] hover:bg-[var(--color-surface)]">
                <td className="px-4 py-3 text-[10px] font-mono text-[var(--color-text-dim)]">{row.time}</td>
                <td className="px-4 py-3 text-[10px] font-mono text-[var(--color-text-raw)]">{row.event}</td>
                <td className="px-4 py-3 text-[10px] font-mono text-[var(--color-text-muted)]">{row.details}</td>
                <td className="px-4 py-3 text-right">
                  <span className={`text-[8px] font-mono font-bold uppercase ${
                    row.status === 'success' ? 'text-[var(--color-metric-positive)]' : 'text-[var(--color-signal-yellow)]'
                  }`}>
                    {row.status === 'success' ? '● OK' : '● ALERT'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

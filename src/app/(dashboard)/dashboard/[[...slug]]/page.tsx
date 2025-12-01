'use client';

import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui';
import { 
  Construction, 
  ArrowLeft, 
  Clock, 
  Sparkles,
  Monitor,
  FileSearch,
  Settings,
  ShoppingBag,
  Workflow,
  FileText,
  Wrench
} from 'lucide-react';
import Link from 'next/link';

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  monitor: Monitor,
  audit: FileSearch,
  insights: FileSearch,
  optimize: Settings,
  shopping: ShoppingBag,
  workflows: Workflow,
  reports: FileText,
  utilities: Wrench,
};

const sectionDescriptions: Record<string, string> = {
  overview: 'Get a comprehensive view of all your campaign metrics and KPIs in one place.',
  budget: 'Track and manage your advertising budgets across all platforms.',
  shopping: 'Optimize your shopping campaigns and product feeds.',
  'alerts/triggered': 'View all triggered alerts and take action on issues.',
  'monitor/kpi': 'Set up custom KPI tracking and monitoring dashboards.',
  'monitor/anomaly': 'AI-powered anomaly detection for your campaigns.',
  'monitor/projection': 'Forecast your spend and performance metrics.',
  audit: 'Run comprehensive PPC audits on your accounts.',
  insights: 'Get AI-generated insights about your account performance.',
  'optimize/queries': 'Analyze and optimize your search query performance.',
  'optimize/keywords': 'Manage keywords, negatives, and match types.',
  'optimize/ads': 'Create and optimize ad copy and creatives.',
  'optimize/bidding': 'Smart bidding strategies and bid adjustments.',
  'optimize/budgets': 'Optimize budget allocation across campaigns.',
  'optimize/placements': 'Manage and optimize ad placements.',
  'shopping/feed': 'Manage your product feed and attributes.',
  'shopping/campaigns': 'Optimize shopping and Performance Max campaigns.',
  'shopping/inventory': 'Sync inventory and manage stock levels.',
  'workflows/rules': 'Create automated rules for campaign management.',
  'workflows/scheduled': 'Schedule recurring optimization tasks.',
  'workflows/history': 'View history of all automated actions.',
  'reports/builder': 'Build custom reports with drag-and-drop.',
  'reports/scheduled': 'Schedule automated report delivery.',
  'reports/templates': 'Use and customize report templates.',
  'utilities/scripts': 'Create and manage custom scripts.',
  'utilities/bulk': 'Bulk edit campaigns, ads, and keywords.',
  'utilities/export': 'Export data in various formats.',
};

export default function CatchAllDashboardPage() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const section = segments.slice(1).join('/');
  const pageName = segments[segments.length - 1] || 'page';
  
  const Icon = sectionIcons[segments[1]] || Construction;
  const description = sectionDescriptions[section] || 'This feature is currently under development.';

  // Format page name for display
  const displayName = pageName
    .replace(/-/g, '_')
    .toUpperCase();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="max-w-lg text-center">
        {/* Icon */}
        <div className="relative w-20 h-20 mx-auto mb-6 border-2 border-[var(--color-border-harsh)] bg-[var(--color-surface)] flex items-center justify-center">
          <Icon className="w-10 h-10 text-[var(--color-signal-cyan)]" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--color-signal-yellow)] flex items-center justify-center">
            <Construction className="w-3 h-3 text-[var(--color-void)]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl text-[var(--color-text-raw)] mb-2">
          {displayName}
        </h1>
        
        {/* Badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Badge variant="warning" size="sm">
            <Clock className="w-3 h-3 mr-1" />
            COMING_SOON
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm font-mono text-[var(--color-text-muted)] mb-8 leading-relaxed">
          {description}
        </p>

        {/* Features Preview */}
        <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-6 mb-8 text-left">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[var(--color-signal-green)]" />
            <span className="text-[10px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
              PLANNED_FEATURES
            </span>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-[11px] font-mono text-[var(--color-text-dim)]">
              <span className="w-1.5 h-1.5 bg-[var(--color-signal-green)]" />
              Real-time data synchronization
            </li>
            <li className="flex items-center gap-2 text-[11px] font-mono text-[var(--color-text-dim)]">
              <span className="w-1.5 h-1.5 bg-[var(--color-signal-green)]" />
              AI-powered recommendations
            </li>
            <li className="flex items-center gap-2 text-[11px] font-mono text-[var(--color-text-dim)]">
              <span className="w-1.5 h-1.5 bg-[var(--color-signal-green)]" />
              One-click optimizations
            </li>
            <li className="flex items-center gap-2 text-[11px] font-mono text-[var(--color-text-dim)]">
              <span className="w-1.5 h-1.5 bg-[var(--color-signal-green)]" />
              Custom automation rules
            </li>
          </ul>
        </div>

        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-[11px] font-mono text-[var(--color-signal-green)] hover:text-[var(--color-text-raw)] transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          BACK_TO_DASHBOARD
        </Link>
      </div>
    </div>
  );
}


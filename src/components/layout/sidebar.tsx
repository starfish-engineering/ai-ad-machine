'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Monitor,
  FileSearch,
  Settings,
  ShoppingBag,
  Workflow,
  FileText,
  Wrench,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  Terminal,
  Activity,
} from 'lucide-react';

interface NavItem {
  name: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: { name: string; href: string; badge?: string }[];
  badge?: string;
}

const navigation: NavItem[] = [
  {
    name: 'ACCOUNTS',
    href: '/dashboard',
    icon: Users,
  },
  {
    name: 'DASHBOARD',
    icon: LayoutDashboard,
    children: [
      { name: 'Overview', href: '/dashboard/overview' },
      { name: 'Budget', href: '/dashboard/budget' },
      { name: 'Shopping', href: '/dashboard/shopping' },
    ],
  },
  {
    name: 'MONITOR',
    icon: Monitor,
    children: [
      { name: 'Alerts Settings', href: '/dashboard/alerts' },
      { name: 'Triggered Alerts', href: '/dashboard/alerts/triggered' },
      { name: 'KPI Monitoring', href: '/dashboard/monitor/kpi', badge: 'NEW' },
      { name: 'Anomaly Detector', href: '/dashboard/monitor/anomaly' },
      { name: 'Budget Monitoring', href: '/dashboard/monitor/budget' },
      { name: 'Spend Projection', href: '/dashboard/monitor/projection' },
    ],
  },
  {
    name: 'AUDITS',
    icon: FileSearch,
    children: [
      { name: 'PPC Audit', href: '/dashboard/audit' },
      { name: 'Account Insights', href: '/dashboard/insights' },
      { name: 'PPC Investigator', href: '/dashboard/investigator' },
    ],
  },
  {
    name: 'OPTIMIZE',
    icon: Settings,
    children: [
      { name: 'Express Mode', href: '/dashboard/express', badge: 'HOT' },
      { name: 'Search Queries', href: '/dashboard/optimize/queries' },
      { name: 'Keywords', href: '/dashboard/optimize/keywords' },
      { name: 'Ads & Creatives', href: '/dashboard/optimize/ads' },
      { name: 'Bidding', href: '/dashboard/optimize/bidding' },
      { name: 'Budgets', href: '/dashboard/optimize/budgets' },
      { name: 'Placements', href: '/dashboard/optimize/placements' },
    ],
  },
  {
    name: 'SHOPPING',
    icon: ShoppingBag,
    children: [
      { name: 'Product Feed', href: '/dashboard/shopping/feed' },
      { name: 'Shopping Campaigns', href: '/dashboard/shopping/campaigns' },
      { name: 'Inventory Sync', href: '/dashboard/shopping/inventory' },
    ],
  },
  {
    name: 'WORKFLOWS',
    icon: Workflow,
    children: [
      { name: 'Rule Engine', href: '/dashboard/workflows/rules' },
      { name: 'Scheduled Tasks', href: '/dashboard/workflows/scheduled' },
      { name: 'Automation History', href: '/dashboard/workflows/history' },
    ],
  },
  {
    name: 'REPORTS',
    icon: FileText,
    children: [
      { name: 'Report Builder', href: '/dashboard/reports/builder' },
      { name: 'Scheduled Reports', href: '/dashboard/reports/scheduled' },
      { name: 'Templates', href: '/dashboard/reports/templates' },
    ],
  },
  {
    name: 'UTILITIES',
    icon: Wrench,
    children: [
      { name: 'Scripts', href: '/dashboard/utilities/scripts' },
      { name: 'Bulk Operations', href: '/dashboard/utilities/bulk' },
      { name: 'Data Export', href: '/dashboard/utilities/export' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['MONITOR', 'OPTIMIZE']);

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (item: NavItem) => {
    if (item.href) return isActive(item.href);
    return item.children?.some((child) => pathname.startsWith(child.href));
  };

  return (
    <aside
      className={cn(
        'h-screen bg-[var(--color-terminal)] border-r-2 border-[var(--color-border-harsh)] transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b-2 border-[var(--color-border-harsh)]">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 border-2 border-[var(--color-text-raw)] flex items-center justify-center bg-[var(--color-void)] group-hover:border-[var(--color-signal-green)] transition-colors">
              <Terminal className="w-4 h-4 text-[var(--color-signal-green)]" />
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[var(--color-signal-green)] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm tracking-wider text-[var(--color-text-raw)]">ADPILOT</span>
              <span className="text-[7px] font-mono text-[var(--color-text-dim)]">DASHBOARD_v2.0</span>
            </div>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 border border-[var(--color-border-harsh)] text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)] transition-colors"
        >
          {collapsed ? (
            <PanelLeft className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              {item.href ? (
                // Direct link item
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 transition-colors font-mono text-[11px] tracking-wider',
                    isActive(item.href)
                      ? 'bg-[var(--color-signal-green)] text-[var(--color-void)] border-l-2 border-[var(--color-text-raw)]'
                      : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-signal-green)] border-l-2 border-transparent'
                  )}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && <span className="font-bold">{item.name}</span>}
                </Link>
              ) : (
                // Expandable item
                <>
                  <button
                    onClick={() => toggleExpanded(item.name)}
                    className={cn(
                      'flex items-center justify-between w-full px-3 py-2.5 transition-colors font-mono text-[11px] tracking-wider',
                      isParentActive(item)
                        ? 'bg-[var(--color-surface)] text-[var(--color-text-raw)] border-l-2 border-[var(--color-signal-green)]'
                        : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-raw)] border-l-2 border-transparent'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && <span className="font-bold">{item.name}</span>}
                    </div>
                    {!collapsed && (
                      <ChevronRight
                        className={cn(
                          'w-3 h-3 transition-transform',
                          expandedItems.includes(item.name) && 'rotate-90'
                        )}
                      />
                    )}
                  </button>
                  {!collapsed && expandedItems.includes(item.name) && item.children && (
                    <ul className="mt-1 ml-4 border-l border-[var(--color-grid)] space-y-0.5">
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <Link
                            href={child.href}
                            className={cn(
                              'flex items-center justify-between px-4 py-2 text-[10px] font-mono transition-colors',
                              isActive(child.href)
                                ? 'bg-[var(--color-signal-green)]/20 text-[var(--color-signal-green)] border-l border-[var(--color-signal-green)]'
                                : 'text-[var(--color-text-dim)] hover:text-[var(--color-text-raw)] hover:bg-[var(--color-surface)]'
                            )}
                          >
                            <span>▸ {child.name}</span>
                            {child.badge && (
                              <span className={cn(
                                'text-[8px] px-1.5 py-0.5 border font-bold',
                                child.badge === 'NEW' && 'border-[var(--color-metric-positive)] text-[var(--color-metric-positive)]',
                                child.badge === 'HOT' && 'border-[var(--color-signal-red)] text-[var(--color-signal-red)]'
                              )}>
                                {child.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Status indicator */}
      {!collapsed && (
        <div className="p-4 border-t-2 border-[var(--color-border-harsh)]">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-3 h-3 text-[var(--color-signal-green)]" />
            <span className="text-[9px] font-mono text-[var(--color-text-muted)]">SYSTEM_STATUS</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[9px] font-mono">
              <span className="text-[var(--color-text-dim)]">API</span>
              <span className="text-[var(--color-signal-green)]">ONLINE</span>
            </div>
            <div className="flex items-center justify-between text-[9px] font-mono">
              <span className="text-[var(--color-text-dim)]">SYNC</span>
              <span className="text-[var(--color-signal-cyan)]">ACTIVE</span>
            </div>
          </div>
        </div>
      )}

      {/* User section */}
      {!collapsed && (
        <div className="p-4 border-t border-[var(--color-border-harsh)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[var(--color-surface)] border border-[var(--color-border-harsh)] flex items-center justify-center">
              <span className="text-[10px] font-mono font-bold text-[var(--color-signal-green)]">JR</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono font-bold text-[var(--color-text-raw)] truncate">USER_NAME</p>
              <p className="text-[8px] font-mono text-[var(--color-text-dim)] truncate">user@example.com</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

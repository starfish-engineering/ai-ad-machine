'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Search, HelpCircle, Settings, ChevronDown, Cpu, X, ExternalLink } from 'lucide-react';
import { Button, ThemeToggleCompact } from '@/components/ui';
import { AccountSelector } from '@/components/features/account-selector';
import { AccountTabs } from './account-tabs';
import { useActiveAccount } from './account-tabs-context';

// Sample notifications
const notifications = [
  { id: 1, type: 'alert', message: 'CPC increased 25% in "Search - Brand"', time: '5m ago', read: false },
  { id: 2, type: 'success', message: 'Budget optimization completed', time: '1h ago', read: false },
  { id: 3, type: 'info', message: 'Weekly report ready to download', time: '2h ago', read: true },
];

export function DashboardHeader() {
  const activeAccount = useActiveAccount();
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false);
      setShowUserMenu(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-20 bg-[var(--color-void)]/95 backdrop-blur-sm border-b-2 border-[var(--color-border-harsh)]">
        <div className="flex items-center justify-between h-14 px-4 lg:px-6 pl-14 lg:pl-6">
          {/* Account Selector */}
          <button
            onClick={() => setShowAccountSelector(true)}
            className="flex items-center gap-3 px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] hover:border-[var(--color-signal-green)] transition-colors"
          >
            <div className="w-6 h-6 bg-[var(--color-surface)] border border-[var(--color-signal-green)] flex items-center justify-center">
              <span className="text-[var(--color-signal-green)] text-[9px] font-mono font-bold">
                {activeAccount ? activeAccount.platform.charAt(0).toUpperCase() : 'G'}
              </span>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-[11px] font-mono font-bold text-[var(--color-text-raw)]">
                {activeAccount?.name || 'SELECT_ACCOUNT'}
              </p>
              {activeAccount?.accountId && (
                <p className="text-[9px] font-mono text-[var(--color-text-dim)]">{activeAccount.accountId}</p>
              )}
            </div>
            <ChevronDown className="w-3 h-3 text-[var(--color-text-muted)]" />
          </button>

          {/* Center - Status */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-[9px] font-mono">
              <span className="w-1.5 h-1.5 bg-[var(--color-signal-green)] animate-pulse rounded-full" />
              <span className="text-[var(--color-text-muted)]">SYNC_ACTIVE</span>
            </div>
            <div className="text-[10px] font-mono text-[var(--color-text-dim)]">
              {currentTime} UTC
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Link href="/dashboard/sidekick">
              <Button variant="signal" size="sm" className="gap-2">
                <Cpu className="w-3 h-3" />
                <span className="hidden sm:inline text-[10px]">SIDEKICK</span>
              </Button>
            </Link>

            {/* Notifications */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="relative p-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] hover:border-[var(--color-signal-green)] transition-colors"
              >
                <Bell className="w-4 h-4 text-[var(--color-text-muted)]" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-signal-red)] flex items-center justify-center text-[8px] font-mono text-[var(--color-void)] font-bold">
                  {notifications.filter(n => !n.read).length}
                </span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] shadow-lg z-50">
                  <div className="px-4 py-3 border-b-2 border-[var(--color-border-harsh)] flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[var(--color-text-raw)] uppercase">NOTIFICATIONS</span>
                    <Link href="/dashboard/alerts/triggered" className="text-[9px] font-mono text-[var(--color-signal-green)] hover:underline">
                      VIEW_ALL
                    </Link>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`px-4 py-3 border-b border-[var(--color-grid)] hover:bg-[var(--color-surface)] cursor-pointer ${!notification.read ? 'bg-[var(--color-surface)]/50' : ''}`}
                      >
                        <div className="flex items-start gap-2">
                          <span className={`w-1.5 h-1.5 mt-1.5 rounded-full ${
                            notification.type === 'alert' ? 'bg-[var(--color-signal-red)]' :
                            notification.type === 'success' ? 'bg-[var(--color-signal-green)]' :
                            'bg-[var(--color-signal-cyan)]'
                          }`} />
                          <div className="flex-1">
                            <p className="text-[11px] font-mono text-[var(--color-text-raw)]">{notification.message}</p>
                            <p className="text-[9px] font-mono text-[var(--color-text-dim)]">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => setShowSearch(true)}
              className="p-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] hover:border-[var(--color-signal-green)] transition-colors"
            >
              <Search className="w-4 h-4 text-[var(--color-text-muted)]" />
            </button>

            <Link 
              href="/docs"
              className="p-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] hover:border-[var(--color-signal-cyan)] transition-colors hidden sm:flex items-center justify-center"
            >
              <HelpCircle className="w-4 h-4 text-[var(--color-text-muted)]" />
            </Link>

            <ThemeToggleCompact className="hidden sm:flex" />

            <Link 
              href="/dashboard/settings"
              className="p-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] hover:border-[var(--color-signal-yellow)] transition-colors hidden sm:flex items-center justify-center"
            >
              <Settings className="w-4 h-4 text-[var(--color-text-muted)]" />
            </Link>

            {/* User menu */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="w-8 h-8 bg-[var(--color-surface)] border border-[var(--color-border-harsh)] flex items-center justify-center hover:border-[var(--color-signal-green)] transition-colors"
              >
                <span className="text-[10px] font-mono font-bold text-[var(--color-signal-green)]">DU</span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] shadow-lg z-50">
                  <div className="px-4 py-3 border-b-2 border-[var(--color-border-harsh)]">
                    <p className="text-[11px] font-mono font-bold text-[var(--color-text-raw)]">DEMO_USER</p>
                    <p className="text-[9px] font-mono text-[var(--color-text-dim)]">demo@adpilot.ai</p>
                  </div>
                  <div className="py-1">
                    <Link href="/dashboard/profile" className="block px-4 py-2 text-[11px] font-mono text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-signal-green)]">
                      ▸ Profile
                    </Link>
                    <Link href="/dashboard/settings" className="block px-4 py-2 text-[11px] font-mono text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-signal-green)]">
                      ▸ Settings
                    </Link>
                    <Link href="/dashboard/billing" className="block px-4 py-2 text-[11px] font-mono text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-signal-green)]">
                      ▸ Billing
                    </Link>
                    <div className="border-t border-[var(--color-grid)] mt-1 pt-1">
                      <Link href="/login" className="block px-4 py-2 text-[11px] font-mono text-[var(--color-signal-red)] hover:bg-[var(--color-surface)]">
                        ▸ Sign Out
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Account Tabs Bar */}
        <AccountTabs onAddAccount={() => setShowAccountSelector(true)} />
      </header>

      <AccountSelector open={showAccountSelector} onClose={() => setShowAccountSelector(false)} />

      {showSearch && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSearch(false)} />
          <div className="relative bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] w-full max-w-xl mx-4 shadow-[8px_8px_0_var(--color-void)]">
            <div className="flex items-center gap-3 p-4 border-b-2 border-[var(--color-border-harsh)]">
              <Search className="w-5 h-5 text-[var(--color-signal-green)]" />
              <input
                type="text"
                placeholder="Search accounts, campaigns, reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent text-[var(--color-text-raw)] font-mono text-sm placeholder:text-[var(--color-text-dim)] focus:outline-none"
              />
              <button onClick={() => setShowSearch(false)}>
                <X className="w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-text-raw)]" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider mb-3">QUICK_LINKS</p>
              <div className="space-y-1">
                {[
                  { href: '/dashboard', label: 'All Accounts Dashboard' },
                  { href: '/dashboard/express', label: 'Express Optimizations' },
                  { href: '/dashboard/alerts', label: 'Alert Settings' },
                  { href: '/dashboard/reports/builder', label: 'Report Builder' },
                ].map(link => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    onClick={() => setShowSearch(false)}
                    className="flex items-center gap-2 px-3 py-2 text-[11px] font-mono text-[var(--color-text-raw)] hover:bg-[var(--color-surface)] transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 text-[var(--color-signal-green)]" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

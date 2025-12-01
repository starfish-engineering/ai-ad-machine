'use client';

import { useState, useEffect } from 'react';
import { Bell, Search, HelpCircle, Settings, ChevronDown, Cpu, Activity } from 'lucide-react';
import { Button, Badge, ThemeToggleCompact } from '@/components/ui';
import { AccountSelector } from '@/components/features/account-selector';

interface DashboardHeaderProps {
  accountName?: string;
  accountId?: string;
}

export function DashboardHeader({ accountName, accountId }: DashboardHeaderProps) {
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

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

  return (
    <>
      <header className="sticky top-0 z-30 bg-[var(--color-void)] border-b-2 border-[var(--color-border-harsh)]">
        <div className="flex items-center justify-between h-14 px-6">
          {/* Account Selector */}
          <button
            onClick={() => setShowAccountSelector(true)}
            className="flex items-center gap-3 px-3 py-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] hover:border-[var(--color-signal-green)] transition-colors"
          >
            <div className="w-6 h-6 bg-[var(--color-surface)] border border-[var(--color-signal-green)] flex items-center justify-center">
              <span className="text-[var(--color-signal-green)] text-[9px] font-mono font-bold">G</span>
            </div>
            <div className="text-left">
              <p className="text-[11px] font-mono font-bold text-[var(--color-text-raw)]">
                {accountName || 'SELECT_ACCOUNT'}
              </p>
              {accountId && (
                <p className="text-[9px] font-mono text-[var(--color-text-dim)]">{accountId}</p>
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
            {/* AI Sidekick button */}
            <Button variant="signal" size="sm" className="gap-2">
              <Cpu className="w-3 h-3" />
              <span className="hidden sm:inline text-[10px]">SIDEKICK_5.0</span>
            </Button>

            {/* Notifications */}
            <button className="relative p-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] hover:border-[var(--color-signal-green)] transition-colors">
              <Bell className="w-4 h-4 text-[var(--color-text-muted)]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-signal-red)] flex items-center justify-center text-[8px] font-mono text-[var(--color-void)] font-bold">3</span>
            </button>

            {/* Search */}
            <button className="p-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] hover:border-[var(--color-signal-green)] transition-colors">
              <Search className="w-4 h-4 text-[var(--color-text-muted)]" />
            </button>

            {/* Help */}
            <button className="p-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] hover:border-[var(--color-signal-cyan)] transition-colors hidden sm:block">
              <HelpCircle className="w-4 h-4 text-[var(--color-text-muted)]" />
            </button>

            {/* Theme Toggle */}
            <ThemeToggleCompact className="hidden sm:flex" />

            {/* Settings */}
            <button className="p-2 border border-[var(--color-border-harsh)] bg-[var(--color-terminal)] hover:border-[var(--color-signal-yellow)] transition-colors hidden sm:block">
              <Settings className="w-4 h-4 text-[var(--color-text-muted)]" />
            </button>

            {/* User avatar */}
            <button className="w-8 h-8 bg-[var(--color-surface)] border border-[var(--color-border-harsh)] flex items-center justify-center hover:border-[var(--color-signal-green)] transition-colors">
              <span className="text-[10px] font-mono font-bold text-[var(--color-signal-green)]">JR</span>
            </button>
          </div>
        </div>
      </header>

      {/* Account Selector Modal */}
      <AccountSelector
        open={showAccountSelector}
        onClose={() => setShowAccountSelector(false)}
      />
    </>
  );
}

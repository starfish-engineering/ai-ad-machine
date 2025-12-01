'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('system');
    } else {
      setTheme('dark');
    }
  };

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="w-4 h-4" />;
    }
    return resolvedTheme === 'dark' ? (
      <Moon className="w-4 h-4" />
    ) : (
      <Sun className="w-4 h-4" />
    );
  };

  const getLabel = () => {
    if (theme === 'system') return 'SYSTEM';
    return theme === 'dark' ? 'DARK' : 'LIGHT';
  };

  return (
    <button
      onClick={cycleTheme}
      className={cn(
        'flex items-center gap-2 px-3 py-2',
        'text-[10px] font-mono font-bold uppercase tracking-wider',
        'border-2 border-[var(--color-border-harsh)]',
        'bg-[var(--color-surface)] text-[var(--color-text-raw)]',
        'hover:border-[var(--color-signal-cyan)] hover:text-[var(--color-signal-cyan)]',
        'transition-all duration-150',
        'active:translate-x-[2px] active:translate-y-[2px]',
        className
      )}
      title={`Current: ${theme} mode. Click to cycle themes.`}
    >
      {getIcon()}
      {showLabel && <span>{getLabel()}</span>}
    </button>
  );
}

// Compact version for tight spaces
export function ThemeToggleCompact({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'w-8 h-8 flex items-center justify-center',
        'border-2 border-[var(--color-border-harsh)]',
        'bg-[var(--color-surface)] text-[var(--color-text-raw)]',
        'hover:border-[var(--color-signal-cyan)] hover:text-[var(--color-signal-cyan)]',
        'transition-all duration-150',
        className
      )}
      title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}


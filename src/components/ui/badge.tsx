import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'primary' | 'signal' | 'pulse';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'default', size = 'md', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        // Base brutalist badge styles
        'inline-flex items-center font-mono font-bold uppercase tracking-wider border-2',
        
        // Size styles
        size === 'sm' && 'px-2 py-0.5 text-[8px]',
        size === 'md' && 'px-3 py-1 text-[10px]',
        
        // Variant styles
        variant === 'default' && 'bg-[var(--color-surface)] text-[var(--color-text-raw)] border-[var(--color-border-harsh)]',
        variant === 'secondary' && 'bg-transparent text-[var(--color-text-muted)] border-[var(--color-text-muted)]',
        variant === 'primary' && 'bg-[var(--color-text-raw)] text-[var(--color-void)] border-[var(--color-text-raw)]',
        variant === 'success' && 'bg-transparent text-[var(--color-metric-positive)] border-[var(--color-metric-positive)]',
        variant === 'warning' && 'bg-transparent text-[var(--color-signal-yellow)] border-[var(--color-signal-yellow)]',
        variant === 'error' && 'bg-transparent text-[var(--color-signal-red)] border-[var(--color-signal-red)]',
        variant === 'info' && 'bg-transparent text-[var(--color-signal-cyan)] border-[var(--color-signal-cyan)]',
        variant === 'signal' && 'bg-transparent text-[var(--color-signal-green)] border-[var(--color-signal-green)] shadow-[0_0_10px_rgba(0,255,65,0.3)]',
        variant === 'pulse' && 'bg-transparent text-[var(--color-signal-green)] border-[var(--color-signal-green)] animate-border-pulse',
        
        className
      )}
      {...props}
    />
  );
}

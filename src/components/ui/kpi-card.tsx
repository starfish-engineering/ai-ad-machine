import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface KPICardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: string | number;
  changeType?: 'positive' | 'negative' | 'neutral';
  prefix?: string;
  suffix?: string;
  sparkline?: boolean;
  volatile?: boolean;
  icon?: ReactNode;
}

export function KPICard({
  className,
  label,
  value,
  change,
  changeType = 'neutral',
  prefix,
  suffix,
  sparkline,
  volatile,
  icon,
  ...props
}: KPICardProps) {
  return (
    <div
      className={cn(
        // Base brutalist KPI card
        'relative bg-[var(--color-terminal)] border-2 border-[var(--color-grid)] p-5',
        'transition-all duration-150',
        'hover:border-[var(--color-signal-green)] hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]',
        className
      )}
      {...props}
    >
      {/* Label */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
          {label}
        </span>
        {icon && (
          <span className="text-[var(--color-signal-green)]">{icon}</span>
        )}
      </div>
      
      {/* Value */}
      <div className="flex items-baseline gap-2">
        {prefix && (
          <span className="text-[var(--color-text-muted)] text-lg">{prefix}</span>
        )}
        <span
          className={cn(
            'font-display text-4xl tracking-tight text-[var(--color-text-raw)]',
            volatile && 'animate-[volatileNumber_2s_ease-in-out_infinite]',
            changeType === 'positive' && 'text-[var(--color-metric-positive)]',
            changeType === 'negative' && 'text-[var(--color-metric-negative)]'
          )}
        >
          {value}
        </span>
        {suffix && (
          <span className="text-[var(--color-text-muted)] text-sm">{suffix}</span>
        )}
      </div>
      
      {/* Change indicator */}
      {change && (
        <div className={cn(
          'mt-2 text-xs font-mono font-bold',
          changeType === 'positive' && 'text-[var(--color-metric-positive)]',
          changeType === 'negative' && 'text-[var(--color-metric-negative)]',
          changeType === 'neutral' && 'text-[var(--color-text-muted)]'
        )}>
          {changeType === 'positive' && '▲ '}
          {changeType === 'negative' && '▼ '}
          {change}
        </div>
      )}
      
      {/* Sparkline */}
      {sparkline && (
        <div className="mt-4 h-8 relative">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke="var(--color-signal-green)"
              strokeWidth="1.5"
              points="0,20 10,18 20,22 30,15 40,19 50,12 60,16 70,8 80,14 90,6 100,10"
              className="opacity-80"
            />
            <circle
              cx="100"
              cy="10"
              r="2"
              fill="var(--color-signal-green)"
              className="animate-pulse"
            />
          </svg>
        </div>
      )}
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[var(--color-signal-green)] opacity-60" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[var(--color-signal-green)] opacity-60" />
    </div>
  );
}

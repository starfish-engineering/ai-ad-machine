import { cn } from '@/lib/utils';

export interface AuditScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'var(--color-metric-positive)';
  if (score >= 60) return 'var(--color-signal-yellow)';
  if (score >= 40) return 'var(--color-signal-orange)';
  return 'var(--color-signal-red)';
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'EXCELLENT';
  if (score >= 60) return 'GOOD';
  if (score >= 40) return 'FAIR';
  return 'CRITICAL';
}

export function AuditScore({ score, size = 'md', showLabel = true, className }: AuditScoreProps) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  
  const dimensions = {
    sm: { size: 60, stroke: 4, fontSize: 'text-lg' },
    md: { size: 100, stroke: 6, fontSize: 'text-3xl' },
    lg: { size: 140, stroke: 8, fontSize: 'text-5xl' },
  };
  
  const { size: circleSize, stroke, fontSize } = dimensions[size];
  const radius = (circleSize - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative" style={{ width: circleSize, height: circleSize }}>
        {/* Background circle */}
        <svg
          className="absolute inset-0 -rotate-90"
          width={circleSize}
          height={circleSize}
        >
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke="var(--color-grid)"
            strokeWidth={stroke}
          />
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="square"
            className="transition-all duration-700 ease-out"
            style={{
              filter: `drop-shadow(0 0 6px ${color})`,
            }}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn('font-display', fontSize)}
            style={{ color }}
          >
            {score}
          </span>
        </div>
      </div>
      
      {showLabel && (
        <span
          className="mt-2 text-[10px] font-mono font-bold tracking-wider"
          style={{ color }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

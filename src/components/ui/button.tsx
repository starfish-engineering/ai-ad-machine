import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'signal';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  glitch?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, glitch, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles - brutalist aesthetic
          'inline-flex items-center justify-center font-mono font-bold uppercase tracking-wider',
          'border-3 transition-all duration-150',
          'disabled:pointer-events-none disabled:opacity-50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-void)]',
          
          // Hover transform effect
          'hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_currentColor]',
          'active:translate-x-0 active:translate-y-0 active:shadow-none',
          
          // Variant styles
          variant === 'primary' && [
            'bg-[var(--color-text-raw)] text-[var(--color-void)] border-[var(--color-text-raw)]',
            'hover:bg-[var(--color-signal-green)] hover:border-[var(--color-signal-green)] hover:shadow-[4px_4px_0_var(--color-signal-green)]',
          ],
          variant === 'secondary' && [
            'bg-[var(--color-surface)] text-[var(--color-text-raw)] border-[var(--color-border-harsh)]',
            'hover:bg-[var(--color-grid)] hover:border-[var(--color-text-muted)]',
          ],
          variant === 'outline' && [
            'bg-transparent text-[var(--color-text-raw)] border-[var(--color-text-raw)]',
            'hover:bg-[var(--color-text-raw)] hover:text-[var(--color-void)]',
          ],
          variant === 'ghost' && [
            'bg-transparent text-[var(--color-text-raw)] border-transparent',
            'hover:bg-[var(--color-surface)] hover:border-[var(--color-border-harsh)]',
            'hover:translate-x-0 hover:translate-y-0 hover:shadow-none',
          ],
          variant === 'destructive' && [
            'bg-transparent text-[var(--color-signal-red)] border-[var(--color-signal-red)]',
            'hover:bg-[var(--color-signal-red)] hover:text-[var(--color-void)] hover:shadow-[4px_4px_0_var(--color-signal-red)]',
          ],
          variant === 'signal' && [
            'bg-transparent text-[var(--color-signal-green)] border-[var(--color-signal-green)]',
            'hover:bg-[var(--color-signal-green)] hover:text-[var(--color-void)] hover:shadow-[4px_4px_0_var(--color-signal-green)]',
          ],
          
          // Size styles
          size === 'sm' && 'h-9 px-4 text-[10px] gap-1.5 border-2',
          size === 'md' && 'h-11 px-5 text-[11px] gap-2 border-2',
          size === 'lg' && 'h-14 px-8 text-[12px] gap-2.5 border-3',
          
          // Glitch effect
          glitch && 'hover:animate-glitch',
          
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            LOADING...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

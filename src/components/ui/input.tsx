import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'terminal';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base brutalist input styles
          'w-full px-4 py-3 font-mono text-sm',
          'bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)]',
          'text-[var(--color-text-raw)] placeholder:text-[var(--color-text-dim)]',
          'outline-none transition-all duration-150',
          'focus:border-[var(--color-signal-green)] focus:shadow-[0_0_0_1px_var(--color-signal-green)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          
          // Terminal variant
          variant === 'terminal' && [
            'border-[var(--color-signal-green)] bg-[var(--color-void)]',
            'focus:shadow-[0_0_10px_rgba(0,255,65,0.3)]',
          ],
          
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

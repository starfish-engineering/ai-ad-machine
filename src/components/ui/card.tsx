import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'terminal' | 'data' | 'signal' | 'warning';
  glow?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', glow, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base brutalist card styles
          'relative bg-[var(--color-surface)] border-2 border-[var(--color-border-harsh)]',
          'transition-all duration-150',
          
          // Variant styles
          variant === 'default' && '',
          variant === 'terminal' && [
            'bg-[var(--color-terminal)] border-[var(--color-signal-green)]',
            'before:content-["●●●"] before:absolute before:top-2 before:left-3',
            'before:text-[8px] before:tracking-[4px] before:text-[var(--color-signal-green)] before:opacity-60',
          ],
          variant === 'data' && [
            'bg-[var(--color-terminal)] border-[var(--color-grid)]',
          ],
          variant === 'signal' && [
            'border-[var(--color-signal-green)]',
          ],
          variant === 'warning' && [
            'border-[var(--color-signal-red)]',
          ],
          
          // Glow effect
          glow && variant === 'signal' && 'shadow-[0_0_20px_rgba(0,255,65,0.3),inset_0_0_20px_rgba(0,255,65,0.1)]',
          glow && variant === 'warning' && 'shadow-[0_0_20px_rgba(255,0,85,0.3),inset_0_0_20px_rgba(255,0,85,0.1)]',
          glow && (variant === 'default' || variant === 'terminal' || variant === 'data') && 'shadow-[0_0_20px_rgba(0,255,255,0.2)]',
          
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col space-y-1.5 p-5 border-b border-[var(--color-border-harsh)]',
          className
        )}
        {...props}
      />
    );
  }
);

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          'font-mono text-sm font-bold uppercase tracking-wider text-[var(--color-text-raw)]',
          className
        )}
        {...props}
      />
    );
  }
);

CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-xs text-[var(--color-text-muted)]', className)}
        {...props}
      />
    );
  }
);

CardDescription.displayName = 'CardDescription';

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('p-5', className)} {...props} />
    );
  }
);

CardContent.displayName = 'CardContent';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center p-5 pt-0 border-t border-[var(--color-border-harsh)]',
          className
        )}
        {...props}
      />
    );
  }
);

CardFooter.displayName = 'CardFooter';

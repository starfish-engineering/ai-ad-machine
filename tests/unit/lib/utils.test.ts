import { describe, it, expect } from 'vitest';
import { cn, formatCurrency, formatNumber, formatPercentage } from '@/lib/utils';

describe('cn (className merger)', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('base', true && 'active', false && 'hidden')).toBe('base active');
  });

  it('handles conflicting Tailwind classes', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('handles undefined and null', () => {
    expect(cn('base', undefined, null, 'end')).toBe('base end');
  });
});

describe('formatCurrency', () => {
  it('formats USD by default', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00');
  });

  it('handles decimals', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('handles negative values', () => {
    expect(formatCurrency(-500)).toBe('-$500.00');
  });

  it('handles large numbers', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00');
  });
});

describe('formatNumber', () => {
  it('formats with commas', () => {
    expect(formatNumber(1000)).toBe('1,000');
  });

  it('handles decimals', () => {
    expect(formatNumber(1234.56)).toBe('1,234.56');
  });
});

describe('formatPercentage', () => {
  it('formats as percentage', () => {
    expect(formatPercentage(0.25)).toBe('25%');
  });

  it('handles whole numbers', () => {
    expect(formatPercentage(1)).toBe('100%');
  });

  it('handles decimal precision', () => {
    expect(formatPercentage(0.2567, 2)).toBe('25.67%');
  });
});


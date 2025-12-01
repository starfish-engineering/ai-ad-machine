import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper precedence.
 * Uses clsx for conditional classes and tailwind-merge for conflict resolution.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as currency.
 * @param amount - The amount to format
 * @param currency - ISO 4217 currency code (default: USD)
 * @param locale - BCP 47 locale string (default: en-US)
 */
export function formatCurrency(
  amount: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format a number with locale-appropriate separators.
 * @param value - The number to format
 * @param locale - BCP 47 locale string (default: en-US)
 */
export function formatNumber(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Format a decimal as a percentage.
 * @param value - The decimal value (0.25 = 25%)
 * @param decimals - Number of decimal places (default: 0)
 * @param locale - BCP 47 locale string (default: en-US)
 */
export function formatPercentage(
  value: number,
  decimals = 0,
  locale = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format a number in compact notation (1K, 1M, etc.)
 * @param value - The number to format
 * @param locale - BCP 47 locale string (default: en-US)
 */
export function formatCompact(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
}

/**
 * Format a date relative to now (2 hours ago, yesterday, etc.)
 * @param date - The date to format
 * @param locale - BCP 47 locale string (default: en-US)
 */
export function formatRelativeTime(
  date: Date,
  locale = 'en-US'
): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['week', 60 * 60 * 24 * 7],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
    ['second', 1],
  ];
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  for (const [unit, secondsInUnit] of units) {
    if (Math.abs(diffInSeconds) >= secondsInUnit || unit === 'second') {
      const value = Math.floor(diffInSeconds / secondsInUnit);
      return rtf.format(-value, unit);
    }
  }
  
  return rtf.format(0, 'second');
}

/**
 * Truncate a string to a maximum length with ellipsis.
 * @param str - The string to truncate
 * @param maxLength - Maximum length before truncation
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Generate a URL-safe slug from a string.
 * @param str - The string to slugify
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Delay execution for a specified duration.
 * @param ms - Milliseconds to wait
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if code is running on the server.
 */
export const isServer = typeof window === 'undefined';

/**
 * Check if code is running in the browser.
 */
export const isBrowser = !isServer;


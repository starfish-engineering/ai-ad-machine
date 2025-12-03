'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, ThemeToggleCompact } from '@/components/ui';
import { Menu, X, ChevronDown, Terminal, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Products',
    href: '/products',
    children: [
      { name: 'Search & Shopping', href: '/products/search', description: 'GOOGLE & MICROSOFT ADS TOOLS' },
      { name: 'Social Ads', href: '/products/social', description: 'META & LINKEDIN OPTIMIZATION' },
      { name: 'Marketplace', href: '/products/marketplace', description: 'AMAZON ADS MANAGEMENT' },
    ],
  },
  {
    name: 'Solutions',
    href: '/solutions',
    children: [
      { name: 'Monitoring', href: '/solutions/monitoring', description: 'REAL-TIME CAMPAIGN TRACKING' },
      { name: 'Automation', href: '/solutions/automation', description: 'RULE-BASED OPTIMIZATION' },
      { name: 'Reporting', href: '/solutions/reporting', description: 'CUSTOM REPORT BUILDER' },
      { name: 'Analysis', href: '/solutions/analysis', description: 'AI-POWERED INSIGHTS' },
    ],
  },
  { name: 'Pricing', href: '/pricing' },
  {
    name: 'Resources',
    href: '/resources',
    children: [
      { name: 'Blog', href: '/blog', description: 'PPC INSIGHTS AND TIPS' },
      { name: 'Case Studies', href: '/case-studies', description: 'CUSTOMER SUCCESS STORIES' },
      { name: 'Documentation', href: '/docs', description: 'GUIDES AND API DOCS' },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'bg-[var(--color-void)] backdrop-blur-sm border-b-2 border-[var(--color-border-harsh)]' 
          : 'bg-[var(--color-void)]/80 backdrop-blur-sm'
      )}
    >
      {/* Top Status Bar */}
      <div className="bg-[var(--color-signal-green)] text-[var(--color-void)] py-1.5 px-4 overflow-hidden">
        <div className="mx-auto max-w-7xl flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[var(--color-void)] rounded-full animate-pulse" />
              SYSTEMS ONLINE
            </span>
            <span className="hidden sm:inline opacity-60">|</span>
            <span className="hidden sm:inline">{currentTime} UTC</span>
          </div>
          <Link href="/pricing" className="hover:underline flex items-center gap-1">
            <Zap className="w-3 h-3" />
            LAUNCH SPECIAL: 20% OFF — CLAIM NOW →
          </Link>
        </div>
      </div>

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 border-2 border-[var(--color-text-raw)] flex items-center justify-center bg-[var(--color-void)] group-hover:border-[var(--color-signal-green)] group-hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all">
              <Terminal className="w-5 h-5 text-[var(--color-signal-green)]" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--color-signal-green)] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl tracking-wider text-[var(--color-text-raw)]">DRAPER</span>
              <span className="text-[8px] font-mono text-[var(--color-text-muted)] tracking-widest">DATA_SYSTEMS_v2.0</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 px-4 py-2 text-[11px] font-mono font-bold uppercase tracking-wider',
                    'text-[var(--color-text-raw)] hover:text-[var(--color-signal-green)]',
                    'transition-colors relative',
                    'after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[var(--color-signal-green)]',
                    'hover:after:w-full after:transition-all after:duration-300'
                  )}
                >
                  {item.name}
                  {item.children && <ChevronDown className="w-3 h-3" />}
                </Link>

                {/* Dropdown Menu */}
                {item.children && openDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="w-72 bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] p-1 shadow-[8px_8px_0_var(--color-void)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-3 hover:bg-[var(--color-surface)] transition-colors group/item"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[var(--color-signal-green)] opacity-0 group-hover/item:opacity-100 transition-opacity">▸</span>
                            <div>
                              <div className="font-mono text-sm font-bold text-[var(--color-text-raw)]">{child.name}</div>
                              <div className="text-[9px] font-mono text-[var(--color-text-muted)] tracking-wider">{child.description}</div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <ThemeToggleCompact />
            <Link
              href="/login"
              className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-text-raw)] hover:text-[var(--color-signal-green)] px-3 py-2 transition-colors"
            >
              Log in
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="sm">Book Demo</Button>
            </Link>
            <Link href="/signup">
              <Button variant="signal" size="sm">Start Trial</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 border-2 border-[var(--color-border-harsh)] text-[var(--color-text-raw)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t-2 border-[var(--color-border-harsh)] bg-[var(--color-void)]">
            <div className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-sm font-mono font-bold uppercase tracking-wider text-[var(--color-text-raw)] hover:bg-[var(--color-surface)] hover:text-[var(--color-signal-green)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-4 border-l-2 border-[var(--color-grid)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-signal-green)]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          ▸ {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t-2 border-[var(--color-border-harsh)] space-y-3 px-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[var(--color-text-dim)]">Theme</span>
                <ThemeToggleCompact />
              </div>
              <Link
                href="/login"
                className="block py-2 text-sm font-mono font-bold uppercase text-[var(--color-text-muted)]"
              >
                Log in
              </Link>
              <div className="flex gap-2">
                <Link href="/demo" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">Demo</Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button variant="signal" size="sm" className="w-full">Trial</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

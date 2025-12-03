import Link from 'next/link';
import { Terminal, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui';

const footerNavigation = {
  products: [
    { name: 'Search & Shopping', href: '/products/search' },
    { name: 'Social Ads', href: '/products/social' },
    { name: 'Marketplace', href: '/products/marketplace' },
    { name: 'All Features', href: '/features' },
  ],
  solutions: [
    { name: 'For Agencies', href: '/for/agencies' },
    { name: 'For In-House Teams', href: '/for/in-house' },
    { name: 'For Freelancers', href: '/for/freelancers' },
    { name: 'For Enterprise', href: '/for/enterprise' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/docs/api' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Partners', href: '/partners' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Security', href: '/security' },
  ],
};

const socialLinks = [
  { name: 'X', href: 'https://twitter.com/draperads', icon: 'X' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/draperads', icon: 'in' },
  { name: 'GitHub', href: 'https://github.com/draperads', icon: '<>' },
];

const stats = [
  { label: 'AD_SPEND_MANAGED', value: '$2.4B+' },
  { label: 'ACTIVE_ACCOUNTS', value: '10,847' },
  { label: 'SYSTEM_UPTIME', value: '99.97%' },
  { label: 'AVG_RESPONSE', value: '42ms' },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-void)] border-t-2 border-[var(--color-border-harsh)]">
      {/* CTA Section */}
      <div className="border-b-2 border-[var(--color-border-harsh)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - CTA */}
            <div>
              <h2 className="font-display text-4xl md:text-6xl tracking-tight text-[var(--color-text-raw)] mb-4">
                READY TO<br />
                <span className="text-[var(--color-signal-green)]">OPTIMIZE?</span>
              </h2>
              <p className="text-[var(--color-text-muted)] font-mono text-sm mb-8 max-w-md">
                Initialize your 14-day trial sequence. No credit card required. 
                Full system access enabled immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button variant="signal" size="lg" className="w-full sm:w-auto">
                    START_TRIAL →
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    BOOK_DEMO
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Stats Grid */}
            <div className="grid grid-cols-2 gap-0 border-2 border-[var(--color-border-harsh)]">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`p-6 ${i < 2 ? 'border-b-2' : ''} ${i % 2 === 0 ? 'border-r-2' : ''} border-[var(--color-border-harsh)] bg-[var(--color-terminal)]`}
                >
                  <div className="text-[9px] font-mono text-[var(--color-text-muted)] tracking-wider mb-2">
                    {stat.label}
                  </div>
                  <div className="font-display text-2xl md:text-3xl text-[var(--color-signal-green)]">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-10 h-10 border-2 border-[var(--color-text-raw)] flex items-center justify-center bg-[var(--color-void)] group-hover:border-[var(--color-signal-green)] transition-colors">
                <Terminal className="w-5 h-5 text-[var(--color-signal-green)]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg tracking-wider text-[var(--color-text-raw)]">DRAPER</span>
              </div>
            </Link>
            <p className="text-[11px] font-mono text-[var(--color-text-muted)] leading-relaxed mb-6">
              &gt; Worry-free PPC management<br />
              &gt; in the AI era<br />
              &gt; <span className="text-[var(--color-signal-green)]">_</span>
            </p>
            <div className="flex gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-10 h-10 border-2 border-[var(--color-border-harsh)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-signal-green)] hover:text-[var(--color-signal-green)] transition-colors font-mono text-xs font-bold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-[10px] font-mono font-bold text-[var(--color-text-raw)] uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--color-signal-green)]" />
              Products
            </h3>
            <ul className="space-y-2">
              {footerNavigation.products.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-signal-green)] transition-colors flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">▸</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-[10px] font-mono font-bold text-[var(--color-text-raw)] uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--color-signal-cyan)]" />
              Solutions
            </h3>
            <ul className="space-y-2">
              {footerNavigation.solutions.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-signal-cyan)] transition-colors flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">▸</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[10px] font-mono font-bold text-[var(--color-text-raw)] uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--color-signal-yellow)]" />
              Resources
            </h3>
            <ul className="space-y-2">
              {footerNavigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-signal-yellow)] transition-colors flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">▸</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[10px] font-mono font-bold text-[var(--color-text-raw)] uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--color-signal-magenta)]" />
              Company
            </h3>
            <ul className="space-y-2">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-signal-magenta)] transition-colors flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">▸</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-[var(--color-border-harsh)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-[10px] font-mono text-[var(--color-text-dim)]">
              <span>© {new Date().getFullYear()} DRAPER_SYSTEMS</span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline">BUILD_v2.4.7</span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[var(--color-signal-green)] rounded-full animate-pulse" />
                ALL_SYSTEMS_OPERATIONAL
              </span>
            </div>
            <div className="flex gap-6">
              {footerNavigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[10px] font-mono text-[var(--color-text-dim)] hover:text-[var(--color-text-raw)] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="h-1 bg-gradient-to-r from-[var(--color-signal-red)] via-[var(--color-signal-yellow)] via-[var(--color-signal-green)] via-[var(--color-signal-cyan)] to-[var(--color-signal-magenta)]" />
    </footer>
  );
}

import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Draper - Worry-free PPC Management',
    template: '%s | Draper',
  },
  description: 'Monitor, optimize, and safeguard your paid media accounts with always-on automation — while you stay in control.',
  keywords: ['PPC', 'Google Ads', 'Meta Ads', 'Amazon Ads', 'advertising automation', 'PPC management', 'paid media'],
  authors: [{ name: 'Draper' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://draperads.com',
    siteName: 'Draper',
    title: 'Draper - Worry-free PPC Management',
    description: 'Monitor, optimize, and safeguard your paid media accounts with always-on automation.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Draper - PPC Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Draper - Worry-free PPC Management',
    description: 'Monitor, optimize, and safeguard your paid media accounts with always-on automation.',
    images: ['/og-image.png'],
    creator: '@draperads',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Script to prevent flash of wrong theme
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('draper-theme');
      if (theme === 'dark' || theme === 'light') {
        document.documentElement.setAttribute('data-theme', theme);
      } else if (theme === 'system' || !theme) {
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider defaultTheme="system" storageKey="draper-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

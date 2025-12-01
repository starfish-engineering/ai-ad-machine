import Link from 'next/link';
import { Button } from '@/components/ui';
import {
  BookOpen,
  Rocket,
  Settings,
  Zap,
  Bell,
  FileText,
  Code,
  Users,
  ArrowRight,
  Search,
  ExternalLink,
} from 'lucide-react';

const docSections = [
  {
    icon: Rocket,
    title: 'Getting Started',
    description: 'New to AdPilot? Start here.',
    links: [
      { name: 'Quick Start Guide', href: '/docs' },
      { name: 'Connecting Ad Accounts', href: '/docs' },
      { name: 'Understanding the Dashboard', href: '/docs' },
      { name: 'Your First Automation Rule', href: '/docs' },
    ],
  },
  {
    icon: Settings,
    title: 'Account Setup',
    description: 'Configure your workspace.',
    links: [
      { name: 'Workspace Settings', href: '/docs' },
      { name: 'Team Members & Permissions', href: '/docs' },
      { name: 'Notification Preferences', href: '/docs' },
      { name: 'Billing & Plans', href: '/docs' },
    ],
  },
  {
    icon: Zap,
    title: 'Automation',
    description: 'Master automation rules.',
    links: [
      { name: 'Rule Builder Basics', href: '/docs' },
      { name: 'Conditions & Actions', href: '/docs' },
      { name: 'Scheduling Rules', href: '/docs' },
      { name: 'Rule Templates', href: '/docs' },
    ],
  },
  {
    icon: Bell,
    title: 'Monitoring & Alerts',
    description: 'Stay on top of performance.',
    links: [
      { name: 'Alert Configuration', href: '/docs' },
      { name: 'Anomaly Detection', href: '/docs' },
      { name: 'Budget Monitoring', href: '/docs' },
      { name: 'Custom Metrics', href: '/docs' },
    ],
  },
  {
    icon: FileText,
    title: 'Reporting',
    description: 'Create beautiful reports.',
    links: [
      { name: 'Report Builder', href: '/docs' },
      { name: 'Report Templates', href: '/docs' },
      { name: 'Scheduled Reports', href: '/docs' },
      { name: 'White-Label Setup', href: '/docs' },
    ],
  },
  {
    icon: Code,
    title: 'API & Integrations',
    description: 'Build custom solutions.',
    links: [
      { name: 'API Overview', href: '/docs/api' },
      { name: 'Authentication', href: '/docs/api' },
      { name: 'Webhooks', href: '/docs/api' },
      { name: 'Integrations', href: '/docs' },
    ],
  },
];

const popularArticles = [
  {
    title: 'How to Set Up Your First Automation Rule',
    category: 'Automation',
    readTime: '5 min',
  },
  {
    title: 'Connecting Google Ads to AdPilot',
    category: 'Getting Started',
    readTime: '3 min',
  },
  {
    title: 'Understanding Budget Pacing Alerts',
    category: 'Monitoring',
    readTime: '4 min',
  },
  {
    title: 'Creating Custom Reports for Clients',
    category: 'Reporting',
    readTime: '6 min',
  },
  {
    title: 'API Authentication Best Practices',
    category: 'API',
    readTime: '7 min',
  },
];

export default function DocsPage() {
  return (
    <main className="pt-32">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-gray-200">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-full blur-3xl opacity-60" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-blue-600">Documentation</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
                How can we help?
              </h1>
              <p className="text-xl text-gray-600">
                Find guides, tutorials, and API reference to help you get the most from AdPilot.
              </p>
            </div>

            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Doc Sections */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {docSections.map((section) => (
                <div
                  key={section.title}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <section.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                        >
                          {link.name}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularArticles.map((article) => (
                <Link
                  key={article.title}
                  href="/docs"
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all flex items-start gap-3"
                >
                  <BookOpen className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{article.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* API Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm mb-4">
                    <Code className="w-4 h-4" />
                    API Reference
                  </div>
                  <h2 className="text-3xl font-bold mb-4">
                    Build with the AdPilot API
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Integrate AdPilot into your workflow with our comprehensive REST API. 
                    Create automations, pull data, and build custom tools.
                  </p>
                  <div className="flex gap-4">
                    <Link href="/docs/api">
                      <Button className="gap-2">
                        View API Docs
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href="/docs/api">
                      <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 gap-2">
                        <ExternalLink className="w-4 h-4" />
                        API Playground
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-xl p-6 font-mono text-sm">
                  <div className="text-gray-400 mb-2"># Get campaigns</div>
                  <div className="text-green-400">
                    curl -X GET https://api.adpilot.io/v1/campaigns \
                  </div>
                  <div className="text-gray-300 ml-4">
                    -H &quot;Authorization: Bearer YOUR_API_KEY&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Help */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need more help?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="outline">Contact Support</Button>
              </Link>
              <Link href="/demo">
                <Button>Book a Demo</Button>
              </Link>
            </div>
          </div>
        </section>
    </main>
  );
}


import Link from 'next/link';
import { Button } from '@/components/ui';
import {
  BarChart3,
  Bell,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  Users,
  FileText,
  Search,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Layers,
  RefreshCw,
  Settings,
  Activity,
  PieChart,
  Lock,
  Globe,
} from 'lucide-react';

const featureCategories = [
  {
    name: 'Monitoring & Alerts',
    description: 'Stay on top of your campaigns 24/7',
    features: [
      {
        icon: Activity,
        name: 'Real-Time Dashboard',
        description: 'Monitor all your ad accounts from a single, unified dashboard with live performance data.',
      },
      {
        icon: Bell,
        name: 'Smart Alerts',
        description: 'Get notified instantly when campaigns underperform, overspend, or hit custom thresholds.',
      },
      {
        icon: TrendingUp,
        name: 'Anomaly Detection',
        description: 'AI-powered detection of unusual patterns in spend, clicks, conversions, and more.',
      },
      {
        icon: Shield,
        name: 'Budget Pacing',
        description: 'Track daily and monthly budget consumption with forecasting and overspend alerts.',
      },
    ],
  },
  {
    name: 'Automation',
    description: 'Work smarter with powerful automation',
    features: [
      {
        icon: Zap,
        name: 'Automation Rules',
        description: 'Create custom rules to automatically adjust bids, budgets, and campaign status.',
      },
      {
        icon: Clock,
        name: 'Scheduled Tasks',
        description: 'Schedule campaign changes, report exports, and optimizations to run at specific times.',
      },
      {
        icon: RefreshCw,
        name: 'Express Optimizations',
        description: 'One-click bulk optimizations for search queries, keywords, ads, and placements.',
      },
      {
        icon: Settings,
        name: 'Custom Scripts',
        description: 'Build custom automation scripts with our visual builder or JavaScript API.',
      },
    ],
  },
  {
    name: 'AI & Insights',
    description: 'Leverage AI to make smarter decisions',
    features: [
      {
        icon: Sparkles,
        name: 'AI Sidekick',
        description: 'Chat with AI to analyze performance, get recommendations, and execute optimizations.',
      },
      {
        icon: Search,
        name: 'PPC Investigator',
        description: 'Deep-dive into performance changes with automated root cause analysis.',
      },
      {
        icon: Target,
        name: 'Smart Recommendations',
        description: 'Get actionable suggestions based on your campaign data and industry benchmarks.',
      },
      {
        icon: BarChart3,
        name: 'Predictive Analytics',
        description: 'Forecast future performance and identify optimization opportunities.',
      },
    ],
  },
  {
    name: 'Reporting',
    description: 'Beautiful reports in seconds',
    features: [
      {
        icon: FileText,
        name: 'Custom Reports',
        description: 'Build custom reports with drag-and-drop widgets and your branding.',
      },
      {
        icon: PieChart,
        name: 'Cross-Platform Analytics',
        description: 'Unified reporting across Google, Meta, Microsoft, and Amazon ads.',
      },
      {
        icon: Clock,
        name: 'Scheduled Exports',
        description: 'Automatically send reports to stakeholders on a daily, weekly, or monthly basis.',
      },
      {
        icon: Layers,
        name: 'White-Label Reports',
        description: 'Add your logo, colors, and custom domain for client-facing reports.',
      },
    ],
  },
  {
    name: 'Collaboration',
    description: 'Built for teams of all sizes',
    features: [
      {
        icon: Users,
        name: 'Team Management',
        description: 'Invite team members with role-based permissions and access controls.',
      },
      {
        icon: Globe,
        name: 'Multi-Account Support',
        description: 'Manage hundreds of ad accounts from a single AdPilot workspace.',
      },
      {
        icon: Lock,
        name: 'Audit Logs',
        description: 'Track all changes made by team members with detailed activity logs.',
      },
      {
        icon: Bell,
        name: 'Shared Alerts',
        description: 'Route alerts to specific team members or channels based on account or severity.',
      },
    ],
  },
];

const platforms = [
  { name: 'Google Ads', logo: '🔍' },
  { name: 'Meta Ads', logo: '📘' },
  { name: 'Microsoft Ads', logo: '🪟' },
  { name: 'Amazon Ads', logo: '📦' },
];

export default function FeaturesPage() {
  return (
    <main className="pt-32">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-full blur-3xl opacity-60" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Everything you need for{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PPC success
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From real-time monitoring to AI-powered insights, AdPilot gives you the complete toolkit to manage paid media at scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg">
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section className="border-y border-gray-100 bg-gray-50/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-sm font-medium text-gray-500 mb-6">
              Works with all major ad platforms
            </p>
            <div className="flex justify-center gap-8 flex-wrap">
              {platforms.map((platform) => (
                <div key={platform.name} className="flex items-center gap-2 text-gray-700">
                  <span className="text-2xl">{platform.logo}</span>
                  <span className="font-medium">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Categories */}
        {featureCategories.map((category, categoryIndex) => (
          <section
            key={category.name}
            className={categoryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {category.name}
                </h2>
                <p className="text-lg text-gray-600">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.features.map((feature) => (
                  <div
                    key={feature.name}
                    className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-16 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to supercharge your PPC?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Start your free 14-day trial today and discover why thousands of marketers trust AdPilot.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 gap-2"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-100">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  14-day free trial
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Cancel anytime
                </span>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
}


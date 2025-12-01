import Link from 'next/link';
import { 
  Bell, TrendingUp, Zap, BarChart3, Search, Target, 
  Shield, Clock, Brain, ArrowRight, CheckCircle2, Layers
} from 'lucide-react';
import { Button } from '@/components/ui';

const products = [
  {
    icon: Bell,
    name: 'Monitor',
    tagline: 'Never miss a critical change',
    description: 'Real-time monitoring and intelligent alerts that catch issues before they become problems.',
    color: 'blue',
    features: [
      'Real-time budget pacing alerts',
      'Anomaly detection powered by ML',
      'Custom KPI thresholds',
      'Slack, email & SMS notifications',
      'Landing page monitoring',
      'Competitor tracking',
    ],
    link: '/products/monitor',
  },
  {
    icon: Zap,
    name: 'Optimize',
    tagline: 'One-click optimizations at scale',
    description: 'AI-powered suggestions and bulk actions to optimize campaigns in seconds, not hours.',
    color: 'amber',
    features: [
      'Express one-click optimizations',
      'Negative keyword conflict detection',
      'Search query mining',
      'Bid adjustments at scale',
      'Ad copy recommendations',
      'Quality score improvements',
    ],
    link: '/products/optimize',
  },
  {
    icon: TrendingUp,
    name: 'Automate',
    tagline: 'Set rules, save time',
    description: 'Powerful automation rules that work 24/7 to keep your campaigns running optimally.',
    color: 'green',
    features: [
      'Rule engine with 50+ conditions',
      'Scheduled optimizations',
      'Budget pacing automation',
      'Bid management rules',
      'Campaign on/off controls',
      'Custom scripts support',
    ],
    link: '/products/automate',
  },
  {
    icon: BarChart3,
    name: 'Report',
    tagline: 'Beautiful reports in minutes',
    description: 'Generate client-ready reports with customizable templates and automated delivery.',
    color: 'purple',
    features: [
      'Drag-and-drop report builder',
      'White-label branding',
      'Scheduled report delivery',
      'Google Looker Studio integration',
      'PDF & interactive formats',
      'Cross-account roll-ups',
    ],
    link: '/products/report',
  },
  {
    icon: Search,
    name: 'Analyze',
    tagline: 'Understand the "why"',
    description: 'Deep-dive analysis tools to uncover insights and understand performance changes.',
    color: 'rose',
    features: [
      'PPC Investigator root cause analysis',
      'Segmentation breakdown',
      'Trend analysis',
      'Attribution modeling',
      'Cohort analysis',
      'AI-powered insights',
    ],
    link: '/products/analyze',
  },
  {
    icon: Shield,
    name: 'Protect',
    tagline: 'Guardrails for peace of mind',
    description: 'Safety controls and spend limits that protect your campaigns from costly mistakes.',
    color: 'slate',
    features: [
      'Daily & monthly spend caps',
      'CPC ceiling limits',
      'Change rollback',
      'Approval workflows',
      'Audit log tracking',
      'Role-based permissions',
    ],
    link: '/products/protect',
  },
];

const platforms = [
  { name: 'Google Ads', logo: '/platforms/google.svg' },
  { name: 'Meta Ads', logo: '/platforms/meta.svg' },
  { name: 'Microsoft Ads', logo: '/platforms/microsoft.svg' },
  { name: 'Amazon Ads', logo: '/platforms/amazon.svg' },
];

const integrations = [
  'Google Analytics', 'Looker Studio', 'Slack', 'Zapier',
  'HubSpot', 'Salesforce', 'BigQuery', 'Google Sheets',
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm mb-6">
              <Layers className="w-4 h-4" />
              Complete PPC Management Platform
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                manage PPC at scale
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Six powerful products, one unified platform. Monitor, optimize, automate, 
              and report on your paid media campaigns with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.name}
                href={product.link}
                className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-${product.color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <product.icon className={`w-6 h-6 text-${product.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  {product.name}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-sm text-blue-600 font-medium mb-3">{product.tagline}</p>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Support */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Works with your ad platforms
            </h2>
            <p className="text-xl text-gray-600">
              Connect all your accounts and manage everything from one dashboard.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4 w-64"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-gray-400" />
                </div>
                <span className="font-semibold text-gray-900">{platform.name}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">Plus integrations with</p>
            <div className="flex flex-wrap justify-center gap-4">
              {integrations.map((integration) => (
                <span
                  key={integration}
                  className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 border border-gray-200"
                >
                  {integration}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full text-sm text-purple-700 mb-6">
                <Brain className="w-4 h-4" />
                AI-Powered
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Meet Sidekick, your AI PPC assistant
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Get instant insights, recommendations, and answers to your PPC questions. 
                Sidekick analyzes your account data and surfaces what matters most.
              </p>
              <ul className="space-y-4">
                {[
                  'Natural language queries about your campaigns',
                  'Automated performance summaries',
                  'Proactive optimization suggestions',
                  'Root cause analysis of metric changes',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Brain className="w-5 h-5 text-purple-600" />
                  AI Sidekick
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-100 rounded-lg p-3 text-sm">
                    "Why did my CPC increase last week?"
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-sm text-gray-700">
                    Your CPC increased by 23% last week primarily due to:
                    <ul className="mt-2 ml-4 space-y-1 text-gray-600">
                      <li>• Increased competition on "home renovation" keywords</li>
                      <li>• New Quality Score drops on 3 ad groups</li>
                      <li>• Higher mobile bid adjustments taking effect</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Time Savings */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Clock className="w-12 h-12 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">
              Save 10+ hours per week
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our customers report saving an average of 10 hours per week on routine 
              PPC management tasks. That's time you can spend on strategy and growth.
            </p>
            <div className="grid grid-cols-3 gap-8 mt-12">
              {[
                { stat: '60%', label: 'Faster optimizations' },
                { stat: '80%', label: 'Less manual work' },
                { stat: '24/7', label: 'Automated monitoring' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-4xl font-bold mb-2">{item.stat}</div>
                  <div className="text-blue-200">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to see it in action?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start your free 14-day trial or book a personalized demo with our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline">Book a Demo</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


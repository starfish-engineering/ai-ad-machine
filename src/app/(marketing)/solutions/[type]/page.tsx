import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui';
import {
  Activity,
  Zap,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Bell,
  Shield,
  TrendingUp,
  Clock,
  BarChart3,
  Settings,
  RefreshCw,
  Target,
  Search,
  PieChart,
  Layers,
  Users,
  Brain,
  Lightbulb,
  LineChart,
} from 'lucide-react';

const solutions = {
  monitoring: {
    name: 'Monitoring',
    tagline: 'Never miss a beat',
    description: 'Real-time campaign monitoring with intelligent alerts that catch issues before they become problems.',
    icon: Activity,
    color: 'green',
    features: [
      {
        icon: BarChart3,
        name: 'Live Dashboards',
        description: 'See real-time performance data across all your ad accounts in one unified view.',
      },
      {
        icon: Bell,
        name: 'Smart Alerts',
        description: 'Get notified instantly when metrics deviate from expected ranges or hit thresholds.',
      },
      {
        icon: TrendingUp,
        name: 'Anomaly Detection',
        description: 'AI automatically identifies unusual patterns in spend, clicks, and conversions.',
      },
      {
        icon: Shield,
        name: 'Budget Protection',
        description: 'Track budget pacing and get warnings before you overspend.',
      },
      {
        icon: Clock,
        name: 'Historical Tracking',
        description: 'Compare current performance against any historical period.',
      },
      {
        icon: Users,
        name: 'Team Notifications',
        description: 'Route alerts to the right team members via email, Slack, or SMS.',
      },
    ],
    benefits: [
      'Catch performance drops within minutes',
      'Prevent budget overspend automatically',
      'Monitor 100+ accounts from one dashboard',
      'Custom alert thresholds per campaign',
    ],
    stats: [
      { value: '24/7', label: 'Monitoring' },
      { value: '<5min', label: 'Alert latency' },
      { value: '99.9%', label: 'Uptime' },
    ],
  },
  automation: {
    name: 'Automation',
    tagline: 'Work smarter, not harder',
    description: 'Powerful automation rules that optimize your campaigns around the clock, so you can focus on strategy.',
    icon: Zap,
    color: 'yellow',
    features: [
      {
        icon: Settings,
        name: 'Custom Rules',
        description: 'Build if-then automation rules with dozens of conditions and actions.',
      },
      {
        icon: Clock,
        name: 'Scheduled Tasks',
        description: 'Schedule bid changes, budget adjustments, and campaign toggles.',
      },
      {
        icon: RefreshCw,
        name: 'Express Optimizations',
        description: 'One-click bulk optimizations for keywords, ads, and placements.',
      },
      {
        icon: Target,
        name: 'Bid Management',
        description: 'Automated bid adjustments based on performance, time, and competition.',
      },
      {
        icon: Shield,
        name: 'Safety Guardrails',
        description: 'Built-in limits prevent automation from making drastic changes.',
      },
      {
        icon: Activity,
        name: 'Activity Logs',
        description: 'Complete audit trail of all automated actions with undo capability.',
      },
    ],
    benefits: [
      'Save 10+ hours per week on routine tasks',
      'Optimize campaigns 24/7 automatically',
      'Reduce human error in campaign management',
      'Scale management across 100s of accounts',
    ],
    stats: [
      { value: '10hrs', label: 'Saved weekly' },
      { value: '1000+', label: 'Rule templates' },
      { value: '50M+', label: 'Actions executed' },
    ],
  },
  reporting: {
    name: 'Reporting',
    tagline: 'Reports that impress',
    description: 'Create beautiful, customizable reports in minutes. Schedule automated delivery to stakeholders.',
    icon: FileText,
    color: 'purple',
    features: [
      {
        icon: Layers,
        name: 'Drag & Drop Builder',
        description: 'Build custom reports with our intuitive visual report builder.',
      },
      {
        icon: PieChart,
        name: 'Cross-Platform Data',
        description: 'Combine data from Google, Meta, Microsoft, and Amazon in one report.',
      },
      {
        icon: Clock,
        name: 'Scheduled Delivery',
        description: 'Automatically send reports daily, weekly, or monthly via email.',
      },
      {
        icon: Users,
        name: 'White-Label',
        description: 'Add your logo, colors, and custom domain for client reports.',
      },
      {
        icon: BarChart3,
        name: 'Custom Metrics',
        description: 'Create calculated metrics and custom KPIs for your reports.',
      },
      {
        icon: Target,
        name: 'Goal Tracking',
        description: 'Track progress toward targets with visual goal indicators.',
      },
    ],
    benefits: [
      'Create reports in under 5 minutes',
      'Impress clients with professional design',
      'Never miss a reporting deadline',
      'One report for all platforms',
    ],
    stats: [
      { value: '50+', label: 'Report templates' },
      { value: '5min', label: 'Avg. creation time' },
      { value: '100K+', label: 'Reports generated' },
    ],
  },
  analysis: {
    name: 'Analysis',
    tagline: 'AI-powered insights',
    description: 'Let AI analyze your campaigns and surface the insights that matter most. Ask questions in plain English.',
    icon: Sparkles,
    color: 'blue',
    features: [
      {
        icon: Brain,
        name: 'AI Sidekick',
        description: 'Chat with AI to analyze campaigns, get recommendations, and execute changes.',
      },
      {
        icon: Search,
        name: 'PPC Investigator',
        description: 'Automated root cause analysis for performance changes.',
      },
      {
        icon: Lightbulb,
        name: 'Smart Recommendations',
        description: 'AI surfaces optimization opportunities you might have missed.',
      },
      {
        icon: LineChart,
        name: 'Predictive Forecasts',
        description: 'See where your campaigns are heading with ML-powered predictions.',
      },
      {
        icon: TrendingUp,
        name: 'Trend Analysis',
        description: 'Identify emerging patterns before they become obvious.',
      },
      {
        icon: Target,
        name: 'Benchmark Data',
        description: 'Compare your performance against industry benchmarks.',
      },
    ],
    benefits: [
      'Get answers to complex questions instantly',
      'Uncover hidden optimization opportunities',
      'Predict future performance trends',
      'Make data-driven decisions faster',
    ],
    stats: [
      { value: '10x', label: 'Faster analysis' },
      { value: '95%', label: 'Accuracy' },
      { value: '1000s', label: 'Insights daily' },
    ],
  },
};

type SolutionType = keyof typeof solutions;

export function generateStaticParams() {
  return Object.keys(solutions).map((type) => ({ type }));
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  
  if (!Object.keys(solutions).includes(type)) {
    notFound();
  }

  const solution = solutions[type as SolutionType];
  const colorClasses = {
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-orange-500',
    purple: 'from-purple-600 to-purple-700',
    blue: 'from-blue-600 to-indigo-600',
  };

  return (
    <main className="pt-32">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-full blur-3xl opacity-60" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-4xl mx-auto">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses[solution.color as keyof typeof colorClasses]} mb-6`}>
                <solution.icon className="w-8 h-8 text-white" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-4">
                {solution.name}
              </h1>
              
              <p className="text-2xl text-gray-600 mb-4">{solution.tagline}</p>
              
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                {solution.description}
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
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-3 gap-8">
              {solution.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Powerful {solution.name.toLowerCase()} features
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solution.features.map((feature) => (
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
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Why teams love our {solution.name.toLowerCase()}
                </h2>
                <ul className="space-y-4">
                  {solution.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <span className="text-lg text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-200 rounded-2xl aspect-video flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <solution.icon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Feature Preview</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`bg-gradient-to-br ${colorClasses[solution.color as keyof typeof colorClasses]} rounded-3xl p-8 md:p-16 text-center text-white`}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to try {solution.name.toLowerCase()}?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Start your free 14-day trial and experience the difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 gap-2"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/solutions">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    View All Solutions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
}


import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui';
import {
  Search,
  ShoppingCart,
  Users,
  TrendingUp,
  BarChart3,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  Target,
  DollarSign,
  Eye,
  Sparkles,
} from 'lucide-react';

const products = {
  search: {
    name: 'Search & Shopping',
    tagline: 'Dominate search results',
    description: 'Optimize your Google Ads and Microsoft Ads campaigns with powerful automation, smart bidding insights, and comprehensive keyword management.',
    icon: Search,
    color: 'blue',
    platforms: ['Google Ads', 'Microsoft Ads'],
    features: [
      {
        icon: Target,
        name: 'Keyword Management',
        description: 'Discover high-performing keywords, identify negatives, and optimize match types across all campaigns.',
      },
      {
        icon: ShoppingCart,
        name: 'Shopping Feed Optimization',
        description: 'Improve your product listings with automated feed analysis and optimization recommendations.',
      },
      {
        icon: TrendingUp,
        name: 'Bid Optimization',
        description: 'Smart bid adjustments based on performance data, competition, and your target ROAS/CPA.',
      },
      {
        icon: BarChart3,
        name: 'Search Term Analysis',
        description: 'Analyze search queries to find opportunities and waste, with one-click actions.',
      },
      {
        icon: Shield,
        name: 'Quality Score Tracking',
        description: 'Monitor and improve Quality Scores with detailed component breakdowns and recommendations.',
      },
      {
        icon: Zap,
        name: 'Automated Rules',
        description: 'Create custom automation rules for bids, budgets, ad scheduling, and campaign status.',
      },
    ],
    stats: [
      { value: '32%', label: 'Avg. CPC reduction' },
      { value: '45%', label: 'Time saved' },
      { value: '28%', label: 'Conversion increase' },
    ],
  },
  social: {
    name: 'Social Ads',
    tagline: 'Scale social advertising',
    description: 'Manage and optimize your Meta, LinkedIn, and TikTok ad campaigns with cross-platform analytics, creative insights, and audience optimization.',
    icon: Users,
    color: 'indigo',
    platforms: ['Meta Ads', 'LinkedIn Ads', 'TikTok Ads'],
    features: [
      {
        icon: Eye,
        name: 'Creative Performance',
        description: 'Track creative fatigue, identify top performers, and get AI-powered suggestions for new creatives.',
      },
      {
        icon: Users,
        name: 'Audience Insights',
        description: 'Analyze audience performance, find overlaps, and discover new targeting opportunities.',
      },
      {
        icon: DollarSign,
        name: 'Budget Allocation',
        description: 'Automatically shift budget to top-performing campaigns and ad sets.',
      },
      {
        icon: TrendingUp,
        name: 'Cross-Platform Reporting',
        description: 'Unified metrics across all social platforms in a single dashboard.',
      },
      {
        icon: Sparkles,
        name: 'Ad Copy Generator',
        description: 'AI-powered ad copy suggestions based on your best-performing ads.',
      },
      {
        icon: Zap,
        name: 'Automated Scaling',
        description: 'Rules to automatically scale winning ads and pause underperformers.',
      },
    ],
    stats: [
      { value: '41%', label: 'ROAS improvement' },
      { value: '3x', label: 'Faster reporting' },
      { value: '25%', label: 'CPM reduction' },
    ],
  },
  marketplace: {
    name: 'Marketplace',
    tagline: 'Win on Amazon & beyond',
    description: 'Optimize your Amazon Ads, Walmart Connect, and other marketplace advertising with specialized tools for e-commerce success.',
    icon: ShoppingCart,
    color: 'orange',
    platforms: ['Amazon Ads', 'Walmart Connect'],
    features: [
      {
        icon: Target,
        name: 'Keyword Harvesting',
        description: 'Automatically discover converting search terms and add them as keywords.',
      },
      {
        icon: DollarSign,
        name: 'ACoS Optimization',
        description: 'Smart bid management to hit your target ACoS while maximizing sales.',
      },
      {
        icon: BarChart3,
        name: 'Product Analytics',
        description: 'Track ASIN-level performance with profit margin analysis.',
      },
      {
        icon: Shield,
        name: 'Budget Protection',
        description: 'Prevent overspend with daily caps and automatic campaign pausing.',
      },
      {
        icon: TrendingUp,
        name: 'Competitor Monitoring',
        description: 'Track competitor ad positions and adjust your strategy accordingly.',
      },
      {
        icon: Zap,
        name: 'Dayparting',
        description: 'Optimize bids by time of day based on historical conversion patterns.',
      },
    ],
    stats: [
      { value: '38%', label: 'ACoS reduction' },
      { value: '52%', label: 'Sales increase' },
      { value: '60%', label: 'Time saved' },
    ],
  },
};

type ProductType = keyof typeof products;

export function generateStaticParams() {
  return Object.keys(products).map((type) => ({ type }));
}

export default async function ProductTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  
  if (!Object.keys(products).includes(type)) {
    notFound();
  }

  const product = products[type as ProductType];
  const colorClasses = {
    blue: 'from-blue-600 to-blue-700',
    indigo: 'from-indigo-600 to-indigo-700',
    orange: 'from-orange-500 to-orange-600',
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
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses[product.color as keyof typeof colorClasses]} mb-6`}>
                <product.icon className="w-8 h-8 text-white" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-4">
                {product.name}
              </h1>
              
              <p className="text-2xl text-gray-600 mb-4">{product.tagline}</p>
              
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                {product.description}
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {product.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700"
                  >
                    {platform}
                  </span>
                ))}
              </div>

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
              {product.stats.map((stat) => (
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
                Powerful features for {product.name.toLowerCase()}
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to optimize your {product.platforms.join(' and ')} campaigns.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.features.map((feature) => (
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

        {/* CTA */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`bg-gradient-to-br ${colorClasses[product.color as keyof typeof colorClasses]} rounded-3xl p-8 md:p-16 text-center text-white`}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to optimize your {product.name.toLowerCase()}?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Start your free 14-day trial and see results in your first week.
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
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm opacity-90">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  14-day free trial
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  No credit card required
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Other Products */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Explore other products
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(products)
                .filter(([key]) => key !== type)
                .map(([key, prod]) => (
                  <Link
                    key={key}
                    href={`/products/${key}`}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                      <prod.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {prod.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{prod.tagline}</p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
    </main>
  );
}


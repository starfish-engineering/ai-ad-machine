import Link from 'next/link';
import { Button } from '@/components/ui';
import { ArrowRight, TrendingUp, Clock, DollarSign } from 'lucide-react';

const caseStudies = [
  {
    company: 'Growth Agency Co.',
    industry: 'Digital Agency',
    logo: '🚀',
    headline: 'How Growth Agency Co. scaled to 500 accounts with AdPilot',
    excerpt: 'Learn how this fast-growing agency used AdPilot automation to manage 10x more accounts without adding headcount.',
    stats: [
      { value: '500+', label: 'Accounts managed', icon: TrendingUp },
      { value: '60%', label: 'Time saved', icon: Clock },
      { value: '35%', label: 'ROAS improvement', icon: DollarSign },
    ],
    tags: ['Automation', 'Scaling'],
  },
  {
    company: 'E-Shop Direct',
    industry: 'E-commerce',
    logo: '🛒',
    headline: 'E-Shop Direct reduced ACoS by 40% with smart automation',
    excerpt: 'See how this e-commerce brand used AdPilot to optimize their Amazon advertising and dramatically improve profitability.',
    stats: [
      { value: '40%', label: 'ACoS reduction', icon: TrendingUp },
      { value: '$2M+', label: 'Ad spend managed', icon: DollarSign },
      { value: '15hrs', label: 'Saved weekly', icon: Clock },
    ],
    tags: ['Amazon Ads', 'E-commerce'],
  },
  {
    company: 'SaaS Metrics',
    industry: 'B2B SaaS',
    logo: '📊',
    headline: 'SaaS Metrics improved lead quality by 45% with AdPilot',
    excerpt: 'This B2B SaaS company used our AI insights to optimize their Google Ads campaigns for better quality leads.',
    stats: [
      { value: '45%', label: 'Better lead quality', icon: TrendingUp },
      { value: '28%', label: 'Lower CPA', icon: DollarSign },
      { value: '3x', label: 'Faster reporting', icon: Clock },
    ],
    tags: ['Google Ads', 'B2B'],
  },
  {
    company: 'Local Home Services',
    industry: 'Home Services',
    logo: '🏠',
    headline: 'Local business generated 3x more leads with budget protection',
    excerpt: 'Learn how this local service company used AdPilot\'s budget monitoring to prevent overspend while growing leads.',
    stats: [
      { value: '3x', label: 'More leads', icon: TrendingUp },
      { value: '$0', label: 'Overspend', icon: DollarSign },
      { value: '24/7', label: 'Monitoring', icon: Clock },
    ],
    tags: ['Local Business', 'Budget Protection'],
  },
  {
    company: 'Fashion Forward',
    industry: 'Retail',
    logo: '👗',
    headline: 'Fashion brand achieved 4.5x ROAS across social platforms',
    excerpt: 'See how this fashion retailer used AdPilot to optimize their Meta and TikTok campaigns for maximum return.',
    stats: [
      { value: '4.5x', label: 'ROAS achieved', icon: TrendingUp },
      { value: '50%', label: 'Creative test velocity', icon: Clock },
      { value: '32%', label: 'Lower CPM', icon: DollarSign },
    ],
    tags: ['Social Ads', 'Retail'],
  },
  {
    company: 'Tech Startup Inc.',
    industry: 'Technology',
    logo: '💻',
    headline: 'Startup cut customer acquisition costs by 55%',
    excerpt: 'How this Series A startup used AdPilot\'s AI recommendations to dramatically improve their paid acquisition efficiency.',
    stats: [
      { value: '55%', label: 'Lower CAC', icon: DollarSign },
      { value: '2x', label: 'Conversion rate', icon: TrendingUp },
      { value: '8hrs', label: 'Saved weekly', icon: Clock },
    ],
    tags: ['Startups', 'AI Insights'],
  },
];

const industries = ['All Industries', 'Agency', 'E-commerce', 'B2B SaaS', 'Retail', 'Local Business'];

export default function CaseStudiesPage() {
  return (
    <main className="pt-32">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-full blur-3xl opacity-60" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Customer Success Stories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              See how leading teams use AdPilot to transform their PPC results.
            </p>
            
            {/* Industry Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {industries.map((industry, index) => (
                <button
                  key={industry}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    index === 0
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((study) => (
                <Link
                  key={study.company}
                  href="/case-studies"
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
                        {study.logo}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{study.company}</h3>
                        <p className="text-sm text-gray-500">{study.industry}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {study.headline}
                    </h2>
                    <p className="text-gray-600 mb-6">{study.excerpt}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {study.stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <stat.icon className="w-4 h-4 text-blue-600 mr-1" />
                            <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                          </div>
                          <span className="text-xs text-gray-500">{stat.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 pb-6">
                    <span className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                      Read case study
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-16 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to become our next success story?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of teams already using AdPilot to transform their PPC results.
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
                <Link href="/demo">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
}


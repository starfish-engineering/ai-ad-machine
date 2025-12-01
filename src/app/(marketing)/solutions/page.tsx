import Link from 'next/link';
import { Button } from '@/components/ui';
import {
  Activity,
  Zap,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const solutions = [
  {
    icon: Activity,
    name: 'Monitoring',
    href: '/solutions/monitoring',
    description: 'Real-time campaign tracking with intelligent alerts and anomaly detection.',
    features: [
      'Live performance dashboards',
      'Smart alert system',
      'Budget pacing & protection',
      'Cross-account monitoring',
    ],
  },
  {
    icon: Zap,
    name: 'Automation',
    href: '/solutions/automation',
    description: 'Powerful automation rules to optimize campaigns around the clock.',
    features: [
      'Custom automation rules',
      'Scheduled tasks',
      'Express optimizations',
      'Bulk operations',
    ],
  },
  {
    icon: FileText,
    name: 'Reporting',
    href: '/solutions/reporting',
    description: 'Beautiful, customizable reports that tell the story of your campaigns.',
    features: [
      'Custom report builder',
      'Scheduled exports',
      'White-label branding',
      'Cross-platform analytics',
    ],
  },
  {
    icon: Sparkles,
    name: 'Analysis',
    href: '/solutions/analysis',
    description: 'AI-powered insights and recommendations to improve performance.',
    features: [
      'AI Sidekick assistant',
      'PPC Investigator',
      'Performance forecasting',
      'Opportunity detection',
    ],
  },
];

export default function SolutionsPage() {
  return (
    <main className="pt-32">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-full blur-3xl opacity-60" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Solutions for every{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PPC challenge
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Whether you need to monitor campaigns, automate tasks, generate reports, or get AI insights — AdPilot has you covered.
            </p>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {solutions.map((solution) => (
                <Link
                  key={solution.name}
                  href={solution.href}
                  className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                    <solution.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {solution.name}
                  </h2>
                  
                  <p className="text-gray-600 mb-6">{solution.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <span className="inline-flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-16 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to solve your PPC challenges?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Start your free 14-day trial and experience all solutions today.
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


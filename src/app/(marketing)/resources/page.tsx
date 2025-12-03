import Link from 'next/link';
import { Button } from '@/components/ui';
import {
  FileText,
  BookOpen,
  Video,
  Newspaper,
  ArrowRight,
  Trophy,
  Code,
  Users,
} from 'lucide-react';

const resources = [
  {
    icon: Newspaper,
    name: 'Blog',
    href: '/blog',
    description: 'PPC insights, tips, and industry news from our team of experts.',
    cta: 'Read articles',
  },
  {
    icon: Trophy,
    name: 'Case Studies',
    href: '/case-studies',
    description: 'See how leading teams use Draper to transform their PPC results.',
    cta: 'View case studies',
  },
  {
    icon: BookOpen,
    name: 'Documentation',
    href: '/docs',
    description: 'Comprehensive guides and tutorials to help you get the most from Draper.',
    cta: 'Browse docs',
  },
  {
    icon: Code,
    name: 'API Reference',
    href: '/docs/api',
    description: 'Build custom integrations with our powerful REST API.',
    cta: 'View API docs',
  },
];

const featuredPosts = [
  {
    title: '10 PPC Automation Rules Every Marketer Needs',
    excerpt: 'Discover the automation rules that save our customers hours every week.',
    category: 'Automation',
    date: 'Nov 15, 2025',
    href: '/blog',
  },
  {
    title: 'The Complete Guide to Budget Pacing',
    excerpt: 'Learn how to pace your ad spend effectively and never overspend again.',
    category: 'Strategy',
    date: 'Nov 10, 2025',
    href: '/blog',
  },
  {
    title: 'How Agency X Scaled to 500 Accounts',
    excerpt: 'A case study on using Draper to manage massive account portfolios.',
    category: 'Case Study',
    date: 'Nov 5, 2025',
    href: '/case-studies',
  },
];

const webinars = [
  {
    title: 'Getting Started with Draper',
    description: 'A complete walkthrough for new users',
    duration: '45 min',
  },
  {
    title: 'Advanced Automation Strategies',
    description: 'Take your automation to the next level',
    duration: '60 min',
  },
  {
    title: 'Reporting Best Practices',
    description: 'Create reports that clients love',
    duration: '30 min',
  },
];

export default function ResourcesPage() {
  return (
    <main className="pt-32">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-full blur-3xl opacity-60" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to master PPC management with Draper.
            </p>
          </div>
        </section>

        {/* Resource Cards */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource) => (
                <Link
                  key={resource.name}
                  href={resource.href}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <resource.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {resource.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  <span className="inline-flex items-center gap-1 text-blue-600 font-medium text-sm">
                    {resource.cta}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Content */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured content</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Link
                  key={post.title}
                  href={post.href}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-indigo-100" />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-600">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Webinars */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
                  <Video className="w-4 h-4" />
                  On-Demand Webinars
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Learn from the experts
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Watch our library of webinars to learn PPC strategies and Draper best practices.
                </p>
                <Link href="/demo">
                  <Button variant="outline" className="gap-2">
                    Browse webinars
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {webinars.map((webinar) => (
                  <div
                    key={webinar.title}
                    className="bg-white rounded-xl p-5 border border-gray-200 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Video className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{webinar.title}</h3>
                      <p className="text-sm text-gray-500">{webinar.description}</p>
                    </div>
                    <span className="text-sm text-gray-400">{webinar.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Community */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Users className="w-12 h-12 mx-auto mb-6 text-blue-400" />
            <h2 className="text-3xl font-bold mb-4">Join the community</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Connect with thousands of PPC professionals using Draper. Share strategies, ask questions, and learn from each other.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Join Slack Community
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                Follow on Twitter
              </Button>
            </div>
          </div>
        </section>
    </main>
  );
}


import Link from 'next/link';
import { Button } from '@/components/ui';
import { ArrowRight, Search } from 'lucide-react';

const categories = [
  'All',
  'Automation',
  'Strategy',
  'Platform Updates',
  'Case Studies',
  'Industry News',
];

const featuredPost = {
  title: 'The Future of PPC: How AI is Changing Campaign Management',
  excerpt: 'Artificial intelligence is transforming how we manage paid media campaigns. Learn what this means for PPC professionals and how to stay ahead of the curve.',
  category: 'Industry News',
  date: 'Nov 20, 2025',
  author: {
    name: 'Sarah Chen',
    role: 'Head of Product',
  },
  readTime: '8 min read',
};

const posts = [
  {
    title: '10 PPC Automation Rules Every Marketer Needs',
    excerpt: 'Discover the automation rules that save our customers hours every week.',
    category: 'Automation',
    date: 'Nov 15, 2025',
    readTime: '6 min read',
  },
  {
    title: 'The Complete Guide to Budget Pacing',
    excerpt: 'Learn how to pace your ad spend effectively and never overspend again.',
    category: 'Strategy',
    date: 'Nov 10, 2025',
    readTime: '10 min read',
  },
  {
    title: 'New: AI Sidekick Now Available',
    excerpt: 'Introducing our AI assistant that helps you analyze and optimize campaigns.',
    category: 'Platform Updates',
    date: 'Nov 5, 2025',
    readTime: '4 min read',
  },
  {
    title: 'How to Structure Your Google Ads Account for Success',
    excerpt: 'Account structure can make or break your campaigns. Here\'s the optimal approach.',
    category: 'Strategy',
    date: 'Nov 1, 2025',
    readTime: '12 min read',
  },
  {
    title: 'Understanding Performance Max Campaigns',
    excerpt: 'A deep dive into Google\'s Performance Max and how to make it work for you.',
    category: 'Strategy',
    date: 'Oct 28, 2025',
    readTime: '9 min read',
  },
  {
    title: 'Automation vs. Manual Optimization: Finding the Balance',
    excerpt: 'When should you automate and when should you stay hands-on? We break it down.',
    category: 'Automation',
    date: 'Oct 25, 2025',
    readTime: '7 min read',
  },
  {
    title: 'Q3 Platform Updates Roundup',
    excerpt: 'All the major changes to Google, Meta, and Microsoft Ads in the last quarter.',
    category: 'Industry News',
    date: 'Oct 20, 2025',
    readTime: '5 min read',
  },
  {
    title: 'Setting Up Effective PPC Alerts',
    excerpt: 'Never miss a performance drop again with properly configured alerts.',
    category: 'Automation',
    date: 'Oct 15, 2025',
    readTime: '6 min read',
  },
];

export default function BlogPage() {
  return (
    <main className="pt-32">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-full blur-3xl opacity-60" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
                Draper Blog
              </h1>
              <p className="text-xl text-gray-600">
                Insights, strategies, and updates from the Draper team.
              </p>
            </div>

            {/* Search */}
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    index === 0
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="block group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                  <div className="text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full">
                        Featured
                      </span>
                      <span className="text-sm text-blue-200">{featuredPost.date}</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:underline">
                      {featuredPost.title}
                    </h2>
                    <p className="text-blue-100 mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/20 rounded-full" />
                      <div>
                        <div className="font-medium">{featuredPost.author.name}</div>
                        <div className="text-sm text-blue-200">{featuredPost.author.role}</div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="bg-white/10 rounded-xl aspect-video" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.title}
                  href="/blog"
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200" />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="text-xs text-gray-500">{post.date}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <Button variant="outline" className="gap-2">
                Load more articles
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Subscribe to our newsletter
              </h2>
              <p className="text-gray-600 mb-6">
                Get the latest PPC insights and Draper updates delivered to your inbox.
              </p>
              <form className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button type="submit">Subscribe</Button>
              </form>
              <p className="mt-3 text-xs text-gray-500">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
    </main>
  );
}


import Link from 'next/link';
import { Button } from '@/components/ui';
import {
  Handshake,
  Building2,
  Code,
  GraduationCap,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Users,
  Zap,
  Globe,
} from 'lucide-react';

const partnerTypes = [
  {
    icon: Building2,
    title: 'Agency Partners',
    description: 'For digital marketing agencies managing client ad accounts.',
    benefits: [
      'Revenue share on client referrals',
      'Priority support for your clients',
      'Co-marketing opportunities',
      'Partner certification & badge',
      'Early access to new features',
    ],
    cta: 'Become an Agency Partner',
  },
  {
    icon: Code,
    title: 'Technology Partners',
    description: 'For platforms and tools that integrate with AdPilot.',
    benefits: [
      'API access and support',
      'Joint product development',
      'Co-marketing campaigns',
      'Integration marketplace listing',
      'Technical documentation',
    ],
    cta: 'Explore Integration',
  },
  {
    icon: GraduationCap,
    title: 'Affiliate Partners',
    description: 'For influencers and educators in the PPC space.',
    benefits: [
      '20% recurring commission',
      'Custom tracking links',
      'Marketing materials',
      'Monthly payouts',
      'Dedicated affiliate manager',
    ],
    cta: 'Join Affiliate Program',
  },
];

const stats = [
  { value: '500+', label: 'Active Partners' },
  { value: '$5M+', label: 'Partner Earnings' },
  { value: '50+', label: 'Countries' },
  { value: '95%', label: 'Partner Satisfaction' },
];

const featuredPartners = [
  { name: 'Growth Marketing Agency', type: 'Agency Partner', logo: '🚀' },
  { name: 'Analytics Platform', type: 'Technology Partner', logo: '📊' },
  { name: 'PPC Training Academy', type: 'Affiliate Partner', logo: '🎓' },
  { name: 'Digital Consultancy', type: 'Agency Partner', logo: '💼' },
  { name: 'Marketing SaaS', type: 'Technology Partner', logo: '⚡' },
  { name: 'Ad Tech Solutions', type: 'Technology Partner', logo: '🔧' },
];

const testimonials = [
  {
    quote: "Partnering with AdPilot has been a game-changer for our agency. Our clients love the platform and we've grown our revenue significantly.",
    author: 'Jennifer Martinez',
    role: 'CEO',
    company: 'Growth Digital Agency',
  },
  {
    quote: "The integration process was smooth and the AdPilot team was incredibly supportive. Our customers now have access to powerful PPC automation.",
    author: 'David Kim',
    role: 'CTO',
    company: 'Marketing Analytics Co',
  },
];

export default function PartnersPage() {
  return (
    <main className="pt-32">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-full blur-3xl opacity-60" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Handshake className="w-4 h-4" />
              Partner Program
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Grow with AdPilot
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join our partner ecosystem and unlock new opportunities for growth. 
              Whether you&apos;re an agency, technology provider, or affiliate, we have a program for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Become a Partner
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Partnerships Team
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
                  <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Types */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Partner programs</h2>
              <p className="text-lg text-gray-600">
                Find the partnership that&apos;s right for you.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {partnerTypes.map((type) => (
                <div
                  key={type.title}
                  className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <type.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-gray-600 mb-6">{type.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {type.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full">{type.cta}</Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Partner */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why partner with AdPilot?</h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: DollarSign,
                      title: 'Revenue Opportunity',
                      description: 'Earn recurring commissions and unlock new revenue streams.',
                    },
                    {
                      icon: Users,
                      title: 'World-Class Support',
                      description: 'Dedicated partner success team to help you grow.',
                    },
                    {
                      icon: Zap,
                      title: 'Leading Technology',
                      description: 'Partner with the fastest-growing PPC platform.',
                    },
                    {
                      icon: Globe,
                      title: 'Global Community',
                      description: 'Join 500+ partners in 50+ countries.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-200 rounded-2xl aspect-square flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Handshake className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Partnership Benefits</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Partners */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured partners</h2>
              <p className="text-lg text-gray-600">
                Join these industry leaders in our partner ecosystem.
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              {featuredPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="bg-white rounded-xl p-6 border border-gray-200 text-center"
                >
                  <div className="text-4xl mb-3">{partner.logo}</div>
                  <h3 className="font-medium text-gray-900 text-sm">{partner.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{partner.type}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">What our partners say</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="bg-gray-800 rounded-xl p-8"
                >
                  <blockquote className="text-lg text-gray-300 mb-6">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-full" />
                    <div>
                      <div className="font-medium text-white">{testimonial.author}</div>
                      <div className="text-sm text-gray-400">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-16 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to partner with us?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Apply to join our partner program today and start growing your business with AdPilot.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 gap-2"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Talk to Partnerships
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
}


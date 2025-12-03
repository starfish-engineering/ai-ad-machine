import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Building2, Users, User, Briefcase, ArrowRight, 
  CheckCircle2, BarChart3, Clock, Shield, Zap, Target
} from 'lucide-react';
import { Button } from '@/components/ui';

const roles = {
  agencies: {
    icon: Building2,
    title: 'For Agencies',
    headline: 'Scale your agency without scaling your team',
    subheadline: 'Manage hundreds of client accounts efficiently with powerful automation and white-label reporting.',
    heroImage: '/images/agency-hero.png',
    stats: [
      { value: '60%', label: 'Less time on routine tasks' },
      { value: '3x', label: 'More accounts per manager' },
      { value: '40%', label: 'Faster client reporting' },
    ],
    benefits: [
      {
        icon: Users,
        title: 'Multi-client management',
        description: 'View all client accounts in one dashboard. Filter, sort, and prioritize work across your entire portfolio.',
      },
      {
        icon: BarChart3,
        title: 'White-label reporting',
        description: 'Generate beautiful, branded reports for clients. Schedule automatic delivery and customize every detail.',
      },
      {
        icon: Clock,
        title: 'Time-saving automation',
        description: 'Set up rules once, apply them across accounts. Bulk optimizations that would take hours done in seconds.',
      },
      {
        icon: Shield,
        title: 'Client-safe guardrails',
        description: 'Prevent costly mistakes with spend limits, approval workflows, and role-based access controls.',
      },
    ],
    useCases: [
      'Manage 50+ accounts with a small team',
      'Deliver monthly reports automatically',
      'Scale standard optimizations across clients',
      'Onboard new clients in minutes, not days',
    ],
    testimonial: {
      quote: "Draper lets our team of 5 manage over 100 accounts. We've grown revenue 40% without adding headcount.",
      author: 'Sarah Chen',
      role: 'Director of Paid Media',
      company: 'Growth Marketing Agency',
    },
    cta: 'Start Agency Trial',
    ctaLink: '/signup?type=agency',
  },
  freelancers: {
    icon: User,
    title: 'For Freelancers',
    headline: 'Punch above your weight class',
    subheadline: 'Deliver enterprise-level results for your clients with AI-powered tools that multiply your impact.',
    heroImage: '/images/freelancer-hero.png',
    stats: [
      { value: '10+', label: 'Hours saved per week' },
      { value: '2x', label: 'Client capacity' },
      { value: '$99', label: 'Starting price' },
    ],
    benefits: [
      {
        icon: Zap,
        title: 'Express optimizations',
        description: 'One-click fixes for common issues. Spend less time on tedious tasks and more time on strategy.',
      },
      {
        icon: BarChart3,
        title: 'Professional reporting',
        description: 'Impress clients with polished reports. Add your branding and deliver automatically.',
      },
      {
        icon: Target,
        title: 'Proactive monitoring',
        description: 'Get alerts before problems become emergencies. Stay on top of all your accounts effortlessly.',
      },
      {
        icon: Clock,
        title: 'Work smarter, not harder',
        description: 'Automation handles the routine work while you focus on high-value strategy and client relationships.',
      },
    ],
    useCases: [
      'Take on more clients without burning out',
      'Deliver faster results and build reputation',
      'Automate reporting and reclaim your weekends',
      'Look like a team of experts as a solo operator',
    ],
    testimonial: {
      quote: "As a freelancer, Draper is like having a team of analysts working for me 24/7. It's my secret weapon.",
      author: 'Mike Rodriguez',
      role: 'Independent PPC Consultant',
      company: '',
    },
    cta: 'Start Free Trial',
    ctaLink: '/signup?type=freelancer',
  },
  'in-house': {
    icon: Briefcase,
    title: 'For In-House Teams',
    headline: 'Do more with your marketing budget',
    subheadline: 'Maximize ROAS and prove your value with comprehensive monitoring, optimization, and reporting.',
    heroImage: '/images/inhouse-hero.png',
    stats: [
      { value: '25%', label: 'Average ROAS improvement' },
      { value: '80%', label: 'Faster issue detection' },
      { value: '5x', label: 'Faster reporting' },
    ],
    benefits: [
      {
        icon: Shield,
        title: 'Budget protection',
        description: "Never wake up to a blown budget again. Automatic pacing alerts and spend limits keep you safe.",
      },
      {
        icon: BarChart3,
        title: 'Executive dashboards',
        description: 'Create beautiful dashboards that non-marketers understand. Prove your value to leadership.',
      },
      {
        icon: Target,
        title: 'Goal tracking',
        description: 'Set targets, track progress, and get alerts when you\'re off pace. Stay aligned with business objectives.',
      },
      {
        icon: Zap,
        title: 'Continuous optimization',
        description: 'AI-powered suggestions and automation ensure your campaigns are always improving.',
      },
    ],
    useCases: [
      'Protect brand reputation with always-on monitoring',
      'Generate reports for weekly leadership meetings',
      'Scale optimizations without expanding the team',
      'Prove marketing ROI with clear attribution',
    ],
    testimonial: {
      quote: "Draper helped us reduce CPA by 30% in Q1. The executive dashboards made it easy to show our impact.",
      author: 'Alex Thompson',
      role: 'Performance Marketing Manager',
      company: 'E-commerce Brand',
    },
    cta: 'Start Team Trial',
    ctaLink: '/signup?type=in-house',
  },
  enterprise: {
    icon: Building2,
    title: 'For Enterprise',
    headline: 'PPC management at enterprise scale',
    subheadline: 'Unified platform for global teams with advanced security, compliance, and dedicated support.',
    heroImage: '/images/enterprise-hero.png',
    stats: [
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '24/7', label: 'Priority support' },
      { value: 'SOC 2', label: 'Compliant' },
    ],
    benefits: [
      {
        icon: Shield,
        title: 'Enterprise security',
        description: 'SOC 2 Type II certified. SSO, 2FA, and comprehensive audit logs. Your data is protected.',
      },
      {
        icon: Users,
        title: 'Team management',
        description: 'Advanced roles and permissions. Organize by team, region, or brand. Full visibility and control.',
      },
      {
        icon: Target,
        title: 'Custom solutions',
        description: 'API access, custom integrations, and tailored workflows. We adapt to how you work.',
      },
      {
        icon: BarChart3,
        title: 'Cross-channel insights',
        description: 'Unified reporting across all platforms and regions. Break down silos and see the full picture.',
      },
    ],
    useCases: [
      'Manage global campaigns across regions',
      'Ensure brand consistency with approval workflows',
      'Integrate with existing marketing stack',
      'Meet compliance and security requirements',
    ],
    testimonial: {
      quote: "The enterprise security features and dedicated support made Draper the clear choice for our global marketing team.",
      author: 'Jennifer Lee',
      role: 'VP of Digital Marketing',
      company: 'Fortune 500 Retailer',
    },
    cta: 'Contact Sales',
    ctaLink: '/contact?type=enterprise',
  },
};

type RoleKey = keyof typeof roles;

export default async function RolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  
  if (!(role in roles)) {
    notFound();
  }
  
  const data = roles[role as RoleKey];
  const IconComponent = data.icon;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm mb-6">
              <IconComponent className="w-4 h-4" />
              {data.title}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {data.headline}
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              {data.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={data.ctaLink}>
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                  {data.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
            {data.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for your needs
            </h2>
            <p className="text-xl text-gray-600">
              Features and workflows designed specifically for your role.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {data.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Common use cases
              </h2>
              <ul className="space-y-4">
                {data.useCases.map((useCase) => (
                  <li key={useCase} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                <IconComponent className="w-16 h-16 text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <blockquote className="text-2xl text-gray-700 mb-6 italic">
              "{data.testimonial.quote}"
            </blockquote>
            <div>
              <div className="font-semibold text-gray-900">{data.testimonial.author}</div>
              <div className="text-gray-600">
                {data.testimonial.role}
                {data.testimonial.company && `, ${data.testimonial.company}`}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of PPC professionals who trust Draper.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={data.ctaLink}>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  {data.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return Object.keys(roles).map((role) => ({ role }));
}


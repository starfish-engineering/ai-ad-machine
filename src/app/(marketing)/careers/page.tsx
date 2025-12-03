import Link from 'next/link';
import { Button } from '@/components/ui';
import {
  MapPin,
  Briefcase,
  Clock,
  Heart,
  Zap,
  Users,
  Globe,
  Coffee,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const benefits = [
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive health, dental, and vision insurance for you and your family.',
  },
  {
    icon: Globe,
    title: 'Remote First',
    description: 'Work from anywhere in the world. We believe in flexibility and trust.',
  },
  {
    icon: Clock,
    title: 'Unlimited PTO',
    description: 'Take the time you need to recharge. We trust you to manage your schedule.',
  },
  {
    icon: Zap,
    title: 'Learning Budget',
    description: '$2,000 annual budget for courses, conferences, and professional development.',
  },
  {
    icon: Coffee,
    title: 'Home Office Setup',
    description: '$1,500 to set up your perfect home office environment.',
  },
  {
    icon: Users,
    title: 'Team Retreats',
    description: 'Annual company retreats to connect with your teammates in person.',
  },
];

const openPositions = [
  {
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'Remote (US/EU)',
    type: 'Full-time',
    description: 'Build and scale our core platform features using React, Node.js, and PostgreSQL.',
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote (US/EU)',
    type: 'Full-time',
    description: 'Design beautiful, intuitive interfaces for PPC professionals.',
  },
  {
    title: 'Machine Learning Engineer',
    department: 'Engineering',
    location: 'Remote (Worldwide)',
    type: 'Full-time',
    description: 'Build AI models that power our recommendation and anomaly detection systems.',
  },
  {
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Help our customers succeed and get the most value from Draper.',
  },
  {
    title: 'Content Marketing Manager',
    department: 'Marketing',
    location: 'Remote (US/EU)',
    type: 'Full-time',
    description: 'Create compelling content that educates and engages PPC professionals.',
  },
  {
    title: 'Sales Development Representative',
    department: 'Sales',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Generate and qualify leads for our sales team.',
  },
];

const values = [
  {
    title: 'Customer Obsessed',
    description: 'Everything we do starts with our customers. Their success is our success.',
  },
  {
    title: 'Move Fast',
    description: 'We ship early and iterate. Perfect is the enemy of good.',
  },
  {
    title: 'Own It',
    description: 'Take ownership of problems and see them through to resolution.',
  },
  {
    title: 'Be Transparent',
    description: 'Share information openly and communicate with honesty.',
  },
];

export default function CareersPage() {
  return (
    <main className="pt-32">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-full blur-3xl opacity-60" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Briefcase className="w-4 h-4" />
              We&apos;re hiring!
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Join the team building the{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                future of PPC
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We&apos;re on a mission to help marketers work smarter, not harder. 
              Come build something meaningful with us.
            </p>
            <Button size="lg" className="gap-2">
              View open positions
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our values</h2>
              <p className="text-lg text-gray-600">
                The principles that guide how we work together.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits & perks</h2>
              <p className="text-lg text-gray-600">
                We take care of our team so they can do their best work.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-gray-50" id="positions">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Open positions</h2>
              <p className="text-lg text-gray-600">
                Find your next role at Draper.
              </p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {openPositions.map((position) => (
                <div
                  key={position.title}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {position.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{position.description}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                          <Briefcase className="w-3 h-3" />
                          {position.department}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {position.location}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hiring Process */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our hiring process</h2>
                <p className="text-gray-600 mb-8">
                  We keep things simple and respectful of your time. Here&apos;s what to expect:
                </p>
                <ul className="space-y-4">
                  {[
                    { step: '1', title: 'Application Review', description: 'We review every application within 5 business days.' },
                    { step: '2', title: 'Intro Call', description: '30-minute call with our recruiting team to learn about you.' },
                    { step: '3', title: 'Technical/Role Interview', description: 'Deep dive into your skills with the hiring manager.' },
                    { step: '4', title: 'Team Interviews', description: 'Meet the people you\'ll be working with.' },
                    { step: '5', title: 'Offer', description: 'If it\'s a fit, we\'ll make you an offer within 48 hours.' },
                  ].map((item) => (
                    <li key={item.step} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Team Photo</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Don&apos;t see the right role?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              We&apos;re always looking for talented people. Send us your resume and we&apos;ll 
              reach out when we have a role that fits.
            </p>
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Send us your resume
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
    </main>
  );
}


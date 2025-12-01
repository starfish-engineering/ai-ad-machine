'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  Play,
  Building2,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: '30-minute session',
    description: 'Get a comprehensive overview of AdPilot tailored to your needs.',
  },
  {
    icon: Users,
    title: 'Live Q&A',
    description: 'Ask questions and get answers from our product experts.',
  },
  {
    icon: CheckCircle,
    title: 'Custom walkthrough',
    description: 'See how AdPilot can solve your specific PPC challenges.',
  },
];

const demoTopics = [
  'Real-time campaign monitoring and alerts',
  'Automation rules and scheduled optimizations',
  'AI-powered recommendations and insights',
  'Budget pacing and spend protection',
  'Express optimizations workflow',
  'Reporting and analytics dashboards',
  'Team collaboration features',
  'Integration with ad platforms',
];

export default function DemoPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    adSpend: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="pt-32">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-full blur-3xl opacity-60" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column - Info */}
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
                  <Play className="w-4 h-4" />
                  Live Product Demo
                </div>
                
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
                  See AdPilot in action
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Schedule a personalized demo with our team and discover how AdPilot can transform your PPC management workflow.
                </p>

                <div className="space-y-4 mb-12">
                  {benefits.map((benefit) => (
                    <div key={benefit.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">What we'll cover:</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {demoTopics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Demo request received!</h2>
                    <p className="text-gray-600 mb-6">
                      Our team will reach out within 24 hours to schedule your personalized demo.
                    </p>
                    <Link href="/">
                      <Button variant="outline">Back to Home</Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-6">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <h2 className="text-xl font-semibold text-gray-900">Book your demo</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First name *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last name *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Work email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                          Company *
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            id="company"
                            name="company"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="adSpend" className="block text-sm font-medium text-gray-700 mb-1">
                          Monthly ad spend *
                        </label>
                        <select
                          id="adSpend"
                          name="adSpend"
                          required
                          value={formData.adSpend}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select range</option>
                          <option value="0-10k">$0 - $10,000</option>
                          <option value="10k-50k">$10,000 - $50,000</option>
                          <option value="50k-100k">$50,000 - $100,000</option>
                          <option value="100k-500k">$100,000 - $500,000</option>
                          <option value="500k+">$500,000+</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          What would you like to see in the demo?
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <textarea
                            id="message"
                            name="message"
                            rows={3}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Tell us about your PPC challenges..."
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Request Demo'}
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        By submitting this form, you agree to our{' '}
                        <Link href="/privacy" className="underline hover:text-gray-700">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
    </main>
  );
}


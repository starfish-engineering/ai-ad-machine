import Link from 'next/link';
import { ArrowRight, Users, Target, Heart, Rocket } from 'lucide-react';
import { Button } from '@/components/ui';

const values = [
  {
    icon: Users,
    title: 'Customer First',
    description: 'Every decision we make starts with asking "How does this help our customers succeed?"',
  },
  {
    icon: Target,
    title: 'Relentless Focus',
    description: 'We do one thing exceptionally well: making PPC management effortless and effective.',
  },
  {
    icon: Heart,
    title: 'Genuine Care',
    description: 'We treat every customer account like it\'s our own, because your success is our success.',
  },
  {
    icon: Rocket,
    title: 'Always Improving',
    description: 'The PPC landscape never stops evolving, and neither do we. Continuous improvement is in our DNA.',
  },
];

const timeline = [
  { year: '2020', event: 'Draper founded by PPC veterans frustrated with existing tools' },
  { year: '2021', event: 'Launched beta with 50 early adopter agencies' },
  { year: '2022', event: 'Reached 1,000 customers and $1B in managed ad spend' },
  { year: '2023', event: 'Introduced AI-powered features and Sidekick assistant' },
  { year: '2024', event: 'Expanded to 10,000+ customers worldwide' },
  { year: '2025', event: 'Launched enterprise tier and crossed $2B managed spend' },
];

const team = [
  { name: 'Alex Chen', role: 'CEO & Co-founder', bio: 'Former Google Ads PM, 15 years in PPC' },
  { name: 'Sarah Miller', role: 'CTO & Co-founder', bio: 'Ex-Amazon, built ads infrastructure at scale' },
  { name: 'Mike Thompson', role: 'VP Product', bio: 'Agency veteran, managed $100M+ in ad spend' },
  { name: 'Emily Davis', role: 'VP Engineering', bio: 'Ex-Meta, ML/AI specialist' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              We're building the future of{' '}
              <span className="text-blue-600">PPC management</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Draper was founded by PPC professionals who were tired of cobbling 
              together spreadsheets, scripts, and disparate tools. We knew there 
              had to be a better way.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                We believe PPC professionals should spend their time on strategy 
                and creative thinking, not manual data entry and repetitive tasks.
              </p>
              <p className="text-lg text-gray-600">
                Our mission is to automate the tedious parts of PPC management 
                so you can focus on what actually moves the needle for your 
                business or your clients.
              </p>
            </div>
            <div className="bg-blue-600 rounded-2xl p-8 text-white">
              <div className="text-6xl font-bold mb-4">10+</div>
              <div className="text-xl text-blue-100">
                Hours saved per week, on average, by our customers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={item.year} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {item.year.slice(-2)}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-blue-200 mt-2" />
                  )}
                </div>
                <div className="pt-3">
                  <div className="text-sm text-blue-600 font-medium mb-1">{item.year}</div>
                  <div className="text-lg text-gray-700">{item.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Built by PPC experts, for PPC experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                <div className="text-blue-600 text-sm font-medium mb-2">{member.role}</div>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join us on our mission
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We're always looking for talented people who share our passion for 
              making PPC management better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/careers">
                <Button size="lg">
                  View Open Positions
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


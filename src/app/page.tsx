import Link from 'next/link';
import { Button, Badge, KPICard } from '@/components/ui';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  BarChart3,
  Shield,
  Zap,
  Clock,
  TrendingUp,
  Users,
  ArrowRight,
  Play,
  Terminal,
  Activity,
  AlertTriangle,
  Database,
  Cpu,
  Signal,
  Eye,
} from 'lucide-react';

const features = [
  {
    icon: Activity,
    name: 'REAL-TIME_MONITOR',
    description: 'Track campaign performance 24/7 with intelligent alerts that notify you before issues escalate.',
    status: 'ACTIVE',
  },
  {
    icon: Zap,
    name: 'SMART_AUTOMATION',
    description: 'Set up powerful rules that optimize bids, budgets, and campaigns automatically.',
    status: 'ONLINE',
  },
  {
    icon: Shield,
    name: 'BUDGET_PROTECTION',
    description: 'Never wake up to a blown budget. Our guardrails keep your spend under control.',
    status: 'SECURED',
  },
  {
    icon: Cpu,
    name: 'AI_INSIGHTS',
    description: 'Get actionable recommendations powered by AI that learns from your campaigns.',
    status: 'LEARNING',
  },
  {
    icon: Clock,
    name: 'TIME_SAVINGS',
    description: 'Automate routine tasks and save 10+ hours per week on campaign management.',
    status: 'OPTIMIZED',
  },
  {
    icon: Users,
    name: 'TEAM_COLLAB',
    description: 'Manage multiple accounts and team members with role-based permissions.',
    status: 'SYNCED',
  },
];

const liveStats = [
  { label: 'TOTAL_AD_SPEND', value: '$2.4B', change: '+12.4%', type: 'positive' as const },
  { label: 'ACTIVE_ACCOUNTS', value: '10,847', change: '+847', type: 'positive' as const },
  { label: 'OPTIMIZATIONS', value: '2.1M', change: 'THIS_MONTH', type: 'neutral' as const },
  { label: 'AVG_ROAS', value: '3.2x', change: '+0.4x', type: 'positive' as const },
];

const testimonials = [
  {
    quote: "ADPILOT HAS COMPLETELY TRANSFORMED HOW WE MANAGE OUR CLIENTS' CAMPAIGNS. WE'VE CUT OPTIMIZATION TIME BY 60%.",
    author: 'SARAH_CHEN',
    role: 'DIRECTOR_PAID_MEDIA',
    company: 'GROWTH_AGENCY',
    metrics: { saved: '10h/week', roas: '+42%' },
  },
  {
    quote: "THE AUTOMATION RULES ALONE HAVE SAVED US COUNTLESS HOURS. IT'S LIKE HAVING AN EXTRA TEAM MEMBER WATCHING 24/7.",
    author: 'MIKE_RODRIGUEZ',
    role: 'PPC_MANAGER',
    company: 'ECOM_BRAND',
    metrics: { saved: '15h/week', roas: '+38%' },
  },
  {
    quote: "FINALLY, A PPC TOOL THAT'S POWERFUL ENOUGH FOR ADVANCED USERS BUT INTUITIVE ENOUGH TO ONBOARD QUICKLY.",
    author: 'ALEX_THOMPSON',
    role: 'FREELANCE_CONSULTANT',
    company: 'INDEPENDENT',
    metrics: { saved: '8h/week', roas: '+55%' },
  },
];

const trustedLogos = [
  'ACME_CORP', 'NEXUS_INC', 'QUANTUM_CO', 'VERTEX_LLC', 'CIPHER_IO', 'OMEGA_SYS',
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-void)] noise-overlay">
      <Header />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          
          {/* Animated scan line */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-signal-green)] to-transparent opacity-50 animate-[scanline_4s_linear_infinite]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Hero content */}
              <div>
                <Badge variant="signal" className="mb-6 animate-slide-up">
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse mr-2" />
                  SYSTEM_STATUS: OPERATIONAL
                </Badge>
                
                <h1 className="heading-brutal text-[var(--color-text-raw)] mb-4 animate-slide-up stagger-1">
                  WORRY
                  <span className="block text-[var(--color-signal-green)] animate-glitch-text">-FREE</span>
                  PPC
                </h1>
                
                <div className="font-serif text-2xl md:text-3xl text-[var(--color-text-muted)] mb-8 animate-slide-up stagger-2">
                  in the <span className="text-[var(--color-signal-cyan)] italic">AI era</span>
                </div>
                
                <p className="text-[var(--color-text-muted)] font-mono text-sm max-w-lg mb-8 animate-slide-up stagger-3">
                  &gt; MONITOR, OPTIMIZE, AND SAFEGUARD YOUR PAID MEDIA ACCOUNTS<br />
                  &gt; WITH ALWAYS-ON AUTOMATION<br />
                  &gt; WHILE YOU STAY IN CONTROL_<span className="animate-pulse">▋</span>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-slide-up stagger-4">
                  <Link href="/signup">
                    <Button variant="signal" size="lg" className="w-full sm:w-auto gap-2" glitch>
                      INITIALIZE_TRIAL
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                      <Play className="w-5 h-5" />
                      WATCH_DEMO
                    </Button>
                  </Link>
                </div>
                
                <p className="text-[10px] font-mono text-[var(--color-text-dim)] uppercase tracking-wider animate-slide-up stagger-5">
                  NO_CREDIT_CARD • 14_DAY_TRIAL • CANCEL_ANYTIME
                </p>
              </div>

              {/* Right side - Data visualization */}
              <div className="relative animate-slide-up stagger-2">
                {/* Terminal window */}
                <div className="border-2 border-[var(--color-signal-green)] bg-[var(--color-terminal)] p-1 shadow-[8px_8px_0_var(--color-signal-green)] relative">
                  {/* Terminal header */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border-harsh)]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-[var(--color-signal-red)]" />
                      <span className="w-3 h-3 bg-[var(--color-signal-yellow)]" />
                      <span className="w-3 h-3 bg-[var(--color-signal-green)]" />
                    </div>
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)]">ADPILOT_DASHBOARD_v2.0</span>
                    <Terminal className="w-4 h-4 text-[var(--color-signal-green)]" />
                  </div>
                  
                  {/* Dashboard content */}
                  <div className="p-4 space-y-4">
                    {/* KPI row */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[var(--color-surface)] border border-[var(--color-border-harsh)] p-3">
                        <div className="text-[8px] font-mono text-[var(--color-text-muted)] mb-1">DAILY_SPEND</div>
                        <div className="font-display text-2xl text-[var(--color-signal-green)]">$24,847</div>
                        <div className="text-[10px] font-mono text-[var(--color-metric-positive)]">▲ 12.4%</div>
                      </div>
                      <div className="bg-[var(--color-surface)] border border-[var(--color-border-harsh)] p-3">
                        <div className="text-[8px] font-mono text-[var(--color-text-muted)] mb-1">CONVERSIONS</div>
                        <div className="font-display text-2xl text-[var(--color-signal-cyan)]">1,847</div>
                        <div className="text-[10px] font-mono text-[var(--color-metric-positive)]">▲ 8.2%</div>
                      </div>
                    </div>
                    
                    {/* Chart placeholder */}
                    <div className="bg-[var(--color-surface)] border border-[var(--color-border-harsh)] p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[8px] font-mono text-[var(--color-text-muted)]">PERFORMANCE_GRAPH</span>
                        <span className="text-[8px] font-mono text-[var(--color-signal-green)]">LIVE</span>
                      </div>
                      <div className="h-24 relative">
                        <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                          {/* Grid lines */}
                          <defs>
                            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-grid)" strokeWidth="0.5" />
                            </pattern>
                          </defs>
                          <rect width="200" height="80" fill="url(#grid)" />
                          {/* Line chart */}
                          <polyline
                            fill="none"
                            stroke="var(--color-signal-green)"
                            strokeWidth="2"
                            points="0,60 20,55 40,58 60,45 80,48 100,35 120,40 140,25 160,30 180,20 200,15"
                          />
                          <polyline
                            fill="none"
                            stroke="var(--color-signal-cyan)"
                            strokeWidth="2"
                            strokeDasharray="4,4"
                            points="0,70 20,68 40,65 60,60 80,58 100,52 120,48 140,45 160,42 180,38 200,35"
                          />
                        </svg>
                        {/* Live indicator */}
                        <div className="absolute top-2 right-2 w-2 h-2 bg-[var(--color-signal-green)] rounded-full animate-pulse" />
                      </div>
                    </div>
                    
                    {/* Alert row */}
                    <div className="flex gap-2">
                      <div className="flex-1 bg-[var(--color-surface)] border border-[var(--color-metric-positive)] p-2">
                        <div className="flex items-center gap-2">
                          <Signal className="w-3 h-3 text-[var(--color-metric-positive)]" />
                          <span className="text-[9px] font-mono text-[var(--color-metric-positive)]">3 OPTIMIZATIONS_READY</span>
                        </div>
                      </div>
                      <div className="flex-1 bg-[var(--color-surface)] border border-[var(--color-signal-yellow)] p-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3 text-[var(--color-signal-yellow)]" />
                          <span className="text-[9px] font-mono text-[var(--color-signal-yellow)]">1 BUDGET_ALERT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-[var(--color-void)] border-2 border-[var(--color-signal-cyan)] px-3 py-1 animate-pulse-brutal">
                  <span className="text-[10px] font-mono text-[var(--color-signal-cyan)]">ROAS: 4.2x</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[var(--color-void)] border-2 border-[var(--color-signal-magenta)] px-3 py-1">
                  <span className="text-[10px] font-mono text-[var(--color-signal-magenta)]">CTR: +23%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="border-y-2 border-[var(--color-border-harsh)] bg-[var(--color-terminal)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-[10px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
                TRUSTED_BY_LEADING_PPC_TEAMS
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                {trustedLogos.map((logo) => (
                  <div
                    key={logo}
                    className="text-[11px] font-mono text-[var(--color-text-dim)] hover:text-[var(--color-signal-green)] transition-colors cursor-default"
                  >
                    [{logo}]
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Live Stats Section */}
        <section className="py-16 border-b-2 border-[var(--color-border-harsh)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-[var(--color-text-raw)]">
              {liveStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`p-6 md:p-8 ${i < 3 ? 'border-r-2 border-[var(--color-border-harsh)]' : ''} ${i < 2 ? 'border-b-2 lg:border-b-0 border-[var(--color-border-harsh)]' : ''}`}
                >
                  <div className="text-[9px] font-mono text-[var(--color-text-muted)] tracking-wider mb-2">
                    {stat.label}
                  </div>
                  <div className="font-display text-3xl md:text-5xl text-[var(--color-text-raw)] mb-1">
                    {stat.value}
                  </div>
                  <div className={`text-[11px] font-mono ${
                    stat.type === 'positive' ? 'text-[var(--color-metric-positive)]' :
                    stat.type === 'negative' ? 'text-[var(--color-metric-negative)]' :
                    'text-[var(--color-text-muted)]'
                  }`}>
                    {stat.type === 'positive' && '▲ '}{stat.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-grid-pattern">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="info" className="mb-4">MODULE_OVERVIEW</Badge>
              <h2 className="heading-lg text-[var(--color-text-raw)] mb-4">
                SYSTEM<br />
                <span className="text-[var(--color-signal-green)]">CAPABILITIES</span>
              </h2>
              <p className="font-mono text-sm text-[var(--color-text-muted)] max-w-2xl mx-auto">
                &gt; FROM REAL-TIME MONITORING TO AI-POWERED OPTIMIZATION<br />
                &gt; ADPILOT GIVES YOU THE TOOLS TO WORK SMARTER_
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-[var(--color-text-raw)]">
              {features.map((feature, i) => (
                <div
                  key={feature.name}
                  className={`p-6 bg-[var(--color-surface)] hover:bg-[var(--color-terminal)] transition-colors group
                    ${i % 3 !== 2 ? 'border-r-2 border-[var(--color-border-harsh)]' : ''}
                    ${i < 3 ? 'border-b-2 border-[var(--color-border-harsh)]' : ''}
                  `}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 border-2 border-[var(--color-border-harsh)] flex items-center justify-center group-hover:border-[var(--color-signal-green)] transition-colors">
                      <feature.icon className="w-6 h-6 text-[var(--color-signal-green)]" />
                    </div>
                    <Badge variant="signal" size="sm">{feature.status}</Badge>
                  </div>
                  <h3 className="font-mono text-sm font-bold text-[var(--color-text-raw)] mb-2 group-hover:text-[var(--color-signal-green)] transition-colors">
                    {feature.name}
                  </h3>
                  <p className="text-xs font-mono text-[var(--color-text-muted)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/features">
                <Button variant="outline" className="gap-2">
                  VIEW_ALL_FEATURES
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 border-y-2 border-[var(--color-border-harsh)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="warning" className="mb-4">INITIALIZATION_SEQUENCE</Badge>
              <h2 className="heading-lg text-[var(--color-text-raw)] mb-4">
                GET STARTED<br />
                <span className="text-[var(--color-signal-yellow)]">IN MINUTES</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-0 border-2 border-[var(--color-text-raw)]">
              {[
                {
                  step: '001',
                  title: 'CONNECT_ACCOUNTS',
                  description: 'Securely connect your Google, Meta, Amazon, and Microsoft ad accounts in just a few clicks.',
                  icon: Database,
                },
                {
                  step: '002',
                  title: 'RUN_AUDIT',
                  description: 'Get a comprehensive health check of your campaigns with actionable recommendations.',
                  icon: Eye,
                },
                {
                  step: '003',
                  title: 'AUTOMATE',
                  description: 'Set up rules, enable automation, and let AdPilot work around the clock for you.',
                  icon: Cpu,
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className={`p-8 bg-[var(--color-terminal)] relative ${index < 2 ? 'border-r-2 border-[var(--color-border-harsh)]' : ''}`}
                >
                  <div className="absolute top-4 right-4 font-display text-6xl text-[var(--color-grid)]">
                    {item.step}
                  </div>
                  <div className="relative">
                    <div className="w-16 h-16 border-2 border-[var(--color-signal-green)] flex items-center justify-center mb-6">
                      <item.icon className="w-8 h-8 text-[var(--color-signal-green)]" />
                    </div>
                    <h3 className="font-mono text-lg font-bold text-[var(--color-text-raw)] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-[var(--color-text-muted)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-[var(--color-terminal)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="success" className="mb-4">USER_FEEDBACK</Badge>
              <h2 className="heading-lg text-[var(--color-text-raw)] mb-4">
                TRUSTED BY<br />
                <span className="text-[var(--color-metric-positive)]">10,000+ USERS</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {testimonials.map((testimonial, i) => (
                <div
                  key={testimonial.author}
                  className="bg-[var(--color-surface)] border-2 border-[var(--color-border-harsh)] p-6 hover:border-[var(--color-signal-green)] transition-colors"
                >
                  {/* Metrics */}
                  <div className="flex gap-2 mb-4">
                    <div className="flex-1 bg-[var(--color-terminal)] border border-[var(--color-border-harsh)] px-3 py-2">
                      <div className="text-[8px] font-mono text-[var(--color-text-muted)]">TIME_SAVED</div>
                      <div className="text-sm font-display text-[var(--color-signal-green)]">{testimonial.metrics.saved}</div>
                    </div>
                    <div className="flex-1 bg-[var(--color-terminal)] border border-[var(--color-border-harsh)] px-3 py-2">
                      <div className="text-[8px] font-mono text-[var(--color-text-muted)]">ROAS_LIFT</div>
                      <div className="text-sm font-display text-[var(--color-signal-cyan)]">{testimonial.metrics.roas}</div>
                    </div>
                  </div>
                  
                  <blockquote className="text-xs font-mono text-[var(--color-text-muted)] mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="border-t border-[var(--color-border-harsh)] pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--color-grid)] border border-[var(--color-border-harsh)] flex items-center justify-center">
                        <span className="text-xs font-mono text-[var(--color-signal-green)]">
                          {testimonial.author.split('_').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-[var(--color-text-raw)]">{testimonial.author}</div>
                        <div className="text-[9px] font-mono text-[var(--color-text-dim)]">
                          {testimonial.role} @ {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-signal-green)]/5 to-transparent" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="border-2 border-[var(--color-signal-green)] bg-[var(--color-terminal)] p-8 md:p-16 shadow-[0_0_60px_rgba(0,255,65,0.2)]">
              <div className="text-center">
                <h2 className="heading-xl text-[var(--color-text-raw)] mb-4">
                  READY TO
                  <span className="block text-[var(--color-signal-green)] animate-glitch-text">TRANSFORM?</span>
                </h2>
                <p className="font-mono text-sm text-[var(--color-text-muted)] mb-8 max-w-xl mx-auto">
                  &gt; INITIALIZE YOUR 14-DAY TRIAL SEQUENCE<br />
                  &gt; NO_CREDIT_CARD_REQUIRED<br />
                  &gt; FULL_SYSTEM_ACCESS_ENABLED_<span className="animate-pulse">▋</span>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link href="/signup">
                    <Button variant="signal" size="lg" className="w-full sm:w-auto gap-2" glitch>
                      START_FREE_TRIAL
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      VIEW_PRICING
                    </Button>
                  </Link>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6 text-[10px] font-mono text-[var(--color-text-muted)]">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--color-signal-green)]" />
                    14_DAY_FREE_TRIAL
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--color-signal-green)]" />
                    NO_CREDIT_CARD
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--color-signal-green)]" />
                    CANCEL_ANYTIME
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

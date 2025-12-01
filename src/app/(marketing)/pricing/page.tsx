import { Fragment } from 'react';
import Link from 'next/link';
import { Check, Minus, HelpCircle, Zap, Shield, Users, Terminal, Database, Cpu } from 'lucide-react';
import { Button, Badge } from '@/components/ui';

const plans = [
  {
    name: 'ESSENTIALS',
    code: 'ESS_001',
    description: 'For freelancers and small teams getting started with PPC automation.',
    price: { monthly: 99, annual: 79 },
    adSpendLimit: '$50K/mo',
    cta: 'START_TRIAL',
    ctaLink: '/signup?plan=essentials',
    popular: false,
    color: 'var(--color-signal-cyan)',
    features: [
      { name: 'Ad accounts', value: '5' },
      { name: 'Team members', value: '2' },
      { name: 'Data refresh', value: 'Every 4 hours' },
      { name: 'Automation rules', value: '25' },
      { name: 'Express optimizations', value: true },
      { name: 'PPC audits', value: true },
      { name: 'Basic alerts', value: true },
      { name: 'Email support', value: true },
      { name: 'Anomaly detection', value: false },
      { name: 'AI Sidekick', value: false },
      { name: 'Custom reports', value: false },
      { name: 'API access', value: false },
    ],
  },
  {
    name: 'PREMIUM',
    code: 'PRM_002',
    description: 'For agencies and growing teams who need advanced automation.',
    price: { monthly: 299, annual: 249 },
    adSpendLimit: '$250K/mo',
    cta: 'START_TRIAL',
    ctaLink: '/signup?plan=premium',
    popular: true,
    color: 'var(--color-signal-green)',
    features: [
      { name: 'Ad accounts', value: '25' },
      { name: 'Team members', value: '10' },
      { name: 'Data refresh', value: 'Every hour' },
      { name: 'Automation rules', value: 'Unlimited' },
      { name: 'Express optimizations', value: true },
      { name: 'PPC audits', value: true },
      { name: 'Basic alerts', value: true },
      { name: 'Email support', value: true },
      { name: 'Anomaly detection', value: true },
      { name: 'AI Sidekick', value: true },
      { name: 'Custom reports', value: true },
      { name: 'API access', value: false },
    ],
  },
  {
    name: 'ENTERPRISE',
    code: 'ENT_003',
    description: 'For large organizations with complex needs and high ad spend.',
    price: { monthly: 'Custom', annual: 'Custom' },
    adSpendLimit: 'Unlimited',
    cta: 'CONTACT_SALES',
    ctaLink: '/contact?type=enterprise',
    popular: false,
    color: 'var(--color-signal-magenta)',
    features: [
      { name: 'Ad accounts', value: 'Unlimited' },
      { name: 'Team members', value: 'Unlimited' },
      { name: 'Data refresh', value: 'Real-time' },
      { name: 'Automation rules', value: 'Unlimited' },
      { name: 'Express optimizations', value: true },
      { name: 'PPC audits', value: true },
      { name: 'Basic alerts', value: true },
      { name: 'Email support', value: true },
      { name: 'Anomaly detection', value: true },
      { name: 'AI Sidekick', value: true },
      { name: 'Custom reports', value: true },
      { name: 'API access', value: true },
    ],
  },
];

const comparisonFeatures = [
  {
    category: 'CORE_FEATURES',
    features: [
      { name: 'Ad accounts', essentials: '5', premium: '25', enterprise: 'UNLIMITED' },
      { name: 'Team members', essentials: '2', premium: '10', enterprise: 'UNLIMITED' },
      { name: 'Data refresh rate', essentials: '4 hours', premium: '1 hour', enterprise: 'REAL-TIME' },
      { name: 'Historical data', essentials: '90 days', premium: '2 years', enterprise: 'UNLIMITED' },
    ],
  },
  {
    category: 'AUTOMATION',
    features: [
      { name: 'Automation rules', essentials: '25', premium: 'UNLIMITED', enterprise: 'UNLIMITED' },
      { name: 'Express optimizations', essentials: true, premium: true, enterprise: true },
      { name: 'Scheduled tasks', essentials: true, premium: true, enterprise: true },
      { name: 'Custom scripts', essentials: false, premium: true, enterprise: true },
    ],
  },
  {
    category: 'MONITORING_&_ALERTS',
    features: [
      { name: 'Basic alerts', essentials: true, premium: true, enterprise: true },
      { name: 'Anomaly detection', essentials: false, premium: true, enterprise: true },
      { name: 'Budget pacing', essentials: true, premium: true, enterprise: true },
      { name: 'Custom alert rules', essentials: false, premium: true, enterprise: true },
    ],
  },
  {
    category: 'AI_&_INSIGHTS',
    features: [
      { name: 'PPC audits', essentials: true, premium: true, enterprise: true },
      { name: 'AI Sidekick', essentials: false, premium: true, enterprise: true },
      { name: 'PPC Investigator', essentials: false, premium: true, enterprise: true },
      { name: 'Predictive analytics', essentials: false, premium: false, enterprise: true },
    ],
  },
  {
    category: 'REPORTING',
    features: [
      { name: 'Standard reports', essentials: true, premium: true, enterprise: true },
      { name: 'Custom reports', essentials: false, premium: true, enterprise: true },
      { name: 'White-label reports', essentials: false, premium: false, enterprise: true },
      { name: 'Scheduled exports', essentials: false, premium: true, enterprise: true },
    ],
  },
  {
    category: 'SUPPORT_&_SERVICES',
    features: [
      { name: 'Email support', essentials: true, premium: true, enterprise: true },
      { name: 'Chat support', essentials: false, premium: true, enterprise: true },
      { name: 'Phone support', essentials: false, premium: false, enterprise: true },
      { name: 'Dedicated CSM', essentials: false, premium: false, enterprise: true },
      { name: 'Onboarding', essentials: 'Self-serve', premium: 'Guided', enterprise: 'Custom' },
      { name: 'SLA', essentials: false, premium: false, enterprise: '99.9%' },
    ],
  },
];

const faqs = [
  {
    question: 'WHAT_COUNTS_AS_AN_AD_ACCOUNT?',
    answer: 'Each connected Google Ads, Meta Ads, Microsoft Ads, or Amazon Ads account counts as one ad account. MCC/Manager accounts count as one account, but each sub-account within them counts separately.',
  },
  {
    question: 'CAN_I_CHANGE_PLANS?',
    answer: 'Yes! You can upgrade your plan at any time and the change takes effect immediately. If you downgrade, the change will take effect at the start of your next billing cycle.',
  },
  {
    question: 'WHAT_IF_I_EXCEED_AD_SPEND_LIMIT?',
    answer: "We'll notify you when you're approaching your limit and give you the option to upgrade. We won't cut off your access mid-campaign—your optimizations will continue to run.",
  },
  {
    question: 'NON-PROFIT_DISCOUNTS?',
    answer: 'Yes! Non-profit organizations get 30% off any plan. Contact our sales team with proof of non-profit status to get your discount applied.',
  },
  {
    question: 'IS_THERE_A_FREE_TRIAL?',
    answer: 'Yes! All plans come with a 14-day free trial. No credit card required to start. You get full access to all features in your chosen plan tier.',
  },
  {
    question: 'PAYMENT_METHODS?',
    answer: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and for Enterprise customers, we also offer invoicing with NET 30 terms.',
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[var(--color-void)] pt-32">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="signal" className="mb-6">
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse mr-2" />
              14_DAY_FREE_TRIAL_ON_ALL_PLANS
            </Badge>
            <h1 className="heading-xl text-[var(--color-text-raw)] mb-6">
              SIMPLE,<br />
              <span className="text-[var(--color-signal-green)]">TRANSPARENT</span><br />
              PRICING
            </h1>
            <p className="font-mono text-sm text-[var(--color-text-muted)]">
              &gt; CHOOSE_THE_PLAN_THAT_FITS_YOUR_NEEDS<br />
              &gt; SCALE_UP_AS_YOU_GROW<br />
              &gt; ALL_PLANS_INCLUDE_CORE_PPC_FEATURES_<span className="animate-pulse">▋</span>
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <span className="text-xs font-mono text-[var(--color-text-muted)]">MONTHLY</span>
            <button className="relative w-16 h-8 bg-[var(--color-terminal)] border-2 border-[var(--color-signal-green)]">
              <span className="absolute right-1 top-1 w-6 h-6 bg-[var(--color-signal-green)] transition-transform" />
            </button>
            <span className="text-xs font-mono font-bold text-[var(--color-text-raw)]">
              ANNUAL <span className="text-[var(--color-metric-positive)] ml-1">SAVE_20%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Plan Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-0 max-w-6xl mx-auto border-2 border-[var(--color-text-raw)]">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative bg-[var(--color-terminal)] p-8 
                  ${i < 2 ? 'border-r-2 border-[var(--color-border-harsh)]' : ''}
                  ${plan.popular ? 'bg-[var(--color-surface)]' : ''}
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-[2px] left-0 right-0 h-[3px]" style={{ backgroundColor: plan.color }} />
                )}
                
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono text-[var(--color-text-dim)]">{plan.code}</span>
                    {plan.popular && (
                      <Badge variant="signal" size="sm">RECOMMENDED</Badge>
                    )}
                  </div>
                  <h3 className="font-display text-3xl mb-2" style={{ color: plan.color }}>{plan.name}</h3>
                  <p className="text-xs font-mono text-[var(--color-text-muted)]">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8 p-4 bg-[var(--color-void)] border-2 border-[var(--color-border-harsh)]">
                  <div className="flex items-baseline gap-1">
                    {typeof plan.price.annual === 'number' ? (
                      <>
                        <span className="text-[var(--color-text-muted)] text-lg">$</span>
                        <span className="font-display text-5xl" style={{ color: plan.color }}>
                          {plan.price.annual}
                        </span>
                        <span className="text-[var(--color-text-muted)] text-sm">/mo</span>
                      </>
                    ) : (
                      <span className="font-display text-4xl" style={{ color: plan.color }}>CUSTOM</span>
                    )}
                  </div>
                  <p className="text-[10px] font-mono text-[var(--color-text-dim)] mt-2">
                    UP_TO {plan.adSpendLimit} AD_SPEND
                  </p>
                </div>

                {/* CTA */}
                <Link href={plan.ctaLink}>
                  <Button
                    className="w-full mb-8"
                    variant={plan.popular ? 'signal' : 'outline'}
                    size="lg"
                  >
                    {plan.cta} →
                  </Button>
                </Link>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-center gap-3 text-xs font-mono">
                      {feature.value === false ? (
                        <Minus className="w-4 h-4 text-[var(--color-text-dim)]" />
                      ) : (
                        <Check className="w-4 h-4" style={{ color: plan.color }} />
                      )}
                      <span className={feature.value === false ? 'text-[var(--color-text-dim)]' : 'text-[var(--color-text-muted)]'}>
                        {feature.name}
                        {typeof feature.value === 'string' && (
                          <span className="text-[var(--color-text-dim)] ml-1">({feature.value})</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y-2 border-[var(--color-border-harsh)] bg-[var(--color-terminal)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-[var(--color-signal-green)] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[var(--color-signal-green)]" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-[var(--color-text-raw)]">SOC_2</div>
                <div className="text-[9px] font-mono text-[var(--color-text-dim)]">COMPLIANT</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-[var(--color-signal-cyan)] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[var(--color-signal-cyan)]" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-[var(--color-text-raw)]">99.9%</div>
                <div className="text-[9px] font-mono text-[var(--color-text-dim)]">UPTIME</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-[var(--color-signal-yellow)] flex items-center justify-center">
                <Users className="w-5 h-5 text-[var(--color-signal-yellow)]" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-[var(--color-text-raw)]">10,000+</div>
                <div className="text-[9px] font-mono text-[var(--color-text-dim)]">USERS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="info" className="mb-4">SYSTEM_COMPARISON</Badge>
            <h2 className="heading-lg text-[var(--color-text-raw)]">
              COMPARE PLANS<br />
              <span className="text-[var(--color-signal-cyan)]">IN DETAIL</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--color-text-raw)]">
                  <th className="text-left py-4 px-4 text-[10px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    FEATURE
                  </th>
                  <th className="text-center py-4 px-4 text-[10px] font-mono font-bold text-[var(--color-signal-cyan)] uppercase tracking-wider">
                    ESSENTIALS
                  </th>
                  <th className="text-center py-4 px-4 text-[10px] font-mono font-bold text-[var(--color-signal-green)] uppercase tracking-wider bg-[var(--color-surface)]">
                    PREMIUM
                  </th>
                  <th className="text-center py-4 px-4 text-[10px] font-mono font-bold text-[var(--color-signal-magenta)] uppercase tracking-wider">
                    ENTERPRISE
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category) => (
                  <Fragment key={category.category}>
                    <tr className="bg-[var(--color-surface)]">
                      <td colSpan={4} className="py-3 px-4 text-[10px] font-mono font-bold text-[var(--color-text-raw)] uppercase tracking-wider border-l-2 border-[var(--color-signal-green)]">
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature) => (
                      <tr key={feature.name} className="border-b border-[var(--color-grid)]">
                        <td className="py-3 px-4 text-xs font-mono text-[var(--color-text-muted)]">{feature.name}</td>
                        <td className="text-center py-3 px-4">
                          {typeof feature.essentials === 'boolean' ? (
                            feature.essentials ? (
                              <Check className="w-4 h-4 text-[var(--color-signal-cyan)] mx-auto" />
                            ) : (
                              <Minus className="w-4 h-4 text-[var(--color-text-dim)] mx-auto" />
                            )
                          ) : (
                            <span className="text-xs font-mono text-[var(--color-text-muted)]">{feature.essentials}</span>
                          )}
                        </td>
                        <td className="text-center py-3 px-4 bg-[var(--color-surface)]/50">
                          {typeof feature.premium === 'boolean' ? (
                            feature.premium ? (
                              <Check className="w-4 h-4 text-[var(--color-signal-green)] mx-auto" />
                            ) : (
                              <Minus className="w-4 h-4 text-[var(--color-text-dim)] mx-auto" />
                            )
                          ) : (
                            <span className="text-xs font-mono font-bold text-[var(--color-signal-green)]">{feature.premium}</span>
                          )}
                        </td>
                        <td className="text-center py-3 px-4">
                          {typeof feature.enterprise === 'boolean' ? (
                            feature.enterprise ? (
                              <Check className="w-4 h-4 text-[var(--color-signal-magenta)] mx-auto" />
                            ) : (
                              <Minus className="w-4 h-4 text-[var(--color-text-dim)] mx-auto" />
                            )
                          ) : (
                            <span className="text-xs font-mono text-[var(--color-text-muted)]">{feature.enterprise}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[var(--color-terminal)] border-y-2 border-[var(--color-border-harsh)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="warning" className="mb-4">DOCUMENTATION</Badge>
            <h2 className="heading-lg text-[var(--color-text-raw)]">
              FREQUENTLY<br />
              <span className="text-[var(--color-signal-yellow)]">ASKED</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto grid gap-4">
            {faqs.map((faq, i) => (
              <div key={faq.question} className="bg-[var(--color-surface)] border-2 border-[var(--color-border-harsh)] p-6 hover:border-[var(--color-signal-green)] transition-colors">
                <h3 className="flex items-start gap-3 text-sm font-mono font-bold text-[var(--color-text-raw)] mb-3">
                  <span className="text-[var(--color-signal-green)]">[{String(i + 1).padStart(2, '0')}]</span>
                  {faq.question}
                </h3>
                <p className="text-xs font-mono text-[var(--color-text-muted)] leading-relaxed ml-10">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg text-[var(--color-text-raw)] mb-6">
              READY TO<br />
              <span className="text-[var(--color-signal-green)]">TRANSFORM?</span>
            </h2>
            <p className="font-mono text-sm text-[var(--color-text-muted)] mb-8">
              &gt; START_YOUR_14_DAY_TRIAL_TODAY<br />
              &gt; NO_CREDIT_CARD_REQUIRED_<span className="animate-pulse">▋</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button variant="signal" size="lg">START_FREE_TRIAL →</Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg">BOOK_A_DEMO</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

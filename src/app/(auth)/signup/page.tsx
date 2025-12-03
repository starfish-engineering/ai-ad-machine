'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Badge } from '@/components/ui';
import { createBrowserClient } from '@/lib/supabase/client';
import { Eye, EyeOff, Mail, Lock, User, Terminal, Check, Cpu, Shield, Zap } from 'lucide-react';

const benefits = [
  { icon: Check, text: 'FULL_ACCESS_FOR_14_DAYS' },
  { icon: Shield, text: 'NO_CREDIT_CARD_REQUIRED' },
  { icon: Cpu, text: 'UNLIMITED_AD_ACCOUNTS' },
  { icon: Zap, text: 'CANCEL_ANYTIME' },
];

export default function SignupPage() {
  const router = useRouter();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // For demo purposes
  const handleDemoSignup = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[var(--color-void)] bg-grid-pattern flex">
      {/* Left side - Benefits */}
      <div className="hidden lg:flex lg:flex-1 items-center justify-center p-12 border-r-2 border-[var(--color-border-harsh)]">
        <div className="max-w-md">
          <Badge variant="signal" className="mb-6">
            INITIALIZE_TRIAL_SEQUENCE
          </Badge>
          <h1 className="heading-lg text-[var(--color-text-raw)] mb-6">
            START YOUR<br />
            <span className="text-[var(--color-signal-green)]">FREE TRIAL</span>
          </h1>
          <p className="font-mono text-sm text-[var(--color-text-muted)] mb-8">
              &gt; JOIN_10,000+_PPC_PROFESSIONALS<br />
              &gt; WHO_TRUST_DRAPER_TO_OPTIMIZE_THEIR_CAMPAIGNS_<span className="animate-pulse">▋</span>
          </p>
          
          {/* Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit.text} className="flex items-center gap-3 p-3 bg-[var(--color-terminal)] border border-[var(--color-border-harsh)]">
                <div className="w-8 h-8 border border-[var(--color-signal-green)] flex items-center justify-center">
                  <benefit.icon className="w-4 h-4 text-[var(--color-signal-green)]" />
                </div>
                <span className="text-[11px] font-mono text-[var(--color-text-raw)]">{benefit.text}</span>
              </div>
            ))}
          </div>
          
          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 bg-[var(--color-terminal)] border border-[var(--color-border-harsh)]">
              <div className="font-display text-2xl text-[var(--color-signal-green)]">$2.4B+</div>
              <div className="text-[9px] font-mono text-[var(--color-text-dim)]">AD_SPEND_MANAGED</div>
            </div>
            <div className="p-4 bg-[var(--color-terminal)] border border-[var(--color-border-harsh)]">
              <div className="font-display text-2xl text-[var(--color-signal-cyan)]">99.9%</div>
              <div className="text-[9px] font-mono text-[var(--color-text-dim)]">SYSTEM_UPTIME</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="text-center mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-10 h-10 border-2 border-[var(--color-text-raw)] flex items-center justify-center bg-[var(--color-void)]">
                <Terminal className="w-5 h-5 text-[var(--color-signal-green)]" />
              </div>
              <span className="font-display text-xl text-[var(--color-text-raw)]">DRAPER</span>
            </Link>
          </div>

          {/* Signup Card */}
          <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] shadow-[8px_8px_0_var(--color-signal-green)]">
            {/* Header */}
            <div className="px-6 py-4 border-b-2 border-[var(--color-border-harsh)]">
              <div className="hidden lg:flex items-center gap-3 mb-4">
                <div className="w-8 h-8 border border-[var(--color-signal-green)] flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-[var(--color-signal-green)]" />
                </div>
                <span className="font-display text-lg text-[var(--color-text-raw)]">DRAPER</span>
              </div>
              <h1 className="font-display text-xl text-[var(--color-text-raw)]">CREATE_ACCOUNT</h1>
              <p className="text-[10px] font-mono text-[var(--color-text-muted)]">14_DAY_FREE_TRIAL</p>
            </div>
            
            {/* Form Content */}
            <div className="p-6">
              <form onSubmit={handleSignup} className="space-y-4">
                {error && (
                  <div className="p-3 bg-[var(--color-signal-red)]/10 border-2 border-[var(--color-signal-red)] text-[var(--color-signal-red)] text-[11px] font-mono">
                    ⚠ ERROR: {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    FULL_NAME
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-dim)]" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-[var(--color-surface)] border-2 border-[var(--color-border-harsh)] text-[var(--color-text-raw)] text-sm font-mono placeholder:text-[var(--color-text-dim)] focus:outline-none focus:border-[var(--color-signal-green)]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    WORK_EMAIL
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-dim)]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full pl-10 pr-4 py-3 bg-[var(--color-surface)] border-2 border-[var(--color-border-harsh)] text-[var(--color-text-raw)] text-sm font-mono placeholder:text-[var(--color-text-dim)] focus:outline-none focus:border-[var(--color-signal-green)]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-dim)]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="MIN_8_CHARACTERS"
                      className="w-full pl-10 pr-10 py-3 bg-[var(--color-surface)] border-2 border-[var(--color-border-harsh)] text-[var(--color-text-raw)] text-sm font-mono placeholder:text-[var(--color-text-dim)] focus:outline-none focus:border-[var(--color-signal-green)]"
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)] hover:text-[var(--color-signal-green)]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" variant="signal" className="w-full" size="lg" isLoading={loading}>
                  CREATE_ACCOUNT →
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-[var(--color-border-harsh)]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-[var(--color-terminal)] text-[10px] font-mono text-[var(--color-text-dim)]">OR</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleDemoSignup}
                >
                  DEMO_ACCESS
                </Button>

                <p className="text-[9px] text-center font-mono text-[var(--color-text-dim)] mt-4">
                  BY_SIGNING_UP_YOU_AGREE_TO_OUR{' '}
                  <Link href="/terms" className="text-[var(--color-signal-cyan)] hover:text-[var(--color-text-raw)]">TERMS</Link>
                  {' '}&{' '}
                  <Link href="/privacy" className="text-[var(--color-signal-cyan)] hover:text-[var(--color-text-raw)]">PRIVACY</Link>
                </p>
              </form>

              <p className="mt-6 text-center text-[11px] font-mono text-[var(--color-text-muted)]">
                ALREADY_REGISTERED?{' '}
                <Link href="/login" className="text-[var(--color-signal-green)] hover:text-[var(--color-text-raw)]">
                  AUTHENTICATE →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

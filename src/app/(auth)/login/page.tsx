'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Badge } from '@/components/ui';
import { createBrowserClient } from '@/lib/supabase/client';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Terminal, Activity } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push(redirect);
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // For demo purposes, sign in with demo credentials
  const handleDemoLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: 'demo@adpilot.io',
        password: 'demo1234',
      });

      if (error) {
        // If demo login fails, still allow access in demo mode
        console.warn('Demo login failed:', error.message);
        setError('Demo account not configured. Please contact admin.');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      setError('Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-void)] bg-grid-pattern flex items-center justify-center p-4">
      {/* Animated scan line */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-signal-green)] to-transparent opacity-30 animate-[scanline_4s_linear_infinite]" />
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="relative w-12 h-12 border-2 border-[var(--color-text-raw)] flex items-center justify-center bg-[var(--color-void)] group-hover:border-[var(--color-signal-green)] group-hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all">
              <Terminal className="w-6 h-6 text-[var(--color-signal-green)]" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--color-signal-green)] animate-pulse" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-display text-2xl tracking-wider text-[var(--color-text-raw)]">ADPILOT</span>
              <span className="text-[8px] font-mono text-[var(--color-text-muted)]">DATA_SYSTEMS_v2.0</span>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-[var(--color-terminal)] border-2 border-[var(--color-border-harsh)] shadow-[8px_8px_0_var(--color-signal-green)]">
          {/* Header */}
          <div className="px-6 py-4 border-b-2 border-[var(--color-border-harsh)] flex items-center justify-between">
            <div>
              <h1 className="font-display text-xl text-[var(--color-text-raw)]">AUTHENTICATE</h1>
              <p className="text-[10px] font-mono text-[var(--color-text-muted)]">SECURE_LOGIN_SEQUENCE</p>
            </div>
            <Badge variant="signal" size="sm">
              <Activity className="w-3 h-3 mr-1" />
              ONLINE
            </Badge>
          </div>
          
          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-[var(--color-signal-red)]/10 border-2 border-[var(--color-signal-red)] text-[var(--color-signal-red)] text-[11px] font-mono">
                  ⚠ ERROR: {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                  EMAIL_ADDRESS
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-dim)]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-[var(--color-surface)] border-2 border-[var(--color-border-harsh)] text-[var(--color-text-raw)] text-sm font-mono placeholder:text-[var(--color-text-dim)] focus:outline-none focus:border-[var(--color-signal-green)] focus:shadow-[0_0_10px_rgba(0,255,65,0.2)]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                    PASSWORD
                  </label>
                  <Link href="/forgot-password" className="text-[10px] font-mono text-[var(--color-signal-cyan)] hover:text-[var(--color-text-raw)]">
                    FORGOT?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-dim)]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-[var(--color-surface)] border-2 border-[var(--color-border-harsh)] text-[var(--color-text-raw)] text-sm font-mono placeholder:text-[var(--color-text-dim)] focus:outline-none focus:border-[var(--color-signal-green)] focus:shadow-[0_0_10px_rgba(0,255,65,0.2)]"
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
                AUTHENTICATE →
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
                onClick={handleDemoLogin}
              >
                DEMO_ACCESS
              </Button>
            </form>

            <p className="mt-6 text-center text-[11px] font-mono text-[var(--color-text-muted)]">
              NO_ACCOUNT?{' '}
              <Link href="/signup" className="text-[var(--color-signal-green)] hover:text-[var(--color-text-raw)]">
                START_TRIAL →
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-[9px] font-mono text-[var(--color-text-dim)]">
          BY_AUTHENTICATING_YOU_AGREE_TO_OUR{' '}
          <Link href="/terms" className="text-[var(--color-text-muted)] hover:text-[var(--color-signal-green)]">TERMS</Link>
          {' '}&{' '}
          <Link href="/privacy" className="text-[var(--color-text-muted)] hover:text-[var(--color-signal-green)]">PRIVACY</Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--color-void)] flex items-center justify-center">
        <div className="text-[var(--color-signal-green)] font-mono text-sm animate-pulse">LOADING_SYSTEM...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

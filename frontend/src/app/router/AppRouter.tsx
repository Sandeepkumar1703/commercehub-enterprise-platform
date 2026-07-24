import React, { useState } from 'react';
import { useApp } from '../../../app/store/store';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { Logo } from '../../../shared/components/Logo';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const { setAuthView, setPortal, setCurrentUser, showToast } = useApp();
  const [email, setEmail] = useState('alex.m@commercehub.io');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Welcome Back', 'Successfully authenticated into CommerceHub.', 'success');
      setPortal('customer');
    }, 600);
  };

  const quickSwitchUser = (role: 'super_admin' | 'seller' | 'customer') => {
    if (role === 'super_admin') {
      setCurrentUser({ id: 'usr_1', name: 'Alex Morgan', email: 'alex.m@commercehub.io', role: 'super_admin', status: 'active', lastActive: 'Just now' });
      setPortal('admin');
      showToast('Switched Role', 'Logged in as Enterprise Super Admin', 'info');
    } else if (role === 'seller') {
      setCurrentUser({ id: 'usr_5', name: 'TechGear Official', email: 'merchant@techgear.com', role: 'seller', status: 'active', lastActive: 'Just now' });
      setPortal('seller');
      showToast('Switched Role', 'Logged in as Merchant Seller', 'info');
    } else {
      setCurrentUser({ id: 'usr_4', name: 'Sarah Jenkins', email: 'sarah.j@example.com', role: 'customer', status: 'active', lastActive: 'Just now' });
      setPortal('customer');
      showToast('Switched Role', 'Logged in as Customer', 'info');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 dark:bg-slate-950">
      {/* Left Column: Hero Branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.2),transparent_50%)]" />
        <div className="relative z-10">
          <Logo className="text-white" />
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
            CommerceHub Enterprise OS
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
            Unified E-Commerce Architecture & Governance
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Manage global customer experiences, multi-tenant merchant operations, real-time inventory matrix, and RBAC security from a single platform.
          </p>

          <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-indigo-400">$1.24M</p>
              <p className="text-xs text-slate-400">Monthly GMV</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-400">99.99%</p>
              <p className="text-xs text-slate-400">System Uptime</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-400">1,420+</p>
              <p className="text-xs text-slate-400">Verified Sellers</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-500 flex items-center justify-between">
          <span>© 2026 CommerceHub Inc. All rights reserved.</span>
          <span>WCAG 2.1 AA Compliant</span>
        </div>
      </div>

      {/* Right Column: Auth Card */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left space-y-2">
            <div className="lg:hidden flex justify-center mb-6">
              <Logo />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Sign in to CommerceHub
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Enter your credentials or test with quick role switchers below.
            </p>
          </div>

          {/* Quick Role Switcher for Demo Ease */}
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-xl space-y-2 text-xs">
            <p className="font-semibold text-indigo-900 dark:text-indigo-200">⚡ Demo Instant Role Switcher:</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => quickSwitchUser('customer')}
                className="flex-1 py-1.5 px-2 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-slate-700 rounded-lg text-indigo-700 dark:text-indigo-300 font-medium hover:bg-indigo-100 transition-colors"
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => quickSwitchUser('seller')}
                className="flex-1 py-1.5 px-2 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-slate-700 rounded-lg text-emerald-700 dark:text-emerald-300 font-medium hover:bg-emerald-100 transition-colors"
              >
                Seller Portal
              </button>
              <button
                type="button"
                onClick={() => quickSwitchUser('super_admin')}
                className="flex-1 py-1.5 px-2 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-slate-700 rounded-lg text-purple-700 dark:text-purple-300 font-medium hover:bg-purple-100 transition-colors"
              >
                Admin Portal
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              prefixIcon={<Mail className="w-4 h-4" />}
              placeholder="name@company.com"
              required
            />

            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                prefixIcon={<Lock className="w-4 h-4" />}
                suffixIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:text-slate-700 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                placeholder="••••••••••••"
                required
              />
              <div className="flex items-center justify-between mt-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Remember this device</span>
                </label>
                <button
                  type="button"
                  onClick={() => setAuthView('forgot')}
                  className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <Button type="submit" loading={loading} className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Sign In to Account
            </Button>
          </form>

          {/* Social SSO Section */}
          <div className="space-y-4">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
              <span className="bg-slate-50 dark:bg-slate-950 px-3 text-xs text-slate-400 uppercase tracking-wider relative">
                Or continue with SSO
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="md" className="w-full text-xs" onClick={() => setAuthView('otp')}>
                Send OTP Code
              </Button>
              <Button variant="outline" size="md" className="w-full text-xs" onClick={() => setAuthView('register')}>
                Create Account
              </Button>
            </div>
          </div>

          <p className="text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <button
              onClick={() => setAuthView('register')}
              className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Sign up for free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

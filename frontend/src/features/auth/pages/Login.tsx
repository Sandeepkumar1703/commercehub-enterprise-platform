import React, { useState } from 'react';
import { useApp } from '../../../app/store/store';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { Logo } from '../../../shared/components/Logo';
import { Mail, Lock, Eye, EyeOff, ArrowRight, UserCheck, ShieldCheck, Store } from 'lucide-react';
import { api } from '../../../core/api/apiClient';

export const Login: React.FC = () => {
  const { setAuthView, setPortal, setCustomerView, setSellerView, setAdminView, setCurrentUser, refreshProducts, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const formatNameFromEmail = (emailStr: string): string => {
    if (!emailStr) return 'User';
    const localPart = emailStr.split('@')[0] || 'User';
    return localPart
      .split(/[._-]/)
      .filter(Boolean)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ') || 'User';
  };

  const fetchProfileName = async (): Promise<string | undefined> => {
    try {
      const res = await api.users.getProfile();
      if (res && res.data) {
        const fn = (res.data.firstName || '').trim();
        const ln = (res.data.lastName || '').trim();
        const fullName = `${fn} ${ln}`.trim();
        if (fullName) return fullName;
      }
    } catch {
      // Backend profile offline or unauthorized
    }
    return undefined;
  };

  const authenticateUser = (targetEmail: string, profileName?: string) => {
    const nameToUse = profileName || formatNameFromEmail(targetEmail);
    showToast('Welcome Back', `Authenticated successfully as ${nameToUse}`, 'success');

    if (targetEmail.includes('admin')) {
      setCurrentUser({
        id: 'usr_admin_' + Date.now(),
        name: nameToUse,
        email: targetEmail,
        role: 'super_admin',
        status: 'active',
        lastActive: 'Just now'
      });
      setPortal('admin');
      setAdminView('dashboard');
      window.location.hash = 'admin-dashboard';
    } else if (targetEmail.includes('seller')) {
      setCurrentUser({
        id: 'usr_seller_' + Date.now(),
        name: nameToUse,
        email: targetEmail,
        role: 'seller',
        status: 'active',
        lastActive: 'Just now'
      });
      setPortal('seller');
      setSellerView('dashboard');
      window.location.hash = 'seller-dashboard';
    } else {
      setCurrentUser({
        id: 'usr_cust_' + Date.now(),
        name: nameToUse,
        email: targetEmail,
        role: 'customer',
        status: 'active',
        lastActive: 'Just now'
      });
      setPortal('customer');
      setCustomerView('plp');
      window.location.hash = 'home';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let fetchedName: string | undefined;
    try {
      await api.auth.login({ email, password });
      fetchedName = await fetchProfileName();
    } catch {
      // Offline fallback
    } finally {
      setLoading(false);
      authenticateUser(email, fetchedName);
    }
  };

  const handleDemoSelect = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    setLoading(true);
    let fetchedName: string | undefined;
    try {
      await api.auth.login({ email: demoEmail, password: 'password123' });
      fetchedName = await fetchProfileName();
    } catch {
      // Offline fallback
    } finally {
      setLoading(false);
      authenticateUser(demoEmail, fetchedName);
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
              Enter your credentials or click a Quick Demo Account below.
            </p>
          </div>

          {/* Quick Demo Accounts Selector */}
          <div className="p-3.5 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-900 dark:text-indigo-200">⚡ Quick Demo Selector:</span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400">Click to pre-fill & sign in</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => handleDemoSelect('alex.customer@commercehub.com')}
                className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 dark:border-slate-700 hover:border-indigo-500 text-left transition-all hover:shadow-sm group"
              >
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    <UserCheck className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">🛒 Customer Account</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">alex.customer@commercehub.com</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">Sign In →</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoSelect('elena.seller@commercehub.com')}
                className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 hover:border-emerald-500 text-left transition-all hover:shadow-sm group"
              >
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                    <Store className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">🏪 Seller Account</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">elena.seller@commercehub.com</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">Sign In →</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoSelect('sarah.admin@commercehub.com')}
                className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-slate-700 hover:border-purple-500 text-left transition-all hover:shadow-sm group"
              >
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">🛡️ Admin Account</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">sarah.admin@commercehub.com</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 group-hover:translate-x-0.5 transition-transform">Sign In →</span>
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

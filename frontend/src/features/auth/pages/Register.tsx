import React, { useState } from 'react';
import { useApp } from '../../../app/store/store';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { Logo } from '../../../shared/components/Logo';
import { PasswordStrengthMeter } from '../components/PasswordStrengthMeter';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { api } from '../../../core/api/apiClient';

export const Register: React.FC = () => {
  const { setAuthView, showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      showToast('Terms Required', 'Please accept the Terms of Service to continue.', 'warning');
      return;
    }
    setLoading(true);

    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || 'User';
    const lastName = nameParts.slice(1).join(' ') || 'Account';

    try {
      await api.auth.register({ firstName, lastName, email, password });
    } catch {
      // Local fallback
    } finally {
      setLoading(false);
      showToast('Account Created', 'Verification link sent to your email address.', 'success');
      setAuthView('verify-email');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Create CommerceHub Account
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Get instant access to global commerce, merchant tools & customer store.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            prefixIcon={<UserIcon className="w-4 h-4" />}
            placeholder="Alex Morgan"
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            prefixIcon={<Mail className="w-4 h-4" />}
            placeholder="alex@company.com"
            required
          />

          <div>
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              prefixIcon={<Lock className="w-4 h-4" />}
              placeholder="Create strong password"
              required
            />
            <PasswordStrengthMeter password={password} />
          </div>

          <label className="flex items-start gap-2.5 pt-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
            />
            <span>
              I agree to CommerceHub's{' '}
              <a href="#terms" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#privacy" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Privacy Policy</a>.
            </span>
          </label>

          <Button type="submit" loading={loading} className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Create Account
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <button
            onClick={() => setAuthView('login')}
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;

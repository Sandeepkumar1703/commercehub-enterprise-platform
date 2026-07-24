import React, { useState } from 'react';
import { useApp } from '../../../app/store/store';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { Logo } from '../../../shared/components/Logo';
import { Mail, ArrowLeft, Send } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const { setAuthView, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      showToast('Reset Link Sent', 'Check your inbox for password recovery instructions.', 'success');
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Reset Your Password</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Enter your registered email address and we’ll send you a password recovery link.
          </p>
        </div>

        {sent ? (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center space-y-3">
            <span className="text-3xl">📩</span>
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">Reset Link Sent!</p>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              We sent a password reset link to <strong className="font-bold">{email}</strong>.
            </p>
            <Button variant="outline" size="sm" onClick={() => setAuthView('reset')} className="w-full">
              Proceed to Reset Screen
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              prefixIcon={<Mail className="w-4 h-4" />}
              placeholder="alex@company.com"
              required
            />
            <Button type="submit" loading={loading} className="w-full" rightIcon={<Send className="w-4 h-4" />}>
              Send Reset Link
            </Button>
          </form>
        )}

        <div className="pt-2 text-center">
          <button
            onClick={() => setAuthView('login')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

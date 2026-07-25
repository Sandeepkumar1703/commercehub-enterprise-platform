import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../core/router/Router';
import { ROUTES } from '../../theme/routes';
import { Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const { queryParams, navigate } = useRouter();
  const { t } = useLanguage();

  const tokenParam = queryParams['token'] || 'reset_demo_77182';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const res = await resetPassword(tokenParam, newPassword);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-[var(--bg-surface)] p-8 rounded-3xl border border-[var(--border-default)] shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
            {t('auth.reset.title')}
          </h1>
          <p className="text-xs text-[var(--text-secondary)]">
            {t('auth.reset.subtitle')}
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl space-y-4 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-200">
              Your password has been updated in database. You can now sign in with your new password.
            </p>
            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Sign In Now
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                {t('auth.reset.newPassword')}
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                {t('auth.reset.confirmPassword')}
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
              />
            </div>

            {error && (
              <p className="text-xs font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/50 p-3 rounded-xl border border-rose-200 dark:border-rose-800">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? t('status.loading') : t('auth.reset.submitBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

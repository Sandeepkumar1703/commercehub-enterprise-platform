import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../core/router/Router';
import { ROUTES } from '../../theme/routes';
import { KeyRound, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { forgotPassword } = useAuth();
  const { t } = useLanguage();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await forgotPassword(email);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-[var(--bg-surface)] p-8 rounded-3xl border border-[var(--border-default)] shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
            {t('auth.forgot.title')}
          </h1>
          <p className="text-xs text-[var(--text-secondary)]">
            {t('auth.forgot.subtitle')}
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl space-y-4 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-200">
              Reset token generated and email dispatched to <span className="font-bold">{email}</span>.
            </p>
            <button
              onClick={() => navigate(`${ROUTES.RESET_PASSWORD}?token=reset_demo_77182`)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Simulate Opening Reset Link
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                {t('auth.login.emailLabel')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sandeep.prasad@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? t('status.loading') : t('auth.forgot.submitBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-[var(--border-default)]">
          <button
            onClick={() => navigate(ROUTES.LOGIN)}
            className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('auth.forgot.backToLogin')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

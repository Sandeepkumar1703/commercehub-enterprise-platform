import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../core/router/Router';
import { ROUTES } from '../../theme/routes';
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('sandeepkumarprasad01@gmail.com');
  const [password, setPassword] = useState('Password123!');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate(ROUTES.CUSTOMER_DASHBOARD);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-[var(--bg-surface)] p-8 rounded-3xl border border-[var(--border-default)] shadow-xl space-y-6">
        
        {/* Auth Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
            {t('auth.login.title')}
          </h1>
          <p className="text-xs text-[var(--text-secondary)]">
            {t('auth.login.subtitle')}
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-2xl text-xs space-y-1">
          <p className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-500" />
            <span>Pre-filled Demo Credentials</span>
          </p>
          <p className="text-[var(--text-secondary)] font-mono text-[11px]">
            Email: sandeepkumarprasad01@gmail.com
          </p>
          <p className="text-[var(--text-secondary)] font-mono text-[11px]">
            Password: Password123!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Field */}
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
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                {t('auth.login.passwordLabel')}
              </label>
              <button
                type="button"
                onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
                className="text-xs font-semibold text-[var(--brand-primary)] hover:underline cursor-pointer"
              >
                {t('auth.login.forgotPasswordLink')}
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/50 p-3 rounded-xl border border-rose-200 dark:border-rose-800">
              {errorMsg}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? t('status.loading') : t('auth.login.submitBtn')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Link to Register */}
        <div className="text-center pt-2 border-t border-[var(--border-default)]">
          <p className="text-xs text-[var(--text-secondary)]">
            {t('auth.login.noAccount')}{' '}
            <button
              onClick={() => navigate(ROUTES.REGISTER)}
              className="font-bold text-[var(--brand-primary)] hover:underline cursor-pointer ml-1"
            >
              {t('auth.login.signUpLink')}
            </button>
          </p>
        </div>

        {/* JWT Security Badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[var(--text-secondary)] pt-2 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Spring Security Stateless Dual-Token Authorization</span>
        </div>

      </div>
    </div>
  );
};

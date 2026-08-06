import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

// import { useAuth } from '../../context/AuthContext';
// import { useLanguage } from '../../context/LanguageContext';
import { useAppConfig } from '../../context/ConfigContext';
import { useRouter } from '../../core/router/Router';
import { ROUTES } from '../../theme/routes';

import { Button, Input, Card } from '../../theme/design-system';
import { useLanguage } from '@/src/core/i18n/LanguageContext';
import { useAuth } from '@/src/hooks/useAuth';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const { config } = useAppConfig();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg('');
    setLoading(true);

    const res = await login(email.trim(), password);

    setLoading(false);

    if (res.success) {
      navigate(ROUTES.CUSTOMER_DASHBOARD);
    } else {
      setErrorMsg(
        res.message || t('auth.login.errors.invalidCredentials')
      );
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <Card className="space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#6A89A7] text-[#BDDDFC] mx-auto flex items-center justify-center shadow-lg border border-[#88BDF2]/30">
            <Lock className="w-6 h-6 text-[#BDDDFC]" />
          </div>

          <h1 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
            {t('auth.login.title')}
          </h1>

          <p className="text-xs text-[var(--text-secondary)]">
            {t('auth.login.subtitle')}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <Input
            label={t('auth.login.emailLabel')}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={
              config?.placeholders?.email ??
              t('auth.login.emailPlaceholder')
            }
            prefixIcon={<Mail className="w-4 h-4" />}
          />

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">

              <label className="text-xs font-semibold text-[var(--text-primary)]">
                {t('auth.login.passwordLabel')}
              </label>

              <button
                type="button"
                onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
                className="text-xs font-semibold text-[#6A89A7] dark:text-[#88BDF2] hover:underline cursor-pointer"
              >
                {t('auth.login.forgotPasswordLink')}
              </button>

            </div>

            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('auth.login.passwordPlaceholder')}
              prefixIcon={<Lock className="w-4 h-4" />}
            />
          </div>

          {errorMsg && (
            <p className="text-xs font-semibold text-[#384959] dark:text-[#BDDDFC] bg-[#88BDF2]/20 p-3 rounded-xl border border-[#88BDF2]/40">
              {errorMsg}
            </p>
          )}

          <Button
            type="submit"
            isLoading={loading}
            variant="primary"
            className="w-full py-3"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {loading
              ? t('status.loading')
              : t('auth.login.submitBtn')}
          </Button>

        </form>

        {/* Register */}
        <div className="text-center pt-2 border-t border-[var(--border-default)]">
          <p className="text-xs text-[var(--text-secondary)]">
            {t('auth.login.noAccount')}{' '}
            <button
              type="button"
              onClick={() => navigate(ROUTES.REGISTER)}
              className="font-bold text-[#6A89A7] dark:text-[#88BDF2] hover:underline cursor-pointer ml-1"
            >
              {t('auth.login.signUpLink')}
            </button>
          </p>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[var(--text-secondary)] pt-2 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-[#6A89A7] dark:text-[#88BDF2]" />
          <span>{t('auth.login.securityBadge')}</span>
        </div>

      </Card>
    </div>
  );
};

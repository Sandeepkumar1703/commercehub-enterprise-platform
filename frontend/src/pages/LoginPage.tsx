import React, { useState } from 'react';
import { Button } from '../design-system/components/Button';
import { Input } from '../design-system/components/Input';
import { Card } from '../design-system/components/Card';
import { ROUTES } from '../theme/routes';
import { useRouter } from '../core/router/Router';
import { useAppConfig } from '../context/ConfigContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const { config } = useAppConfig();
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
      <Card className="space-y-6">
        
        {/* Auth Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#4A4A4A] text-[#FFFFE3] mx-auto flex items-center justify-center shadow-lg border border-[#CBCBCB]/30">
            <Lock className="w-6 h-6 text-[#FFFFE3]" />
          </div>
          <h1 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
            {t('auth.login.title')}
          </h1>
          <p className="text-xs text-[var(--text-secondary)]">
            {t('auth.login.subtitle')}
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="p-3.5 bg-[#6D8196]/10 border border-[#6D8196]/30 rounded-2xl text-xs space-y-1">
          <p className="font-bold text-[#6D8196] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#6D8196]" />
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
          
          <Input
            label={t('auth.login.emailLabel')}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={config?.placeholders?.email || 'name@company.com'}
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
                className="text-xs font-semibold text-[#6D8196] hover:underline cursor-pointer"
              >
                {t('auth.login.forgotPasswordLink')}
              </button>
            </div>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              prefixIcon={<Lock className="w-4 h-4" />}
            />
          </div>

          {errorMsg && (
            <p className="text-xs font-semibold text-[#4A4A4A] dark:text-[#FFFFE3] bg-[#CBCBCB]/20 p-3 rounded-xl border border-[#CBCBCB]/40">
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
            {loading ? t('status.loading') : t('auth.login.submitBtn')}
          </Button>
        </form>

        {/* Footer Link to Register */}
        <div className="text-center pt-2 border-t border-[var(--border-default)]">
          <p className="text-xs text-[var(--text-secondary)]">
            {t('auth.login.noAccount')}{' '}
            <button
              onClick={() => navigate(ROUTES.REGISTER)}
              className="font-bold text-[#6D8196] hover:underline cursor-pointer ml-1"
            >
              {t('auth.login.signUpLink')}
            </button>
          </p>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[var(--text-secondary)] pt-2 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-[#6D8196]" />
          <span>Spring Security Stateless Dual-Token Authorization</span>
        </div>

      </Card>
    </div>
  );
};

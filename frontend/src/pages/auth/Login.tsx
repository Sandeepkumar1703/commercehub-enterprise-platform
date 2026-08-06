import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';

import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '@/src/core/i18n/LanguageContext';

import { Button } from '../../components/common/Button';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Input } from '../../components/common/Input';
import { VynkLogo } from '../../components/brand/VynkLogo';
import { UserRole } from '@/src/types/User';
// import { UserRole } from '../../types';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const { t } = useLanguage();

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    /**
   * Backend should determine the role after authentication.
   * This is only passed because the current AuthContext login() accepts it.
   */
  const role: UserRole = 'CUSTOMER';

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error(t('auth.validation.emailRequired', 'Please enter your email.'));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error(
        t('auth.validation.invalidEmail', 'Please enter a valid email address.')
      );
      return;
    }

    if (!password) {
      toast.error(
        t('auth.validation.passwordRequired', 'Please enter your password.')
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await login(email.trim(), password, role);

      toast.success(
        t('auth.login.success', 'Successfully authenticated.')
      );

      navigate(from, {
        replace: true,
      });
    } catch (err: any) {
      const message =
        err?.message ||
        t('auth.login.invalidCredentials', 'Invalid email or password.');

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
  <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-app-background">
    <div className="w-full max-w-md rounded-3xl border border-app bg-app-card p-8 shadow-xl">

      <div className="mb-8 flex flex-col items-center space-y-3 text-center">
        <VynkLogo size="lg" />

        <h1 className="text-2xl font-black text-app-primary">
          {t('auth.login.title', 'Welcome Back')}
        </h1>

        <p className="text-sm text-app-muted">
          {t(
            'auth.login.subtitle',
            'Sign in to your Vynk account.'
          )}
        </p>
      </div>

      {error && (
        <div className="mb-4">
          <ErrorMessage
            title={t(
              'auth.login.errorTitle',
              'Authentication Failed'
            )}
            message={error}
          />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Input
          label={t(
            'auth.login.emailLabel',
            'Email Address'
          )}
          type="email"
          placeholder={t(
            'auth.login.emailPlaceholder',
            'Enter your email'
          )}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          icon={<Mail className="w-4 h-4" />}
        />

        <Input
          label={t(
            'auth.login.passwordLabel',
            'Password'
          )}
          type="password"
          placeholder={t(
            'auth.login.passwordPlaceholder',
            'Enter your password'
          )}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          icon={<Lock className="w-4 h-4" />}
        />

        <div className="flex items-center justify-between text-sm">
          <Link
            to="/auth/forgot-password"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            {t(
              'auth.login.forgotPassword',
              'Forgot Password?'
            )}
          </Link>

          <Link
            to="/auth/verify-email"
            className="text-app-muted hover:underline"
          >
            {t(
              'auth.login.verifyEmail',
              'Verify Email'
            )}
          </Link>
        </div>

        <Button
          type="submit"
          loading={loading}
          className="w-full"
          icon={<LogIn className="w-4 h-4" />}
        >
          {t(
            'auth.login.signIn',
            'Sign In'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-app-muted">
        {t(
          'auth.login.noAccount',
          "Don't have an account?"
        )}{' '}
        <Link
          to="/auth/register"
          className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
        >
          {t(
            'auth.login.createAccount',
            'Create one'
          )}
        </Link>
      </div>

    </div>
  </div>
)
}
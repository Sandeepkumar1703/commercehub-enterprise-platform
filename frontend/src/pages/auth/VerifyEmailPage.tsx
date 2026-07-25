import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../core/router/Router';
import { ROUTES } from '../../theme/routes';
import { MailCheck, CheckCircle2, XCircle, ArrowRight, Loader2 } from 'lucide-react';

export const VerifyEmailPage: React.FC = () => {
  const { queryParams, navigate } = useRouter();
  const { verifyEmail } = useAuth();
  const { t } = useLanguage();

  const tokenParam = queryParams['token'] || 'token_demo_98234';
  const [status, setStatus] = useState<'LOADING' | 'SUCCESS' | 'FAIL'>('LOADING');
  const hasVerifiedRef = React.useRef<string | null>(null);

  useEffect(() => {
    if (hasVerifiedRef.current === tokenParam) return;
    hasVerifiedRef.current = tokenParam;

    let isMounted = true;
    const runVerification = async () => {
      const res = await verifyEmail(tokenParam);
      if (isMounted) {
        if (res.success) {
          setStatus('SUCCESS');
        } else {
          setStatus('FAIL');
        }
      }
    };
    runVerification();
    return () => {
      isMounted = false;
    };
  }, [tokenParam, verifyEmail]);

  return (
    <div className="max-w-md mx-auto py-16">
      <div className="bg-[var(--bg-surface)] p-8 rounded-3xl border border-[var(--border-default)] shadow-xl text-center space-y-6">
        
        <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-indigo-600/30">
          <MailCheck className="w-7 h-7" />
        </div>

        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
          {t('auth.verify.title')}
        </h1>

        {status === 'LOADING' && (
          <div className="py-8 space-y-3 flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-[var(--brand-primary)] animate-spin" />
            <p className="text-xs text-[var(--text-secondary)] font-medium">
              {t('auth.verify.subtitle')}
            </p>
          </div>
        )}

        {status === 'SUCCESS' && (
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl space-y-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-emerald-800 dark:text-emerald-200">
                {t('auth.verify.successTitle')}
              </h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                {t('auth.verify.successDesc')}
              </p>
            </div>
            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Proceed to Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {status === 'FAIL' && (
          <div className="p-6 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-2xl space-y-4">
            <XCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-rose-800 dark:text-rose-200">
                {t('auth.verify.failTitle')}
              </h3>
              <p className="text-xs text-rose-600 dark:text-rose-400">
                {t('auth.verify.failDesc')}
              </p>
            </div>
            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              className="w-full py-3 bg-[var(--brand-primary)] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Back to Sign In
            </button>
          </div>
        )}

        <div className="text-xs font-mono text-[var(--text-secondary)] pt-2 border-t border-[var(--border-default)]">
          GET /api/auth/verify-email?token={tokenParam}
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../../../app/store/store';
import { Button } from '../../../shared/components/Button';
import { MailCheck, ExternalLink, ArrowLeft } from 'lucide-react';

export const VerifyEmail: React.FC = () => {
  const { setAuthView, setPortal, showToast } = useApp();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <MailCheck className="w-8 h-8" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Check Your Email
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            We sent a verification link to your inbox. Click the link to verify your CommerceHub account.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            className="w-full"
            rightIcon={<ExternalLink className="w-4 h-4" />}
            onClick={() => {
              showToast('Email Verified', 'Your account is now active!', 'success');
              setPortal('customer');
            }}
          >
            Confirm & Open Dashboard
          </Button>

          <Button
            variant="outline"
            className="w-full text-xs"
            onClick={() => showToast('Email Sent', 'Verification email resent.', 'info')}
          >
            Resend Email
          </Button>
        </div>

        <button
          onClick={() => setAuthView('login')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;

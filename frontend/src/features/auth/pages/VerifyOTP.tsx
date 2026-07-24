import React, { useState, useEffect } from 'react';
import { useApp } from '../../../app/store/store';
import { OTPInput } from '../components/OTPInput';
import { Button } from '../../../shared/components/Button';
import { Logo } from '../../../shared/components/Logo';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const VerifyOTP: React.FC = () => {
  const { setAuthView, setPortal, showToast } = useApp();
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = (code: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('2FA Verified', `Authentication code ${code} accepted.`, 'success');
      setPortal('customer');
    }, 800);
  };

  const handleResend = () => {
    setTimer(60);
    showToast('OTP Sent', 'A new 6-digit passcode was sent to your phone/email.', 'info');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-1">
          <Logo className="justify-center mb-2" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Two-Factor Authentication
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Enter the 6-digit security PIN sent to your registered phone or auth app.
          </p>
        </div>

        {/* Segmented OTP Input */}
        <div className="py-2">
          <OTPInput length={6} onComplete={handleVerify} />
        </div>

        {loading && (
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 animate-pulse">
            Verifying passcode credentials...
          </p>
        )}

        {/* Resend Timer */}
        <div className="text-xs text-slate-500">
          {timer > 0 ? (
            <span>Resend security code in <strong className="font-bold text-slate-700 dark:text-slate-300">{timer}s</strong></span>
          ) : (
            <button
              onClick={handleResend}
              className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Resend Code Now
            </button>
          )}
        </div>

        <div className="pt-2">
          <Button variant="ghost" size="sm" onClick={() => setAuthView('login')} leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;

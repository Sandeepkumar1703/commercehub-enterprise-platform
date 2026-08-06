import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { authApi } from '../../api/authApi';
import { Loader } from '../../components/common/Loader';

export const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setVerified(false);
        setLoading(false);
        return;
      }
      try {
        const res = await authApi.verifyEmail(token);
        if (res.success) setVerified(true);
      } catch (err) {
        console.error('Email verification error', err);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [token]);

  if (loading) return <Loader text="Verifying token with REST service..." />;

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700">
        <div className={`inline-flex p-4 rounded-full ${verified ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
          {verified ? <CheckCircle2 className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
        </div>
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">
          {verified ? 'Vynk Email Verified!' : 'Verification Token Expired'}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {verified
            ? 'Your account email address has been verified. Welcome to Vynk — Seamlessly Connected Shopping.'
            : 'The email verification token has expired or is invalid.'}
        </p>
        <Link
          to="/auth/login"
          className="inline-block w-full py-3 bg-[var(--vynk-brand)] text-white font-bold text-xs rounded-xl hover:bg-[var(--vynk-brand-hover)] transition-colors"
        >
          Proceed to Login
        </Link>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { CheckCircle2, XCircle, Loader2, MailCheck } from 'lucide-react';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setMessage('Missing verification token.');
      return;
    }
    authService
      .verifyEmail(token)
      .then((res) => {
        setVerified(true);
        setMessage(res.data?.message || 'Email verified successfully!');
      })
      .catch((err) => {
        setVerified(false);
        setMessage(err.response?.data?.message || 'Email verification failed.');
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl p-8 border dark:border-gray-700 shadow-lg text-center space-y-6">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
          <MailCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Email Verification</h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-gray-500">Verifying your email address...</p>
          </div>
        ) : verified ? (
          <div className="space-y-4">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
            <p className="text-gray-700 dark:text-gray-300 font-medium">{message}</p>
            <Link
              to="/login"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
            >
              Proceed to Login
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <XCircle className="w-12 h-12 text-red-500 mx-auto" />
            <p className="text-red-600 dark:text-red-400 font-medium">{message}</p>
            <Link
              to="/login"
              className="inline-block px-6 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

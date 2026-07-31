import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { KeyRound, CheckCircle, Loader2 } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await authService.resetPassword({ token, newPassword: password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl p-8 border dark:border-gray-700 shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reset Password</h1>
          <p className="text-sm text-gray-500">Enter your new secure password below</p>
        </div>

        {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
        {success ? (
          <div className="p-4 bg-green-50 text-green-700 rounded-lg text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
            <p className="font-semibold">Password Reset Successful!</p>
            <p className="text-xs">Redirecting to login page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex justify-center items-center"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

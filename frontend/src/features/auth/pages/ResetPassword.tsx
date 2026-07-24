import React, { useState } from 'react';
import { useApp } from '../../../app/store/store';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { Logo } from '../../../shared/components/Logo';
import { PasswordStrengthMeter } from '../components/PasswordStrengthMeter';
import { Lock, ArrowRight } from 'lucide-react';

export const ResetPassword: React.FC = () => {
  const { setAuthView, showToast } = useApp();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('Mismatch', 'New password and confirmation password do not match.', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Password Updated', 'Your password has been changed successfully.', 'success');
      setAuthView('login');
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Set New Password</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Please choose a strong password that you haven't used before.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              prefixIcon={<Lock className="w-4 h-4" />}
              placeholder="Enter new password"
              required
            />
            <PasswordStrengthMeter password={newPassword} />
          </div>

          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            prefixIcon={<Lock className="w-4 h-4" />}
            placeholder="Re-enter new password"
            required
          />

          <Button type="submit" loading={loading} className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

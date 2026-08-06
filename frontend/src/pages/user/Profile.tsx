import React, { useState, useEffect } from 'react';
import { Shield, Lock, User as UserIcon, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { authApi } from '../../api/authApi';
import { userApi } from '../../api/userApi';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const Profile: React.FC = () => {
  const { user, refreshPermissions } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.name) {
      const parts = user.name.split(' ');
      setFirstName(parts[0] || '');
      setLastName(parts.slice(1).join(' ') || '');
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setError(null);
    setProfileSuccess(false);
    try {
      await userApi.updateProfile({ firstName, lastName });
      setProfileSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setError(null);
    setPasswordSuccess(false);
    try {
      await authApi.changePassword({
        currentPassword: oldPassword,
        newPassword,
        confirmPassword: newPassword,
      });
      setPasswordSuccess(true);
      setOldPassword('');
      setNewPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">User Security & Profile</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage your account profile, Spring Security JWT credentials and active permissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Card */}
        <div className="card-surface p-6 flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-2xl bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] flex items-center justify-center font-bold ring-4 ring-[var(--vynk-brand)]/20 shrink-0">
            <UserIcon className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{user?.name}</h3>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
          <span className="px-3 py-1 bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] text-xs font-bold rounded-full uppercase tracking-wider">
            {user?.role}
          </span>
        </div>

        {/* Edit Profile Form */}
        <div className="md:col-span-2 card-surface p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <UserIcon className="w-5 h-5 text-[var(--vynk-brand)]" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Profile Information</h3>
          </div>

          {profileSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <Input
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <Button type="submit" loading={profileLoading} size="sm">
              Update Profile
            </Button>
          </form>
        </div>
      </div>

      {/* Security Form */}
      <div className="card-surface p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Lock className="w-5 h-5 text-[var(--vynk-brand)]" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Security Credentials</h3>
        </div>

        {passwordSuccess && (
          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Password changed successfully!
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Button type="submit" loading={passwordLoading} size="sm">
            Update Password
          </Button>
        </form>
      </div>

      {/* Permissions Matrix for user */}
      <div className="card-surface p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[var(--vynk-brand)]" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Assigned Spring Security Permissions
            </h3>
          </div>
          <button
            onClick={refreshPermissions}
            className="text-xs font-bold text-[var(--vynk-brand)] hover:underline cursor-pointer"
          >
            Refresh
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {user?.permissions && user.permissions.length > 0 ? (
            user.permissions.map((perm) => (
              <span
                key={perm}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-mono font-semibold border border-slate-200 dark:border-slate-700"
              >
                {perm}
              </span>
            ))
          ) : (
            <p className="text-xs text-slate-400">No custom permissions granted directly to user.</p>
          )}
        </div>
      </div>
    </div>
  );
};


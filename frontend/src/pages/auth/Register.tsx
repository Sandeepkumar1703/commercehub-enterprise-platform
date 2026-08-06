import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Store } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { UserRole } from '../../types';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<UserRole>('CUSTOMER');
  const [storeName, setStoreName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register({ name, email, password, role, storeName });
      navigate(role === 'CUSTOMER' ? '/' : '/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] rounded-2xl">
            <UserPlus className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Create Account</h2>
          <p className="text-xs text-app-muted">
            Join Vynk as a Customer or Merchant
          </p>
        </div>

        {/* Account Type Selector */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
          <button
            type="button"
            onClick={() => setRole('CUSTOMER')}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              role === 'CUSTOMER' ? 'bg-[var(--vynk-brand)] text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <User className="w-4 h-4" /> Customer
          </button>
          <button
            type="button"
            onClick={() => setRole('SELLER')}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              role === 'SELLER' ? 'bg-[var(--vynk-brand)] text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Store className="w-4 h-4" /> Merchant Seller
          </button>
        </div>

        {error && <ErrorMessage title="Registration Failed" message={error} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            icon={<User className="w-4 h-4" />}
            placeholder="John Doe"
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon={<Mail className="w-4 h-4" />}
            placeholder="john@example.com"
          />

          {role === 'SELLER' && (
            <Input
              label="Store Business Name"
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              required
              icon={<Store className="w-4 h-4" />}
              placeholder="Apex Electronics"
            />
          )}

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={<Lock className="w-4 h-4" />}
          />

          <Button type="submit" loading={loading} className="w-full">
            Register Account
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-[var(--vynk-brand)] font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

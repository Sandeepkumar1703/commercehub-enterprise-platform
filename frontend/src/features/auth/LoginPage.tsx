import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { authApi } from './auth.api';
import { useAppDispatch } from '../../app/store/hooks';
import { setCredentials } from './authSlice';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Card } from '../../shared/components/Card';
import { useToast } from '../../shared/components/Toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const from = (location.state as any)?.from?.pathname || '/';

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const res = await authApi.login(values);
      dispatch(setCredentials(res));
      toast.success('Welcome back!', `Logged in as ${res.user.firstName} ${res.user.lastName}`);
      navigate(from, { replace: true });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid login credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const fillQuickDemo = (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      setValue('email', 'admin@commercehub.com');
      setValue('password', 'admin123');
    } else {
      setValue('email', 'alex.morgan@example.com');
      setValue('password', 'customer123');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand text-brand-foreground font-black text-2xl flex items-center justify-center mx-auto shadow-md">
            C
          </div>
          <h1 className="text-h2 font-extrabold text-content-primary">Sign in to CommerceHub</h1>
          <p className="text-xs text-content-secondary">
            Access your orders, saved wishlist, address book, and enterprise portal.
          </p>
        </div>

        {/* Demo Quick fill credentials bar */}
        <div className="p-3 bg-brand/5 border border-brand/20 rounded-xl space-y-2">
          <p className="text-[11px] font-bold text-brand uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> One-Click Demo Credentials
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillQuickDemo('customer')}
              className="px-2.5 py-1.5 bg-surface border border-border rounded-lg text-xs font-semibold text-content-primary hover:border-brand hover:text-brand transition-colors text-left flex items-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-brand" />
              <span>Customer Demo</span>
            </button>
            <button
              type="button"
              onClick={() => fillQuickDemo('admin')}
              className="px-2.5 py-1.5 bg-surface border border-border rounded-lg text-xs font-semibold text-content-primary hover:border-brand hover:text-brand transition-colors text-left flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        <Card glass className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="alex.morgan@example.com"
              leftIcon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              {...register('email')}
            />

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-content-primary">Password</label>
                <Link to="/forgot-password" className="text-xs font-semibold text-brand hover:underline">
                  Forgot?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock className="w-4 h-4" />}
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Sign In
            </Button>
          </form>
        </Card>

        <p className="text-center text-xs text-content-secondary">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-brand hover:underline">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { authApi } from './auth.api';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Card } from '../../shared/components/Card';
import { useToast } from '../../shared/components/Toast';

export const ForgotPasswordPage: React.FC = () => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      await authApi.forgotPassword(email);
      setIsSubmitted(true);
      toast.success('Reset email dispatched!');
    } catch {
      toast.error('Failed to send reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-h2 font-extrabold text-content-primary">Reset Account Password</h1>
          <p className="text-xs text-content-secondary">
            Enter your registered email address and we'll send you password recovery instructions.
          </p>
        </div>

        <Card>
          {isSubmitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-status-success mx-auto" />
              <h3 className="text-sm font-bold text-content-primary">Check your inbox</h3>
              <p className="text-xs text-content-secondary max-w-xs mx-auto">
                We've sent a password reset link to <span className="font-bold text-content-primary">{email}</span>.
              </p>
              <Button variant="outline" size="sm" onClick={() => setIsSubmitted(false)}>
                Try another email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="alex.morgan@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Send Password Reset Link
              </Button>
            </form>
          )}
        </Card>

        <p className="text-center text-xs text-content-secondary">
          <Link to="/login" className="font-bold text-brand hover:underline flex items-center justify-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

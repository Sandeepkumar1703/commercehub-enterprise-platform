import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home, Lock, HelpCircle } from 'lucide-react';
import { useAppSelector } from '../../app/store/hooks';
import { getPrimaryRole, getUserDefaultDashboard } from '../../core/auth/permissions';
import { useLanguage } from '../../core/i18n/LanguageContext';

export const AccessDeniedPage: React.FC<{ requiredRoleOrPermission?: string }> = ({
  requiredRoleOrPermission,
}) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { language } = useLanguage();
  const primaryRole = getPrimaryRole(user);
  const defaultDashboard = getUserDefaultDashboard(user, language);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface border border-border rounded-2xl p-8 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-status-danger/10 text-status-danger rounded-2xl flex items-center justify-center mx-auto border border-status-danger/20">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-status-danger/10 text-status-danger">
            403 - Access Denied
          </span>
          <h1 className="text-2xl font-extrabold text-content-primary">
            Unauthorized Access
          </h1>
          <p className="text-xs text-content-secondary leading-relaxed">
            You do not have the necessary permissions or role level to view this page or perform this action.
          </p>
        </div>

        {(requiredRoleOrPermission || primaryRole) && (
          <div className="bg-background border border-border rounded-xl p-4 text-left space-y-2 text-xs">
            <div className="flex justify-between text-content-muted">
              <span>Your Assigned Role:</span>
              <span className="font-bold text-brand uppercase">{primaryRole.replace('ROLE_', '')}</span>
            </div>
            {requiredRoleOrPermission && (
              <div className="flex justify-between text-content-muted pt-2 border-t border-border">
                <span>Required Permission/Role:</span>
                <span className="font-bold text-status-danger">{requiredRoleOrPermission}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-xs font-bold text-content-primary hover:bg-surface-hover transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <Link
            to={defaultDashboard}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-brand-foreground text-xs font-bold hover:bg-brand-hover transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>My Dashboard</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between text-[11px] text-content-muted">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3" /> RBAC Enforced
          </span>
          <Link to={`/${language}/contact`} className="hover:underline flex items-center gap-1 text-brand">
            <HelpCircle className="w-3 h-3" /> Contact Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, Lock } from 'lucide-react';
import { BRAND } from '../../constants/brand';

export const ForbiddenPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-app-background">
      <div className="w-20 h-20 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-6 shadow-xs">
        <ShieldAlert size={40} />
      </div>
      <h1 className="text-3xl font-extrabold text-app-primary mb-3">403 - Permission Required</h1>
      <p className="text-app-secondary max-w-md mb-8">
        {BRAND.errors.forbidden}
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/auth/login"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-app text-app-primary bg-app-card hover:bg-app-surface transition font-medium cursor-pointer"
        >
          <Lock size={18} /> Switch Account
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary-luxury shadow-xs font-medium"
        >
          <Home size={18} /> Back to Vynk Store
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;

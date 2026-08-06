import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { BRAND } from '../../constants/brand';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-app-background">
      <div className="w-20 h-20 bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] rounded-2xl flex items-center justify-center mb-6 shadow-xs">
        <FileQuestion size={40} />
      </div>
      <h1 className="text-3xl font-extrabold text-app-primary mb-3">Looks like this page left Vynk</h1>
      <p className="text-app-secondary max-w-md mb-8">
        {BRAND.errors.pageNotFound}
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-app text-app-primary bg-app-card hover:bg-app-surface transition font-medium cursor-pointer"
        >
          <ArrowLeft size={18} /> Go Back
        </button>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary-luxury shadow-xs font-medium"
        >
          <Home size={18} /> Let's Get You Back Shopping
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

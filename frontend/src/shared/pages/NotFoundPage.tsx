import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home, Search } from 'lucide-react';
import { useLanguage } from '../../core/i18n/LanguageContext';

export const NotFoundPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface border border-border rounded-2xl p-8 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mx-auto border border-brand/20">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand/10 text-brand">
            404 - Not Found
          </span>
          <h1 className="text-2xl font-extrabold text-content-primary">
            Page Not Found
          </h1>
          <p className="text-xs text-content-secondary leading-relaxed">
            The resource or page you requested does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to={`/${language}/products`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-xs font-bold text-content-primary hover:bg-surface-hover transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Browse Products</span>
          </Link>

          <Link
            to={`/${language}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-brand-foreground text-xs font-bold hover:bg-brand-hover transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

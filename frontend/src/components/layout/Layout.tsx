import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { LanguageSync } from './LanguageSync';

export const Layout: React.FC = () => {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/permission') ||
    location.pathname.startsWith('/language') ||
    location.pathname.startsWith('/inventory') ||
    location.pathname.startsWith('/payment') ||
    location.pathname.startsWith('/shipping') ||
    location.pathname.startsWith('/media');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors">
      <LanguageSync />
      <Header />

      {isAdminRoute ? (
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              <Outlet />
            </div>
          </main>
        </div>
      ) : (
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <Outlet />
          </div>
        </main>
      )}

      {!isAdminRoute && <Footer />}
    </div>
  );
};

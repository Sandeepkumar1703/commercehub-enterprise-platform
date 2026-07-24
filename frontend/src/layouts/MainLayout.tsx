import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '../features/cart/components/CartDrawer';
import { CommandPalette } from '../shared/components/CommandPalette';
import { ToastContainer } from '../shared/components/Toast';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <CommandPalette />
      <ToastContainer />
    </div>
  );
};

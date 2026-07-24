import React from 'react';
import { useApp } from '../app/store/store';
import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';
import { ToastContainer } from '../shared/components/Toast';
import { CommandPalette } from '../shared/components/CommandPalette';
import { Button } from '../shared/components/Button';
import { ShieldCheck, Zap, Globe2, Layers, CheckCircle, ArrowRight, Store, Building2, LayoutDashboard } from 'lucide-react';

export const MarketingLanding: React.FC = () => {
  const { setPortal } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
      <Header />

      <main className="flex-1 space-y-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero Banner Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" /> Enterprise E-Commerce Platform OS
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Unified Multi-Portal Commerce Infrastructure
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Power global consumer storefronts, multi-tenant merchant seller hubs, and SOC2 compliant admin governance from a single high-velocity platform engine.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Store className="w-5 h-5" />}
              onClick={() => setPortal('customer')}
            >
              Explore CX Storefront
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Building2 className="w-5 h-5" />}
              onClick={() => setPortal('seller')}
            >
              Launch Merchant Hub
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<LayoutDashboard className="w-5 h-5" />}
              onClick={() => setPortal('admin')}
            >
              Admin Governance
            </Button>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Customer Storefront CX</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Responsive product catalog with instant search filters, color/size swatches, sliding cart drawer, and 3-step checkout.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Seller Operations Hub</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              4-step catalog publishing wizard, inventory batch management, low-stock triggers, and instant 2FA bank wallet withdrawals.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Admin RBAC Governance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Role-based access controls, side-by-side JSON mutation diffs, SOC2 immutable audit logs, and infrastructure monitoring.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <ToastContainer />
      <CommandPalette />
    </div>
  );
};

export default MarketingLanding;

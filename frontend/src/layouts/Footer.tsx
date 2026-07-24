import React from 'react';
import { Logo } from '../shared/components/Logo';
import { useApp } from '../app/store/store';

export const Footer: React.FC = () => {
  const { setPortal, setCustomerView } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-4">
          <Logo className="text-white" />
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            CommerceHub is the unified multi-tenant enterprise e-commerce platform powering high-velocity merchants, global customer storefronts, and automated logistics worldwide.
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>SOC2 Certified</span> • <span>PCI-DSS Level 1</span> • <span>ISO 27001</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Shop CX</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => { setPortal('customer'); setCustomerView('plp'); }} className="hover:text-white transition-colors">Catalog & Products</button></li>
            <li><button onClick={() => { setPortal('customer'); setCustomerView('account'); }} className="hover:text-white transition-colors">Customer Account</button></li>
            <li><button onClick={() => { setPortal('customer'); setCustomerView('account'); }} className="hover:text-white transition-colors">Order Tracking</button></li>
            <li><button onClick={() => { setPortal('customer'); setCustomerView('account'); }} className="hover:text-white transition-colors">Wishlist & Saved</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Merchant Suite</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => setPortal('seller')} className="hover:text-white transition-colors">Seller Portal Overview</button></li>
            <li><button onClick={() => setPortal('seller')} className="hover:text-white transition-colors">Inventory Management</button></li>
            <li><button onClick={() => setPortal('seller')} className="hover:text-white transition-colors">Wallet & Payouts</button></li>
            <li><button onClick={() => setPortal('admin')} className="hover:text-white transition-colors">Admin Governance</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Public Site</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => setPortal('marketing')} className="hover:text-white transition-colors">Platform Features</button></li>
            <li><button onClick={() => setPortal('marketing')} className="hover:text-white transition-colors">Enterprise Pricing</button></li>
            <li><button onClick={() => setPortal('marketing')} className="hover:text-white transition-colors">About CommerceHub</button></li>
            <li><button onClick={() => setPortal('system')} className="hover:text-white transition-colors">System Error Demos</button></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 px-4 sm:px-8 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <p>© 2026 CommerceHub Enterprise OS. Designed with mathematical spatial layout & WCAG 2.1 AA standards.</p>
        <div className="flex items-center gap-4">
          <a href="#privacy" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#terms" className="hover:text-slate-300">Terms of Service</a>
          <a href="#security" className="hover:text-slate-300">Security Audit</a>
        </div>
      </div>
    </footer>
  );
};

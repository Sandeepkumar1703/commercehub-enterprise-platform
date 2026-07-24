import React, { useState, useEffect } from 'react';
import { useApp } from '@/src/app/store/store';

import {
  Compass,
  X,
  ShoppingBag,
  User,
  Lock,
  LayoutDashboard,
  PlusCircle,
  Package,
  Wallet,
  ShieldCheck,
  Users,
  FileText,
  Sparkles,
  Printer,
  AlertTriangle,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const PageNavigator: React.FC = () => {
  const {
    portal,
    setPortal,
    authView,
    setAuthView,
    customerView,
    setCustomerView,
    sellerView,
    setSellerView,
    adminView,
    setAdminView,
    systemView,
    setSystemView
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);

  // Sync hash changes with app store
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (!hash) {
        setPortal('auth');
        setAuthView('login');
        window.location.hash = 'login';
        return;
      }

      if (hash === 'home' || hash === 'plp') {
        setPortal('customer');
        setCustomerView('plp');
      } else if (hash === 'pdp' || hash === 'product') {
        setPortal('customer');
        setCustomerView('pdp');
      } else if (hash === 'account' || hash === 'orders') {
        setPortal('customer');
        setCustomerView('account');
      } else if (hash === 'login') {
        setPortal('auth');
        setAuthView('login');
      } else if (hash === 'register') {
        setPortal('auth');
        setAuthView('register');
      } else if (hash === 'forgot') {
        setPortal('auth');
        setAuthView('forgot');
      } else if (hash === 'reset') {
        setPortal('auth');
        setAuthView('reset');
      } else if (hash === 'otp') {
        setPortal('auth');
        setAuthView('otp');
      } else if (hash === 'verify-email') {
        setPortal('auth');
        setAuthView('verify-email');
      } else if (hash === 'seller-dashboard' || hash === 'seller') {
        setPortal('seller');
        setSellerView('dashboard');
      } else if (hash === 'seller-add-product') {
        setPortal('seller');
        setSellerView('add-product');
      } else if (hash === 'seller-inventory') {
        setPortal('seller');
        setSellerView('inventory');
      } else if (hash === 'seller-wallet') {
        setPortal('seller');
        setSellerView('wallet');
      } else if (hash === 'admin-dashboard' || hash === 'admin') {
        setPortal('admin');
        setAdminView('dashboard');
      } else if (hash === 'admin-users') {
        setPortal('admin');
        setAdminView('users');
      } else if (hash === 'admin-audit') {
        setPortal('admin');
        setAdminView('audit');
      } else if (hash === 'marketing' || hash === 'landing') {
        setPortal('marketing');
      } else if (hash === 'invoice') {
        setPortal('system');
        setSystemView('invoice');
      } else if (hash === 'system-errors' || hash === '404' || hash === '403' || hash === '500') {
        setPortal('system');
        if (hash === '403') setSystemView('403');
        else if (hash === '500') setSystemView('500');
        else setSystemView('404');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setPortal, setAuthView, setCustomerView, setSellerView, setAdminView, setSystemView]);

  const navigateTo = (p: any, subView?: any, hashName?: string) => {
    setPortal(p);
    if (p === 'customer' && subView) setCustomerView(subView);
    if (p === 'auth' && subView) setAuthView(subView);
    if (p === 'seller' && subView) setSellerView(subView);
    if (p === 'admin' && subView) setAdminView(subView);
    if (p === 'system' && subView) setSystemView(subView);

    if (hashName) {
      window.location.hash = hashName;
    }
    setIsOpen(false);
  };

  const pageGroups = [
    {
      title: '🛒 Customer Shopping Portal',
      items: [
        { label: 'Home Storefront (PLP)', hash: 'home', action: () => navigateTo('customer', 'plp', 'home'), active: portal === 'customer' && customerView === 'plp', icon: ShoppingBag },
        { label: 'Product Details (PDP)', hash: 'pdp', action: () => navigateTo('customer', 'pdp', 'pdp'), active: portal === 'customer' && customerView === 'pdp', icon: ExternalLink },
        { label: 'Customer Account & Orders', hash: 'account', action: () => navigateTo('customer', 'account', 'account'), active: portal === 'customer' && customerView === 'account', icon: User },
      ]
    },
    {
      title: '🔐 Authentication Pages',
      items: [
        { label: 'Sign In / Login', hash: 'login', action: () => navigateTo('auth', 'login', 'login'), active: portal === 'auth' && authView === 'login', icon: Lock },
        { label: 'Create Account (Register)', hash: 'register', action: () => navigateTo('auth', 'register', 'register'), active: portal === 'auth' && authView === 'register', icon: User },
        { label: 'Forgot Password', hash: 'forgot', action: () => navigateTo('auth', 'forgot', 'forgot'), active: portal === 'auth' && authView === 'forgot', icon: Lock },
        { label: 'Reset Password', hash: 'reset', action: () => navigateTo('auth', 'reset', 'reset'), active: portal === 'auth' && authView === 'reset', icon: Lock },
        { label: 'Verify OTP Code', hash: 'otp', action: () => navigateTo('auth', 'otp', 'otp'), active: portal === 'auth' && authView === 'otp', icon: ShieldCheck },
        { label: 'Verify Email Link', hash: 'verify-email', action: () => navigateTo('auth', 'verify-email', 'verify-email'), active: portal === 'auth' && authView === 'verify-email', icon: ShieldCheck },
      ]
    },
    {
      title: '🏪 Seller Operations Portal',
      items: [
        { label: 'Seller Executive Dashboard', hash: 'seller-dashboard', action: () => navigateTo('seller', 'dashboard', 'seller-dashboard'), active: portal === 'seller' && sellerView === 'dashboard', icon: LayoutDashboard },
        { label: 'Add Product Workflow', hash: 'seller-add-product', action: () => navigateTo('seller', 'add-product', 'seller-add-product'), active: portal === 'seller' && sellerView === 'add-product', icon: PlusCircle },
        { label: 'Inventory & Orders Table', hash: 'seller-inventory', action: () => navigateTo('seller', 'inventory', 'seller-inventory'), active: portal === 'seller' && sellerView === 'inventory', icon: Package },
        { label: 'Seller Wallet & Payouts', hash: 'seller-wallet', action: () => navigateTo('seller', 'wallet', 'seller-wallet'), active: portal === 'seller' && sellerView === 'wallet', icon: Wallet },
      ]
    },
    {
      title: '🛡️ Enterprise Admin Governance',
      items: [
        { label: 'Admin Dashboard', hash: 'admin-dashboard', action: () => navigateTo('admin', 'dashboard', 'admin-dashboard'), active: portal === 'admin' && adminView === 'dashboard', icon: ShieldCheck },
        { label: 'User Management (RBAC)', hash: 'admin-users', action: () => navigateTo('admin', 'users', 'admin-users'), active: portal === 'admin' && adminView === 'users', icon: Users },
        { label: 'Security Audit Logs', hash: 'admin-audit', action: () => navigateTo('admin', 'audit', 'admin-audit'), active: portal === 'admin' && adminView === 'audit', icon: FileText },
      ]
    },
    {
      title: '🚀 Public & Utility Pages',
      items: [
        { label: 'Public Marketing Landing', hash: 'marketing', action: () => navigateTo('marketing', undefined, 'marketing'), active: portal === 'marketing', icon: Sparkles },
        { label: 'Printable Order Invoice', hash: 'invoice', action: () => navigateTo('system', 'invoice', 'invoice'), active: portal === 'system' && systemView === 'invoice', icon: Printer },
        { label: 'System Error Pages (404/403)', hash: '404', action: () => navigateTo('system', '404', '404'), active: portal === 'system' && systemView === '404', icon: AlertTriangle },
      ]
    }
  ];

  return (
    <>
      {/* Floating Navigator Trigger Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 dark:bg-indigo-600 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all border border-slate-700 dark:border-indigo-400 font-semibold text-xs"
          title="All Pages Directory"
        >
          <Compass className="w-4 h-4 animate-spin-slow text-indigo-400 dark:text-indigo-200" />
          <span>All Pages Directory (18)</span>
        </button>
      </div>

      {/* Slide-Up Navigation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>CommerceHub Page Directory</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Click any page below to navigate directly in your browser.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pageGroups.map((group, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-1.5">
                      {group.title}
                    </h4>
                    <div className="space-y-1">
                      {group.items.map((item, itemIdx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={itemIdx}
                            onClick={item.action}
                            className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                              item.active
                                ? 'bg-indigo-600 text-white font-bold shadow-md'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className={`w-4 h-4 ${item.active ? 'text-white' : 'text-slate-400'}`} />
                              <span>{item.label}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                item.active ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                              }`}>
                                #{item.hash}
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex items-center justify-between">
              <span>Tip: You can also use <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded font-bold text-slate-700 dark:text-slate-200">Cmd + K</kbd> anytime for Command Search</span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Close Directory
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PageNavigator;

import React, { useState } from 'react';
import { useApp, SellerView } from '../app/store/store';
import { Logo } from '../shared/components/Logo';
import { ToastContainer } from '../shared/components/Toast';
import { CommandPalette } from '../shared/components/CommandPalette';
import {
  LayoutDashboard, PlusCircle, Boxes, Wallet, Store,
  Search, Bell, ChevronRight, LogOut, Sun, Moon, ArrowLeft
} from 'lucide-react';

export const SellerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    sellerView, setSellerView,
    setPortal,
    theme, toggleTheme,
    currentUser, logout,
    sellers,
    setCommandPaletteOpen
  } = useApp();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const seller = sellers[0];

  const breadcrumbsMap: Record<SellerView, string> = {
    'dashboard': 'Seller Portal > Overview Dashboard',
    'add-product': 'Seller Portal > Catalog > + Add Product Workflow',
    'inventory': 'Seller Portal > Inventory & Batch Order Management',
    'wallet': 'Seller Portal > Finances > Wallet & Instant Payouts'
  };

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Sidebar (260px / Collapsible to 72px) */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col justify-between transition-all duration-200 shrink-0 hidden sm:flex`}>
        <div className="p-4 space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <Logo iconOnly={sidebarCollapsed} className="text-white" />
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              {sidebarCollapsed ? '→' : '←'}
            </button>
          </div>

          {/* Store Switcher */}
          {!sidebarCollapsed && (
            <div className="p-3 bg-slate-800/80 rounded-xl flex items-center gap-3 border border-slate-700/60">
              <img src={seller.avatar} alt="" className="w-8 h-8 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{seller.storeName}</p>
                <p className="text-[10px] text-emerald-400 font-semibold">✓ Verified Merchant</p>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="space-y-1.5 text-xs font-medium">
            <button
              onClick={() => setSellerView('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                sellerView === 'dashboard' ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Overview Dashboard</span>}
            </button>

            <button
              onClick={() => setSellerView('add-product')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                sellerView === 'add-product' ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>+ Add Product</span>}
            </button>

            <button
              onClick={() => setSellerView('inventory')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                sellerView === 'inventory' ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Boxes className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Inventory & Orders</span>}
            </button>

            <button
              onClick={() => setSellerView('wallet')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                sellerView === 'wallet' ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Wallet className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Wallet & Payouts</span>}
            </button>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => setPortal('customer')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Store className="w-4 h-4" />
            {!sidebarCollapsed && <span>Exit to Customer Store</span>}
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar (64px) */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPortal('customer')}
              className="sm:hidden text-xs text-indigo-600 font-bold flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Store
            </button>
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Search Merchant Hub... (Cmd + K)</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Payout Balance Chip */}
            <div
              onClick={() => setSellerView('wallet')}
              className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Available: ${seller.availableBalance.toFixed(2)}</span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-600" />
            </button>
          </div>
        </header>

        {/* Breadcrumb Bar (40px) */}
        <div className="h-10 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between text-xs text-slate-500">
          <span>{breadcrumbsMap[sellerView]}</span>
          {sellerView !== 'add-product' && (
            <button
              onClick={() => setSellerView('add-product')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              + Create New Product
            </button>
          )}
        </div>

        {/* Main Content Body */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>

        <ToastContainer />
        <CommandPalette />
      </div>
    </div>
  );
};

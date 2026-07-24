import React, { useState } from 'react';
import { useApp, PortalType } from '../app/store/store';
import { Logo } from '../shared/components/Logo';
import {
  Search, ShoppingCart, Heart, User as UserIcon, Sun, Moon,
  ChevronDown, Grid, Sparkles, Shield, LogOut, LayoutDashboard,
  Store, Building2, SlidersHorizontal
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    portal, setPortal,
    customerView, setCustomerView,
    sellerView, setSellerView,
    adminView, setAdminView,
    theme, toggleTheme,
    currentUser, logout,
    cart, setCartOpen,
    wishlist,
    searchQuery, setSearchQuery,
    setCommandPaletteOpen,
    setSelectedProductId,
    products
  } = useApp();

  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const searchResults = searchQuery
    ? products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Utility Bar (36px height) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-indigo-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" /> CommerceHub Summer Sale: Up to 40% Off
          </span>
          <span className="text-slate-400">Free global express shipping over $100</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span>USD ($)</span>
            <span>•</span>
            <span>English</span>
          </div>
          <span className="hidden md:inline text-slate-600">|</span>
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <span>Search</span>
            <kbd className="text-[10px] bg-slate-700 px-1 rounded text-slate-300">⌘K</kbd>
          </button>
        </div>
      </div>

      {/* Main Nav Bar (72px height) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <button onClick={() => { setPortal('customer'); setCustomerView('plp'); }}>
            <Logo />
          </button>

          {/* Mega Menu Toggle (Desktop) */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              className="flex items-center gap-1.5 font-semibold text-sm text-slate-700 dark:text-slate-200 hover:text-indigo-600 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Grid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mega Menu Dropdown Panel */}
            {megaMenuOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-[720px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 grid grid-cols-4 gap-6 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">Electronics</h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li className="hover:text-indigo-600 cursor-pointer" onClick={() => { setPortal('customer'); setCustomerView('plp'); setMegaMenuOpen(false); }}>Wireless Headphones</li>
                    <li className="hover:text-indigo-600 cursor-pointer" onClick={() => { setPortal('customer'); setCustomerView('plp'); setMegaMenuOpen(false); }}>OLED Projectors</li>
                    <li className="hover:text-indigo-600 cursor-pointer" onClick={() => { setPortal('customer'); setCustomerView('plp'); setMegaMenuOpen(false); }}>Bluetooth Speakers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">Wearables</h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li className="hover:text-indigo-600 cursor-pointer" onClick={() => { setPortal('customer'); setCustomerView('plp'); setMegaMenuOpen(false); }}>Smart Watches</li>
                    <li className="hover:text-indigo-600 cursor-pointer" onClick={() => { setPortal('customer'); setCustomerView('plp'); setMegaMenuOpen(false); }}>Fitness Trackers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">Peripherals</h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li className="hover:text-indigo-600 cursor-pointer" onClick={() => { setPortal('customer'); setCustomerView('plp'); setMegaMenuOpen(false); }}>Mechanical Keyboards</li>
                    <li className="hover:text-indigo-600 cursor-pointer" onClick={() => { setPortal('customer'); setCustomerView('plp'); setMegaMenuOpen(false); }}>Ergonomic Mice</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded">Featured</span>
                    <h5 className="font-bold text-base mt-2">Summer Audio Tech</h5>
                    <p className="text-xs text-indigo-100 mt-1">Noise cancellation series</p>
                  </div>
                  <button
                    onClick={() => { setPortal('customer'); setCustomerView('plp'); setMegaMenuOpen(false); }}
                    className="mt-4 py-1.5 px-3 bg-white text-indigo-900 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors"
                  >
                    Shop Now →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Global Search Bar (Predictive Autocomplete) */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products, brands or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              className="w-full bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-indigo-500 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 transition-all shadow-inner"
            />
          </div>

          {/* Autocomplete Dropdown */}
          {searchFocused && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-2 z-50">
              {searchResults.length === 0 ? (
                <p className="p-3 text-xs text-slate-500 text-center">No products found for "{searchQuery}"</p>
              ) : (
                searchResults.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProductId(p.id);
                      setPortal('customer');
                      setCustomerView('pdp');
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                  >
                    <img src={p.images[0]} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate">{p.title}</p>
                      <p className="text-[11px] text-slate-400">${p.price.toFixed(2)} • {p.brand}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* User Actions & Portal Switcher Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={() => { setPortal('customer'); setCustomerView('account'); }}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Saved Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors font-semibold text-xs"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Cart</span>
            {cartTotalItems > 0 && (
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">
                {cartTotalItems}
              </span>
            )}
          </button>

          {/* Portal & User Account Menu */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                {currentUser.name.charAt(0)}
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-slate-700 dark:text-slate-200 max-w-[90px] truncate">
                {currentUser.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Portal Switcher Dropdown */}
            {userDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    Role: {currentUser.role}
                  </span>
                </div>

                <div className="py-1">
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Active Portal
                  </div>
                  <button
                    onClick={() => { setPortal('customer'); setCustomerView('plp'); setUserDropdownOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${portal === 'customer' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <Store className="w-4 h-4 text-indigo-500" />
                    <span>Customer Shopping (CX)</span>
                  </button>
                  <button
                    onClick={() => { setPortal('seller'); setSellerView('dashboard'); setUserDropdownOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${portal === 'seller' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <LayoutDashboard className="w-4 h-4 text-emerald-500" />
                    <span>Seller Operations Portal</span>
                  </button>
                  <button
                    onClick={() => { setPortal('admin'); setAdminView('dashboard'); setUserDropdownOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${portal === 'admin' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <Building2 className="w-4 h-4 text-purple-500" />
                    <span>Enterprise Admin Portal</span>
                  </button>
                  <button
                    onClick={() => { setPortal('marketing'); setUserDropdownOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Public Landing & Marketing</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setPortal("customer");
                    setCustomerView("account");
                    setUserDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Account Settings</span>
                </button>

                <button
                  onClick={async () => {
                    try {
                      await logout();
                    } finally {
                      setUserDropdownOpen(false);
                    }
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

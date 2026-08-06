import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  ShoppingCart,
  Heart,
  User as UserIcon,
  Globe,
  Sun,
  Moon,
  LogOut,
  ShieldCheck,
  LayoutDashboard,
  Search,
  Package,
  Store,
  ChevronDown,
  Clock,
  X,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from '../../hooks/useTranslation';
import { useThemeContext } from '../../context/ThemeContext';
import { cartApi } from '../../api/cartApi';
import { productApi } from '../../api/productApi';
import { VynkLogo } from '../brand/VynkLogo';
import { Product } from '../../types';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout, hasRole } = useAuth();
  const { t, currentLanguage, languages, setLanguage, isRTL } = useTranslation();
  const { theme, toggleTheme } = useThemeContext();
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState<number>(0);
  const [langMenuOpen, setLangMenuOpen] = useState<boolean>(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Search dropdown state
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  // Search & Menu refs for click outside dismiss
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await cartApi.getCart();
        if (res && res.success && Array.isArray(res.data)) {
          const totalQty = res.data.reduce((sum, item) => sum + item.quantity, 0);
          setCartCount(totalQty);
        }
      } catch (err) {
        setCartCount(0);
      }
    };
    fetchCart();

    const savedSearches = localStorage.getItem('recent_searches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {}
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search query lookup
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await productApi.searchProducts(searchQuery);
        if (res && res.success && res.data) {
          setSuggestions(res.data.slice(0, 5));
        }
      } catch (err) {
        setSuggestions([]);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const saveRecentSearch = (term: string) => {
    const clean = term.trim();
    if (!clean) return;
    const updated = [clean, ...recentSearches.filter((s) => s.toLowerCase() !== clean.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent_searches', JSON.stringify(updated));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      setSearchFocused(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const executeSearchTerm = (term: string) => {
    setSearchQuery(term);
    saveRecentSearch(term);
    setSearchFocused(false);
    navigate(`/products?search=${encodeURIComponent(term)}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-app-surface/95 backdrop-blur-md border-b border-app transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Platform Name */}
          <Link to="/" className="flex items-center shrink-0">
            <VynkLogo showTagline size="md" />
          </Link>

          {/* Search Bar & Quick Nav */}
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-xl mx-2">
            <div ref={searchContainerRef} className="flex-1 relative">
              <form onSubmit={handleSearchSubmit} className="w-full">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onFocus={() => setSearchFocused(true)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('search_placeholder', 'Search premium products...')}
                    className="w-full text-xs pl-9 pr-8 py-2 rounded-full border border-app bg-app-background text-app-primary focus:outline-none focus:ring-2 focus:ring-[var(--vynk-brand)] transition-all"
                  />
                  <Search className="w-4 h-4 text-app-muted absolute left-3 top-2.5" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-app-muted hover:text-app-primary cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </form>

              {/* Live Search Suggestions & Recent Searches Popup */}
              {searchFocused && (
                <div className="absolute top-11 left-0 right-0 bg-app-card border border-app rounded-2xl shadow-2xl overflow-hidden z-50 p-2 animate-fade-in text-xs space-y-2">
                  {/* Instant Suggestions */}
                  {suggestions.length > 0 && (
                    <div>
                      <div className="px-3 py-1 font-bold text-app-muted text-[10px] uppercase tracking-wider">
                        Matching Products
                      </div>
                      <div className="divide-y divide-app">
                        {suggestions.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => {
                              setSearchFocused(false);
                              navigate(`/products/${p.id}`);
                            }}
                            className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center justify-between cursor-pointer transition"
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <img
                                src={p.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'}
                                alt={p.title}
                                className="w-8 h-8 rounded object-cover"
                              />
                              <div className="truncate font-semibold text-app-primary">{p.title}</div>
                            </div>
                            <span className="font-extrabold text-[#D97746] dark:text-[#E08253] shrink-0 ml-2">
                              ${p.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && !searchQuery.trim() && (
                    <div>
                      <div className="px-3 py-1 font-bold text-app-muted text-[10px] uppercase tracking-wider flex items-center gap-1">
                        <Clock size={12} /> Recent Searches
                      </div>
                      <div className="flex flex-wrap gap-1.5 p-2">
                        {recentSearches.map((term, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => executeSearchTerm(term)}
                            className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-app-primary hover:bg-[var(--vynk-brand)]/10 hover:text-[var(--vynk-brand)] transition cursor-pointer"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchQuery.trim() && suggestions.length === 0 && (
                    <div className="p-4 text-center text-app-muted">
                      Press <span className="font-bold text-app-primary">Enter</span> to search for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Nav Header Links */}
            <nav className="hidden lg:flex items-center gap-2 text-xs font-semibold text-app-primary shrink-0">
              <Link to="/" className="hover:text-[var(--vynk-brand)] transition-colors px-2.5 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 font-bold">
                Home
              </Link>
              <Link to="/store" className="hover:text-[var(--vynk-brand)] transition-colors px-2.5 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5">
                Essentials
              </Link>
              <Link to="/products" className="hover:text-[var(--vynk-brand)] transition-colors px-2.5 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5">
                Catalog
              </Link>
            </nav>
          </div>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Multilingual Selector */}
            <div className="relative z-50" ref={langMenuRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLangMenuOpen((prev) => !prev);
                }}
                className="p-2 rounded-xl text-app-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              >
                <Globe className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="uppercase font-bold">{currentLanguage}</span>
                <ChevronDown className="w-3 h-3 text-app-muted" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-app-card border border-app rounded-xl shadow-2xl py-1 z-50">
                  {(languages && languages.length > 0 ? languages : [
                    { code: 'en', name: 'English', nativeName: 'English' },
                    { code: 'es', name: 'Spanish', nativeName: 'Español' },
                    { code: 'fr', name: 'French', nativeName: 'Français' },
                    { code: 'de', name: 'German', nativeName: 'Deutsch' },
                    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
                    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
                  ]).map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs font-medium flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        currentLanguage === lang.code ? 'text-[var(--color-primary)] font-bold bg-[var(--color-primary)]/10' : 'text-app-primary'
                      }`}
                    >
                      <span>{lang.name}</span>
                      <span className="text-[10px] text-app-muted">{lang.nativeName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-app-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-app-primary" />}
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2 rounded-xl text-app-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative"
            >
              <Heart className="w-4 h-4" />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 rounded-xl text-app-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile / Portal Switcher */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] flex items-center justify-center font-bold ring-2 ring-[var(--vynk-brand)]/20 shrink-0">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div className="hidden sm:block text-left leading-tight">
                    <span className="text-xs font-bold text-app-primary block max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <span className="text-[9px] font-semibold text-[var(--color-primary)] block uppercase">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-app-muted" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
                      <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/"
                        onClick={() => setUserMenuOpen(false)}
                        className="px-4 py-2.5 text-xs font-bold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[var(--vynk-brand)] dark:hover:text-[var(--vynk-brand)] flex items-center gap-2.5 transition-colors group"
                      >
                        <Store className="w-4 h-4 text-[var(--vynk-brand)] transition-colors" /> Home / Storefront
                      </Link>

                      {(hasRole('ADMIN') || hasRole('SUPER_ADMIN') || hasRole('SELLER')) && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[var(--vynk-brand)] dark:hover:text-[var(--vynk-brand)] flex items-center gap-2.5 transition-colors group"
                        >
                          <LayoutDashboard className="w-4 h-4 text-slate-400 group-hover:text-[var(--vynk-brand)] transition-colors" /> Admin Portal
                        </Link>
                      )}

                      <Link
                        to="/user/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[var(--vynk-brand)] dark:hover:text-[var(--vynk-brand)] flex items-center gap-2.5 transition-colors group"
                      >
                        <UserIcon className="w-4 h-4 text-slate-400 group-hover:text-[var(--vynk-brand)] transition-colors" /> Profile
                      </Link>

                      <Link
                        to="/user/addresses"
                        onClick={() => setUserMenuOpen(false)}
                        className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[var(--vynk-brand)] dark:hover:text-[var(--vynk-brand)] flex items-center gap-2.5 transition-colors group"
                      >
                        <Package className="w-4 h-4 text-slate-400 group-hover:text-[var(--vynk-brand)] transition-colors" /> Saved Addresses
                      </Link>

                      <Link
                        to="/order/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[var(--vynk-brand)] dark:hover:text-[var(--vynk-brand)] flex items-center gap-2.5 transition-colors group"
                      >
                        <ShoppingBag className="w-4 h-4 text-slate-400 group-hover:text-[var(--vynk-brand)] transition-colors" /> My Orders
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                      <button
                        onClick={async () => {
                          setUserMenuOpen(false);
                          try {
                            await logout();
                          } catch {
                            // Ignore
                          } finally {
                            navigate('/auth/login');
                          }
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2.5 cursor-pointer transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="text-xs font-bold px-4 py-2 rounded-[10px] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors shadow-xs"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

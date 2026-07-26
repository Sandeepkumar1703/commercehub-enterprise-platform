import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useAppConfig } from '../../context/ConfigContext';
import { useRouter } from '../../core/router/Router';
import { ROUTES } from '../../theme/routes';
import {
  Sun,
  Moon,
  ShoppingCart,
  User,
  Globe,
  ShoppingBag,
  Code2,
  Palette,
  LogOut,
  ChevronDown,
  Layers,
  Heart,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();
  const { language, setLanguage, t, supportedLanguages } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount, setIsCartOpen, wishlist } = useCart();
  const { currentPath, navigate } = useRouter();
  const { config } = useAppConfig();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const currentLangObj = supportedLanguages.find((l) => l.code === language) || supportedLanguages[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-default)] bg-[var(--bg-surface)]/95 backdrop-blur-md transition-colors duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate(ROUTES.HOME)}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#4F6D8C] text-white dark:bg-[#88BDF2] dark:text-[#111827] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform border border-[#4F6D8C]/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight text-[var(--text-primary)]">
                  {config?.applicationName || t('brand.name')}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full bg-[#EEF4F8] dark:bg-[#2B3645] text-[#4F6D8C] dark:text-[#88BDF2] border border-[#D6DEE6] dark:border-[#374151]">
                  {config?.version || 'v1.2.0'}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] hidden sm:block">
                {config?.brandTagline || t('brand.tagline')}
              </p>
            </div>
          </button>

          {/* Primary Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => navigate(ROUTES.HOME)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                currentPath === ROUTES.HOME
                  ? 'bg-[var(--bg-surface-raised)] text-[var(--brand-primary)] font-semibold border border-[var(--border-default)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)]'
              }`}
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => navigate(ROUTES.PRODUCTS)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                currentPath === ROUTES.PRODUCTS
                  ? 'bg-[var(--bg-surface-raised)] text-[var(--brand-primary)] font-semibold border border-[var(--border-default)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)]'
              }`}
            >
              {t('nav.products')}
            </button>
            <button
              onClick={() => navigate(ROUTES.ADMIN_DASHBOARD)}
              className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentPath === ROUTES.ADMIN_DASHBOARD
                  ? 'bg-[var(--bg-surface-raised)] text-[var(--brand-primary)] font-semibold border border-[var(--border-default)]'
                  : 'text-[var(--text-secondary)] font-medium hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)]'
              }`}
            >
              <Layers className="w-4 h-4 text-[#4F6D8C] dark:text-[#88BDF2]" />
              <span>Admin Console</span>
            </button>
            <button
              onClick={() => navigate(ROUTES.API_DOCS)}
              className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentPath === ROUTES.API_DOCS
                  ? 'bg-[var(--bg-surface-raised)] text-[var(--brand-primary)] font-semibold border border-[var(--border-default)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)]'
              }`}
            >
              <Code2 className="w-4 h-4 text-[#4F6D8C] dark:text-[#88BDF2]" />
              <span>{t('nav.apiDocs')}</span>
            </button>
            <button
              onClick={() => navigate(ROUTES.DESIGN_SYSTEM)}
              className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentPath === ROUTES.DESIGN_SYSTEM
                  ? 'bg-[var(--bg-surface-raised)] text-[var(--brand-primary)] font-semibold border border-[var(--border-default)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)]'
              }`}
            >
              <Palette className="w-4 h-4 text-[#4F6D8C] dark:text-[#88BDF2]" />
              <span>{t('nav.designSystem')}</span>
            </button>
          </nav>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Wishlist Button */}
          <button
            onClick={() => navigate(ROUTES.WISHLIST)}
            className="relative p-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand-primary)] transition-all cursor-pointer"
            title={t('nav.wishlist')}
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#4F6D8C] text-white dark:bg-[#88BDF2] dark:text-[#111827] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] hover:border-[var(--brand-primary)] transition-all cursor-pointer"
            title={t('nav.cart')}
          >
            <ShoppingCart className="w-4 h-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#4F6D8C] text-white dark:bg-[#88BDF2] dark:text-[#111827] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {itemCount}
              </span>
            )}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] text-xs font-semibold hover:border-[var(--brand-primary)] transition-all cursor-pointer"
              title={t('language.select')}
            >
              <Globe className="w-3.5 h-3.5 text-[#4F6D8C] dark:text-[#88BDF2]" />
              <span>{currentLangObj.flag} {currentLangObj.code.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3 text-[var(--text-secondary)]" />
            </button>

            {isLangMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-44 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-lg p-1.5 z-50 animate-in fade-in zoom-in-95"
                onMouseLeave={() => setIsLangMenuOpen(false)}
              >
                <div className="px-2 py-1 text-[10px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Select Language
                </div>
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      language === lang.code
                        ? 'bg-[var(--bg-surface-raised)] text-[var(--brand-primary)] font-bold'
                        : 'text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </span>
                    <span className="text-[10px] text-[var(--text-secondary)] uppercase">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] hover:border-[var(--brand-primary)] transition-colors cursor-pointer"
            title={themeMode === 'dark' ? t('theme.light') : t('theme.dark')}
          >
            {themeMode === 'dark' ? (
              <Sun className="w-4 h-4 text-[#FFFFE3]" />
            ) : (
              <Moon className="w-4 h-4 text-[#4A4A4A]" />
            )}
          </button>

          {/* User Auth Portal Dropdown / Login Button */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] hover:border-[var(--brand-primary)] transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-[#4A4A4A] text-[#FFFFE3] font-bold text-xs flex items-center justify-center">
                  {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-xs font-semibold text-[var(--text-primary)] hidden md:block">
                  {user.firstName}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              </button>

              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-xl p-2 z-50"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-[var(--border-default)] mb-1">
                    <p className="text-xs font-bold text-[var(--text-primary)]">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-[11px] text-[var(--text-secondary)] truncate">
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate(ROUTES.ADMIN_DASHBOARD);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-[#6D8196] font-bold hover:bg-[var(--bg-surface-raised)] rounded-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-[#6D8196]" />
                    <span>Admin Operations Console</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate(ROUTES.CUSTOMER_DASHBOARD);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)] rounded-lg font-medium flex items-center gap-2 cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-[#6D8196]" />
                    <span>{t('nav.dashboard')}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate(ROUTES.ACCOUNT);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)] rounded-lg font-medium flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-4 h-4 text-[#6D8196]" />
                    <span>{t('nav.account')}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate(ROUTES.ORDERS);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)] rounded-lg font-medium flex items-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#6D8196]" />
                    <span>{t('nav.orders')}</span>
                  </button>

                  <div className="border-t border-[var(--border-default)] my-1"></div>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logout();
                      navigate(ROUTES.LOGIN);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg font-medium flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('nav.logout')}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              className="px-4 py-2 bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t('nav.login')}</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};

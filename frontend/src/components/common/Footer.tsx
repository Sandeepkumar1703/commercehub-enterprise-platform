import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../core/router/Router';
import { ROUTES } from '../../theme/routes';
import { ShoppingBag, Github, ShieldCheck, Cpu, Code2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { navigate } = useRouter();

  return (
    <footer className="w-full border-t border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors duration-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold tracking-tight">
                {t('brand.name')}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {t('brand.tagline')}. Built with Java 17, Spring Boot 3.3, and React 18 with Vite.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Spring Security & JWT Activated</span>
            </div>
          </div>

          {/* Commerce Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
              <li>
                <button
                  onClick={() => navigate(ROUTES.HOME)}
                  className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(ROUTES.PRODUCTS)}
                  className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  {t('nav.products')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(ROUTES.CART)}
                  className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  {t('nav.cart')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(ROUTES.WISHLIST)}
                  className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  {t('nav.wishlist')}
                </button>
              </li>
            </ul>
          </div>

          {/* Account Portal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-4">
              Customer Portal
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
              <li>
                <button
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  {t('nav.login')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(ROUTES.REGISTER)}
                  className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  {t('nav.register')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(ROUTES.ORDERS)}
                  className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  {t('nav.orders')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(ROUTES.ACCOUNT)}
                  className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  {t('nav.account')}
                </button>
              </li>
            </ul>
          </div>

          {/* Developers & Engineering Specs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-4">
              Architecture & Specs
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
              <li>
                <button
                  onClick={() => navigate(ROUTES.API_DOCS)}
                  className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t('nav.apiDocs')}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate(ROUTES.DESIGN_SYSTEM)}
                  className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5 text-purple-500" />
                  <span>{t('nav.designSystem')}</span>
                </button>
              </li>
              <li className="pt-2 font-mono text-[11px] text-[var(--text-secondary)]">
                Spring Boot: 3.3.x (Java 17)
              </li>
              <li className="font-mono text-[11px] text-[var(--text-secondary)]">
                DB Engine: PostgreSQL + Flyway
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[var(--border-default)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
          <p>© {new Date().getFullYear()} CommerceHub Platform. All enterprise rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for portfolio excellence
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

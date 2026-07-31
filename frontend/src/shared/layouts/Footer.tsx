import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw, Headphones, Mail } from 'lucide-react';
import { Button } from '../components/Button';
import { useLanguage } from '../../core/i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-surface border-t border-border mt-20 transition-all">
      {/* Value Propositions Grid */}
      <div className="border-b border-border bg-surface-hover/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-content-primary">{t('section.trust_1_title')}</h4>
              <p className="text-[11px] text-content-muted mt-0.5">{t('hero.free_shipping')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-content-primary">{t('section.trust_2_title')}</h4>
              <p className="text-[11px] text-content-muted mt-0.5">{t('section.trust_2_desc')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-content-primary">{t('detail.warranty')}</h4>
              <p className="text-[11px] text-content-muted mt-0.5">30-day money back guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-content-primary">{t('section.trust_3_title')}</h4>
              <p className="text-[11px] text-content-muted mt-0.5">{t('section.trust_3_desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand text-brand-foreground flex items-center justify-center font-extrabold text-base">
              C
            </div>
            <span className="font-extrabold text-lg text-content-primary">
              Commerce<span className="text-brand">Hub</span>
            </span>
          </div>
          <p className="text-xs text-content-secondary leading-relaxed max-w-sm">
            {t('footer.about_desc')}
          </p>
          <div className="pt-2">
            <h5 className="text-xs font-bold text-content-primary mb-2">Subscribe to Corporate Deals</h5>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-sm">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
                <input
                  type="email"
                  placeholder="Enter corporate email..."
                  className="w-full pl-9 pr-3 py-2 bg-surface-hover border border-border rounded-lg text-xs text-content-primary focus:outline-none focus:border-brand"
                />
              </div>
              <Button type="submit" size="sm">
                Join
              </Button>
            </form>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-content-primary uppercase tracking-wider mb-4">{t('footer.categories')}</h4>
          <ul className="space-y-2.5 text-xs text-content-secondary">
            <li><Link to="/products" className="hover:text-brand transition-colors">Electronics & Gadgets</Link></li>
            <li><Link to="/products" className="hover:text-brand transition-colors">Apparel & Fashion</Link></li>
            <li><Link to="/products" className="hover:text-brand transition-colors">Home & Ergonomics</Link></li>
            <li><Link to="/products" className="hover:text-brand transition-colors">Fitness & Outdoors</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-content-primary uppercase tracking-wider mb-4">{t('footer.support')}</h4>
          <ul className="space-y-2.5 text-xs text-content-secondary">
            <li><Link to="/orders" className="hover:text-brand transition-colors">{t('header.my_orders')}</Link></li>
            <li><Link to="/profile" className="hover:text-brand transition-colors">{t('header.my_dashboard')}</Link></li>
            <li><Link to="/cart" className="hover:text-brand transition-colors">{t('header.cart')}</Link></li>
            <li><Link to="/wishlist" className="hover:text-brand transition-colors">{t('header.wishlist')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-content-primary uppercase tracking-wider mb-4">{t('header.admin_suite')}</h4>
          <ul className="space-y-2.5 text-xs text-content-secondary">
            <li><Link to="/admin/dashboard" className="hover:text-brand transition-colors">Dashboard</Link></li>
            <li><Link to="/admin/products" className="hover:text-brand transition-colors">Inventory Manager</Link></li>
            <li><Link to="/admin/orders" className="hover:text-brand transition-colors">Fulfillment Queue</Link></li>
            <li><Link to="/admin/coupons" className="hover:text-brand transition-colors">Promotions & Coupons</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border py-6 text-center text-xs text-content-muted">
        <p>© 2026 CommerceHub Enterprise Platform. {t('footer.rights')}</p>
      </div>
    </footer>
  );
};

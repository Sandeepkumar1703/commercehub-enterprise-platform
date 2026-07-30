import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw, Headphones, Mail } from 'lucide-react';
import { Button } from '../components/Button';

export const Footer: React.FC = () => {
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
              <h4 className="text-xs font-bold text-content-primary">Global Express Delivery</h4>
              <p className="text-[11px] text-content-muted mt-0.5">Free shipping on orders over $100</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-content-primary">Secure Checkout</h4>
              <p className="text-[11px] text-content-muted mt-0.5">256-bit SSL encrypted transactions</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-content-primary">30-Day Money Back</h4>
              <p className="text-[11px] text-content-muted mt-0.5">No-questions-asked return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-content-primary">24/7 Enterprise Support</h4>
              <p className="text-[11px] text-content-muted mt-0.5">Dedicated live agent assistance</p>
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
            Enterprise e-commerce platform delivering curated electronics, apparel, ergonomic furniture, and outdoor gear with real-time stock tracking and lightning-fast fulfillment.
          </p>
          <div className="pt-2">
            <h5 className="text-xs font-bold text-content-primary mb-2">Subscribe to Insider Deals</h5>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-sm">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
                <input
                  type="email"
                  placeholder="Enter your corporate email..."
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
          <h4 className="text-xs font-bold text-content-primary uppercase tracking-wider mb-4">Shop Categories</h4>
          <ul className="space-y-2.5 text-xs text-content-secondary">
            <li><Link to="/products" className="hover:text-brand transition-colors">Electronics & Gadgets</Link></li>
            <li><Link to="/products" className="hover:text-brand transition-colors">Apparel & Fashion</Link></li>
            <li><Link to="/products" className="hover:text-brand transition-colors">Home & Ergonomics</Link></li>
            <li><Link to="/products" className="hover:text-brand transition-colors">Fitness & Outdoors</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-content-primary uppercase tracking-wider mb-4">Customer Care</h4>
          <ul className="space-y-2.5 text-xs text-content-secondary">
            <li><Link to="/orders" className="hover:text-brand transition-colors">Order History</Link></li>
            <li><Link to="/profile" className="hover:text-brand transition-colors">Address Book</Link></li>
            <li><Link to="/cart" className="hover:text-brand transition-colors">Shopping Cart</Link></li>
            <li><Link to="/wishlist" className="hover:text-brand transition-colors">Saved Wishlist</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-content-primary uppercase tracking-wider mb-4">Admin Suite</h4>
          <ul className="space-y-2.5 text-xs text-content-secondary">
            <li><Link to="/admin/dashboard" className="hover:text-brand transition-colors">Executive Dashboard</Link></li>
            <li><Link to="/admin/products" className="hover:text-brand transition-colors">Inventory Manager</Link></li>
            <li><Link to="/admin/orders" className="hover:text-brand transition-colors">Fulfillment Queue</Link></li>
            <li><Link to="/admin/coupons" className="hover:text-brand transition-colors">Promotions & Coupons</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border py-6 text-center text-xs text-content-muted">
        <p>© 2026 CommerceHub Enterprise Platform. All rights reserved. Powered by React 18, Vite & Tailwind CSS.</p>
      </div>
    </footer>
  );
};

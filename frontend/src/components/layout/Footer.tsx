import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Cpu, Lock } from 'lucide-react';
import { VynkLogo } from '../brand/VynkLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs border-t border-slate-200 dark:border-slate-800 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="space-y-2">
            <VynkLogo size="sm" showTagline />
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
              Ultra-fast enterprise e-commerce ecosystem built for frictionless checkout and high-speed multi-portal management.
            </p>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-slate-100 font-extrabold text-xs uppercase tracking-wider mb-2.5">Platform Navigation</h4>
            <ul className="space-y-1.5 font-medium">
              <li><Link to="/products" className="hover:text-[var(--vynk-brand)] dark:hover:text-[var(--vynk-brand)] transition-colors">Products Catalog</Link></li>
              <li><Link to="/about-vynk" className="hover:text-[var(--vynk-brand)] dark:hover:text-[var(--vynk-brand)] transition-colors">Platform Showcase & Architecture</Link></li>
              <li><Link to="/cart" className="hover:text-[var(--vynk-brand)] dark:hover:text-[var(--vynk-brand)] transition-colors">Shopping Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-[var(--vynk-brand)] dark:hover:text-[var(--vynk-brand)] transition-colors">Wishlist</Link></li>
              <li><Link to="/order/orders" className="hover:text-[var(--vynk-brand)] dark:hover:text-[var(--vynk-brand)] transition-colors">Order History</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-slate-100 font-extrabold text-xs uppercase tracking-wider mb-2.5">Portals & RBAC</h4>
            <ul className="space-y-1.5 font-medium">
              <li><Link to="/admin/dashboard" className="hover:text-[var(--vynk-brand)] dark:hover:text-[var(--vynk-brand)] transition-colors">Admin Dashboard</Link></li>
              <li><Link to="/permission/roles" className="hover:text-[var(--vynk-brand)] dark:hover:text-[var(--vynk-brand)] transition-colors">Role Management</Link></li>
              <li><Link to="/permission/permissions" className="hover:text-[var(--vynk-brand)] dark:hover:text-[var(--vynk-brand)] transition-colors">Permissions Matrix</Link></li>
              <li><Link to="/language/management" className="hover:text-[var(--vynk-brand)] dark:hover:text-[var(--vynk-brand)] transition-colors">Multilingual Config</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-slate-100 font-extrabold text-xs uppercase tracking-wider mb-2.5">Security & Compliance</h4>
            <ul className="space-y-1.5 font-medium">
              <li>
                <Link to="/user/profile" className="flex items-center gap-2 hover:text-[var(--vynk-brand)] transition-colors group">
                  <Lock className="w-3.5 h-3.5 text-[var(--vynk-brand)] group-hover:scale-110 transition-transform" />
                  <span>JWT OAuth2 Security</span>
                </Link>
              </li>
              <li>
                <Link to="/about-vynk" className="flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group">
                  <Shield className="w-3.5 h-3.5 text-emerald-500 group-hover:scale-110 transition-transform" />
                  <span>Flyway DB Migrations</span>
                </Link>
              </li>
              <li>
                <Link to="/permission/permissions" className="flex items-center gap-2 hover:text-sky-600 dark:hover:text-sky-400 transition-colors group">
                  <Cpu className="w-3.5 h-3.5 text-sky-500 group-hover:scale-110 transition-transform" />
                  <span>Spring Security RBAC</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Vynk Commerce Platform. All rights reserved.</p>
          <p className="mt-1 sm:mt-0 font-mono">Backend: Java 21 / Spring Boot 3.2 | PostgreSQL REST Engine</p>
        </div>
      </div>
    </footer>
  );
};

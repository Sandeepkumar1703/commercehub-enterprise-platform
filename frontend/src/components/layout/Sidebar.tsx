import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Globe,
  Key,
  CreditCard,
  Truck,
  Image,
  Boxes,
  Store,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Products', path: '/admin/products', icon: <Package className="w-4 h-4" /> },
    { label: 'Orders', path: '/admin/orders', icon: <ShoppingBag className="w-4 h-4" /> },
    { label: 'Inventory Control', path: '/inventory/management', icon: <Boxes className="w-4 h-4" /> },
    { label: 'Payments', path: '/payment/history', icon: <CreditCard className="w-4 h-4" /> },
    { label: 'Shipping & Logistics', path: '/shipping/list', icon: <Truck className="w-4 h-4" /> },
    { label: 'Media Library', path: '/media/management', icon: <Image className="w-4 h-4" /> },
    { label: 'Customers', path: '/admin/customers', icon: <Users className="w-4 h-4" /> },
    { label: 'Revenue', path: '/admin/revenue', icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Sales Analytics', path: '/admin/sales', icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Low Stock Alert', path: '/admin/low-stock', icon: <AlertTriangle className="w-4 h-4" /> },
  ];

  const rbacItems = [
    { label: 'System Roles', path: '/permission/roles', icon: <ShieldCheck className="w-4 h-4" /> },
    { label: 'Permissions Matrix', path: '/permission/permissions', icon: <Key className="w-4 h-4" /> },
    { label: 'User Roles & Grants', path: '/permission/user-permissions', icon: <Users className="w-4 h-4" /> },
    { label: 'Language Management', path: '/language/management', icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen p-4 flex flex-col justify-between shrink-0 border-r border-slate-800">
      <div className="space-y-6">
        <div>
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3 py-2.5 mb-4 rounded-xl text-xs font-extrabold text-white bg-slate-800 hover:bg-[var(--vynk-brand)] transition-all border border-slate-700/80 shadow-xs group"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
            <Store className="w-4 h-4 text-[var(--vynk-brand)] group-hover:text-white transition-colors" />
            <span>Customer Store (Home)</span>
          </Link>

          <div className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
            Enterprise Admin
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[var(--vynk-brand)] text-white shadow-md shadow-[var(--vynk-brand)]/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div>
          <div className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
            RBAC & Localization
          </div>
          <nav className="space-y-1">
            {rbacItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[var(--vynk-brand)] text-white shadow-md shadow-[var(--vynk-brand)]/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 text-xs">
        <div className="p-3 bg-slate-800/60 rounded-xl space-y-1">
          <p className="font-bold text-white text-[11px] truncate">{user?.name}</p>
          <p className="text-[10px] text-[var(--vynk-brand)] font-mono font-bold uppercase">{user?.role}</p>
        </div>
      </div>
    </aside>
  );
};

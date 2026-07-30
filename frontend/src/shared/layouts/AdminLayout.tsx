import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Tag, MessageSquare, ArrowLeft, ShieldAlert, Store } from 'lucide-react';
import { useAppSelector } from '../../app/store/hooks';

export const AdminLayout: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex bg-background text-content-primary">
      {/* Admin Sidebar */}
      <aside className="w-60 bg-[#0F172A] text-white flex flex-col z-20 shrink-0">
        <div className="p-6 mb-2 border-b border-slate-800 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-white text-xs shadow-sm">
              CH
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-tight leading-none">CommerceHub</h2>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-0.5">Enterprise Suite</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-white/10 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4 text-indigo-400" />
            <span>Executive Analytics</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-white/10 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Package className="w-4 h-4 text-indigo-400" />
            <span>Products & Inventory</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-white/10 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <ShoppingCart className="w-4 h-4 text-indigo-400" />
            <span>Order Fulfillment</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-white/10 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span>User Management</span>
          </NavLink>

          <NavLink
            to="/admin/coupons"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-white/10 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Tag className="w-4 h-4 text-indigo-400" />
            <span>Marketing & Coupons</span>
          </NavLink>

          <NavLink
            to="/admin/reviews"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-white/10 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <span>Review Moderation</span>
          </NavLink>
        </nav>

        {/* User profile & Store link footer */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white">
              {user?.firstName?.[0] || 'A'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">{user?.firstName} {user?.lastName}</div>
              <div className="text-[10px] text-slate-400 truncate">System Admin</div>
            </div>
          </div>

          <Link
            to="/products"
            className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors pt-2 border-t border-slate-800/80"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Return to Customer Store</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-surface border-b border-border px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-brand" />
            <span className="text-xs font-bold uppercase tracking-wider text-content-secondary">
              Logged in as <span className="text-content-primary">{user?.firstName} {user?.lastName} (ROLE_ADMIN)</span>
            </span>
          </div>

          <Link to="/" className="text-xs text-brand font-semibold hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Customer Storefront
          </Link>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

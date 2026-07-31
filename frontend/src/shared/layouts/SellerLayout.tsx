import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingCart,
  Users,
  Tag,
  MessageSquare,
  BarChart3,
  CreditCard,
  Truck,
  Bell,
  User,
  HelpCircle,
  LogOut,
  Store,
  ShieldCheck,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { logout } from '../../features/auth/authSlice';
import { useLanguage } from '../../core/i18n/LanguageContext';

export const SellerLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { getLocalizedPath } = useLanguage();

  return (
    <div className="min-h-screen flex bg-background text-content-primary">
      {/* Seller Navigation Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col z-20 shrink-0 border-r border-slate-800">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link to={getLocalizedPath('seller/dashboard')} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
              SP
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-tight">Seller Portal</h2>
              <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Merchant Hub</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          <NavLink
            to={getLocalizedPath('seller/dashboard')}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('seller/products')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`
            }
          >
            <Package className="w-4 h-4 text-emerald-400" />
            <span>My Products</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('seller/inventory')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`
            }
          >
            <Boxes className="w-4 h-4 text-emerald-400" />
            <span>Inventory & Stock</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('seller/orders')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`
            }
          >
            <ShoppingCart className="w-4 h-4 text-emerald-400" />
            <span>Customer Orders</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('seller/customers')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`
            }
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Customers</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('seller/coupons')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`
            }
          >
            <Tag className="w-4 h-4 text-emerald-400" />
            <span>Coupons & Discounts</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('seller/reviews')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`
            }
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Product Reviews</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('seller/analytics')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`
            }
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Sales Analytics</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('seller/payments')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`
            }
          >
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>Payouts & Settlements</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('seller/shipping')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`
            }
          >
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Shipping Settings</span>
          </NavLink>

          <div className="pt-4 mt-2 border-t border-slate-800 space-y-1">
            <NavLink
              to={getLocalizedPath('seller/notifications')}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <Bell className="w-4 h-4 text-slate-400" />
              <span>Notifications</span>
            </NavLink>

            <NavLink
              to={getLocalizedPath('seller/profile')}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>Store Profile</span>
            </NavLink>

            <NavLink
              to={getLocalizedPath('seller/support')}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Merchant Support</span>
            </NavLink>
          </div>
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
                {user?.firstName?.[0] || 'S'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-[10px] text-emerald-400 font-medium">Verified Seller</p>
              </div>
            </div>
            <button
              onClick={() => dispatch(logout())}
              title="Sign Out"
              className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            to={getLocalizedPath('products')}
            className="flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-400 hover:text-white py-1.5 bg-slate-800/60 rounded-lg transition-colors"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Storefront View</span>
          </Link>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-surface border-b border-border px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-content-secondary">
              Seller Account: <span className="text-content-primary">{user?.email}</span>
            </span>
          </div>

          <Link
            to={getLocalizedPath('seller/products')}
            className="text-xs font-bold bg-emerald-600 text-white px-3.5 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
          >
            + Add New Product
          </Link>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

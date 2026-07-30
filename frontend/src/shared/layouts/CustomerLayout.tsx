import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { User, MapPin, ShoppingBag, Heart, LogOut } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '../../features/cart/CartDrawer';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { logout } from '../../features/auth/authSlice';

export const CustomerLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex flex-col bg-background text-content-primary">
      <Header />
      <CartDrawer />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Customer Navigation Sidebar */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-surface border border-border rounded-xl p-5 shadow-card">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-12 h-12 rounded-full bg-brand/10 text-brand font-bold text-lg flex items-center justify-center border border-brand/20">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-content-primary truncate">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-xs text-content-muted truncate">{user?.email}</p>
                </div>
              </div>

              <nav className="mt-4 space-y-1">
                <NavLink
                  to="/profile"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                      isActive ? 'bg-brand text-brand-foreground' : 'text-content-secondary hover:bg-surface-hover'
                    }`
                  }
                >
                  <User className="w-4 h-4" />
                  <span>Account Dashboard</span>
                </NavLink>

                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                      isActive ? 'bg-brand text-brand-foreground' : 'text-content-secondary hover:bg-surface-hover'
                    }`
                  }
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>My Orders & Shipping</span>
                </NavLink>

                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                      isActive ? 'bg-brand text-brand-foreground' : 'text-content-secondary hover:bg-surface-hover'
                    }`
                  }
                >
                  <Heart className="w-4 h-4" />
                  <span>Saved Wishlist</span>
                </NavLink>

                <button
                  onClick={() => dispatch(logout())}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-status-danger hover:bg-status-danger/10 transition-colors mt-4 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Customer Page Content */}
          <div className="md:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, MapPin, Bell, ArrowRight, Package, Clock, ShieldCheck, User } from 'lucide-react';
import { useAppSelector } from '../../app/store/hooks';
import { orderApi } from '../order/order.api';
import { Order } from '../../types';
import { useLanguage } from '../../core/i18n/LanguageContext';

export const CustomerDashboardPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const { cart } = useAppSelector((state) => state.cart);
  const { getLocalizedPath } = useLanguage();

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderApi
      .getMyOrders()
      .then((data) => {
        const list = Array.isArray(data) ? data : (data as any)?.content || [];
        setRecentOrders(list.slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand to-brand-hover text-brand-foreground rounded-2xl p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white inline-block mb-2">
            Customer Dashboard
          </span>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Welcome back, {user?.firstName || 'Valued Customer'}!
          </h1>
          <p className="text-xs text-white/80 mt-1 max-w-xl">
            Manage your personal profile, track active shipments, review past purchases, and explore your saved wishlist.
          </p>
        </div>

        <Link
          to={getLocalizedPath('products')}
          className="inline-flex items-center gap-2 bg-white text-brand font-extrabold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors shadow-sm shrink-0"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-content-muted">Total Orders</p>
            <p className="text-2xl font-black text-content-primary mt-1">{recentOrders.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-content-muted">Saved Wishlist</p>
            <p className="text-2xl font-black text-content-primary mt-1">{wishlistItems?.length || 0}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-content-muted">Items in Cart</p>
            <p className="text-2xl font-black text-content-primary mt-1">{cart?.items?.length || 0}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-content-muted">Account Status</p>
            <p className="text-sm font-extrabold text-status-success mt-1 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Verified
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-border pb-4">
          <div>
            <h2 className="text-base font-extrabold text-content-primary">Recent Orders</h2>
            <p className="text-xs text-content-muted">Track and review your recent store purchases</p>
          </div>
          <Link
            to={getLocalizedPath('orders')}
            className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-content-muted animate-pulse">
            Loading order history...
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="py-8 text-center space-y-3">
            <Package className="w-10 h-10 text-content-muted mx-auto" />
            <p className="text-xs text-content-muted">You haven't placed any orders yet.</p>
            <Link
              to={getLocalizedPath('products')}
              className="inline-block bg-brand text-brand-foreground text-xs font-bold px-4 py-2 rounded-xl"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentOrders.map((order) => (
              <div key={order.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-content-primary">
                      Order #{order.orderNumber || order.id.slice(0, 8)}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-brand/10 text-brand">
                      {order.orderStatus || 'PROCESSING'}
                    </span>
                  </div>
                  <p className="text-[11px] text-content-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(order.createdAt).toLocaleDateString()} • {order.items?.length || 1} items
                  </p>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-sm font-black text-content-primary">
                    ${(order.totalAmount || order.subtotal || 0).toFixed(2)}
                  </span>
                  <Link
                    to={getLocalizedPath(`orders/${order.id}`)}
                    className="text-xs font-bold text-brand border border-brand/30 px-3 py-1.5 rounded-lg hover:bg-brand/10 transition-colors"
                  >
                    Track Shipment
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to={getLocalizedPath('addresses')}
          className="bg-surface border border-border rounded-xl p-5 hover:border-brand transition-colors shadow-sm flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-content-primary">Shipping Addresses</h3>
            <p className="text-[11px] text-content-muted">Manage primary & default checkout addresses</p>
          </div>
        </Link>

        <Link
          to={getLocalizedPath('profile')}
          className="bg-surface border border-border rounded-xl p-5 hover:border-brand transition-colors shadow-sm flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-content-primary">Account Settings</h3>
            <p className="text-[11px] text-content-muted">Update profile, email & security password</p>
          </div>
        </Link>

        <Link
          to={getLocalizedPath('wishlist')}
          className="bg-surface border border-border rounded-xl p-5 hover:border-brand transition-colors shadow-sm flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-content-primary">Saved Wishlist</h3>
            <p className="text-[11px] text-content-muted">View favorite products saved for later</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

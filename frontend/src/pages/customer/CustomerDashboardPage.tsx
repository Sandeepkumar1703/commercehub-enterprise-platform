import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useRouter } from '../../core/router/Router';
import { ROUTES } from '../../theme/routes';
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  Heart,
  ArrowRight,
  User,
  ShieldCheck,
  Package,
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { orders, wishlist } = useCart();
  const { navigate } = useRouter();

  return (
    <div className="space-y-8 py-6">
      
      {/* Welcome Hero Banner */}
      <div className="p-8 rounded-3xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] text-[var(--text-primary)] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4F8] dark:bg-[#2B3645] text-[#4F6D8C] dark:text-[#88BDF2] text-xs font-semibold border border-[#D6DEE6] dark:border-[#374151]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Customer Portal Authenticated</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Welcome back, {user?.firstName} {user?.lastName}!
          </h1>
          <p className="text-xs text-[var(--text-secondary)]">
            Account Email: <span className="font-mono">{user?.email}</span> | Active Roles: [{user?.roles.join(', ')}]
          </p>
        </div>

        <button
          onClick={() => navigate(ROUTES.PRODUCTS)}
          className="px-5 py-2.5 bg-[#4F6D8C] hover:bg-[#3E5973] text-white dark:bg-[#88BDF2] dark:text-[#111827] dark:hover:bg-[#6EA8DF] font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap border border-[#4F6D8C] dark:border-[#88BDF2]"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Browse Store Catalog</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[var(--text-secondary)]">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <Package className="w-5 h-5 text-[#4F6D8C] dark:text-[#88BDF2]" />
          </div>
          <p className="text-3xl font-black text-[var(--text-primary)]">
            {orders.length}
          </p>
        </div>

        <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[var(--text-secondary)]">
            <span className="text-xs font-bold uppercase tracking-wider">Saved Items</span>
            <Heart className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-3xl font-black text-[var(--text-primary)]">
            {wishlist.length}
          </p>
        </div>

        <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[var(--text-secondary)]">
            <span className="text-xs font-bold uppercase tracking-wider">Security Token</span>
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
            JWT Active & Verified
          </p>
        </div>
      </div>

      {/* Recent Orders List */}
      <div className="bg-[var(--bg-surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border-default)] shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">
              Recent Order History
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Real-time lifecycle tracking for your purchases.
            </p>
          </div>
          <button
            onClick={() => navigate(ROUTES.ORDERS)}
            className="text-xs font-bold text-[var(--brand-primary)] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-[var(--border-default)]">
          {orders.map((order) => (
            <div key={order.id} className="py-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-extrabold text-[var(--text-primary)]">
                    {order.id}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  Date: {order.date} | Address: {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-sm font-extrabold text-[var(--text-primary)]">
                  ${order.total.toFixed(2)}
                </span>
                <button
                  onClick={() => navigate(`${ROUTES.ORDER_SUCCESS}/${order.id}`)}
                  className="px-3 py-1.5 bg-[var(--bg-surface-raised)] hover:bg-[var(--border-default)] border border-[var(--border-default)] text-[var(--text-primary)] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  View Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

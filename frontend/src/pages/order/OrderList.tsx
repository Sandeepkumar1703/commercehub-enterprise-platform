import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { orderApi } from '../../api/orderApi';
import { Order, OrderStatus } from '../../types';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { EmptyState } from '../../components/common/EmptyState';
import { BRAND } from '../../constants/brand';

export const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await orderApi.getMyOrders();
      const resData = (res as any)?.data ?? res;
      let list = Array.isArray(resData) ? resData : [];
      if (list.length === 0) {
        const fallbackRes = await orderApi.getOrders();
        const fallbackData = (fallbackRes as any)?.data ?? fallbackRes;
        if (Array.isArray(fallbackData)) list = fallbackData;
      }
      setOrders(list);
    } catch (err: any) {
      setError(err?.message || 'Failed to load order history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusBadge = (status: OrderStatus) => {
    const styles = {
      PENDING: 'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/90 dark:text-amber-200 dark:border-amber-700/80',
      PROCESSING: 'bg-sky-100 text-sky-900 border border-sky-300 dark:bg-sky-950/90 dark:text-sky-200 dark:border-sky-700/80',
      SHIPPED: 'bg-indigo-100 text-indigo-900 border border-indigo-300 dark:bg-indigo-950/90 dark:text-indigo-200 dark:border-indigo-700/80',
      DELIVERED: 'bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-950/90 dark:text-emerald-200 dark:border-emerald-700/80',
      CANCELLED: 'bg-rose-100 text-rose-900 border border-rose-300 dark:bg-rose-950/90 dark:text-rose-200 dark:border-rose-700/80',
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-xs ${styles[status]}`}>
        {status}
      </span>
    );
  };

  if (loading) return <Loader text="Loading order records from Spring Boot backend..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchOrders} />;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Order History & Fulfillment</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Track fulfillment status, invoice statements, and shipment dispatches.
        </p>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div key={ord.id} className="card-surface p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100">Order #{ord.id}</span>
                  <span className="text-slate-400 ml-3">{new Date(ord.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(ord.status)}
                  <span className="font-black text-slate-900 dark:text-slate-100">${ord.totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-semibold">{ord.items.length} items purchased</span>
                </div>

                <Link
                  to={`/order/details/${ord.id}`}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-lg hover:bg-[var(--vynk-brand)] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="No Orders Yet" description={BRAND.emptyStates.orders} />
      )}
    </div>
  );
};

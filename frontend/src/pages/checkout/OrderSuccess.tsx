import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { orderApi } from '../../api/orderApi';
import { Order } from '../../types';
import { Loader } from '../../components/common/Loader';

export const OrderSuccess: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchOrder = async () => {
      try {
        const res = await orderApi.getOrderById(id);
        if (res.success && res.data) {
          setOrder(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <Loader text="Retrieving confirmed order receipt..." />;

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700">
        <div className="inline-flex p-4 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Order Placed Successfully!</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Order ID: #{order?.id || id}</p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Status:</span>
            <span className="font-bold text-amber-600 uppercase">{order?.status || 'PENDING'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Payment:</span>
            <span className="font-bold text-[var(--vynk-brand)]">{order?.paymentMethod || 'CREDIT_CARD'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Total Charged:</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">${order?.totalAmount?.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            to="/order/orders"
            className="flex-1 py-3 text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            My Orders
          </Link>
          <Link
            to="/products"
            className="flex-1 py-3 text-xs font-bold text-white bg-[var(--vynk-brand)] rounded-xl hover:bg-[var(--vynk-brand-hover)] shadow-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

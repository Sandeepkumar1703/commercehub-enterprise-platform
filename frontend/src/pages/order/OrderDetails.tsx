import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Truck, Package, CreditCard, ShieldCheck } from 'lucide-react';
import { orderApi } from '../../api/orderApi';
import { Order } from '../../types';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Button } from '../../components/common/Button';

export const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      try {
        const res = await orderApi.getOrderById(id);
        const data = (res as any)?.data ?? res;
        if (data && (data.id || data.orderNumber)) {
          setOrder(data);
        } else {
          setError('Order details not found');
        }
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <Loader text="Retrieving detailed order manifest..." />;
  if (error || !order) return <ErrorMessage message={error || 'Order not found'} />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link to="/order/orders" className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--vynk-brand)] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Order History
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Order #{order.id}</h1>
          <p className="text-xs text-slate-500">Placed on {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <span className="px-3 py-1 bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] font-extrabold text-xs rounded-full uppercase border border-[var(--vynk-brand)]/20">
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Destination */}
        <div className="card-surface p-5 space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-slate-100">
            <Truck className="w-4 h-4 text-[var(--vynk-brand)]" /> Shipping Destination
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
            <p className="font-bold">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
            <p className="font-mono text-slate-400">{order.shippingAddress.phone}</p>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="card-surface p-5 space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-slate-100">
            <CreditCard className="w-4 h-4 text-[var(--vynk-brand)]" /> Payment & Authorization
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <p><span className="text-slate-400">Method:</span> <strong className="uppercase">{order.paymentMethod}</strong></p>
            <p><span className="text-slate-400">Amount Charged:</span> <strong className="text-[var(--vynk-brand)]">${order.totalAmount.toFixed(2)}</strong></p>
          </div>
        </div>
      </div>

      {/* Items list */}
      <div className="card-surface p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Purchased Items Manifest</h3>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-xs py-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img src={item.productImage} alt="" className="w-12 h-12 object-cover rounded-lg" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-slate-100">{item.productTitle}</p>
                  <p className="text-slate-400">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                </div>
              </div>
              <span className="font-black text-slate-900 dark:text-slate-100">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

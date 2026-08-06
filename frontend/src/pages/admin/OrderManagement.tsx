import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Clock, CheckCircle, Truck, Package, XCircle } from 'lucide-react';
import { orderApi } from '../../api/orderApi';
import { Order, OrderStatus } from '../../types';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await orderApi.getOrders();
      const resData = (res as any)?.data ?? res;
      setOrders(Array.isArray(resData) ? resData : []);
    } catch (err: any) {
      setError(err?.message || 'Error loading order management data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string | number, status: OrderStatus) => {
    await orderApi.updateOrderStatus(orderId, status);
    fetchOrders();
  };

  if (loading) return <Loader text="Querying Spring Boot fulfillment backend..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchOrders} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Order Fulfillment Dashboard</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Monitor customer transactions, update shipping stages, and process dispatches.
        </p>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer ID</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Fulfillment Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="p-4 font-mono font-bold text-slate-900 dark:text-slate-100">#{ord.id}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{ord.userId}</td>
                  <td className="p-4 font-black text-slate-900 dark:text-slate-100">${ord.totalAmount.toFixed(2)}</td>
                  <td className="p-4 uppercase font-bold text-slate-700 dark:text-slate-300">{ord.paymentMethod}</td>
                  <td className="p-4">
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                      className="text-xs p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <Link to={`/order/details/${ord.id}`} className="p-1.5 text-[var(--vynk-brand)] hover:bg-[var(--vynk-brand)]/10 rounded-lg inline-block">
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

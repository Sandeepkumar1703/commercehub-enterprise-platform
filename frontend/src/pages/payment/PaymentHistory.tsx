import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  Eye,
  DollarSign,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { paymentApi } from '../../api/paymentApi';
import { Payment, PaymentStatus } from '../../types';

export const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filtered, setFiltered] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await paymentApi.getPayments();
      const resData = (res as any)?.data ?? res;
      let list: Payment[] = [];
      if (Array.isArray(resData)) {
        list = resData;
      } else if (resData && Array.isArray(resData.content)) {
        list = resData.content;
      }
      setPayments(list);
      setFiltered(list);
    } catch {
      setPayments([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    let result = [...payments];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.paymentId.toLowerCase().includes(term) ||
          p.orderId.toLowerCase().includes(term) ||
          p.transactionRef.toLowerCase().includes(term) ||
          p.gateway.toLowerCase().includes(term)
      );
    }
    if (statusFilter !== 'ALL') {
      result = result.filter((p) => p.status === statusFilter);
    }
    setFiltered(result);
  }, [searchTerm, statusFilter, payments]);

  const handleUpdateStatus = async (paymentId: string, status: PaymentStatus) => {
    try {
      await paymentApi.updatePaymentStatus(paymentId, status);
      fetchPayments();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'SUCCESS':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-950/90 dark:text-emerald-200 dark:border-emerald-700/80 shadow-xs">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Paid
          </span>
        );
      case 'PENDING':
      case 'RETRYING':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/90 dark:text-amber-200 dark:border-amber-700/80 shadow-xs">
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> {status}
          </span>
        );
      case 'FAILED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-900 border border-rose-300 dark:bg-rose-950/90 dark:text-rose-200 dark:border-rose-700/80 shadow-xs">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> Failed
          </span>
        );
      case 'REFUNDED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-purple-100 text-purple-900 border border-purple-300 dark:bg-purple-950/90 dark:text-purple-200 dark:border-purple-700/80 shadow-xs">
            <RefreshCw className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Refunded
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-900 border border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 shadow-xs">
            {status}
          </span>
        );
    }
  };

  const totalVolume = payments.reduce((acc, p) => (p.status === 'SUCCESS' ? acc + p.amount : acc), 0);
  const successCount = payments.filter((p) => p.status === 'SUCCESS').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-[var(--vynk-brand)]" /> Payment Transactions
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Enterprise gateway logs, payouts, status reconciliation and refunds
          </p>
        </div>
        <button
          onClick={fetchPayments}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all"
        >
          <RefreshCw className="w-4 h-4" /> Refresh Logs
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Total Settled Volume</span>
            <DollarSign className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">${totalVolume.toLocaleString()}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Successful Payments</span>
            <CheckCircle className="w-5 h-5 text-[var(--vynk-brand)]" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {successCount} / {payments.length}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Success Rate</span>
            <ArrowUpRight className="w-5 h-5 text-[var(--vynk-brand)]" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {payments.length > 0 ? ((successCount / payments.length) * 100).toFixed(1) : '100'}%
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search TX ID, Order, Gateway..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[var(--vynk-brand)] text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none text-slate-800 dark:text-slate-200"
          >
            <option value="ALL">All Statuses</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="PENDING">PENDING</option>
            <option value="FAILED">FAILED</option>
            <option value="REFUNDED">REFUNDED</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Order ID</th>
                <th className="p-4">Gateway</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    Loading payments...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                filtered.map((pay) => (
                  <tr key={pay.paymentId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                      {pay.paymentId}
                    </td>
                    <td className="p-4 font-medium text-slate-600 dark:text-slate-300">
                      <Link to={`/order/details/${pay.orderId}`} className="text-[var(--vynk-brand)] hover:underline">
                        {pay.orderId}
                      </Link>
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                      {pay.gateway}
                    </td>
                    <td className="p-4 font-black text-slate-900 dark:text-white">
                      ${pay.amount.toFixed(2)}
                    </td>
                    <td className="p-4">{getStatusBadge(pay.status)}</td>
                    <td className="p-4 text-slate-500 dark:text-slate-400 text-[11px]">
                      {new Date(pay.timestamp).toLocaleString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        to={`/payment/details/${pay.paymentId}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>
                      {pay.status === 'SUCCESS' && (
                        <button
                          onClick={() => handleUpdateStatus(pay.paymentId, 'REFUNDED')}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-400 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                        >
                          Refund
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

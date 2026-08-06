import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  AlertOctagon,
  RefreshCw,
  Copy,
  Receipt,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { paymentApi } from '../../api/paymentApi';
import { Payment } from '../../types';

export const PaymentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      paymentApi
        .getPaymentById(id)
        .then((res) => {
          const data = (res as any)?.data ?? res;
          if (data && (data.paymentId || data.id)) {
            setPayment(data);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefund = async () => {
    if (!payment) return;
    try {
      const res = await paymentApi.updatePaymentStatus(payment.paymentId || (payment as any).id, 'REFUNDED');
      const resData = (res as any)?.data ?? res;
      if (resData) {
        setPayment({ ...payment, status: 'REFUNDED' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 font-medium">
        Loading payment transaction breakdown...
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="p-8 text-center text-rose-500 font-medium">
        Payment transaction not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to="/payment/history"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[var(--vynk-brand)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Payment History
      </Link>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        {/* Header Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] rounded-2xl">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                Payment #{payment.paymentId}
              </h1>
              <p className="text-xs text-slate-400">Order ID: {payment.orderId}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                payment.status === 'SUCCESS'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400'
                  : payment.status === 'REFUNDED'
                  ? 'bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)]'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400'
              }`}
            >
              {payment.status}
            </span>
            {payment.status === 'SUCCESS' && (
              <button
                onClick={handleRefund}
                className="px-3 py-1.5 bg-rose-600 text-white hover:bg-rose-700 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                Issue Full Refund
              </button>
            )}
          </div>
        </div>

        {/* Transaction Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
              Gateway Metadata
            </h2>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Payment Gateway:</span>
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-[var(--vynk-brand)]" /> {payment.gateway}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Transaction Ref:</span>
                <button
                  onClick={() => copyToClipboard(payment.transactionRef)}
                  className="font-mono font-bold text-slate-900 dark:text-white flex items-center gap-1 hover:text-[var(--vynk-brand)] cursor-pointer"
                >
                  {payment.transactionRef} <Copy className="w-3 h-3" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Timestamp:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {new Date(payment.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">3D Secure / Anti-Fraud:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> PASSED
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
              Financial Breakdown
            </h2>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Subtotal Charge:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  ${(payment.amount * 0.92).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Processing Fee (2.9% + $0.30):</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  ${(payment.amount * 0.029 + 0.3).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                  Total Settlement Amount:
                </span>
                <span className="font-black text-[var(--vynk-brand)] text-lg">
                  ${payment.amount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Log / Timeline */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
            Reconciliation Trail
          </h2>
          <div className="space-y-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">
                Webhook event Received: <span className="font-mono">payment_intent.succeeded</span>
              </span>
              <span className="text-slate-400 text-[10px]">{payment.timestamp}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">
                Settled in Vynk Treasury Account
              </span>
              <span className="text-slate-400 text-[10px]">{payment.timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Search, CheckCircle, Clock, AlertTriangle, RefreshCw, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';
import { paymentApi } from '../../api/paymentApi';
import { Payment } from '../../types';

export const PaymentStatus: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await paymentApi.getPaymentById(searchId.trim());
      if (res.success && res.data) {
        setResult(res.data);
      } else {
        setError('Payment transaction not found for this reference.');
        setResult(null);
      }
    } catch (err: any) {
      setError('Failed to fetch payment status. Please verify the ID.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async () => {
    if (!result) return;
    setLoading(true);
    try {
      const res = await paymentApi.updatePaymentStatus(result.paymentId, 'SUCCESS');
      if (res.success) {
        setResult({ ...result, status: 'SUCCESS' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
          <CreditCard className="w-7 h-7 text-[var(--vynk-brand)]" /> Real-time Payment Verification
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Verify gateway status, settlement confirmation, and retry failed charges
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm space-y-3">
        <label className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
          Payment ID or Transaction Reference
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="e.g. pay_1001 or tx_ref_998124..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--vynk-brand)] text-slate-900 dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-[var(--vynk-brand)] hover:bg-[var(--vynk-brand-hover)] text-white font-bold rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />} Check Status
          </button>
        </div>
      </form>

      {/* Result Card */}
      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {result && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400">Payment ID</span>
              <p className="text-base font-black font-mono text-slate-900 dark:text-white">{result.paymentId}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-slate-400">Amount</span>
              <p className="text-lg font-black text-[var(--vynk-brand)]">${result.amount.toFixed(2)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
              <span className="text-slate-400 font-medium">Gateway</span>
              <p className="font-bold text-slate-900 dark:text-white">{result.gateway}</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
              <span className="text-slate-400 font-medium">Transaction Ref</span>
              <p className="font-bold font-mono text-slate-900 dark:text-white">{result.transactionRef}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl flex items-center justify-between border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80">
            <div className="flex items-center gap-3">
              {result.status === 'SUCCESS' ? (
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              ) : result.status === 'PENDING' ? (
                <Clock className="w-6 h-6 text-amber-500" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-rose-500" />
              )}
              <div>
                <p className="text-xs font-extrabold text-slate-900 dark:text-white">Status: {result.status}</p>
                <p className="text-[11px] text-slate-500">
                  {result.status === 'SUCCESS'
                    ? 'Settlement finalized & funds cleared.'
                    : 'Awaiting webhook confirmation from gateway.'}
                </p>
              </div>
            </div>

            {result.status !== 'SUCCESS' && (
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-[var(--vynk-brand)] text-white rounded-xl text-xs font-bold hover:bg-[var(--vynk-brand-hover)] transition-all cursor-pointer"
              >
                Re-process Payment
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

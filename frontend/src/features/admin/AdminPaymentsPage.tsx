import React, { useEffect, useState } from 'react';
import { paymentService } from '../../services/payment.service';
import { CreditCard, CheckCircle, XCircle, RefreshCw, Loader2 } from 'lucide-react';

export const AdminPaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await paymentService.getPayments();
      setPayments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleStatusChange = async (id: string, action: 'refund' | 'retry') => {
    try {
      if (action === 'refund') await paymentService.refundPayment(id);
      if (action === 'retry') await paymentService.retryPayment(id);
      fetchPayments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b pb-4 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <CreditCard className="w-7 h-7 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Transactions</h1>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700 text-xs font-semibold text-gray-500 uppercase">
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Order ID</th>
                <th className="p-4">Method</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700 text-sm">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="p-4 font-mono text-gray-900 dark:text-gray-100">{p.transactionId || p.id}</td>
                  <td className="p-4 font-medium text-gray-700 dark:text-gray-300">{p.orderId}</td>
                  <td className="p-4">{p.paymentMethod}</td>
                  <td className="p-4 font-bold text-gray-900 dark:text-white">${p.amount}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        p.paymentStatus === 'SUCCESS'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : p.paymentStatus === 'REFUNDED'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      {p.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4 space-x-2">
                    {p.paymentStatus === 'SUCCESS' && (
                      <button
                        onClick={() => handleStatusChange(p.id, 'refund')}
                        className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded hover:bg-purple-100"
                      >
                        Refund
                      </button>
                    )}
                    {p.paymentStatus === 'FAILED' && (
                      <button
                        onClick={() => handleStatusChange(p.id, 'retry')}
                        className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
                      >
                        Retry
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

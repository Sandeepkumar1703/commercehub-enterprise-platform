import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { paymentService } from '../../services/payment.service';
import { CreditCard, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const { paymentId } = useParams<{ paymentId?: string }>();
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (paymentId) {
      paymentService
        .getPaymentById(paymentId)
        .then((res) => setPayment(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [paymentId]);

  const handleRetry = async () => {
    if (!paymentId) return;
    setProcessing(true);
    try {
      const res = await paymentService.retryPayment(paymentId);
      setPayment(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 border-b pb-4 dark:border-gray-700">
          <CreditCard className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Payment Status & Details</h1>
            <p className="text-xs text-gray-500 font-mono">{paymentId || 'New Transaction'}</p>
          </div>
        </div>

        {payment ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Transaction ID</p>
                <p className="font-semibold text-gray-900 dark:text-white">{payment.transactionId || payment.id}</p>
              </div>
              <div>
                <p className="text-gray-500">Amount</p>
                <p className="font-bold text-xl text-gray-900 dark:text-white">${payment.amount}</p>
              </div>
              <div>
                <p className="text-gray-500">Payment Method</p>
                <p className="font-medium text-gray-900 dark:text-white">{payment.paymentMethod}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    payment.paymentStatus === 'SUCCESS'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {payment.paymentStatus}
                </span>
              </div>
            </div>

            {payment.paymentStatus !== 'SUCCESS' && (
              <div className="pt-4 border-t dark:border-gray-700 flex justify-end">
                <button
                  onClick={handleRetry}
                  disabled={processing}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? 'Retrying...' : 'Retry Payment'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            No payment transaction found for the provided ID.
          </div>
        )}
      </div>
    </div>
  );
};

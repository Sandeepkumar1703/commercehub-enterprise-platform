import React from 'react';
import { useApp } from '../app/store/store';
import { Logo } from '../shared/components/Logo';
import { Button } from '../shared/components/Button';
import { Printer, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const PrintableInvoice: React.FC = () => {
  const { orders, selectedOrderId, setPortal, setCustomerView } = useApp();

  const order = orders.find(o => o.id === selectedOrderId) || orders[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-8 text-slate-900 dark:text-slate-100 flex flex-col items-center">
      {/* Controls Bar (No Print) */}
      <div className="w-full max-w-3xl flex items-center justify-between mb-6 no-print">
        <button
          onClick={() => { setPortal('customer'); setCustomerView('account'); }}
          className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Customer Account
        </button>
        <Button onClick={handlePrint} leftIcon={<Printer className="w-4 h-4" />}>
          Print Official Invoice (PDF)
        </Button>
      </div>

      {/* Printable Paper Card */}
      <div className="w-full max-w-3xl bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-6">
          <div>
            <Logo />
            <p className="text-xs text-slate-500 mt-2">
              CommerceHub Enterprise Global Platform Inc.<br />
              100 Technology Way, Suite 400<br />
              San Francisco, CA 94105
            </p>
          </div>
          <div className="text-right text-xs">
            <h2 className="text-xl font-extrabold text-slate-900">INVOICE RECEIPT</h2>
            <p className="font-extrabold text-indigo-600 mt-1">Order #{order.id}</p>
            <p className="text-slate-500 mt-0.5">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Addresses */}
        <div className="grid grid-cols-2 gap-8 text-xs">
          <div>
            <h4 className="font-bold text-slate-400 uppercase tracking-wider mb-1">Billed & Shipped To</h4>
            <p className="font-bold text-slate-900">{order.shippingAddress.fullName}</p>
            <p className="text-slate-600">{order.shippingAddress.street}</p>
            <p className="text-slate-600">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-400 uppercase tracking-wider mb-1">Payment Method</h4>
            <p className="font-bold text-slate-900">{order.paymentMethod}</p>
            <p className="text-slate-600">Status: <span className="text-emerald-600 font-bold">PAID IN FULL</span></p>
            <p className="text-slate-600">Tracking: {order.trackingNumber || 'TRK-9920148'}</p>
          </div>
        </div>

        {/* Order Items Table */}
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b-2 border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
              <th className="py-2">Item Description</th>
              <th className="py-2 text-center">Qty</th>
              <th className="py-2 text-right">Unit Price</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td className="py-3 font-bold text-slate-800">{item.title}</td>
                <td className="py-3 text-center">{item.quantity}</td>
                <td className="py-3 text-right">${item.price.toFixed(2)}</td>
                <td className="py-3 text-right font-bold">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Breakdown */}
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <div className="w-60 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal:</span>
              <span>${(order.totalAmount - 15).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Shipping Fee:</span>
              <span>$15.00</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Paid:</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Barcode & Footer Note */}
        <div className="pt-8 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="space-y-1">
            <p className="font-bold text-slate-700">Thank you for your business!</p>
            <p>Questions? Contact support@commercehub.enterprise</p>
          </div>
          <div className="text-right font-mono text-xs font-bold tracking-widest text-slate-800">
            ||| | |||| ||| |||| | ||| #{order.id}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableInvoice;

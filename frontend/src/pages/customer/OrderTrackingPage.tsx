import React, { useState } from 'react';
import { useRouter } from '../../core/router/Router';
import { ROUTES } from '../../theme/routes';
import { useCart } from '../../context/CartContext';
import {
  Truck,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  Printer,
  Copy,
  Check,
  ChevronLeft,
  ShoppingBag,
  FileText,
  Building2,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { pathParam, navigate } = useRouter();
  const { orders } = useCart();
  const [copied, setCopied] = useState(false);

  // Find order by path param ID or fallback to first available order
  const orderId = pathParam || 'ORD-98421';
  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Order Not Found</h2>
        <button
          onClick={() => navigate(ROUTES.ORDERS)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
        >
          Return to My Orders
        </button>
      </div>
    );
  }

  const trackingNumber = order.trackingNumber || `TRK-${Math.floor(100000000 + Math.random() * 900000000)}`;
  const carrier = order.carrier || 'FedEx Express';

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  // Determine active step index
  const getStepIndex = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 1;
      case 'PAID':
        return 2;
      case 'SHIPPED':
        return 3;
      case 'DELIVERED':
        return 4;
      case 'CANCELLED':
        return 0;
      default:
        return 3;
    }
  };

  const currentStep = getStepIndex(order.status);

  const steps = [
    { title: 'Order Placed', desc: 'Order received & logged' },
    { title: 'Payment Confirmed', desc: 'Transaction verified' },
    { title: 'Packed & Dispatched', desc: 'Passed QA inspection' },
    { title: 'Out for Delivery', desc: 'In transit with courier' },
    { title: 'Delivered', desc: 'Signed by recipient' },
  ];

  return (
    <div className="py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-default)]">
        <div>
          <button
            onClick={() => navigate(ROUTES.ORDERS)}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 mb-2 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Orders</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-[var(--text-primary)]">
              Order Tracking: <span className="font-mono text-indigo-600">{order.id}</span>
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                order.status === 'DELIVERED'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>

        <button
          onClick={handlePrintInvoice}
          className="px-4 py-2.5 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--brand-primary)] rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-indigo-500" />
          <span>Print Enterprise Invoice</span>
        </button>
      </div>

      {/* Progress Stepper Bar */}
      <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-8">
        <h2 className="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
          <Truck className="w-5 h-5 text-indigo-600" />
          <span>Live Fulfillment Progress Timeline</span>
        </h2>

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isDone = currentStep >= stepNum;
            const isCurrent = currentStep === stepNum;

            return (
              <div key={idx} className="flex-1 flex md:flex-col items-center gap-4 text-left md:text-center relative z-10">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all shadow-md ${
                    isDone
                      ? 'bg-indigo-600 text-white shadow-indigo-500/20'
                      : 'bg-[var(--bg-surface-raised)] border border-[var(--border-default)] text-[var(--text-secondary)]'
                  } ${isCurrent ? 'ring-4 ring-indigo-500/30 animate-pulse' : ''}`}
                >
                  {isDone ? <CheckCircle2 className="w-6 h-6" /> : stepNum}
                </div>
                <div>
                  <p className={`text-xs font-bold ${isDone ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                    {step.title}
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Carrier Info & Live Checkpoints */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Carrier Details Card */}
        <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-5">
          <h3 className="text-sm font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-500" />
            <span>Shipping Logistics Courier</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-2">
              <p className="text-[var(--text-secondary)] font-semibold">Courier Partner:</p>
              <p className="text-base font-extrabold text-[var(--text-primary)]">{carrier}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-2">
              <p className="text-[var(--text-secondary)] font-semibold">Waybill Tracking Code:</p>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-indigo-600 text-sm">{trackingNumber}</span>
                <button
                  onClick={handleCopyTracking}
                  className="p-1.5 rounded-lg bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-indigo-600 cursor-pointer"
                  title="Copy Tracking Number"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
              <p className="text-[10px] font-bold text-indigo-800 dark:text-indigo-300 uppercase">Estimated Delivery Window</p>
              <p className="text-sm font-black text-indigo-900 dark:text-indigo-200">
                {order.estimatedDelivery || 'Within 2-3 Business Days'}
              </p>
            </div>
          </div>
        </div>

        {/* Live Tracking Log Checkpoints */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span>Logistics Scan Checkpoints</span>
          </h3>

          <div className="space-y-4 text-xs font-medium pl-2 border-l-2 border-indigo-200 dark:border-indigo-900">
            {[
              {
                time: 'Today, 09:15 AM',
                location: 'Regional Sorting Facility - Bay Area Hub',
                status: 'Out for final mile delivery with courier vehicle #402',
              },
              {
                time: 'Yesterday, 04:30 PM',
                location: 'Enterprise Fulfillment Depot - San Jose, CA',
                status: 'Item scanned and departed origin fulfillment center',
              },
              {
                time: `${order.date}, 11:00 AM`,
                location: 'CommerceHub Order Processing Core',
                status: 'Order confirmed and verified via automated API check',
              },
            ].map((log, i) => (
              <div key={i} className="relative pl-6 space-y-1">
                <div className="w-3 h-3 rounded-full bg-indigo-600 absolute -left-[19px] top-1 ring-4 ring-indigo-100 dark:ring-indigo-950" />
                <p className="font-mono text-[10px] text-[var(--text-secondary)]">{log.time}</p>
                <p className="font-bold text-[var(--text-primary)]">{log.location}</p>
                <p className="text-[var(--text-secondary)]">{log.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enterprise Printable Tax Invoice Component */}
      <div className="p-8 rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-xl space-y-8 print:shadow-none print:border-none">
        
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-indigo-600" />
              <span className="text-xl font-black text-slate-900">CommerceHub Enterprise</span>
            </div>
            <p className="text-xs text-slate-500">Official Tax Invoice & Order Statement</p>
            <p className="text-[11px] text-slate-500">GSTIN / VAT Reg No: CHE-9823-4101-US</p>
          </div>

          <div className="text-left sm:text-right text-xs space-y-1">
            <p className="font-mono font-bold text-sm text-indigo-600">INVOICE #{order.id}</p>
            <p className="text-slate-600">Date: {order.date}</p>
            <p className="text-slate-600">Payment Status: <span className="font-bold text-emerald-600">PAID</span></p>
          </div>
        </div>

        {/* Address Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-1 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="font-bold uppercase tracking-wider text-slate-500 text-[10px]">Billed & Shipped To:</p>
            <p className="font-bold text-slate-900 text-sm">{order.shippingAddress.name}</p>
            <p className="text-slate-600">{order.shippingAddress.street}</p>
            <p className="text-slate-600">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
            </p>
          </div>

          <div className="space-y-1 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="font-bold uppercase tracking-wider text-slate-500 text-[10px]">Merchant Seller Details:</p>
            <p className="font-bold text-slate-900 text-sm">CommerceHub Retail Services LLC</p>
            <p className="text-slate-600">100 Enterprise Parkway, Suite 500</p>
            <p className="text-slate-600">San Francisco, CA 94105</p>
          </div>
        </div>

        {/* Order Line Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-2">Item Description</th>
                <th className="py-3 px-2 text-center">Qty</th>
                <th className="py-3 px-2 text-right">Unit Price</th>
                <th className="py-3 px-2 text-right">Total Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-2 font-bold">{item.product.name}</td>
                    <td className="py-3 px-2 text-center">{item.quantity}</td>
                    <td className="py-3 px-2 text-right">${item.product.price.toFixed(2)}</td>
                    <td className="py-3 px-2 text-right font-bold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 px-2 font-bold">Enterprise Product Package Items</td>
                  <td className="py-3 px-2 text-center">1</td>
                  <td className="py-3 px-2 text-right">${order.subtotal.toFixed(2)}</td>
                  <td className="py-3 px-2 text-right font-bold">${order.subtotal.toFixed(2)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Financial Summary Breakdown */}
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <div className="w-full sm:w-64 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping & Handling:</span>
              <span>{order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Estimated Tax (10%):</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-300">
              <span>Total Paid:</span>
              <span className="text-indigo-600">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Authentic Purchase Guarantee</span>
          </div>
          <p>CommerceHub Platform System Engine</p>
        </div>
      </div>
    </div>
  );
};

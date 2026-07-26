import React from 'react';
import { useRouter } from '../../core/router/Router';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { ROUTES } from '../../theme/routes';
import {
  CheckCircle2,
  Package,
  Printer,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { pathParam, navigate } = useRouter();
  const { orders } = useCart();
  const { t } = useLanguage();

  const orderId = pathParam || orders?.[0]?.id || 'ORD-98421';
  const order = orders?.find((o) => o.id === orderId) || orders?.[0];

  return (
    <div className="max-w-2xl mx-auto py-12 space-y-8">
      
      {/* Confirmation Header */}
      <div className="bg-[var(--bg-surface)] p-8 rounded-3xl border border-[var(--border-default)] shadow-xl text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
          {t('order.successTitle')}
        </h1>

        <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto">
          {t('order.successSubtitle')}
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300">
          <span>{t('order.idLabel')}: {order?.id || orderId}</span>
        </div>
      </div>

      {/* Invoice Details Card */}
      {order && (
        <div className="bg-[var(--bg-surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border-default)] shadow-xs space-y-6">
          <div className="flex justify-between items-center border-b border-[var(--border-default)] pb-4">
            <div>
              <h3 className="text-sm font-extrabold text-[var(--text-primary)]">
                Order Invoice Summary
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {t('order.dateLabel')}: {order.date}
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] rounded-lg text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--brand-primary)] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t('btn.downloadInvoice')}</span>
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              Shipping Address
            </h4>
            <div className="p-3.5 rounded-xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] text-xs text-[var(--text-primary)] space-y-0.5">
              <p className="font-bold">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              Financial Breakdown
            </h4>
            <div className="p-4 rounded-xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] text-xs space-y-2">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Subtotal</span>
                <span className="font-semibold text-[var(--text-primary)]">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Shipping</span>
                <span>${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Tax (10%)</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-[var(--text-primary)] pt-2 border-t border-[var(--border-default)]">
                <span>Total Paid</span>
                <span className="text-indigo-600 dark:text-indigo-400">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex gap-4">
            <button
              onClick={() => navigate(ROUTES.CUSTOMER_DASHBOARD)}
              className="flex-1 py-3 bg-[var(--brand-primary)] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

import React from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../core/router/Router';
import { ROUTES } from '../../theme/routes';
import { ShoppingBag, ArrowRight, PackageCheck } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { orders } = useCart();
  const { t } = useLanguage();
  const { navigate } = useRouter();

  return (
    <div className="space-y-6 py-6">
      
      <div>
        <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">
          {t('nav.orders')}
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Review your historic purchasing records and lifecycle statuses.
        </p>
      </div>

      <div className="bg-[var(--bg-surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border-default)] shadow-xs divide-y divide-[var(--border-default)]">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <PackageCheck className="w-10 h-10 text-[var(--text-secondary)] mx-auto mb-3 stroke-1" />
            <h3 className="text-base font-bold text-[var(--text-primary)]">No orders found</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1 mb-4">
              You haven't placed any orders yet.
            </p>
            <button
              onClick={() => navigate(ROUTES.PRODUCTS)}
              className="px-4 py-2 bg-[var(--brand-primary)] text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              {t('home.hero.shopBtn')}
            </button>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="py-6 first:pt-0 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-extrabold text-[var(--text-primary)]">
                      {order.id}
                    </span>
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {t('order.dateLabel')}: {order.date}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-base font-black text-[var(--text-primary)]">
                    ${order.total.toFixed(2)}
                  </span>
                  <button
                    onClick={() => navigate(`${ROUTES.ORDER_TRACKING}/${order.id}`)}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm"
                  >
                    Track Order & Invoice
                  </button>
                  <button
                    onClick={() => navigate(`${ROUTES.ORDER_SUCCESS}/${order.id}`)}
                    className="px-3 py-1.5 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] hover:border-[var(--brand-primary)] rounded-lg text-xs font-semibold text-[var(--text-primary)] cursor-pointer"
                  >
                    View Receipt
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../core/router/Router';
import { ROUTES } from '../../theme/routes';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingFee,
    taxAmount,
    totalAmount,
    applyPromoCode,
    appliedPromoCode,
  } = useCart();

  const { t } = useLanguage();
  const { navigate } = useRouter();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const success = applyPromoCode(promoInput);
    if (success) {
      setPromoMessage({ text: 'Promo code applied! 10% discount subtracted.', isError: false });
    } else {
      setPromoMessage({ text: 'Invalid promo code. Try COMMERCE10', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[var(--bg-surface)] border-l border-[var(--border-default)] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[var(--border-default)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-[var(--brand-primary)]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {t('cart.title')}
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg hover:bg-[var(--bg-surface-raised)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content Item List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[var(--border-default)]">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-surface-raised)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">
                  {t('cart.emptyTitle')}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] max-w-xs mb-6">
                  {t('cart.emptySubtitle')}
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate(ROUTES.PRODUCTS);
                  }}
                  className="px-5 py-2.5 bg-[var(--brand-primary)] text-white rounded-xl text-xs font-semibold hover:bg-[var(--brand-hover)] transition-all cursor-pointer"
                >
                  {t('home.hero.shopBtn')}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-4 first:pt-0">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover border border-[var(--border-default)] bg-[var(--bg-surface-raised)] flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-[var(--text-primary)] line-clamp-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[var(--text-secondary)] hover:text-rose-500 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] font-mono text-[var(--text-secondary)] mt-0.5">
                        SKU: {item.product.sku}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[var(--border-default)] rounded-lg bg-[var(--bg-surface-raised)]">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="px-2 py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[var(--text-primary)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="px-2 py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-xs font-extrabold text-[var(--text-primary)]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Calculations */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[var(--border-default)] bg-[var(--bg-surface-raised)]/60 space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder={t('cart.promoPlaceholder')}
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 text-xs font-semibold bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--brand-primary)] rounded-lg text-[var(--text-primary)] transition-all cursor-pointer"
                >
                  {t('btn.apply')}
                </button>
              </form>

              {promoMessage && (
                <p className={`text-[11px] font-medium ${promoMessage.isError ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {promoMessage.text}
                </p>
              )}

              {/* Price Calculations Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>{t('cart.subtotal')}</span>
                  <span className="font-semibold text-[var(--text-primary)]">${subtotal.toFixed(2)}</span>
                </div>
                {appliedPromoCode && (
                  <div className="flex justify-between text-emerald-500 font-semibold">
                    <span>Discount ({appliedPromoCode})</span>
                    <span>-10%</span>
                  </div>
                )}
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>{t('cart.shipping')}</span>
                  <span>{shippingFee === 0 ? <span className="text-emerald-500 font-semibold">Free</span> : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>{t('cart.tax')}</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[var(--text-primary)] pt-2 border-t border-[var(--border-default)]">
                  <span>{t('cart.total')}</span>
                  <span className="text-indigo-600 dark:text-indigo-400">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] bg-[var(--bg-surface)] p-2.5 rounded-lg border border-[var(--border-default)]">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Stateless Dual-Token JWT Protected Checkout</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate(ROUTES.CHECKOUT);
                }}
                className="w-full py-3 bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('btn.checkout')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../../app/store/store';
import { Button } from '../../../shared/components/Button';
import { CheckoutModal } from './CheckoutModal';
import { ShoppingBag, X, Trash2, ArrowRight, Tag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateCartQuantity, clearCart } = useApp();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  if (!cartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 100;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'SUMMER20') {
      setDiscountAmount(subtotal * 0.2);
    } else {
      setDiscountAmount(0);
    }
  };

  const finalTotal = Math.max(0, subtotal - discountAmount);

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          onClick={() => setCartOpen(false)}
        />

        {/* Sliding Drawer Container */}
        <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Your Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-indigo-50 dark:bg-indigo-950/40 px-6 py-3 border-b border-indigo-100 dark:border-indigo-900/40 text-xs">
            <div className="flex justify-between font-medium text-indigo-900 dark:text-indigo-200 mb-1.5">
              <span>
                {subtotal >= freeShippingThreshold
                  ? '🎉 You unlocked Free Express Shipping!'
                  : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for Free Shipping`}
              </span>
            </div>
            <div className="w-full bg-indigo-200 dark:bg-indigo-900 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <span className="text-4xl">🛒</span>
                <p className="font-bold text-slate-900 dark:text-slate-100">Your cart is empty</p>
                <p className="text-xs text-slate-400">Explore our catalog to add items.</p>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="pt-4 first:pt-0 flex gap-4 items-center">
                  <img src={item.product.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-800" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{item.product.title}</h4>
                    <p className="text-[11px] text-slate-400">{item.selectedColor || 'Standard'} • ${item.product.price.toFixed(2)}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          -
                        </button>
                        <span className="px-2 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-extrabold text-xs">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 space-y-4">
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (try SUMMER20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none"
                />
                <Button variant="outline" size="sm" type="submit" leftIcon={<Tag className="w-3.5 h-3.5" />}>
                  Apply
                </Button>
              </form>

              <div className="space-y-1.5 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount (20% OFF)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {subtotal >= freeShippingThreshold ? 'FREE' : '$15.00'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-sm font-extrabold text-slate-900 dark:text-slate-100">
                  <span>Estimated Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => setCheckoutModalOpen(true)}
              >
                Proceed to Checkout
              </Button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-bit Encrypted SSL Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Multi-Step Checkout Modal */}
      {checkoutModalOpen && (
        <CheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
        />
      )}
    </>
  );
};

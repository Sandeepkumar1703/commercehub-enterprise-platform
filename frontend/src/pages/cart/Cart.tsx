import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { cartApi } from '../../api/cartApi';
import { couponApi } from '../../api/couponApi';
import { CartItem } from '../../types';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { EmptyState } from '../../components/common/EmptyState';

import { BRAND } from '../../constants/brand';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await cartApi.getCart();
      const cartData = (res as any)?.data ?? res;
      const cartItems = Array.isArray(cartData) ? cartData : (cartData?.items || []);
      setItems(cartItems);
    } catch (err: any) {
      setError(err?.message || 'Error loading cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQty = async (id: string | number, qty: number) => {
    if (qty < 1) return;
    try {
      await cartApi.updateCartItem(id, qty);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (id: string | number) => {
    try {
      await cartApi.removeFromCart(id);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    try {
      const res = await couponApi.applyCoupon(couponCode);
      if (res.success && res.data) {
        setDiscountPercent(res.data.discountPercent);
        setCouponApplied(true);
      } else {
        setCouponError(res.message || 'Invalid promotional coupon code');
      }
    } catch (err: any) {
      setCouponError(err.message || 'Coupon validation failed');
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + (item.unitPrice ?? item.price ?? 0) * (item.quantity || 1),
    0
  );
  const discountAmount = (subtotal * discountPercent) / 100;
  const grandTotal = subtotal - discountAmount;

  if (loading) return <Loader text="Loading your shopping cart..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchCart} />;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Shopping Cart</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review item quantities and apply promotional discounts.
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const itemId = item.cartItemId || item.id || item.productId;
              const title = item.productName || item.productTitle || 'Cart Item';
              const price = item.unitPrice ?? item.price ?? 0;
              const img =
                item.imageUrl ||
                item.productImage ||
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800';
              const qty = item.quantity || 1;

              return (
                <div key={itemId} className="card-surface p-4 flex items-center gap-4">
                  <img
                    src={img}
                    alt={title}
                    className="w-20 h-20 object-cover rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      {title}
                    </h3>
                    <p className="text-xs font-extrabold text-[var(--vynk-brand)] mt-1">
                      ${price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
                        <button
                          onClick={() => itemId && handleUpdateQty(itemId, qty - 1)}
                          className="px-2 py-0.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold">{qty}</span>
                        <button
                          onClick={() => itemId && handleUpdateQty(itemId, qty + 1)}
                          className="px-2 py-0.5 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => itemId && handleRemove(itemId)}
                        className="text-xs text-rose-500 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right font-black text-sm text-slate-900 dark:text-slate-100">
                    ${(price * qty).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary & Coupon */}
          <div className="space-y-6">
            <div className="card-surface p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
                Order Summary
              </h3>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Coupon (e.g. WELCOME20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button type="submit" size="sm" variant="outline">
                    Apply
                  </Button>
                </div>
                {couponApplied && (
                  <p className="text-xs font-bold text-emerald-600">
                    {discountPercent}% discount code applied!
                  </p>
                )}
                {couponError && <p className="text-xs text-rose-500 font-semibold">{couponError}</p>}
              </form>

              <div className="space-y-2 text-xs pt-2">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={() => navigate('/checkout')}
                className="w-full mt-4"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          title="Your Vynk Cart is Waiting"
          description={BRAND.emptyStates.cart}
          actionText="Discover Products"
          onAction={() => navigate('/products')}
        />
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { toggleCartDrawer, setCart, optimisticUpdateQuantity } from './cartSlice';
import { cartApi } from './cart.api';
import { couponApi } from '../coupon/coupon.api';
import { Button } from '../../shared/components/Button';
import { formatCurrency } from '../../core/utils/formatters';
import { useToast } from '../../shared/components/Toast';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { cart, isOpen, isLoading } = useAppSelector((state) => state.cart);

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState<string | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  if (!isOpen) return null;

  const handleQuantityChange = async (itemId: string, newQty: number) => {
    // Instant optimistic update
    dispatch(optimisticUpdateQuantity({ itemId, quantity: newQty }));
    try {
      const updatedCart = await cartApi.updateItemQuantity(itemId, newQty);
      dispatch(setCart(updatedCart));
    } catch {
      toast.error('Failed to sync item quantity with server.');
      const freshCart = await cartApi.getCart();
      dispatch(setCart(freshCart));
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    // Instant optimistic removal
    dispatch(optimisticUpdateQuantity({ itemId, quantity: 0 }));
    try {
      const updatedCart = await cartApi.removeItem(itemId);
      dispatch(setCart(updatedCart));
      toast.info('Item removed from cart');
    } catch {
      toast.error('Failed to remove item');
      const freshCart = await cartApi.getCart();
      dispatch(setCart(freshCart));
    }
  };

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim() || !cart) return;

    setIsValidatingCoupon(true);
    try {
      const res = await couponApi.validateCoupon(couponCode, cart.subtotal);
      if (res.valid && res.coupon) {
        setCouponApplied(res.coupon.code);
        toast.success(`Coupon ${res.coupon.code} applied!`);
        // Refresh cart calculations with coupon
        const freshCart = await cartApi.getCart();
        dispatch(setCart({ ...freshCart, couponCode: res.coupon.code, discount: res.coupon.discountType === 'PERCENTAGE' ? (freshCart.subtotal * res.coupon.discountValue) / 100 : res.coupon.discountValue }));
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid coupon code');
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleCheckout = () => {
    dispatch(toggleCartDrawer(false));
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => dispatch(toggleCartDrawer(false))}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface border-l border-border shadow-elevated flex flex-col z-10">
          {/* Drawer Header */}
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand" />
              <h2 className="text-base font-bold text-content-primary">Your Shopping Cart</h2>
              {cart?.items.length ? (
                <span className="text-xs bg-brand/10 text-brand px-2 py-0.5 rounded-full font-bold">
                  {cart.items.reduce((acc, i) => acc + i.quantity, 0)} items
                </span>
              ) : null}
            </div>
            <button
              onClick={() => dispatch(toggleCartDrawer(false))}
              className="p-1 text-content-muted hover:text-content-primary rounded-lg hover:bg-surface-hover"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {!cart || cart.items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center text-content-muted">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-content-primary">Your cart is currently empty</h3>
                <p className="text-xs text-content-muted max-w-xs">
                  Browse our high-performance tech, apparel, and workspace gear to add items.
                </p>
                <Button size="sm" onClick={() => { dispatch(toggleCartDrawer(false)); navigate('/products'); }}>
                  Explore Catalog
                </Button>
              </div>
            ) : (
              cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-surface border border-border rounded-xl shadow-card hover:border-brand/30 transition-all"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-border shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-content-primary truncate">{item.product.name}</h4>
                      <p className="text-[11px] font-semibold text-brand mt-0.5">{formatCurrency(item.price)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-lg overflow-hidden bg-surface-hover">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs font-bold text-content-primary hover:bg-surface transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-bold text-content-primary">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs font-bold text-content-primary hover:bg-surface transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-content-muted hover:text-status-danger p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Calculations */}
          {cart && cart.items.length > 0 && (
            <div className="p-5 border-t border-border bg-surface-hover/30 space-y-3">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-content-muted" />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. WELCOME10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="w-full pl-8 pr-2 py-1.5 bg-surface border border-border rounded-lg text-xs font-mono-custom text-content-primary uppercase focus:outline-none focus:border-brand"
                  />
                </div>
                <Button type="submit" size="sm" variant="outline" isLoading={isValidatingCoupon}>
                  Apply
                </Button>
              </form>

              {couponApplied && (
                <div className="flex items-center justify-between text-xs text-status-success font-semibold bg-status-success/10 p-2 rounded-lg border border-status-success/20">
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Coupon {couponApplied} Active
                  </span>
                  <span>Applied</span>
                </div>
              )}

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-content-secondary border-t border-border pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-content-primary">{formatCurrency(cart.subtotal)}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-status-success font-semibold">
                    <span>Discount</span>
                    <span>-{formatCurrency(cart.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span>{formatCurrency(cart.tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{cart.shippingFee === 0 ? 'FREE' : formatCurrency(cart.shippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-content-primary pt-2 border-t border-border">
                  <span>Grand Total</span>
                  <span className="text-brand">{formatCurrency(cart.total)}</span>
                </div>
              </div>

              <Button onClick={handleCheckout} className="w-full mt-2" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

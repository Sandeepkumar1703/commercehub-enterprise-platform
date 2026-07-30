import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Tag, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { cartApi } from './cart.api';
import { setCart } from './cartSlice';
import { couponApi } from '../coupon/coupon.api';
import { Button } from '../../shared/components/Button';
import { formatCurrency } from '../../core/utils/formatters';
import { useToast } from '../../shared/components/Toast';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { cart } = useAppSelector((state) => state.cart);

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState<string | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  const handleQuantityChange = async (itemId: string, newQty: number) => {
    try {
      const updatedCart = await cartApi.updateItemQuantity(itemId, newQty);
      dispatch(setCart(updatedCart));
    } catch {
      toast.error('Failed to update quantity.');
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      const updatedCart = await cartApi.removeItem(itemId);
      dispatch(setCart(updatedCart));
      toast.info('Item removed');
    } catch {
      toast.error('Failed to remove item');
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
        const freshCart = await cartApi.getCart();
        dispatch(setCart({ ...freshCart, couponCode: res.coupon.code, discount: res.coupon.discountType === 'PERCENTAGE' ? (freshCart.subtotal * res.coupon.discountValue) / 100 : res.coupon.discountValue }));
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid coupon code');
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center text-content-muted mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-h2 font-extrabold text-content-primary">Your Shopping Cart is Empty</h2>
        <p className="text-xs text-content-muted max-w-sm mx-auto">
          Explore our complete catalog of high-performance tech, apparel, and workspace furniture.
        </p>
        <Button onClick={() => navigate('/products')} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Start Shopping Catalog
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h1 className="text-h1 font-extrabold text-content-primary">Shopping Cart ({cart.items.length} items)</h1>
        <Link to="/products" className="text-xs font-bold text-brand hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-surface border border-border rounded-xl shadow-card"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg border border-border shrink-0"
                />
                <div>
                  <Link to={`/products/${item.product.id}`} className="text-xs font-bold text-content-primary hover:text-brand line-clamp-1">
                    {item.product.name}
                  </Link>
                  <p className="text-[10px] text-content-muted">{item.product.categoryName}</p>
                  <p className="text-xs font-bold text-brand mt-1">{formatCurrency(item.price)}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-border pt-2 sm:pt-0">
                <div className="flex items-center border border-border rounded-lg overflow-hidden bg-surface-hover">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="px-2.5 py-1 text-xs font-bold text-content-primary hover:bg-surface cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-content-primary">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-2.5 py-1 text-xs font-bold text-content-primary hover:bg-surface cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-xs font-extrabold text-content-primary">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-[10px] text-status-danger font-semibold hover:underline flex items-center gap-0.5 ml-auto cursor-pointer mt-0.5"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-card space-y-4">
            <h3 className="text-xs font-bold text-content-primary uppercase tracking-wider">Order Summary</h3>

            {/* Coupon Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-content-muted" />
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="w-full pl-8 pr-2 py-1.5 bg-surface-hover border border-border rounded-lg text-xs font-mono-custom text-content-primary uppercase focus:outline-none focus:border-brand"
                />
              </div>
              <Button type="submit" size="sm" variant="outline" isLoading={isValidatingCoupon}>
                Apply
              </Button>
            </form>

            {couponApplied && (
              <div className="flex items-center justify-between text-xs text-status-success font-semibold bg-status-success/10 p-2 rounded-lg border border-status-success/20">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Coupon {couponApplied} Applied
                </span>
              </div>
            )}

            <div className="space-y-2 text-xs text-content-secondary border-t border-border pt-4">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-content-primary">{formatCurrency(cart.subtotal)}</span>
              </div>
              {cart.discount > 0 && (
                <div className="flex justify-between text-status-success font-semibold">
                  <span>Promotional Discount</span>
                  <span>-{formatCurrency(cart.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span>{formatCurrency(cart.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & Handling</span>
                <span>{cart.shippingFee === 0 ? 'FREE' : formatCurrency(cart.shippingFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-content-primary pt-3 border-t border-border">
                <span>Grand Total</span>
                <span className="text-brand">{formatCurrency(cart.total)}</span>
              </div>
            </div>

            <Button onClick={() => navigate('/checkout')} className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

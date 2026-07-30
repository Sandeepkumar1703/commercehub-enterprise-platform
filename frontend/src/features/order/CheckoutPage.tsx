import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Truck, CheckCircle2, ShieldCheck, Plus, Tag, ArrowRight } from 'lucide-react';
import { addressApi } from '../profile/address.api';
import { orderApi } from './order.api';
import { cartApi } from '../cart/cart.api';
import { couponApi } from '../coupon/coupon.api';
import { Address, Cart, PaymentMethod } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { setCart } from '../cart/cartSlice';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Card } from '../../shared/components/Card';
import { Modal } from '../../shared/components/Modal';
import { formatCurrency } from '../../core/utils/formatters';
import { useToast } from '../../shared/components/Toast';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { cart } = useAppSelector((state) => state.cart);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CARD');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Address Form Modal
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZip, setNewZip] = useState('');
  const [newCountry, setNewCountry] = useState('USA');

  // Coupon
  const [couponCode, setCouponCode] = useState('');
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  useEffect(() => {
    addressApi.getAddresses().then((res) => {
      setAddresses(res);
      if (res.length > 0) {
        setSelectedAddressId(res[0].id);
      }
    });
  }, []);

  const handleCreateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await addressApi.createAddress({
        street: newStreet,
        city: newCity,
        state: newState,
        zipCode: newZip,
        postalCode: newZip,
        country: newCountry,
        isDefaultLanguage: addresses.length === 0,
      });
      setAddresses([...addresses, created]);
      setSelectedAddressId(created.id);
      setShowAddressModal(false);
      toast.success('Address added successfully');
    } catch {
      toast.error('Failed to save address');
    }
  };

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode || !cart) return;
    setIsValidatingCoupon(true);
    try {
      const res = await couponApi.validateCoupon(couponCode, cart.subtotal);
      if (res.valid && res.coupon) {
        toast.success(`Coupon ${res.coupon.code} applied!`);
        const freshCart = await cartApi.getCart();
        dispatch(
          setCart({
            ...freshCart,
            couponCode: res.coupon.code,
            discount:
              res.coupon.discountType === 'PERCENTAGE'
                ? (freshCart.subtotal * res.coupon.discountValue) / 100
                : res.coupon.discountValue,
          })
        );
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid coupon');
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error('Please select or add a shipping address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const order = await orderApi.createOrder({
        addressId: selectedAddressId,
        paymentMethod,
        couponCode: cart?.couponCode,
      });

      // Clear Redux Cart State
      const emptyCart = await cartApi.getCart();
      dispatch(setCart(emptyCart));

      toast.success('Order Placed Successfully!', `Order ID: ${order.orderNumber}`);
      navigate(`/orders/${order.id}/success`, { state: { order } });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-surface border border-border rounded-2xl text-center space-y-4">
        <h2 className="text-base font-bold text-content-primary">Your Cart is Empty</h2>
        <Button onClick={() => navigate('/products')}>Return to Catalog</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-border pb-4">
        <h1 className="text-h1 font-extrabold text-content-primary">Checkout & Order Review</h1>
        <p className="text-xs text-content-muted mt-0.5">Secure 256-bit encrypted enterprise order processing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Steps Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Shipping Address Selection */}
          <Card>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-content-primary">
                  <MapPin className="w-4 h-4 text-brand" />
                  <span>1. Select Shipping Address</span>
                </div>
                <Button size="sm" variant="outline" leftIcon={<Plus className="w-3.5 h-3.5" />} onClick={() => setShowAddressModal(true)}>
                  Add New
                </Button>
              </div>

              {addresses.length === 0 ? (
                <div className="p-4 text-xs text-content-muted text-center border border-dashed border-border rounded-xl">
                  No addresses found. Click "Add New" to enter shipping details.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-3.5 border rounded-xl cursor-pointer transition-all ${
                        selectedAddressId === addr.id
                          ? 'border-brand bg-brand/5 ring-1 ring-brand'
                          : 'border-border bg-surface hover:border-brand/40'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-content-primary">{addr.street}</span>
                        {selectedAddressId === addr.id && <CheckCircle2 className="w-4 h-4 text-brand" />}
                      </div>
                      <p className="text-[11px] text-content-muted mt-1">
                        {addr.city}, {addr.state} {addr.postalCode}, {addr.country}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Step 2: Payment Method */}
          <Card>
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-content-primary pb-3 border-b border-border">
                <CreditCard className="w-4 h-4 text-brand" />
                <span>2. Payment Gateway</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'CARD' as const, label: 'Credit Card' },
                  { id: 'PAYPAL' as const, label: 'PayPal' },
                  { id: 'CRYPTO' as const, label: 'Crypto Pay' },
                  { id: 'COD' as const, label: 'Cash on Delivery' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`p-3 border rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                      paymentMethod === pm.id
                        ? 'border-brand bg-brand text-brand-foreground shadow-sm'
                        : 'border-border bg-surface text-content-primary hover:border-brand/40'
                    }`}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Step 3: Order Items Preview */}
          <Card>
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-content-primary pb-3 border-b border-border">
                <Truck className="w-4 h-4 text-brand" />
                <span>3. Items in Order ({cart.items.length})</span>
              </div>

              <div className="divide-y divide-border">
                {cart.items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.imageUrl}
                        alt=""
                        className="w-12 h-12 object-cover rounded-lg border border-border"
                      />
                      <div>
                        <p className="text-xs font-bold text-content-primary">{item.product.name}</p>
                        <p className="text-[10px] text-content-muted">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-content-primary">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Summary Column */}
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-card space-y-4">
            <h3 className="text-xs font-bold text-content-primary uppercase tracking-wider">Payment Breakdown</h3>

            <div className="space-y-2 text-xs text-content-secondary border-t border-border pt-4">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-content-primary">{formatCurrency(cart.subtotal)}</span>
              </div>
              {cart.discount > 0 && (
                <div className="flex justify-between text-status-success font-semibold">
                  <span>Coupon Discount</span>
                  <span>-{formatCurrency(cart.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span>{formatCurrency(cart.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Express Shipping</span>
                <span>{cart.shippingFee === 0 ? 'FREE' : formatCurrency(cart.shippingFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-content-primary pt-3 border-t border-border">
                <span>Total Due</span>
                <span className="text-brand">{formatCurrency(cart.total)}</span>
              </div>
            </div>

            <Button onClick={handlePlaceOrder} className="w-full" isLoading={isSubmitting} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Place Order & Pay
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-content-muted pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-status-success" />
              <span>Guaranteed 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* Address Creation Modal */}
      <Modal isOpen={showAddressModal} onClose={() => setShowAddressModal(false)} title="Add Shipping Address">
        <form onSubmit={handleCreateAddress} className="space-y-3">
          <Input label="Street Address" placeholder="123 Corporate Blvd, Suite 400" value={newStreet} onChange={(e) => setNewStreet(e.target.value)} required />
          <div className="grid grid-cols-2 gap-2">
            <Input label="City" placeholder="San Francisco" value={newCity} onChange={(e) => setNewCity(e.target.value)} required />
            <Input label="State/Province" placeholder="CA" value={newState} onChange={(e) => setNewState(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input label="ZIP/Postal Code" placeholder="94105" value={newZip} onChange={(e) => setNewZip(e.target.value)} required />
            <Input label="Country" value={newCountry} onChange={(e) => setNewCountry(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full mt-2">
            Save Address
          </Button>
        </form>
      </Modal>
    </div>
  );
};

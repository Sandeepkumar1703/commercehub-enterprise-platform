import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, Plus } from 'lucide-react';
import { cartApi } from '../../api/cartApi';
import { orderApi } from '../../api/orderApi';
import { addressApi } from '../../api/addressApi';
import { CartItem, Address, PaymentMethod } from '../../types';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | number>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CREDIT_CARD');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartRes = await cartApi.getCart();
        const cartData = (cartRes as any)?.data ?? cartRes;
        const itemsList = Array.isArray(cartData) ? cartData : (cartData?.items || []);
        setCartItems(itemsList);

        const addrRes = await addressApi.getAddresses();
        const addrData = (addrRes as any)?.data ?? addrRes;
        const addrList = Array.isArray(addrData) ? addrData : [];
        setAddresses(addrList);
        if (addrList.length > 0) {
          const defaultAddr = addrList.find((a: Address) => a.isDefault) || addrList[0];
          setSelectedAddressId(defaultAddr.id);
        }
      } catch (err: any) {
        setError(err?.message || 'Error loading checkout parameters');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.unitPrice ?? item.price ?? 0) * (item.quantity || 1),
    0
  );

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setError('Your shopping cart is empty.');
      return;
    }

    const selectedAddress = addresses.find((a) => String(a.id) === String(selectedAddressId));
    if (!selectedAddress) {
      setError('Please select or add a delivery address before proceeding.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          productTitle: item.productName || item.productTitle,
          productImage: item.imageUrl || item.productImage,
          price: item.unitPrice ?? item.price ?? 0,
          quantity: item.quantity || 1,
          sellerId: item.sellerId,
        })),
        shippingAddress: {
          id: selectedAddress.id,
          fullName: selectedAddress.fullName,
          street: selectedAddress.addressLine1 || selectedAddress.street || '',
          addressLine1: selectedAddress.addressLine1 || selectedAddress.street || '',
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.postalCode || selectedAddress.zipCode || '',
          postalCode: selectedAddress.postalCode || selectedAddress.zipCode || '',
          country: selectedAddress.country,
          phone: selectedAddress.phoneNumber || selectedAddress.phone || '',
          phoneNumber: selectedAddress.phoneNumber || selectedAddress.phone || '',
        },
        paymentMethod,
        totalAmount,
      };

      const res = await orderApi.createOrder(orderPayload);
      const resData = (res as any)?.data ?? res;
      if (resData && (resData.id || resData.orderId)) {
        await cartApi.clearCart();
        navigate(`/order-success/${resData.id || resData.orderId}`);
      } else {
        setError((res as any)?.message || 'Failed to complete order');
      }
    } catch (err: any) {
      setError(err?.message || 'Order processing error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader text="Preparing secure checkout gateway..." />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Secure Order Checkout</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Complete payment authorization and verify shipping details.
        </p>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address Selection */}
          <div className="card-surface p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Truck className="w-4 h-4 text-purple-600" /> 1. Select Shipping Destination
              </h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate('/addresses')}
                icon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Address
              </Button>
            </div>

            {addresses.length > 0 ? (
              <div className="space-y-2">
                {addresses.map((addr) => {
                  const streetLine = addr.addressLine1 || addr.street || '';
                  const zip = addr.postalCode || addr.zipCode || '';
                  const phoneNum = addr.phoneNumber || addr.phone || '';

                  return (
                    <label
                      key={addr.id}
                      className={`block p-4 rounded-xl border cursor-pointer transition-all ${
                        String(selectedAddressId) === String(addr.id)
                          ? 'border-purple-600 bg-purple-50/50 dark:bg-purple-950/30 ring-1 ring-purple-600'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="address"
                          checked={String(selectedAddressId) === String(addr.id)}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="accent-purple-600"
                        />
                        <div className="text-xs">
                          <span className="font-bold text-slate-900 dark:text-slate-100">{addr.fullName}</span>
                          <p className="text-slate-500 mt-0.5">{streetLine}, {addr.city}, {addr.state} {zip}</p>
                          {phoneNum && <p className="text-slate-400 font-mono text-[11px] mt-0.5">{phoneNum}</p>}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-2">
                <p className="text-xs text-slate-500">No saved shipping addresses found.</p>
                <Button size="sm" onClick={() => navigate('/addresses')}>
                  Add Address
                </Button>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="card-surface p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-600" /> 2. Choose Payment Option
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'CREDIT_CARD', label: 'Credit / Debit Card' },
                { id: 'PAYPAL', label: 'PayPal Gateway' },
                { id: 'STRIPE', label: 'Stripe Pay' },
                { id: 'CASH_ON_DELIVERY', label: 'Cash On Delivery' },
              ].map((pm) => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setPaymentMethod(pm.id as PaymentMethod)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    paymentMethod === pm.id
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {pm.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="card-surface p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
            Order Review
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cartItems.map((item) => {
              const itemId = item.cartItemId || item.id || item.productId;
              const title = item.productName || item.productTitle || 'Cart Item';
              const price = item.unitPrice ?? item.price ?? 0;
              const qty = item.quantity || 1;

              return (
                <div key={itemId} className="flex justify-between items-center text-xs">
                  <div className="truncate max-w-[150px]">
                    <p className="font-bold text-slate-800 dark:text-slate-200 truncate">{title}</p>
                    <p className="text-slate-400">Qty: {qty}</p>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">${(price * qty).toFixed(2)}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Fulfillment Fee</span>
              <span className="text-emerald-600 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-sm font-black text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Total Payable</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <Button onClick={handlePlaceOrder} loading={submitting} className="w-full mt-4" icon={<ShieldCheck className="w-4 h-4" />}>
            Confirm & Pay Order
          </Button>
        </div>
      </div>
    </div>
  );
};

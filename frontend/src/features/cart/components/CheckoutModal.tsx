import React, { useState } from 'react';
import { useApp } from '../../../app/store/store';
import { Modal } from '../../../shared/components/Modal';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { CreditCard, Truck, CheckCircle2, ShieldCheck, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

export const CheckoutModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { cart, placeOrder, setCartOpen, setCustomerView, setSelectedOrderId } = useApp();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [shippingInfo, setShippingInfo] = useState({
    fullName: 'Sarah Jenkins',
    street: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zip: '97477',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'paypal' | 'klarna'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('123');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = +(subtotal * 0.08).toFixed(2);
  const shipping = subtotal > 100 ? 0 : 15.00;
  const total = +(subtotal + tax + shipping).toFixed(2);

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const newOrder = placeOrder(shippingInfo, paymentMethod === 'card' ? `Credit Card (${cardNumber})` : paymentMethod.toUpperCase());
      setSelectedOrderId(newOrder.id);
      onClose();
      setCartOpen(false);
      setCustomerView('account');
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="xl"
      title={
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          <span>CommerceHub Checkout</span>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 text-xs font-bold">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-[10px]">1</span>
            <span>1. Shipping Address</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-[10px]">2</span>
            <span>2. Payment Details</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-[10px]">3</span>
            <span>3. Order Review</span>
          </div>
        </div>

        {/* STEP 1: Shipping Information */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-600" /> Delivery Address
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Full Name"
                value={shippingInfo.fullName}
                onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
              />
              <Input
                label="Street Address"
                value={shippingInfo.street}
                onChange={(e) => setShippingInfo({ ...shippingInfo, street: e.target.value })}
              />
              <Input
                label="City"
                value={shippingInfo.city}
                onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="State"
                  value={shippingInfo.state}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                />
                <Input
                  label="Zip Code"
                  value={shippingInfo.zip}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={() => setStep(2)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Payment Details */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-600" /> Payment Gateway
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                { id: 'applepay', label: 'Apple Pay', icon: '🍎' },
                { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                { id: 'klarna', label: 'Klarna Pay Later', icon: '🛍️' }
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`p-3 rounded-xl border flex items-center gap-2 font-semibold transition-all ${
                    paymentMethod === method.id ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300' : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span>{method.icon}</span>
                  <span>{method.label}</span>
                </button>
              ))}
            </div>

            {paymentMethod === 'card' && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-3">
                <Input
                  label="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  prefixIcon={<CreditCard className="w-4 h-4" />}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Expiry Date"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                  />
                  <Input
                    label="CVC Security"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="123"
                  />
                </div>
              </div>
            )}

            <div className="pt-4 flex justify-between">
              <Button variant="ghost" onClick={() => setStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button onClick={() => setStep(3)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Review Order Summary
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Order Review */}
        {step === 3 && (
          <div className="space-y-4 text-xs">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Review & Authorize Order</h4>

            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl space-y-2">
              <div className="flex justify-between font-medium text-slate-500">
                <span>Shipping To:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{shippingInfo.fullName}, {shippingInfo.street}, {shippingInfo.city}</span>
              </div>
              <div className="flex justify-between font-medium text-slate-500">
                <span>Payment Method:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{paymentMethod.toUpperCase()}</span>
              </div>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-3 space-y-2 divide-y divide-slate-100 dark:divide-slate-800">
              {cart.map((item, idx) => (
                <div key={idx} className="pt-2 first:pt-0 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={item.product.images[0]} alt="" className="w-8 h-8 rounded object-cover" />
                    <span className="font-medium text-slate-900 dark:text-slate-100">{item.product.title} (x{item.quantity})</span>
                  </div>
                  <span className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl space-y-1 text-slate-600 dark:text-slate-300">
              <div className="flex justify-between"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Taxes (8%):</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping:</span><span>${shipping.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-slate-100 pt-1 border-t border-indigo-200 dark:border-indigo-800">
                <span>Final Order Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="ghost" onClick={() => setStep(2)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button
                variant="primary"
                loading={loading}
                onClick={handlePlaceOrder}
                leftIcon={<Lock className="w-4 h-4" />}
              >
                Authorize & Pay ${total.toFixed(2)}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

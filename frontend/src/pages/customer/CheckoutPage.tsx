import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../core/router/Router';
import { ROUTES } from '../../theme/routes';
import {
  CreditCard,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, shippingFee, taxAmount, totalAmount, placeOrder } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { navigate } = useRouter();

  const [step, setStep] = useState<number>(1);
  const [street, setStreet] = useState('123 Technology Way');
  const [city, setCity] = useState('San Francisco');
  const [state, setState] = useState('CA');
  const [zip, setZip] = useState('94105');
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'UPI' | 'PAYPAL'>('CARD');

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] mx-auto">
          <ShoppingBag className="w-8 h-8 stroke-1" />
        </div>
        <h2 className="text-lg font-bold text-[var(--text-primary)]">
          Your cart is empty
        </h2>
        <p className="text-xs text-[var(--text-secondary)]">
          Please add items to your shopping cart before proceeding to checkout.
        </p>
        <button
          onClick={() => navigate(ROUTES.PRODUCTS)}
          className="px-5 py-2.5 bg-[var(--brand-primary)] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[var(--brand-hover)] transition-all"
        >
          {t('home.hero.shopBtn')}
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderObj = placeOrder(
      {
        name: `${user?.firstName || 'Customer'} ${user?.lastName || 'User'}`,
        street,
        city,
        state,
        zip,
      },
      paymentMethod
    );
    navigate(`${ROUTES.ORDER_SUCCESS}/${orderObj.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">
          {t('checkout.title')}
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Complete your enterprise transaction using Spring Boot order processing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Form Stepper */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step 1: Address Details */}
          <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-default)] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--brand-primary)] text-white text-xs flex items-center justify-center">
                1
              </span>
              <span>{t('checkout.step1')}</span>
            </h3>

            <div className="grid grid-cols-1 gap-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-[var(--text-primary)] uppercase">
                  {t('checkout.street')}
                </label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[var(--text-primary)] uppercase">
                    {t('checkout.city')}
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[var(--text-primary)] uppercase">
                    {t('checkout.state')}
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[var(--text-primary)] uppercase">
                    {t('checkout.zip')}
                  </label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-primary)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Payment Selection */}
          <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-default)] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--brand-primary)] text-white text-xs flex items-center justify-center">
                2
              </span>
              <span>{t('checkout.step3')}</span>
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('CARD')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-2 cursor-pointer ${
                  paymentMethod === 'CARD'
                    ? 'border-[var(--brand-primary)] bg-[var(--bg-surface-raised)] text-[var(--brand-primary)]'
                    : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--brand-primary)]'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>{t('checkout.paymentCard')}</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-2 cursor-pointer ${
                  paymentMethod === 'UPI'
                    ? 'border-[var(--brand-primary)] bg-[var(--bg-surface-raised)] text-[var(--brand-primary)]'
                    : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--brand-primary)]'
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span>{t('checkout.paymentUpi')}</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('PAYPAL')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-2 cursor-pointer ${
                  paymentMethod === 'PAYPAL'
                    ? 'border-[var(--brand-primary)] bg-[var(--bg-surface-raised)] text-[var(--brand-primary)]'
                    : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--brand-primary)]'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span>{t('checkout.paymentPaypal')}</span>
              </button>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full py-4 bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{t('btn.placeOrder')} (${totalAmount.toFixed(2)})</span>
          </button>

        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-default)] shadow-xs space-y-4 h-fit">
          <h3 className="text-sm font-extrabold text-[var(--text-primary)] border-b border-[var(--border-default)] pb-3">
            {t('checkout.step4')}
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-[var(--border-default)] pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="pt-2 first:pt-0 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-[var(--text-primary)] line-clamp-1">{item.product.name}</p>
                  <p className="text-[10px] text-[var(--text-secondary)]">Qty: {item.quantity}</p>
                </div>
                <span className="font-bold text-[var(--text-primary)]">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs border-t border-[var(--border-default)] pt-4">
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>{t('cart.subtotal')}</span>
              <span className="font-semibold text-[var(--text-primary)]">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>{t('cart.shipping')}</span>
              <span>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>{t('cart.tax')}</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-[var(--text-primary)] pt-2 border-t border-[var(--border-default)]">
              <span>{t('cart.total')}</span>
              <span className="text-indigo-600 dark:text-indigo-400">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../../app/store/store';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import {
  Package, MapPin, CreditCard, Heart, Bell, Printer,
  CheckCircle2, Clock, Truck, ShieldCheck, ArrowRight, ExternalLink
} from 'lucide-react';

export const CustomerAccount: React.FC = () => {
  const { orders, wishlist, products, addToCart, currentUser, setSystemView, setPortal } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist' | 'notifications'>('orders');

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'placed': return 1;
      case 'processing': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Account Profile Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center border-2 border-white/20">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">{currentUser.name}</h1>
            <p className="text-xs text-indigo-200">{currentUser.email} • Verified CommerceHub Customer</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs bg-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-md">
          <div>
            <p className="font-bold text-slate-100">{orders.length} Total Orders</p>
            <p className="text-[10px] text-slate-300">Lifetime Purchases</p>
          </div>
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 sm:gap-6 text-xs sm:text-sm font-bold overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-1 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'orders' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className="w-4 h-4" /> Orders & Tracking ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 px-1 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'wishlist' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Heart className="w-4 h-4" /> Wishlist ({wishlistedProducts.length})
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 px-1 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'addresses' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MapPin className="w-4 h-4" /> Saved Addresses
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`pb-3 px-1 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'notifications' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bell className="w-4 h-4" /> Notifications
        </button>
      </div>

      {/* TAB 1: Orders & Timeline Tracking */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.map((order) => {
            const currentStep = getStatusStep(order.status);

            return (
              <div key={order.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
                  <div>
                    <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100 mr-2">Order #{order.id}</span>
                    <span className="text-slate-400">Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={order.status === 'delivered' ? 'success' : 'warning'} size="md">
                      Status: {order.status.toUpperCase()}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Printer className="w-3.5 h-3.5" />}
                      onClick={() => {
                        setPortal('system');
                        setSystemView('invoice');
                      }}
                    >
                      Print Invoice
                    </Button>
                  </div>
                </div>

                {/* Interactive Status Tracking Bar */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl space-y-3">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    Carrier Tracking: <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{order.trackingNumber || 'TRK-9920148'}</span> ({order.carrier || 'FedEx Express'})
                  </p>
                  <div className="relative flex items-center justify-between text-[11px] font-bold">
                    {[
                      { step: 1, label: 'Order Placed' },
                      { step: 2, label: 'Processing' },
                      { step: 3, label: 'Shipped Out' },
                      { step: 4, label: 'Delivered' }
                    ].map(s => (
                      <div key={s.step} className="flex flex-col items-center gap-1 z-10">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                          s.step <= currentStep ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                        }`}>
                          {s.step <= currentStep ? '✓' : s.step}
                        </div>
                        <span className={s.step <= currentStep ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}>
                          {s.label}
                        </span>
                      </div>
                    ))}
                    {/* Connecting line */}
                    <div className="absolute top-3.5 left-6 right-6 h-0.5 bg-slate-200 dark:bg-slate-700 -z-0" />
                  </div>
                </div>

                {/* Order Item List */}
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {order.items.map((item, i) => (
                    <div key={i} className="py-3 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-800" />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-slate-100">{item.title}</p>
                          <p className="text-slate-400">Qty: {item.quantity} • ${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer Total */}
                <div className="pt-2 flex justify-between items-center text-xs border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Payment: {order.paymentMethod}</span>
                  <span className="text-sm font-black text-slate-900 dark:text-slate-100">Total: ${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: Wishlist Grid */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base">Your Saved Items</h3>
            {wishlistedProducts.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => wishlistedProducts.forEach(p => addToCart(p, 1))}
              >
                Move All to Cart
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlistedProducts.map(p => (
              <div key={p.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex gap-3 items-center">
                <img src={p.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0 text-xs">
                  <p className="font-bold truncate">{p.title}</p>
                  <p className="font-extrabold text-indigo-600 mt-1">${p.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(p, 1)}
                    className="mt-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 border-2 border-indigo-600 rounded-2xl p-5 space-y-3 relative text-xs">
            <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold text-[10px] uppercase">Default Shipping</span>
            <h4 className="font-bold text-sm">Sarah Jenkins</h4>
            <p className="text-slate-500">742 Evergreen Terrace<br />Springfield, OR 97477<br />United States</p>
          </div>
        </div>
      )}

      {/* TAB 4: Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
          <h3 className="font-bold text-sm">Communication Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span>Order status updates via SMS & Email</span>
              <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Promotional sales & personalized deals</span>
              <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAccount;

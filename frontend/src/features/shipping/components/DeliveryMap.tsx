import React, { useState } from 'react';
import { MapPin, Navigation, Truck, Package, CheckCircle2, Bell, ShieldCheck } from 'lucide-react';
import { useToast } from '../../../shared/components/Toast';

interface DeliveryMapProps {
  orderId: string;
  trackingNumber: string;
  carrier: string;
  status: string;
}

export const DeliveryMap: React.FC<DeliveryMapProps> = ({ orderId, trackingNumber, carrier, status }) => {
  const toast = useToast();
  const [pushEnabled, setPushEnabled] = useState(false);

  const checkpoints = [
    { label: 'Order Dispatched', location: 'CommerceHub Fulfillment Hub, SF', time: 'Yesterday, 09:30 AM', done: true },
    { label: 'In Transit Across Hubs', location: 'Sort Facility, Oakland, CA', time: 'Yesterday, 08:15 PM', done: true },
    { label: 'Out for Delivery', location: 'Local Delivery Hub', time: 'Today, 07:00 AM', done: status === 'DELIVERED' || status === 'OUT_FOR_DELIVERY' },
    { label: 'Delivered', location: 'Customer Residence / Address', time: 'Estimated Today, 02:00 PM', done: status === 'DELIVERED' },
  ];

  const handleEnablePush = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setPushEnabled(true);
          toast.success('Live Order Notifications Enabled!', `You will receive push updates for Order #${orderId}`);
          new Notification(`CommerceHub Order #${orderId}`, {
            body: `Subscribed to live tracking notifications for shipment ${trackingNumber}.`,
            icon: '/icon.png',
          });
        } else {
          toast.info('Notification permission declined.');
        }
      });
    } else {
      toast.info('Browser does not support Web Push Notifications.');
    }
  };

  return (
    <div className="bg-surface border border-border/80 rounded-2xl p-6 shadow-card space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand/10 text-brand font-bold text-xs">
              <Truck className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-extrabold text-content-primary">Live Dispatch & Logistics Map</h3>
          </div>
          <p className="text-xs text-content-muted mt-1">
            Carrier: <strong className="text-content-primary">{carrier}</strong> • Tracking #: <strong className="text-brand font-mono">{trackingNumber}</strong>
          </p>
        </div>

        <button
          onClick={handleEnablePush}
          disabled={pushEnabled}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
            pushEnabled
              ? 'bg-status-success/10 text-status-success border border-status-success/30'
              : 'bg-surface-hover text-content-primary border border-border/80 hover:border-brand/40 hover:text-brand'
          }`}
        >
          {pushEnabled ? <ShieldCheck className="w-4 h-4" /> : <Bell className="w-4 h-4 text-amber-500" />}
          <span>{pushEnabled ? 'Live Push Alerts Active' : 'Enable Live Push Alerts'}</span>
        </button>
      </div>

      {/* SVG Interactive Delivery Route Map Graphic */}
      <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-white/10 overflow-hidden p-4 shadow-inner">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Route Curved Vector Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-brand" viewBox="0 0 500 180" fill="none">
          <path
            d="M 50 120 Q 200 30, 450 100"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
        </svg>

        {/* Hub Nodes */}
        <div className="absolute top-[105px] left-[40px] flex flex-col items-center group">
          <div className="w-7 h-7 rounded-full bg-status-success text-white flex items-center justify-center shadow-lg border-2 border-slate-900">
            <Package className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-bold text-slate-300 mt-1">Origin SF</span>
        </div>

        {/* Transit Vehicle Node */}
        <div className="absolute top-[35px] left-[210px] flex flex-col items-center animate-bounce">
          <div className="w-9 h-9 rounded-full bg-brand text-brand-foreground flex items-center justify-center shadow-2xl border-2 border-white/20">
            <Truck className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-extrabold text-amber-300 bg-slate-950/80 px-2 py-0.5 rounded-full border border-amber-300/30 mt-1">
            In Transit
          </span>
        </div>

        {/* Destination Pin */}
        <div className="absolute top-[85px] right-[40px] flex flex-col items-center">
          <div className="w-7 h-7 rounded-full bg-status-danger text-white flex items-center justify-center shadow-lg border-2 border-slate-900">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-bold text-slate-300 mt-1">Destination</span>
        </div>
      </div>

      {/* Checkpoints Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
        {checkpoints.map((cp, idx) => (
          <div key={idx} className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  cp.done ? 'bg-status-success text-white' : 'bg-surface-hover text-content-muted border'
                }`}
              >
                {cp.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
              </div>
              <span className={`text-xs font-bold ${cp.done ? 'text-content-primary' : 'text-content-muted'}`}>
                {cp.label}
              </span>
            </div>
            <p className="text-[10px] text-content-muted pl-7">{cp.location}</p>
            <p className="text-[9px] font-semibold text-brand pl-7">{cp.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

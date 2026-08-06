import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Truck, MapPin, CheckCircle, Clock, Navigation, RefreshCw, ArrowLeft, Search } from 'lucide-react';
import { shippingApi } from '../../api/shippingApi';
import { ShippingDetails } from '../../types';

export const ShipmentTracking: React.FC = () => {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const [query, setQuery] = useState(trackingNumber || '');
  const [shipment, setShipment] = useState<ShippingDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const performTrack = async (num: string) => {
    if (!num) return;
    setLoading(true);
    try {
      const detailRes = await shippingApi.getShippingDetails(num);
      const detailData = (detailRes as any)?.data ?? detailRes;
      if (detailData && (detailData.id || detailData.trackingNumber)) {
        setShipment(detailData);
        return;
      }
      const res = await shippingApi.getShippingList();
      const resData = (res as any)?.data ?? res;
      const list = Array.isArray(resData) ? resData : Array.isArray(resData?.content) ? resData.content : [];
      if (list.length > 0) {
        const match = list.find(
          (s: any) => (s.trackingNumber && s.trackingNumber.toLowerCase() === num.toLowerCase()) || String(s.id) === num
        );
        setShipment(match || list[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trackingNumber) {
      performTrack(trackingNumber);
    }
  }, [trackingNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performTrack(query);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to="/shipping/list"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[var(--vynk-brand)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Shipments
      </Link>

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
          <Truck className="w-7 h-7 text-[var(--vynk-brand)]" /> Real-Time Package Tracker
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Enter waybill number or tracking ID to see live transit coordinates
        </p>
      </div>

      {/* Tracker Form */}
      <form onSubmit={handleSearch} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="e.g. TRK-881290..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--vynk-brand)]"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 bg-[var(--vynk-brand)] hover:bg-[var(--vynk-brand-hover)] text-white font-bold rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />} Track Package
        </button>
      </form>

      {/* Tracking Visualization */}
      {shipment && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400">Carrier Partner</span>
              <p className="text-base font-black text-slate-900 dark:text-white">{shipment.carrier} Logistics</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400">Est. Delivery Date</span>
              <p className="text-base font-black text-[var(--vynk-brand)]">{shipment.estimatedDelivery}</p>
            </div>
          </div>

          {/* Interactive Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-extrabold text-slate-700 dark:text-slate-300">
              <span>Origin Facility</span>
              <span>In Transit Hub</span>
              <span>Out for Delivery</span>
              <span>Delivered</span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-[var(--vynk-brand)] rounded-full transition-all duration-500"
                style={{
                  width:
                    shipment.status === 'DELIVERED'
                      ? '100%'
                      : shipment.status === 'OUT_FOR_DELIVERY'
                      ? '75%'
                      : shipment.status === 'SHIPPED'
                      ? '40%'
                      : '20%',
                }}
              />
            </div>
          </div>

          {/* Map Simulation Banner */}
          <div className="h-48 bg-slate-800 rounded-2xl relative overflow-hidden flex items-center justify-center p-6 text-white text-center border border-slate-700">
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
            <div className="relative z-10 space-y-2">
              <div className="inline-flex p-3 bg-[var(--vynk-brand)] backdrop-blur rounded-2xl text-white animate-bounce">
                <Truck className="w-6 h-6" />
              </div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">GPS Live Telemetry Sync Active</p>
              <p className="text-xs text-slate-300 max-w-sm">
                Destination: {shipment.address}
              </p>
            </div>
          </div>

          {/* Checkpoint Updates */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
              Transit Log Entries
            </h3>
            <div className="space-y-2">
              {shipment.updates?.map((u, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[var(--vynk-brand)]" />
                    <span className="font-bold text-slate-900 dark:text-white">{u.status}</span>
                    <span className="text-slate-400">• {u.location}</span>
                  </div>
                  <span className="text-slate-400 text-[10px]">{new Date(u.timestamp).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

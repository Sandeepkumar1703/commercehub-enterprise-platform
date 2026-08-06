import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Truck,
  ArrowLeft,
  MapPin,
  Clock,
  CheckCircle,
  Building,
  Navigation,
  FileText,
  Send,
} from 'lucide-react';
import { shippingApi } from '../../api/shippingApi';
import { ShippingDetails } from '../../types';

export const ShipmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [shipment, setShipment] = useState<ShippingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdate, setStatusUpdate] = useState('');

  useEffect(() => {
    if (id) {
      shippingApi
        .getShippingDetails(id)
        .then((res) => {
          const data = (res as any)?.data ?? res;
          if (data && (data.id || data.trackingNumber)) {
            setShipment(data);
          } else {
            return shippingApi.getShippingList();
          }
        })
        .then((res: any) => {
          if (!res) return;
          const listData = (res as any)?.data ?? res;
          const list = Array.isArray(listData) ? listData : [];
          const found = list.find((s: any) => s.id === id || s.trackingNumber === id);
          if (found) setShipment(found);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleUpdateStatus = async () => {
    if (!shipment || !statusUpdate.trim()) return;
    try {
      const res = await shippingApi.updateShippingStatus(shipment.id, statusUpdate.trim());
      const data = (res as any)?.data ?? res;
      if (data) {
        setShipment(typeof data === 'object' && data.id ? data : { ...shipment, status: statusUpdate.trim() });
        setStatusUpdate('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-medium">Loading shipment record...</div>;
  }

  if (!shipment) {
    return <div className="p-8 text-center text-rose-500 font-medium">Shipment details not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to="/shipping/list"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[var(--vynk-brand)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Shipment List
      </Link>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] rounded-2xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                Waybill #{shipment.trackingNumber}
              </h1>
              <p className="text-xs text-slate-400">Order Ref: {shipment.orderId}</p>
            </div>
          </div>

          <Link
            to={`/shipping/tracking/${shipment.trackingNumber}`}
            className="px-4 py-2 bg-[var(--vynk-brand)] hover:bg-[var(--vynk-brand-hover)] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" /> Live Map Tracking
          </Link>
        </div>

        {/* Carrier Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
            <span className="text-slate-400 font-medium">Carrier Partner</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{shipment.carrier}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
            <span className="text-slate-400 font-medium">Current Status</span>
            <p className="font-bold text-[var(--vynk-brand)] text-sm">{shipment.status}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
            <span className="text-slate-400 font-medium">Est. Delivery Date</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{shipment.estimatedDelivery}</p>
          </div>
        </div>

        {/* Address */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1 text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-rose-500" /> Delivery Address
          </span>
          <p className="font-bold text-slate-900 dark:text-white">{shipment.address}</p>
        </div>

        {/* Dispatch Update Action */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
            Post Logistics Update
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. OUT_FOR_DELIVERY, IN_TRANSIT_HUB_CHICAGO, DELIVERED..."
              value={statusUpdate}
              onChange={(e) => setStatusUpdate(e.target.value)}
              className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--vynk-brand)] text-slate-900 dark:text-white"
            />
            <button
              onClick={handleUpdateStatus}
              className="px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Update
            </button>
          </div>
        </div>

        {/* History Trail */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
            Tracking Event Timeline
          </h2>
          <div className="space-y-3 relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 pl-4">
            {shipment.updates && shipment.updates.length > 0 ? (
              shipment.updates.map((u, i) => (
                <div key={i} className="relative space-y-1">
                  <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-[var(--vynk-brand)] border-2 border-white dark:border-slate-900" />
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{u.status}</p>
                  <p className="text-[11px] text-slate-500">{u.location} • {new Date(u.timestamp).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">No milestone events logged yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Search, Filter, CheckCircle, Clock, Eye, AlertCircle, MapPin, RefreshCw, Plus } from 'lucide-react';
import { shippingApi } from '../../api/shippingApi';
import { ShippingDetails } from '../../types';

export const ShipmentList: React.FC = () => {
  const [shipments, setShipments] = useState<ShippingDetails[]>([]);
  const [filtered, setFiltered] = useState<ShippingDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [carrierFilter, setCarrierFilter] = useState('ALL');

  const fetchShipments = async () => {
    setLoading(true);
    try {
      const res = await shippingApi.getShippingList();
      const resData = (res as any)?.data ?? res;
      let list: ShippingDetails[] = [];
      if (Array.isArray(resData)) {
        list = resData;
      } else if (resData && Array.isArray(resData.content)) {
        list = resData.content;
      }
      setShipments(list);
      setFiltered(list);
    } catch {
      setShipments([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  useEffect(() => {
    let result = [...shipments];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (s) =>
          s.trackingNumber.toLowerCase().includes(term) ||
          s.orderId.toLowerCase().includes(term) ||
          s.carrier.toLowerCase().includes(term) ||
          s.address.toLowerCase().includes(term)
      );
    }
    if (carrierFilter !== 'ALL') {
      result = result.filter((s) => s.carrier === carrierFilter);
    }
    setFiltered(result);
  }, [searchTerm, carrierFilter, shipments]);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await shippingApi.updateShippingStatus(id, status);
      fetchShipments();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Truck className="w-6 h-6 text-[var(--vynk-brand)]" /> Logistics & Shipment Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Dispatch manifests, carrier tracking numbers, and delivery status updates
          </p>
        </div>
        <button
          onClick={fetchShipments}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all"
        >
          <RefreshCw className="w-4 h-4" /> Refresh Shipments
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Tracking #, Order ID, Address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[var(--vynk-brand)] text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={carrierFilter}
            onChange={(e) => setCarrierFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none text-slate-800 dark:text-slate-200"
          >
            <option value="ALL">All Carriers</option>
            <option value="FedEx">FedEx</option>
            <option value="UPS">UPS</option>
            <option value="DHL Express">DHL Express</option>
            <option value="USPS">USPS</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Tracking #</th>
                <th className="p-4">Order ID</th>
                <th className="p-4">Carrier</th>
                <th className="p-4">Destination Address</th>
                <th className="p-4">Status</th>
                <th className="p-4">Est. Delivery</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    Loading shipments...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No shipments found.
                  </td>
                </tr>
              ) : (
                filtered.map((ship) => (
                  <tr key={ship.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                      {ship.trackingNumber}
                    </td>
                    <td className="p-4 font-medium text-slate-600 dark:text-slate-300">
                      <Link to={`/order/details/${ship.orderId}`} className="text-[var(--vynk-brand)] hover:underline">
                        {ship.orderId}
                      </Link>
                    </td>
                    <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                      {ship.carrier}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                      {ship.address}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold shadow-xs ${
                        ship.status === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-950/90 dark:text-emerald-200 dark:border-emerald-700/80'
                          : ship.status === 'IN_TRANSIT' || ship.status === 'SHIPPED'
                          ? 'bg-sky-100 text-sky-900 border border-sky-300 dark:bg-sky-950/90 dark:text-sky-200 dark:border-sky-700/80'
                          : 'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/90 dark:text-amber-200 dark:border-amber-700/80'
                      }`}>
                        {ship.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 dark:text-slate-400">
                      {ship.estimatedDelivery}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        to={`/shipping/details/${ship.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" /> Details
                      </Link>
                      <Link
                        to={`/shipping/tracking/${ship.trackingNumber}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] hover:bg-[var(--vynk-brand)]/20 rounded-lg text-xs font-semibold transition-all"
                      >
                        <MapPin className="w-3.5 h-3.5" /> Live Track
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

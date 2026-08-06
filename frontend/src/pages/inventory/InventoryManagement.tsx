import React, { useEffect, useState } from 'react';
import {
  Boxes,
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Edit2,
  PackageCheck,
  TrendingDown,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { inventoryApi } from '../../api/inventoryApi';
import { InventoryRecord } from '../../types';

export const InventoryManagement: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryRecord[]>([]);
  const [filtered, setFiltered] = useState<InventoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [selectedProduct, setSelectedProduct] = useState<InventoryRecord | null>(null);
  const [editStockValue, setEditStockValue] = useState<number>(0);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await inventoryApi.getInventory();
      const dataList = (res as any)?.data || res;
      if (Array.isArray(dataList)) {
        const formatted: InventoryRecord[] = dataList.map((item: any) => {
          const qty = item.quantity ?? item.stock ?? item.availableQuantity ?? 0;
          return {
            productId: item.productId,
            productName: item.productName || item.title || `Product #${item.productId}`,
            title: item.productName || item.title || `Product #${item.productId}`,
            sku: item.sku || `SKU-${item.productId}`,
            quantity: qty,
            stock: qty,
            reserved: item.reserved ?? 0,
            availableQuantity: item.availableQuantity ?? qty,
            status: item.status || (qty > 10 ? 'HEALTHY' : qty > 0 ? 'LOW_STOCK' : 'OUT_OF_STOCK'),
          };
        });
        setInventory(formatted);
        setFiltered(formatted);
      } else {
        setInventory([]);
        setFiltered([]);
      }
    } catch (err) {
      setInventory([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    let result = [...inventory];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(term) ||
          i.sku.toLowerCase().includes(term) ||
          i.productId.toLowerCase().includes(term)
      );
    }
    if (statusFilter !== 'ALL') {
      result = result.filter((i) => i.status === statusFilter);
    }
    setFiltered(result);
  }, [searchTerm, statusFilter, inventory]);

  const handleFetchSingle = async (productId: string | number) => {
    try {
      const res = await inventoryApi.getInventoryByProductId(productId);
      const data = (res as any)?.data || res;
      if (data && data.productId !== undefined) {
        const qty = data.quantity ?? data.stock ?? data.availableQuantity ?? 0;
        const record: InventoryRecord = {
          productId: data.productId,
          productName: data.productName || data.title || `Product #${data.productId}`,
          title: data.productName || data.title || `Product #${data.productId}`,
          sku: data.sku || `SKU-${data.productId}`,
          quantity: qty,
          stock: qty,
          reserved: data.reserved ?? 0,
          availableQuantity: data.availableQuantity ?? qty,
          status: data.status || (qty > 10 ? 'HEALTHY' : qty > 0 ? 'LOW_STOCK' : 'OUT_OF_STOCK'),
        };
        setSelectedProduct(record);
        setEditStockValue(qty);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStock = async (productId: string, newStock: number) => {
    setUpdatingId(productId);
    try {
      await inventoryApi.updateStock(productId, newStock);
      await fetchInventory();
      if (selectedProduct && selectedProduct.productId === productId) {
        setSelectedProduct({
          ...selectedProduct,
          stock: newStock,
          status: newStock > 10 ? 'HEALTHY' : newStock > 0 ? 'LOW_STOCK' : 'OUT_OF_STOCK',
        });
      }
    } catch (err) {
      console.error('Failed to update stock:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'HEALTHY':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-950/90 dark:text-emerald-200 dark:border-emerald-700/80 shadow-xs">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Healthy Stock
          </span>
        );
      case 'LOW_STOCK':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/90 dark:text-amber-200 dark:border-amber-700/80 shadow-xs">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Low Stock
          </span>
        );
      case 'OUT_OF_STOCK':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-900 border border-rose-300 dark:bg-rose-950/90 dark:text-rose-200 dark:border-rose-700/80 shadow-xs">
            <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> Out of Stock
          </span>
        );
      default:
        return null;
    }
  };

  const healthyCount = inventory.filter((i) => i.status === 'HEALTHY').length;
  const lowCount = inventory.filter((i) => i.status === 'LOW_STOCK').length;
  const outCount = inventory.filter((i) => i.status === 'OUT_OF_STOCK').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Boxes className="w-6 h-6 text-[var(--vynk-brand)]" /> Enterprise Inventory & SKU Manager
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Stock level monitoring, automated threshold alerts, and replenishment controls
          </p>
        </div>
        <button
          onClick={fetchInventory}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all"
        >
          <RefreshCw className="w-4 h-4" /> Sync Warehouse Stock
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Healthy Stock Items</span>
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{healthyCount}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Low Stock Warning</span>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{lowCount}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Stock Depleted</span>
            <XCircle className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{outCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Title, SKU, Product ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[var(--vynk-brand)] text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none text-slate-800 dark:text-slate-200"
          >
            <option value="ALL">All Stock Levels</option>
            <option value="HEALTHY">Healthy Stock</option>
            <option value="LOW_STOCK">Low Stock</option>
            <option value="OUT_OF_STOCK">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Main Grid + Drawer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table Column */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">SKU / Product</th>
                  <th className="p-4">Current Stock</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Quick Restock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-400">
                      Loading inventory levels...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-400">
                      No matching SKUs found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr
                      key={item.productId}
                      className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                        selectedProduct?.productId === item.productId
                          ? 'bg-[var(--vynk-brand)]/10'
                          : ''
                      }`}
                      onClick={() => handleFetchSingle(item.productId)}
                    >
                      <td className="p-4">
                        <p className="font-bold text-slate-900 dark:text-white truncate max-w-xs">{item.title}</p>
                        <p className="font-mono text-[10px] text-slate-400">SKU: {item.sku}</p>
                      </td>
                      <td className="p-4 font-black text-slate-900 dark:text-white text-sm">
                        {item.stock} units
                      </td>
                      <td className="p-4">{getStatusBadge(item.status)}</td>
                      <td className="p-4 text-right space-x-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleUpdateStock(item.productId, item.stock + 10)}
                          disabled={updatingId === item.productId}
                          className="px-2.5 py-1 bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] hover:bg-[var(--vynk-brand)]/20 rounded-lg font-bold text-[11px] cursor-pointer"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => handleUpdateStock(item.productId, item.stock + 50)}
                          disabled={updatingId === item.productId}
                          className="px-2.5 py-1 bg-[var(--vynk-brand)] text-white hover:bg-[var(--vynk-brand-hover)] rounded-lg font-bold text-[11px] cursor-pointer"
                        >
                          +50 Restock
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Product Detail Panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <h2 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <PackageCheck className="w-5 h-5 text-[var(--vynk-brand)]" /> Stock Control Detail
          </h2>

          {selectedProduct ? (
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-400">Product Title</span>
                <p className="font-extrabold text-slate-900 dark:text-white text-sm mt-0.5">{selectedProduct.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">SKU Code</span>
                  <p className="font-mono font-bold text-slate-900 dark:text-white">{selectedProduct.sku}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Status</span>
                  <div className="mt-1">{getStatusBadge(selectedProduct.status)}</div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-3">
                <label className="font-extrabold uppercase text-slate-400 text-[10px]">Manual Stock Level Adjustment</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={editStockValue}
                    onChange={(e) => setEditStockValue(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--vynk-brand)]"
                  />
                  <button
                    onClick={() => handleUpdateStock(selectedProduct.productId, editStockValue)}
                    className="px-4 py-2 bg-[var(--vynk-brand)] hover:bg-[var(--vynk-brand-hover)] text-white font-bold rounded-xl text-xs cursor-pointer shadow-sm shrink-0"
                  >
                    Save Stock
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              Select a product row from the table to view detailed SKU metrics and manual inventory controls.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

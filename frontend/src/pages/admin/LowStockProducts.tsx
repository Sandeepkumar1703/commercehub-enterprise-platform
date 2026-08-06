import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { useApi } from '../../hooks/useApi';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const LowStockProducts: React.FC = () => {
  const { data, loading, error, refetch } = useApi<any[]>(adminApi.getLowStockItems);

  if (loading) return <Loader text="Checking inventory threshold alerts..." />;
  if (error || !data) return <ErrorMessage message={error || 'Failed to check low stock'} onRetry={refetch} />;

  const items = Array.isArray(data) ? data : (data as any)?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Low Stock Inventory Alert</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Products at risk of stockout (&le; 5 units remaining in warehouse).
          </p>
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        {items.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">All inventory levels are healthy. Zero low stock items found.</div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 font-extrabold uppercase border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Remaining Units</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {items.map((p, idx) => {
                const id = p.productId || p.id || idx;
                const title = p.productName || p.title || `Product #${id}`;
                const sku = p.sku || `SKU-${id}`;
                const stock = p.currentStock ?? p.stock ?? 0;
                return (
                  <tr key={id}>
                    <td className="p-4 font-bold text-slate-900 dark:text-slate-100">{title}</td>
                    <td className="p-4 font-mono">{sku}</td>
                    <td className="p-4 font-black text-rose-600">{stock}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full">
                        CRITICAL STOCK
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

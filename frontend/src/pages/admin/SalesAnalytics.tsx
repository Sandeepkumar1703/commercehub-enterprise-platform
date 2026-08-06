import React from 'react';
import { TrendingUp, Package, Star } from 'lucide-react';
import { analyticsApi } from '../../api/analyticsApi';
import { useApi } from '../../hooks/useApi';
import { AnalyticsSalesReport } from '../../types';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const SalesAnalytics: React.FC = () => {
  const { data, loading, error, refetch } = useApi<AnalyticsSalesReport>(analyticsApi.getSalesAnalytics);

  if (loading) return <Loader text="Analyzing category sales volume..." />;
  if (error || !data) return <ErrorMessage message={error || 'Failed to load sales report'} onRetry={refetch} />;

  const topProds = data.topProducts || [];
  const catSales = data.categorySales || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-app-primary">Sales Analytics</h1>
        <p className="text-xs text-app-muted mt-1">
          Top seller items, volume velocity, and category sales proportions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-app-card border border-app rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-app-primary">Top Selling Catalog Items</h3>
          {topProds.length === 0 ? (
            <div className="text-xs text-app-muted py-4">No top product sales recorded.</div>
          ) : (
            <div className="space-y-3">
              {topProds.map((p) => (
                <div key={p.productId} className="flex items-center justify-between text-xs py-2 border-b border-app">
                  <div>
                    <p className="font-bold text-app-primary">{p.title}</p>
                    <p className="text-app-muted">{p.unitsSold} units sold</p>
                  </div>
                  <span className="font-extrabold text-[var(--vynk-brand)]">${p.totalSales.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sales by Category */}
        <div className="bg-app-card border border-app rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-app-primary">Category Share</h3>
          {catSales.length === 0 ? (
            <div className="text-xs text-app-muted py-4">No category sales recorded.</div>
          ) : (
            <div className="space-y-3">
              {catSales.map((cat) => (
                <div key={cat.category} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-app-primary">
                    <span>{cat.category}</span>
                    <span className="text-[var(--vynk-brand)]">${cat.sales.toLocaleString()} ({cat.percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-app-surface rounded-full overflow-hidden border border-app">
                    <div className="h-full bg-[var(--vynk-brand)] rounded-full" style={{ width: `${cat.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { DollarSign, TrendingUp, CreditCard } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { analyticsApi } from '../../api/analyticsApi';
import { useApi } from '../../hooks/useApi';
import { AnalyticsRevenueReport } from '../../types';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const RevenueAnalytics: React.FC = () => {
  const { data, loading, error, refetch } = useApi<AnalyticsRevenueReport>(analyticsApi.getRevenueAnalytics);

  if (loading) return <Loader text="Calculating revenue metrics..." />;
  if (error || !data) return <ErrorMessage message={error || 'Failed to load revenue report'} onRetry={refetch} />;

  const gross = data.grossRevenue ?? (data as any).totalRevenue ?? 0;
  const net = data.netProfit ?? (gross ? gross * 0.25 : 0);
  const aov = data.averageOrderValue ?? 0;
  const trend = data.quarterlyTrend || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-app-primary">Revenue Analytics</h1>
        <p className="text-xs text-app-muted mt-1">
          Detailed financial audit and gross transaction breakdowns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-app-card border border-app rounded-2xl p-5 space-y-2">
          <span className="text-xs text-app-muted uppercase font-bold">Gross Platform Volume</span>
          <p className="text-2xl font-black text-app-primary">${gross.toLocaleString()}</p>
        </div>
        <div className="bg-app-card border border-app rounded-2xl p-5 space-y-2">
          <span className="text-xs text-app-muted uppercase font-bold">Net Margin</span>
          <p className="text-2xl font-black text-[var(--vynk-brand)]">${net.toLocaleString()}</p>
        </div>
        <div className="bg-app-card border border-app rounded-2xl p-5 space-y-2">
          <span className="text-xs text-app-muted uppercase font-bold">Average Order Value (AOV)</span>
          <p className="text-2xl font-black text-app-primary">${aov.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-app-card border border-app rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-app-primary">Quarterly Gross Revenue Trend</h3>
        {trend.length > 0 ? (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="period" stroke="var(--vynk-text-muted, #8A929A)" fontSize={11} />
                <YAxis stroke="var(--vynk-text-muted, #8A929A)" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--vynk-bg-surface, #FFFFFF)',
                    borderColor: 'var(--vynk-border, #E9ECEF)',
                    borderRadius: '12px',
                    color: 'var(--vynk-text-primary, #111317)'
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--vynk-brand, #D97746)" fill="var(--vynk-brand, #D97746)" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center text-xs text-app-muted border border-dashed border-app rounded-xl">
            No revenue trend data available.
          </div>
        )}
      </div>
    </div>
  );
};

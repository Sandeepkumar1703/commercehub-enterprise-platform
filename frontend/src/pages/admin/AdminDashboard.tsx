import React, { useEffect, useState } from 'react';
import { DollarSign, ShoppingBag, Package, Users, TrendingUp, Download, RefreshCw, Star, Clock } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { toast } from 'sonner';
import { adminApi } from '../../api/adminApi';
import { analyticsApi } from '../../api/analyticsApi';
import { AdminDashboardSummary, MonthlyAnalytics, AdminTopProduct, AdminRecentOrder } from '../../types';
import { DashboardSkeleton } from '../../components/common/skeleton/DashboardSkeleton';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Button } from '../../components/common/Button';

export const AdminDashboard: React.FC = () => {
  const [summary, setSummary] = useState<AdminDashboardSummary | null>(null);
  const [monthly, setMonthly] = useState<MonthlyAnalytics[]>([]);
  const [topProducts, setTopProducts] = useState<AdminTopProduct[]>([]);
  const [recentOrders, setRecentOrders] = useState<AdminRecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [sumRes, monthRes, topRes, recRes] = await Promise.allSettled([
        adminApi.getDashboardSummary(),
        analyticsApi.getMonthlyAnalytics(),
        adminApi.getTopProducts(),
        adminApi.getRecentOrders(),
      ]);

      if (sumRes.status === 'fulfilled') {
        const raw = sumRes.value;
        const dataObj = (raw as any)?.data || raw;
        setSummary(dataObj);
      }

      if (monthRes.status === 'fulfilled') {
        const raw = monthRes.value;
        const dataArr = (raw as any)?.data || raw;
        if (Array.isArray(dataArr)) setMonthly(dataArr);
      }

      if (topRes.status === 'fulfilled') {
        const raw = topRes.value;
        const dataArr = (raw as any)?.data || raw;
        if (Array.isArray(dataArr)) setTopProducts(dataArr);
      }

      if (recRes.status === 'fulfilled') {
        const raw = recRes.value;
        const dataArr = (raw as any)?.data || raw;
        if (Array.isArray(dataArr)) setRecentOrders(dataArr);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load admin dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <DashboardSkeleton />;
  if (error) return <ErrorMessage message={error} onRetry={fetchDashboardData} />;

  const handleExportCSV = () => {
    if (!summary) return;
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Metric,Value\n' +
      `Total Revenue,${summary.totalRevenue}\n` +
      `Total Orders,${summary.totalOrders}\n` +
      `Total Products,${summary.totalProducts}\n` +
      `Total Customers,${summary.totalCustomers}\n` +
      `Pending Orders,${summary.pendingOrders}\n` +
      `Low Stock Products,${summary.lowStockProducts}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Vynk_Admin_Dashboard_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Analytics report exported successfully');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Enterprise Control Center</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time platform metrics, inventory health, and Spring Boot backend analytics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={fetchDashboardData} icon={<RefreshCw size={14} />}>
            Refresh
          </Button>
          <Button size="sm" onClick={handleExportCSV} icon={<Download size={14} />}>
            Export CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      {summary ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-extrabold uppercase tracking-wider">Total Revenue</span>
              <div className="p-2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">${summary.totalRevenue?.toLocaleString() ?? 0}</p>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full inline-block">
              {summary.completedOrders ?? 0} Completed Orders
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-extrabold uppercase tracking-wider">Total Orders</span>
              <div className="p-2 bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{summary.totalOrders ?? 0}</p>
            <span className="text-[10px] font-bold text-[var(--vynk-brand)] bg-[var(--vynk-brand)]/10 px-2 py-0.5 rounded-full inline-block">
              {summary.pendingOrders ?? 0} Pending Fulfillment
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-extrabold uppercase tracking-wider">Total Products</span>
              <div className="p-2 bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 rounded-xl">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{summary.totalProducts ?? 0}</p>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full inline-block">
              {summary.lowStockProducts ?? 0} Low Stock Alerts
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-extrabold uppercase tracking-wider">Total Customers</span>
              <div className="p-2 bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{summary.totalCustomers ?? 0}</p>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full inline-block">
              {summary.totalCategories ?? 0} Product Categories
            </span>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          No dashboard data available.
        </div>
      )}

      {/* Revenue Growth Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[var(--vynk-brand)]" /> Monthly Revenue & Order Volume
        </h3>
        {monthly && monthly.length > 0 ? (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" stroke="#8A929A" fontSize={11} />
                <YAxis stroke="#8A929A" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--vynk-bg-surface, #FFFFFF)',
                    borderColor: 'var(--vynk-border, #E9ECEF)',
                    borderRadius: '12px',
                    color: '#111317',
                  }}
                />
                <Bar dataKey="revenue" name="Revenue ($)" fill="var(--vynk-brand, #D97746)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
            No analytics available.
          </div>
        )}
      </div>

      {/* Grid: Top Products & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products Widget */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" /> Top-Selling Products
          </h3>
          {topProducts.length === 0 ? (
            <div className="h-40 flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              No top products available.
            </div>
          ) : (
            <div className="space-y-3">
              {topProducts.map((tp) => (
                <div key={tp.productId} className="flex items-center justify-between text-xs py-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    {tp.imageUrl && (
                      <img src={tp.imageUrl} alt="" className="w-8 h-8 rounded-lg object-cover bg-slate-100 dark:bg-slate-800" />
                    )}
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{tp.productName}</p>
                      <p className="text-[10px] text-slate-400">SKU: {tp.sku} | Sold: {tp.totalQuantitySold}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-[var(--vynk-brand)]">${tp.totalRevenue?.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders Widget */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-500" /> Recent Order Fulfillments
          </h3>
          {recentOrders.length === 0 ? (
            <div className="h-40 flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              No recent orders available.
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((ro) => (
                <div key={ro.orderId} className="flex items-center justify-between text-xs py-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="font-mono font-bold text-slate-900 dark:text-white">#{ro.orderNumber || ro.orderId}</p>
                    <p className="text-[10px] text-slate-400">{ro.customerName} &bull; {ro.orderDate ? new Date(ro.orderDate).toLocaleDateString() : ''}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-slate-900 dark:text-white">${ro.orderAmount?.toFixed(2)}</p>
                    <span className="text-[10px] font-bold uppercase text-emerald-600">{ro.orderStatus}</span>
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



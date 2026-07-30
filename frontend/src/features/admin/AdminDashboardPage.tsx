import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, Users, AlertTriangle, TrendingUp, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { adminApi } from './admin.api';
import { analyticsApi } from './analytics.api';
import { AdminDashboardData, AnalyticsRevenueData, AnalyticsSalesData } from '../../types';
import { Card } from '../../shared/components/Card';
import { formatCurrency } from '../../core/utils/formatters';
import { Badge } from '../../shared/components/Badge';
import { Skeleton } from '../../shared/components/Skeleton';

const COLORS = ['#2563EB', '#7C3AED', '#059669', '#D97706', '#DC2626'];

export const AdminDashboardPage: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  const [salesData, setSalesData] = useState<AnalyticsSalesData[]>([]);
  const [revenueData, setRevenueData] = useState<AnalyticsRevenueData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminApi.getDashboardData(),
      analyticsApi.getSalesData(),
      analyticsApi.getRevenueData(),
    ])
      .then(([dashRes, salesRes, revRes]) => {
        setDashboardData(dashRes);
        setSalesData(salesRes);
        setRevenueData(revRes);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading || !dashboardData) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-80 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h1 font-extrabold text-content-primary">Executive Dashboard & Analytics</h1>
        <p className="text-xs text-content-muted mt-0.5">Real-time revenue metrics, inventory health, and order fulfillment KPIs</p>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5 shadow-card flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-content-muted uppercase tracking-wider">Total Revenue</p>
            <p className="text-2xl font-black text-content-primary mt-1">{formatCurrency(dashboardData.totalRevenue)}</p>
            <p className="text-[11px] text-status-success font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +14.2% vs last month
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 shadow-card flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-content-muted uppercase tracking-wider">Total Orders</p>
            <p className="text-2xl font-black text-content-primary mt-1">{dashboardData.totalOrders}</p>
            <p className="text-[11px] text-content-muted mt-1">{dashboardData.pendingOrders} Pending Fulfillment</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 shadow-card flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-content-muted uppercase tracking-wider">Active Customers</p>
            <p className="text-2xl font-black text-content-primary mt-1">{dashboardData.totalUsers}</p>
            <p className="text-[11px] text-status-success font-semibold mt-1">100% Verified Users</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 shadow-card flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-content-muted uppercase tracking-wider">Low Stock Warning</p>
            <p className="text-2xl font-black text-status-warning mt-1">{dashboardData.lowStockCount} Items</p>
            <p className="text-[11px] text-content-muted mt-1">Requires Restock</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recharts Revenue & Sales Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-content-primary uppercase tracking-wider">Monthly Revenue Trend ($)</h3>
            <span className="text-xs text-brand font-semibold">2026 Fiscal Year</span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--content-muted)" fontSize={11} />
                <YAxis stroke="var(--content-muted)" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="revenue" fill="var(--brand)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Alerts Box */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-card space-y-4">
          <h3 className="text-xs font-bold text-content-primary uppercase tracking-wider">Low Inventory Alerts</h3>

          <div className="divide-y divide-border max-h-72 overflow-y-auto">
            {dashboardData.lowStockProducts?.map((prod) => (
              <div key={prod.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-content-primary truncate max-w-[180px]">{prod.name}</p>
                  <p className="text-[10px] text-content-muted">{prod.categoryName}</p>
                </div>
                <Badge variant="warning">{prod.stockQuantity} Left</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

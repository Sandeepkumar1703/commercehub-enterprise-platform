import React from 'react';
import { useApp } from '../../../app/store/store';
import { Table, Column } from '../../../shared/components/Table';
import { Badge } from '../../../shared/components/Badge';
import { Order } from '../../../shared/types';
import { TrendingUp, AlertTriangle, Box, DollarSign, ArrowUpRight } from 'lucide-react';

export const SellerDashboard: React.FC = () => {
  const { orders, sellers, setSellerView, updateOrderStatus } = useApp();
  const seller = sellers[0];

  const columns: Column<Order>[] = [
    {
      key: 'id',
      header: 'Order ID',
      render: (r) => <span className="font-extrabold text-indigo-600 dark:text-indigo-400">#{r.id}</span>
    },
    { key: 'customerName', header: 'Customer' },
    {
      key: 'createdAt',
      header: 'Date',
      render: (r) => new Date(r.createdAt).toLocaleDateString()
    },
    {
      key: 'totalAmount',
      header: 'Total',
      render: (r) => <span className="font-bold">${r.totalAmount.toFixed(2)}</span>
    },
    {
      key: 'status',
      header: 'Fulfillment Status',
      render: (r) => (
        <Badge variant={r.status === 'delivered' ? 'success' : r.status === 'shipped' ? 'info' : 'warning'}>
          {r.status.toUpperCase()}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (r) => (
        <div className="flex justify-end gap-2">
          {r.status === 'processing' && (
            <button
              onClick={() => updateOrderStatus(r.id, 'shipped')}
              className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700"
            >
              Ship Order
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Gross Revenue */}
        <div className="bg-emerald-100/40 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 rounded-[2rem] p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300">
            <span className="text-xs font-black uppercase tracking-wider">Gross Revenue</span>
            <div className="p-2 bg-white dark:bg-emerald-900 text-emerald-600 rounded-2xl shadow-sm">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">${seller.grossRevenue.toLocaleString()}</h3>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center">+12.4% <ArrowUpRight className="w-3 h-3" /></span>
          </div>
          <p className="text-[11px] text-emerald-700/70 dark:text-emerald-400/80 font-medium">Updated from last 30 days ledger</p>
        </div>

        {/* Card 2: Active Orders */}
        <div className="bg-indigo-100/40 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800 rounded-[2rem] p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-indigo-800 dark:text-indigo-300">
            <span className="text-xs font-black uppercase tracking-wider">Active Orders</span>
            <div className="p-2 bg-white dark:bg-indigo-900 text-indigo-600 rounded-2xl shadow-sm">
              <Box className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">{seller.activeOrdersCount}</h3>
            <Badge variant="warning" size="sm">38 Need Packing</Badge>
          </div>
          <p className="text-[11px] text-indigo-700/70 dark:text-indigo-400/80 font-medium">Fulfillment SLA target: 24 Hours</p>
        </div>

        {/* Card 3: Low Stock Warning */}
        <div className="bg-amber-100/40 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800 rounded-[2rem] p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-amber-800 dark:text-amber-300">
            <span className="text-xs font-black uppercase tracking-wider">Low Stock SKUs</span>
            <div className="p-2 bg-white dark:bg-amber-900 text-amber-600 rounded-2xl shadow-sm">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-pink-600 dark:text-pink-400">4 SKUs</h3>
            <button
              onClick={() => setSellerView('inventory')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Restock →
            </button>
          </div>
          <p className="text-[11px] text-amber-700/70 dark:text-amber-400/80 font-medium">Items with stock &lt; 5 units</p>
        </div>

        {/* Card 4: Available Payout */}
        <div className="bg-pink-100/40 dark:bg-pink-950/40 border border-pink-200/80 dark:border-pink-800 rounded-[2rem] p-6 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-pink-800 dark:text-pink-300">
            <span className="text-xs font-black uppercase tracking-wider">Ready for Payout</span>
            <div className="p-2 bg-white dark:bg-pink-900 text-pink-600 rounded-2xl shadow-sm">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">${seller.availableBalance.toFixed(2)}</h3>
            <button
              onClick={() => setSellerView('wallet')}
              className="px-2.5 py-1 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 active:scale-95 transition-all"
            >
              Withdraw
            </button>
          </div>
          <p className="text-[11px] text-pink-700/70 dark:text-pink-400/80 font-medium">Pending settlement: ${seller.pendingBalance.toFixed(2)}</p>
        </div>
      </div>

      {/* Visual Chart Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Revenue & Order Volume Trend</h3>
          <span className="text-xs text-slate-400 font-semibold">July 2026 Daily Performance</span>
        </div>

        {/* Simulated Bar Chart Visualizer */}
        <div className="h-40 flex items-end gap-2 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800">
          {[40, 65, 80, 50, 95, 110, 85, 120, 140, 100, 160, 180, 150, 210].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
              <div
                style={{ height: `${val / 2.2}px` }}
                className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md group-hover:from-indigo-500 group-hover:to-indigo-300 transition-all cursor-pointer"
              />
              <span className="text-[9px] text-slate-400">Jul {idx + 10}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Data Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Recent Customer Orders</h3>
          <button
            onClick={() => setSellerView('inventory')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Manage All Orders →
          </button>
        </div>

        <Table
          columns={columns}
          data={orders}
          keyExtractor={(r) => r.id}
        />
      </div>
    </div>
  );
};

export default SellerDashboard;

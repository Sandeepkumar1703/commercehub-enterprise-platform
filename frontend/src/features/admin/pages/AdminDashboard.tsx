import React from 'react';
import { useApp } from '../../../app/store/store';
import { Badge } from '../../../shared/components/Badge';
import { Table, Column } from '../../../shared/components/Table';
import { Activity, ShieldCheck, Users, DollarSign, Database, Server, Cpu, ArrowUpRight } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { auditLogs, setAdminView } = useApp();

  const auditColumns: Column<any>[] = [
    { key: 'timestamp', header: 'Timestamp', render: (r) => new Date(r.timestamp).toLocaleTimeString() },
    { key: 'action', header: 'Action', render: (r) => <Badge variant="info">{r.action}</Badge> },
    { key: 'entityType', header: 'Entity' },
    { key: 'ipAddress', header: 'IP Address' },
    { key: 'userRole', header: 'Actor Role', render: (r) => <span className="font-bold text-purple-400">{r.userRole}</span> }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Gross Platform GMV</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-white">$1,248,500.00</h3>
            <span className="text-xs text-emerald-400 font-bold flex items-center">+18.2% <ArrowUpRight className="w-3 h-3" /></span>
          </div>
          <p className="text-[11px] text-slate-500">Across 1,420 registered merchants</p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Platform Take Rate (15%)</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-white">$187,275.00</h3>
            <Badge variant="success" size="sm">+14% MoM</Badge>
          </div>
          <p className="text-[11px] text-slate-500">Net platform revenue commission</p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Active Platform Users</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-white">124,800</h3>
            <span className="text-xs text-indigo-400 font-bold">2.4k Online</span>
          </div>
          <p className="text-[11px] text-slate-500">Verified buyers & enterprise staff</p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Open Escalations</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-amber-400">14 Tickets</h3>
            <Badge variant="warning" size="sm">Requires Audit</Badge>
          </div>
          <p className="text-[11px] text-slate-500">Merchant disputes & chargebacks</p>
        </div>
      </div>

      {/* System Infrastructure Gauges Panel */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-sm text-white">Cloud Container & Infrastructure Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-4 bg-slate-900 rounded-xl space-y-2 border border-slate-800">
            <div className="flex justify-between font-bold text-slate-300">
              <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-purple-400" /> CPU Utilization</span>
              <span>34%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full w-[34%]" />
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl space-y-2 border border-slate-800">
            <div className="flex justify-between font-bold text-slate-300">
              <span className="flex items-center gap-2"><Database className="w-4 h-4 text-indigo-400" /> Firestore Storage</span>
              <span>1.2TB / 5.0TB</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full w-[24%]" />
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl space-y-2 border border-slate-800">
            <div className="flex justify-between font-bold text-slate-300">
              <span className="flex items-center gap-2"><Server className="w-4 h-4 text-emerald-400" /> DB Pool Connections</span>
              <span>42 / 100</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[42%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Audit Activity Summary Table */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm text-white">Live System Audit Stream</h3>
          <button onClick={() => setAdminView('audit')} className="text-xs text-purple-400 font-bold hover:underline">
            View All Audit Logs →
          </button>
        </div>
        <Table columns={auditColumns} data={auditLogs.slice(0, 5)} keyExtractor={(r) => r.id} />
      </div>
    </div>
  );
};

export default AdminDashboard;

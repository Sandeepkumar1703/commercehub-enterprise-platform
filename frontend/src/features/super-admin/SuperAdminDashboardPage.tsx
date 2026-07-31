import React, { useState } from 'react';
import {
  Activity,
  Server,
  Database,
  Cpu,
  ShieldAlert,
  Crown,
  Lock,
  Terminal,
  HardDriveDownload,
  CheckCircle2,
  RefreshCw,
  Zap,
  Sliders,
  Users,
} from 'lucide-react';
import { Can } from '../../core/auth/Can';

export const SuperAdminDashboardPage: React.FC = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const triggerAction = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Super Admin Crown Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-rose-950/80 to-slate-950 border border-rose-800/40 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-rose-900/60 border border-amber-400/30 px-3 py-1 rounded-full inline-block mb-2">
            <Crown className="w-3 h-3 inline mr-1 text-amber-300" /> Platform Super Admin Command
          </span>
          <h1 className="text-2xl font-black tracking-tight text-white">Platform Control Center</h1>
          <p className="text-xs text-rose-200/80 mt-1 max-w-xl">
            Root access management, RBAC matrix control, database snapshot backup, microservice orchestration & security audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Can permission="DATABASE_BACKUP" explainDisabled disabledReason="Requires DATABASE_BACKUP permission">
            <button
              onClick={() => triggerAction('Database snapshot backup initiated...')}
              className="inline-flex items-center gap-2 bg-rose-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl hover:bg-rose-500 transition-colors shadow-lg cursor-pointer"
            >
              <HardDriveDownload className="w-4 h-4" />
              <span>Snapshot Backup</span>
            </button>
          </Can>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* System Health Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Microservices</span>
            <Server className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black mt-2 text-emerald-400">12 / 12 Healthy</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Spring Boot Eureka Cluster</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">PostgreSQL DB</span>
            <Database className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black mt-2 text-blue-400">14.2 GB / 100 GB</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Read replicas active</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Global API Latency</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black mt-2 text-amber-400">24 ms</p>
          <span className="text-[10px] text-slate-400 mt-1 block">99.98% SLA compliance</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Active JWT Sessions</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-black mt-2 text-purple-400">1,429</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Redis Token Store</span>
        </div>
      </div>

      {/* Super Admin Quick Operations */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-4">
        <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-rose-400" /> Platform Infrastructure Actions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Can permission="SYSTEM_SETTINGS" explainDisabled disabledReason="Requires SYSTEM_SETTINGS permission">
            <button
              onClick={() => triggerAction('Redis Cache flushed successfully!')}
              className="p-4 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-left space-y-1 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-amber-400" />
              <p className="text-xs font-bold text-white">Flush Redis Cache</p>
              <p className="text-[10px] text-slate-400">Invalidate L2 Cache</p>
            </button>
          </Can>

          <Can permission="FEATURE_FLAG_MANAGE" explainDisabled disabledReason="Requires FEATURE_FLAG_MANAGE permission">
            <button
              onClick={() => triggerAction('Feature Flag matrix updated.')}
              className="p-4 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-left space-y-1 cursor-pointer transition-colors"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <p className="text-xs font-bold text-white">Feature Flags</p>
              <p className="text-[10px] text-slate-400">Toggle Canary Releases</p>
            </button>
          </Can>

          <Can permission="AUDIT_VIEW" explainDisabled disabledReason="Requires AUDIT_VIEW permission">
            <button
              onClick={() => triggerAction('Full Security Audit Trail exported.')}
              className="p-4 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-left space-y-1 cursor-pointer transition-colors"
            >
              <Terminal className="w-4 h-4 text-rose-400" />
              <p className="text-xs font-bold text-white">Audit Export</p>
              <p className="text-[10px] text-slate-400">Download CSV Logs</p>
            </button>
          </Can>

          <Can permission="ROLE_MANAGE" explainDisabled disabledReason="Requires ROLE_MANAGE permission">
            <button
              onClick={() => triggerAction('Role Permission Matrix re-synchronized.')}
              className="p-4 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-left space-y-1 cursor-pointer transition-colors"
            >
              <Lock className="w-4 h-4 text-purple-400" />
              <p className="text-xs font-bold text-white">Sync Permissions</p>
              <p className="text-[10px] text-slate-400">Re-index RBAC Rules</p>
            </button>
          </Can>
        </div>
      </div>

      {/* Audit Log Stream */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-white space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-rose-400 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-rose-400" /> Live Audit Log Feed
          </h2>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            STREAMING ACTIVE
          </span>
        </div>

        <div className="font-mono text-[11px] space-y-2 text-slate-300 bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="flex justify-between text-slate-400 border-b border-slate-800 pb-1">
            <span>[2026-07-31 12:45:10] SUPER_ADMIN (sndp1703@gmail.com)</span>
            <span className="text-emerald-400">ROLE_SUPER_ADMIN</span>
          </div>
          <p>ACTION: AUTH_JWT_REFRESH_TOKEN_EXCHANGE - IP: 127.0.0.1 - STATUS: 200 SUCCESS</p>
          <p>ACTION: PRODUCT_CATALOG_SYNC_CACHE - MEMORY_CLEARED: 12.4 MB</p>
          <p>ACTION: RBAC_GUARD_EVALUATION - PATH: /portal/super-admin/dashboard - ACCESS: GRANTED</p>
        </div>
      </div>
    </div>
  );
};

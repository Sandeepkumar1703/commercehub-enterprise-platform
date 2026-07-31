import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  ShieldAlert,
  Crown,
  Server,
  Users,
  ShieldCheck,
  KeyRound,
  UserCog,
  Store,
  Package,
  ShoppingCart,
  CreditCard,
  FileText,
  Activity,
  Lock,
  Sliders,
  Flag,
  Plug,
  Database,
  Cpu,
  Clock,
  Terminal,
  HeartPulse,
  HardDriveDownload,
  LogOut,
  ArrowLeft,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { logout } from '../../features/auth/authSlice';
import { useLanguage } from '../../core/i18n/LanguageContext';

export const SuperAdminLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { getLocalizedPath } = useLanguage();

  return (
    <div className="min-h-screen flex bg-background text-content-primary">
      {/* Super Admin Control Sidebar */}
      <aside className="w-64 bg-slate-950 text-slate-200 flex flex-col z-20 shrink-0 border-r border-rose-950/40">
        <div className="p-5 border-b border-rose-950/40 flex items-center justify-between bg-gradient-to-r from-slate-950 via-rose-950/20 to-slate-950">
          <Link to={getLocalizedPath('portal/super-admin/dashboard')} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white font-black text-sm flex items-center justify-center shadow-lg shadow-rose-900/30 ring-2 ring-rose-500/50">
              <Crown className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-tight">Super Admin</h2>
              <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">Platform Core</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          <div className="px-3 pt-1 pb-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
            Executive Control
          </div>

          <NavLink
            to={getLocalizedPath('portal/super-admin/dashboard')}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-rose-950/60 text-rose-300 border border-rose-800/50 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`
            }
          >
            <Activity className="w-4 h-4 text-rose-400" />
            <span>Control Center</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('portal/super-admin/system')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-rose-950/60 text-rose-300 border border-rose-800/50 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`
            }
          >
            <Server className="w-4 h-4 text-rose-400" />
            <span>System Microservices</span>
          </NavLink>

          <div className="px-3 pt-3 pb-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
            Access & Security
          </div>

          <NavLink
            to={getLocalizedPath('portal/super-admin/users')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-rose-950/60 text-rose-300 border border-rose-800/50 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`
            }
          >
            <Users className="w-4 h-4 text-rose-400" />
            <span>All Platform Users</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('portal/super-admin/roles')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-rose-950/60 text-rose-300 border border-rose-800/50 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`
            }
          >
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            <span>Roles Management</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('portal/super-admin/permissions')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-rose-950/60 text-rose-300 border border-rose-800/50 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`
            }
          >
            <KeyRound className="w-4 h-4 text-rose-400" />
            <span>Permissions Matrix</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('portal/super-admin/admins')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-rose-950/60 text-rose-300 border border-rose-800/50 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`
            }
          >
            <UserCog className="w-4 h-4 text-rose-400" />
            <span>System Admins</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('portal/super-admin/security')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-rose-950/60 text-rose-300 border border-rose-800/50 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`
            }
          >
            <Lock className="w-4 h-4 text-rose-400" />
            <span>Security Policies</span>
          </NavLink>

          <div className="px-3 pt-3 pb-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
            System Operations
          </div>

          <NavLink
            to={getLocalizedPath('portal/super-admin/configurations')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-rose-950/60 text-rose-300 border border-rose-800/50 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`
            }
          >
            <Sliders className="w-4 h-4 text-rose-400" />
            <span>Platform Config</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('portal/super-admin/feature-flags')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-rose-950/60 text-rose-300 border border-rose-800/50 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`
            }
          >
            <Flag className="w-4 h-4 text-rose-400" />
            <span>Feature Flags</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('portal/super-admin/integrations')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-rose-950/60 text-rose-300 border border-rose-800/50 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`
            }
          >
            <Plug className="w-4 h-4 text-rose-400" />
            <span>API Keys & Gateways</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('portal/super-admin/database')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-rose-950/60 text-rose-300 border border-rose-800/50 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`
            }
          >
            <Database className="w-4 h-4 text-rose-400" />
            <span>Database & Backups</span>
          </NavLink>

          <NavLink
            to={getLocalizedPath('portal/super-admin/audit-logs')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive ? 'bg-rose-950/60 text-rose-300 border border-rose-800/50 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`
            }
          >
            <FileText className="w-4 h-4 text-rose-400" />
            <span>System Audit Logs</span>
          </NavLink>
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-rose-950/40 space-y-3 bg-slate-950">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-rose-600/30 text-rose-300 font-bold text-xs flex items-center justify-center border border-rose-500/40">
                {user?.firstName?.[0] || 'SA'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-[10px] text-rose-400 font-bold uppercase">Super Admin</p>
              </div>
            </div>
            <button
              onClick={() => dispatch(logout())}
              title="Sign Out"
              className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            to={getLocalizedPath('portal/admin/dashboard')}
            className="flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-400 hover:text-white py-1.5 bg-slate-900 rounded-lg transition-colors border border-slate-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Switch to Admin Portal</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shrink-0 text-white">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Platform Master Session: <span className="text-rose-400 font-extrabold">{user?.email}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <HeartPulse className="w-4 h-4 animate-pulse" /> Microservices Healthy
            </span>
            <Link
              to={getLocalizedPath('')}
              className="text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
            >
              <Store className="w-3.5 h-3.5" /> Customer Store
            </Link>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

import React from 'react';
import { useApp, AdminView } from '../app/store/store';
import { Logo } from '../shared/components/Logo';
import { ToastContainer } from '../shared/components/Toast';
import { CommandPalette } from '../shared/components/CommandPalette';
import {
  Building2, Users, FileText, Activity, ShieldCheck,
  Search, Bell, Sun, Moon, LogOut, ArrowLeft, Store
} from 'lucide-react';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    adminView, setAdminView,
    setPortal,
    theme, toggleTheme,
    currentUser, logout,
    setCommandPaletteOpen
  } = useApp();

  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-100 font-sans transition-colors">
      {/* Admin Sidebar (280px) */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0 hidden md:flex p-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Logo className="text-white" />
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Admin OS
            </span>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1">
            <p className="font-bold text-white">{currentUser.name}</p>
            <p className="text-[10px] text-purple-400 uppercase font-semibold tracking-wider">Role: {currentUser.role}</p>
          </div>

          <nav className="space-y-1.5 text-xs font-medium">
            <button
              onClick={() => setAdminView('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                adminView === 'dashboard' ? 'bg-purple-600 text-white font-bold' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Executive Dashboard</span>
            </button>

            <button
              onClick={() => setAdminView('users')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                adminView === 'users' ? 'bg-purple-600 text-white font-bold' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Identity & RBAC Roles</span>
            </button>

            <button
              onClick={() => setAdminView('audit')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                adminView === 'audit' ? 'bg-purple-600 text-white font-bold' : 'hover:bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Immutable Audit Logs</span>
            </button>
          </nav>
        </div>

        <div className="p-2 border-t border-slate-800 space-y-2">
          <button
            onClick={() => setPortal('customer')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-900"
          >
            <Store className="w-4 h-4" />
            <span>Customer Front Store</span>
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-950/40"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900">
        {/* Top Health Indicator Bar */}
        <header className="h-16 bg-slate-950 border-b border-slate-800 px-6 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPortal('customer')}
              className="md:hidden text-xs text-purple-400 font-bold flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Store
            </button>
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-xl text-slate-400 hover:text-white border border-slate-800"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Command Palette Search (Cmd + K)</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-950/60 border border-emerald-800 rounded-full text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>API Latency: 24ms • Systems Operational</span>
            </div>

            <button onClick={toggleTheme} className="p-2 text-slate-400 hover:text-white">
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>

        <ToastContainer />
        <CommandPalette />
      </div>
    </div>
  );
};

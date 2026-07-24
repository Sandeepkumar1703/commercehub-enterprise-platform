import React, { useState } from 'react';
import { useApp } from '../app/store/store';
import { Button } from '../shared/components/Button';
import { AlertTriangle, ShieldAlert, Server, Wrench, Home, RotateCcw } from 'lucide-react';

export const SystemErrorPages: React.FC = () => {
  const { setPortal } = useApp();
  const [errorType, setErrorType] = useState<'404' | '403' | '500' | 'maintenance'>('404');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 space-y-8">
      {/* Error Switcher Bar */}
      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl text-xs font-bold">
        {[
          { id: '404', label: '404 Not Found' },
          { id: '403', label: '403 Forbidden' },
          { id: '500', label: '500 Server Error' },
          { id: 'maintenance', label: 'Maintenance Mode' }
        ].map(e => (
          <button
            key={e.id}
            onClick={() => setErrorType(e.id as any)}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              errorType === e.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            {e.label}
          </button>
        ))}
      </div>

      {/* Main Error Viewport Card */}
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
        {errorType === '404' && (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-indigo-950 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-800">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black text-white">404</h1>
            <h2 className="text-lg font-bold text-slate-200">Page Route Not Found</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              The catalog item or portal page you requested was relocated or removed from CommerceHub.
            </p>
          </div>
        )}

        {errorType === '403' && (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-950 text-rose-400 flex items-center justify-center mx-auto border border-rose-800">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black text-white">403</h1>
            <h2 className="text-lg font-bold text-slate-200">RBAC Access Denied</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your account role does not hold the required permissions to access this administrative route.
            </p>
          </div>
        )}

        {errorType === '500' && (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-950 text-amber-400 flex items-center justify-center mx-auto border border-amber-800">
              <Server className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black text-white">500</h1>
            <h2 className="text-lg font-bold text-slate-200">Internal Server Exception</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              An unhandled cloud runtime exception occurred. Incident report log #INC-88291 has been dispatched.
            </p>
          </div>
        )}

        {errorType === 'maintenance' && (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-purple-950 text-purple-400 flex items-center justify-center mx-auto border border-purple-800">
              <Wrench className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black text-white">Scheduled Maintenance</h1>
            <h2 className="text-sm font-bold text-slate-200">System Upgrade in Progress</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              CommerceHub is deploying a database index migration. Operations will resume in 12 minutes.
            </p>
          </div>
        )}

        <div className="pt-2 flex justify-center gap-3">
          <Button variant="primary" onClick={() => setPortal('customer')} leftIcon={<Home className="w-4 h-4" />}>
            Return to Storefront
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemErrorPages;

import React from 'react';
import { WifiOff, RefreshCw, Home } from 'lucide-react';

export const NetworkErrorPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-app-background">
      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
        <WifiOff size={40} />
      </div>
      <h1 className="text-4xl font-extrabold text-app-primary mb-3">Network Connection Lost</h1>
      <p className="text-app-secondary max-w-md mb-8">
        Unable to communicate with the backend services. Please verify your network connection or backend service status.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg btn-primary shadow-sm font-medium cursor-pointer"
        >
          <RefreshCw size={18} /> Reconnect Now
        </button>
      </div>
    </div>
  );
};

export default NetworkErrorPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { ServerCrash, RefreshCw, Home } from 'lucide-react';

export const ServerErrorPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-app-background">
      <div className="w-20 h-20 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
        <ServerCrash size={40} />
      </div>
      <h1 className="text-4xl font-extrabold text-app-primary mb-3">500 - Internal Server Error</h1>
      <p className="text-app-secondary max-w-md mb-8">
        An unexpected server error occurred while processing your request. Our engineering team has been notified.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-app text-app-primary bg-app-card hover:bg-gray-100 dark:hover:bg-gray-800 transition font-medium cursor-pointer"
        >
          <RefreshCw size={18} /> Retry Page
        </button>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg btn-primary shadow-sm font-medium"
        >
          <Home size={18} /> Back to Safety
        </Link>
      </div>
    </div>
  );
};

export default ServerErrorPage;

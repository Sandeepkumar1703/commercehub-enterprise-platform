import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Failed to load data',
  message = 'An error occurred while communicating with the server. Please check your backend connection and try again.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-status-danger/5 border border-status-danger/20 rounded-2xl space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-status-danger/10 text-status-danger flex items-center justify-center mb-1">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-extrabold text-content-primary">{title}</h3>
      <p className="text-xs text-content-muted max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-1.5 bg-status-danger text-white font-extrabold text-xs px-4 py-2 rounded-xl hover:bg-status-danger/90 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Request</span>
        </button>
      )}
    </div>
  );
};

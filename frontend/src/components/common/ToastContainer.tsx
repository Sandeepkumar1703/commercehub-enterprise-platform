import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { X, CheckCircle2, AlertTriangle, Info, AlertCircle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useTheme();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const iconMap = {
          info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
          success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
        };

        const bgMap = {
          info: 'bg-blue-50/95 dark:bg-blue-950/90 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
          success: 'bg-emerald-50/95 dark:bg-emerald-950/90 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100',
          warning: 'bg-amber-50/95 dark:bg-amber-950/90 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100',
          error: 'bg-red-50/95 dark:bg-red-950/90 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all duration-200 animate-in slide-in-from-right-5 ${bgMap[toast.variant]}`}
          >
            {iconMap[toast.variant]}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">{toast.title}</p>
                <span className="text-[10px] opacity-70 font-mono">{toast.timestamp}</span>
              </div>
              <p className="text-xs mt-0.5 opacity-90 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-md opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

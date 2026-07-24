import React from 'react';

export const Logo: React.FC<{ className?: string; iconOnly?: boolean }> = ({ className = 'h-8', iconOnly = false }) => {
  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight text-slate-900 dark:text-white select-none ${className}`}>
      <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-md shadow-indigo-500/20 shrink-0">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
      {!iconOnly && (
        <span className="text-lg font-extrabold tracking-tight">
          Commerce<span className="text-indigo-600 dark:text-indigo-400">Hub</span>
        </span>
      )}
    </div>
  );
};

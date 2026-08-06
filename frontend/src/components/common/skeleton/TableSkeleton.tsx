import React from 'react';

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="w-full bg-app-card rounded-xl border border-app overflow-hidden shadow-xs animate-pulse">
      <div className="p-4 bg-app-surface border-b border-app flex justify-between items-center">
        <div className="h-5 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-1/4"></div>
        <div className="h-8 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-1/6"></div>
      </div>
      <div className="divide-y divide-app">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="p-4 flex items-center justify-between space-x-4">
            <div className="h-4 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-1/4"></div>
            <div className="h-4 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-1/5"></div>
            <div className="h-4 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-1/6"></div>
            <div className="h-6 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-12"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

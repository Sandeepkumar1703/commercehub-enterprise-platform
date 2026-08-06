import React from 'react';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse p-4 md:p-6">
      <div className="flex justify-between items-center">
        <div className="h-8 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-1/3"></div>
        <div className="h-10 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-1/4"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="bg-app-card p-5 rounded-xl border border-app space-y-3">
            <div className="h-4 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-1/2"></div>
            <div className="h-8 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-3/4"></div>
            <div className="h-3 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-1/3"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-app-card p-6 rounded-xl border border-app h-72">
          <div className="h-5 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-1/4 mb-4"></div>
          <div className="h-48 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-full"></div>
        </div>
        <div className="bg-app-card p-6 rounded-xl border border-app h-72 space-y-3">
          <div className="h-5 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-1/3 mb-4"></div>
          <div className="h-10 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-full"></div>
          <div className="h-10 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-full"></div>
          <div className="h-10 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

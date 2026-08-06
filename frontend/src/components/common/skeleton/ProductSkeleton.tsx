import React from 'react';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-app-card rounded-xl p-4 border border-app shadow-xs animate-pulse flex flex-col space-y-3">
      <div className="w-full h-48 bg-[#E9ECEF] dark:bg-[#2D3540] rounded-lg"></div>
      <div className="h-4 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-3/4"></div>
      <div className="h-3 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-1/2"></div>
      <div className="flex items-center justify-between pt-2">
        <div className="h-6 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-1/3"></div>
        <div className="h-8 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-1/4"></div>
      </div>
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-app-card rounded-xl p-5 border border-app shadow-xs animate-pulse space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-[#E9ECEF] dark:bg-[#2D3540]"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-1/2"></div>
          <div className="h-3 bg-[#E9ECEF] dark:bg-[#2D3540] rounded w-1/3"></div>
        </div>
      </div>
      <div className="h-16 bg-[#E9ECEF] dark:bg-[#2D3540] rounded"></div>
    </div>
  );
};

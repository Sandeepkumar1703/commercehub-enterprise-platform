import React from 'react';
import { VynkLogo } from '../brand/VynkLogo';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  text = 'Connecting your shopping experience...',
  fullScreen = false,
}) => {
  const sizeMap = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <div className="relative flex items-center justify-center">
        <div className={`${sizeMap[size]} border-[var(--vynk-brand,#D97746)] border-t-transparent rounded-full animate-spin`} />
        <div className="absolute inset-0 bg-[var(--vynk-brand,#D97746)]/20 rounded-full animate-ping" />
      </div>
      <div className="flex flex-col items-center space-y-1">
        <VynkLogo size="sm" iconOnly />
        {text && <p className="text-xs font-semibold text-app-muted animate-pulse">{text}</p>}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-app-background/90 backdrop-blur-xs">
        {spinner}
      </div>
    );
  }

  return spinner;
};


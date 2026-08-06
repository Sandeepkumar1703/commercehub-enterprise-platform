import React from 'react';

interface VynkLogoProps {
  className?: string;
  iconOnly?: boolean;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const VynkLogo: React.FC<VynkLogoProps> = ({
  className = '',
  iconOnly = false,
  showTagline = false,
  size = 'md',
}) => {
  const sizeMap = {
    sm: { icon: 'w-6 h-6', text: 'text-lg', tagline: 'text-[9px]' },
    md: { icon: 'w-8 h-8', text: 'text-xl', tagline: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-3xl', tagline: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 shrink-0 ${className}`}>
      {/* V-Loop Icon */}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${currentSize.icon} shrink-0`}
      >
        <path
          d="M5 12 L18 34 L22 34 L35 12 L28 12 L19 28 L12 12 Z"
          fill="var(--vynk-brand, #D97746)"
        />
        <path
          d="M12 12 C12 7 15 4 20 4 C25 4 28 7 28 12"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-app-primary"
        />
      </svg>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span className={`font-black tracking-widest text-app-primary ${currentSize.text}`}>
            VYNK
          </span>
          {showTagline && (
            <span className={`font-medium text-app-muted mt-0.5 ${currentSize.tagline}`}>
              Seamlessly Connected Shopping
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default VynkLogo;

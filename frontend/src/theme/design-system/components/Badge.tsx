import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}) => {
  const variantClasses = {
    primary: 'bg-[#4A4A4A] text-[#FFFFE3]',
    secondary: 'bg-[#6D8196] text-[#FFFFE3]',
    neutral: 'bg-[#CBCBCB]/30 text-[#4A4A4A] dark:text-[#FFFFE3] border border-[#CBCBCB]/50',
    outline: 'border border-[#6D8196] text-[#6D8196]',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] font-mono',
    md: 'px-2.5 py-1 text-xs font-semibold',
  };

  return (
    <span className={`inline-flex items-center rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
};

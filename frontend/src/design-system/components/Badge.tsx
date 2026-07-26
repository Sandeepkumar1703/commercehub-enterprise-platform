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
    primary: 'bg-[#4F6D8C] text-white dark:bg-[#88BDF2] dark:text-[#111827]',
    secondary: 'bg-[#EEF4F8] text-[#24313D] border border-[#D6DEE6] dark:bg-[#2B3645] dark:text-[#F8FAFC] dark:border-[#374151]',
    neutral: 'bg-[#F8FAFC] text-[#24313D] border border-[#D6DEE6] dark:bg-[#1F2937] dark:text-[#F8FAFC] dark:border-[#374151]',
    outline: 'border border-[#4F6D8C] text-[#4F6D8C] dark:border-[#88BDF2] dark:text-[#88BDF2]',
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

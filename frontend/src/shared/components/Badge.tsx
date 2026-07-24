import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'brand';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = ''
}) => {
  const styles = {
    success: 'bg-emerald-100/60 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800 font-bold',
    warning: 'bg-amber-100/60 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800 font-bold',
    error: 'bg-pink-100/60 text-pink-800 border-pink-200 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800 font-bold',
    info: 'bg-sky-100/60 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800 font-bold',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200/80 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 font-semibold',
    brand: 'bg-indigo-100/60 text-indigo-800 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800 font-bold'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
    md: 'px-2.5 py-1 text-xs font-medium'
  };

  return (
    <span className={`inline-flex items-center rounded-full border whitespace-nowrap ${styles[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

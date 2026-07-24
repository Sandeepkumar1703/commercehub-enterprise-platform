import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap active:scale-95 hover:scale-[1.02]";

  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 dark:bg-indigo-500 dark:hover:bg-indigo-600",
    secondary: "bg-white hover:bg-slate-50 text-indigo-600 border border-slate-200/80 shadow-sm dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-indigo-400 dark:border-slate-700",
    outline: "border border-indigo-200 dark:border-slate-700 hover:bg-indigo-50/50 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-300",
    ghost: "text-slate-700 dark:text-slate-300 hover:bg-indigo-50/60 dark:hover:bg-slate-800 hover:text-indigo-600",
    destructive: "bg-pink-600 hover:bg-pink-700 text-white shadow-md shadow-pink-600/20 dark:bg-pink-500 dark:hover:bg-pink-600"
  };

  const sizes = {
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-12 px-6 text-base gap-2.5"
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};

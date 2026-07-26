import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-xl';

  const variantClasses = {
    primary: 'bg-[#4A4A4A] text-[#FFFFE3] hover:bg-[#6D8196] border border-[#4A4A4A] dark:bg-[#FFFFE3] dark:text-[#4A4A4A] dark:hover:bg-[#CBCBCB]',
    secondary: 'bg-[#6D8196] text-[#FFFFE3] hover:bg-[#4A4A4A] border border-[#6D8196]',
    outline: 'bg-transparent border border-[#CBCBCB] text-[#4A4A4A] hover:border-[#6D8196] hover:text-[#6D8196] dark:text-[#FFFFE3] dark:border-[#6D8196]',
    ghost: 'bg-transparent text-[#4A4A4A] hover:bg-[#CBCBCB]/20 dark:text-[#FFFFE3] dark:hover:bg-[#6D8196]/20',
    danger: 'bg-[#4A4A4A] text-[#FFFFE3] hover:bg-[#1A1A1A] border border-[#4A4A4A]',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-xs font-semibold gap-2',
    lg: 'px-6 py-3 text-sm font-bold gap-2.5',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

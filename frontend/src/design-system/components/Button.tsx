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
    primary: 'bg-[#4F6D8C] text-white hover:bg-[#3E5973] border border-[#4F6D8C] dark:bg-[#88BDF2] dark:text-[#111827] dark:hover:bg-[#6EA8DF] dark:border-[#88BDF2]',
    secondary: 'bg-[#EEF4F8] text-[#24313D] hover:bg-[#D6DEE6] border border-[#D6DEE6] dark:bg-[#2B3645] dark:text-[#F8FAFC] dark:hover:bg-[#374151] dark:border-[#374151]',
    outline: 'bg-transparent border border-[#D6DEE6] text-[#24313D] hover:border-[#4F6D8C] hover:text-[#4F6D8C] dark:text-[#F8FAFC] dark:border-[#374151] dark:hover:border-[#88BDF2] dark:hover:text-[#88BDF2]',
    ghost: 'bg-transparent text-[#24313D] hover:bg-[#EEF4F8] dark:text-[#F8FAFC] dark:hover:bg-[#2B3645]',
    danger: 'bg-[#EF4444] text-white hover:bg-[#DC2626] border border-[#EF4444]',
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

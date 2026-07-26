import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  prefixIcon,
  suffixIcon,
  className = '',
  disabled,
  id,
  ...props
}) => {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-[var(--text-primary)]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {prefixIcon && (
          <div className="absolute left-3 text-[#64748B] dark:text-[#CBD5E1] pointer-events-none">
            {prefixIcon}
          </div>
        )}
        <input
          id={inputId}
          disabled={disabled}
          className={`w-full bg-[var(--bg-surface-raised)] border ${
            error ? 'border-[#EF4444]' : 'border-[var(--border-default)]'
          } rounded-xl text-xs text-[var(--text-primary)] placeholder-[#64748B] dark:placeholder-[#CBD5E1] px-3.5 py-2.5 outline-none transition-all focus:border-[#4F6D8C] dark:focus:border-[#88BDF2] focus:ring-2 focus:ring-[#4F6D8C]/20 dark:focus:ring-[#88BDF2]/20 disabled:opacity-50 disabled:cursor-not-allowed ${
            prefixIcon ? 'pl-9' : ''
          } ${suffixIcon ? 'pr-9' : ''} ${className}`}
          {...props}
        />
        {suffixIcon && (
          <div className="absolute right-3 text-[#64748B] dark:text-[#CBD5E1] cursor-pointer">
            {suffixIcon}
          </div>
        )}
      </div>
      {error ? (
        <p className="text-[11px] text-[#EF4444] font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-[var(--text-secondary)]">{helperText}</p>
      ) : null}
    </div>
  );
};

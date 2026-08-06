import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-app-primary">
          {label}
        </label>
      )}
      <div className="relative rounded-xl shadow-xs">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-app-muted">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full text-sm rounded-xl border bg-app-surface text-app-primary placeholder:text-app-muted focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${
            icon ? 'pl-9 pr-3 py-2.5' : 'px-3.5 py-2.5'
          } ${error ? 'border-red-500 focus:ring-red-500' : 'border-app'} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
      {!error && helperText && <p className="text-xs text-app-muted">{helperText}</p>}
    </div>
  );
};

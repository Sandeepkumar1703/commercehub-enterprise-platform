import React from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
}

export const Form: React.FC<FormProps> = ({ onSubmit, children, className = '', ...props }) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${className}`} {...props}>
      {children}
    </form>
  );
};

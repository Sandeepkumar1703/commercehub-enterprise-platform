import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-[var(--bg-surface-raised)] border border-[var(--border-default)] rounded-2xl p-6 transition-all duration-200 ${
        hoverable ? 'hover:border-[#4F6D8C] dark:hover:border-[#88BDF2] hover:shadow-sm cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

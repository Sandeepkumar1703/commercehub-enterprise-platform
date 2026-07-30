import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  glass = false,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'border border-border rounded-xl p-5 transition-all duration-300',
          glass ? 'bg-surface/80 backdrop-blur-lg shadow-xl' : 'bg-surface shadow-card',
          hoverable && 'hover:shadow-xl hover:shadow-[0_10px_25px_-5px_rgba(154,140,152,0.2)] hover:border-brand/40 hover:-translate-y-1',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};

import React from 'react';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name = 'User', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const getInitials = (n: string) => {
    const parts = n.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  return src ? (
    <img
      src={src}
      alt={name}
      className={`${sizeClasses[size]} rounded-full object-cover border border-gray-200 dark:border-gray-700 ${className}`}
    />
  ) : (
    <div
      className={`${sizeClasses[size]} rounded-full bg-blue-600 text-white font-bold flex items-center justify-center border border-blue-500 shadow-sm ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};

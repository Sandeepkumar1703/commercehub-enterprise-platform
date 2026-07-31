import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 py-3" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center hover:text-blue-600 dark:hover:text-blue-400">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
            {item.href ? (
              <Link to={item.href} className="hover:text-blue-600 dark:hover:text-blue-400">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-gray-900 dark:text-gray-100">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

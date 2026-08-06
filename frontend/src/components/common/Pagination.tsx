import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-app-surface border border-app rounded-xl">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-app text-app-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-app-card cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" /> Previous
      </button>
      <span className="text-xs font-medium text-app-secondary">
        Page <strong className="text-app-primary">{currentPage + 1}</strong> of <strong>{totalPages}</strong>
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-app text-app-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-app-card cursor-pointer"
      >
        Next <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

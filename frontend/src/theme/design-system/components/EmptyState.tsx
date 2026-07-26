import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Found',
  description = 'There are no items to display at this time.',
  icon,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="text-center py-16 px-6 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] rounded-3xl max-w-md mx-auto my-8 space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-[#6D8196]/15 text-[#6D8196] flex items-center justify-center mx-auto border border-[#6D8196]/30">
        {icon || <PackageOpen className="w-6 h-6 stroke-1.5" />}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-[var(--text-primary)]">{title}</h3>
        <p className="text-xs text-[var(--text-secondary)] max-w-xs mx-auto leading-relaxed">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

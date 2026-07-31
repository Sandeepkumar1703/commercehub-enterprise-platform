import React from 'react';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.FC<{ className?: string }>;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = PackageOpen,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-surface border border-border rounded-2xl space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-1">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-extrabold text-content-primary">{title}</h3>
      {description && <p className="text-xs text-content-muted max-w-sm">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-2 bg-brand text-brand-foreground font-extrabold text-xs px-4 py-2 rounded-xl hover:bg-brand-hover transition-colors cursor-pointer"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

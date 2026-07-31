import React from 'react';
import { Lock } from 'lucide-react';

interface DisabledActionProps {
  reason?: string;
  children: React.ReactNode;
}

export const DisabledActionTooltip: React.FC<DisabledActionProps> = ({
  reason = 'You do not have permission to perform this action.',
  children,
}) => {
  return (
    <div className="relative group inline-block">
      <div className="opacity-50 pointer-events-none filter grayscale">{children}</div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-50 pointer-events-none w-max max-w-xs">
        <div className="bg-slate-900 text-white text-[11px] font-medium py-1.5 px-2.5 rounded shadow-lg flex items-center gap-1.5 border border-slate-700">
          <Lock className="w-3 h-3 text-amber-400 shrink-0" />
          <span>{reason}</span>
        </div>
        <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1 border-r border-b border-slate-700"></div>
      </div>
    </div>
  );
};

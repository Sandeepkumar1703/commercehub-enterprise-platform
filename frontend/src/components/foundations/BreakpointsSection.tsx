import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { BREAKPOINT_TOKENS } from '../../data/tokens';
import { BreakpointToken } from '../../types';
import {
  Monitor,
  Tablet,
  Smartphone,
  Grid,
  Eye,
  Sliders,
  Sparkles,
} from 'lucide-react';

export const BreakpointsSection: React.FC = () => {
  const { searchQuery } = useTheme();
  const [selectedFrame, setSelectedFrame] = useState<string>('desktop');
  const [showColumns, setShowColumns] = useState<boolean>(true);

  const activeToken = BREAKPOINT_TOKENS.find((b) => b.id === selectedFrame) || BREAKPOINT_TOKENS[0];

  const iconMap: Record<string, React.ElementType> = {
    desktop: Monitor,
    tablet: Tablet,
    mobile: Smartphone,
  };

  const filteredTokens = BREAKPOINT_TOKENS.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.usage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-10">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
          Responsive Grid Architecture
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          Breakpoint Layouts & Column Grids
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-3xl leading-relaxed">
          Fluid and fixed container breakpoints for Desktop (1440px / 12 cols), Tablet (768px / 8 cols), and Mobile (390px / 4 cols) with standardized gutters and outer margins.
        </p>
      </div>

      {/* Breakpoint Specs Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredTokens.map((token) => {
          const Icon = iconMap[token.id] || Monitor;
          const isSelected = selectedFrame === token.id;
          return (
            <div
              key={token.id}
              onClick={() => setSelectedFrame(token.id)}
              className={`cursor-pointer p-5 rounded-2xl border transition-all shadow-xs flex flex-col justify-between gap-4 ${
                isSelected
                  ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-500/5 ring-2 ring-indigo-500/20'
                  : 'border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-indigo-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-indigo-600 text-white' : 'bg-[var(--bg-surface-raised)] text-[var(--text-primary)]'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">
                      {token.name}
                    </h3>
                    <p className="text-[11px] text-[var(--text-secondary)]">
                      {token.device}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-[var(--border-default)] font-mono text-xs">
                <div>
                  <span className="text-[10px] text-[var(--text-secondary)] block">Columns</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{token.columns} Cols</span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-secondary)] block">Gutter</span>
                  <span className="font-bold text-[var(--text-primary)]">{token.gutterPx}px</span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--text-secondary)] block">Margin</span>
                  <span className="font-bold text-[var(--text-primary)]">{token.marginPx}px</span>
                </div>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {token.usage}
              </p>
            </div>
          );
        })}
      </div>

      {/* Interactive Breakpoint Simulator Frame */}
      <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border-default)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Grid className="w-3.5 h-3.5" /> Live Frame Simulator
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {activeToken.name} Grid Overlay Inspection
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowColumns(!showColumns)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                showColumns
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-[var(--bg-surface)] border-[var(--border-default)] text-[var(--text-primary)] hover:border-indigo-500'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>{showColumns ? 'Hide Column Overlay' : 'Show Column Overlay'}</span>
            </button>
          </div>
        </div>

        {/* Viewport Scale Container */}
        <div className="w-full overflow-x-auto p-4 sm:p-8 bg-grid-pattern rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] flex justify-center">
          <div
            className="transition-all duration-300 bg-[var(--bg-surface-raised)] border-2 border-indigo-600 dark:border-indigo-400 rounded-2xl shadow-xl overflow-hidden flex flex-col relative"
            style={{
              width: `${Math.min(100, (activeToken.widthPx / 1440) * 100)}%`,
              minWidth: activeToken.id === 'mobile' ? '340px' : activeToken.id === 'tablet' ? '500px' : '100%',
            }}
          >
            {/* Window Header Bar */}
            <div className="bg-[var(--bg-surface)] px-4 py-2.5 border-b border-[var(--border-default)] flex items-center justify-between font-mono text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 font-bold text-[var(--text-primary)]">{activeToken.name}</span>
              </div>
              <div>
                Width: <span className="font-bold text-indigo-600 dark:text-indigo-400">{activeToken.widthPx}px</span>
              </div>
            </div>

            {/* Content Frame & Column Overlay */}
            <div
              className="p-6 relative min-h-[360px] flex flex-col justify-between"
              style={{
                paddingLeft: `${activeToken.marginPx}px`,
                paddingRight: `${activeToken.marginPx}px`,
              }}
            >
              {/* Overlay Columns */}
              {showColumns && (
                <div
                  className="absolute inset-0 pointer-events-none grid h-full z-10"
                  style={{
                    paddingLeft: `${activeToken.marginPx}px`,
                    paddingRight: `${activeToken.marginPx}px`,
                    gridTemplateColumns: `repeat(${activeToken.columns}, minmax(0, 1fr))`,
                    columnGap: `${activeToken.gutterPx}px`,
                  }}
                >
                  {Array.from({ length: activeToken.columns }).map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-indigo-500/15 dark:bg-indigo-400/20 border-x border-indigo-500/30 h-full flex items-start justify-center pt-2"
                    >
                      <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-300 bg-white/80 dark:bg-slate-900/80 px-1 rounded">
                        C{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Sample Card Content within Grid */}
              <div className="flex flex-col gap-4 relative z-0">
                <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-xs">
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">
                    Fluid Header Component
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Margin: {activeToken.marginPx}px | Gutter: {activeToken.gutterPx}px
                  </p>
                </div>

                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns:
                      activeToken.id === 'mobile'
                        ? '1fr'
                        : activeToken.id === 'tablet'
                        ? 'repeat(2, 1fr)'
                        : 'repeat(3, 1fr)',
                  }}
                >
                  {Array.from({ length: activeToken.id === 'mobile' ? 2 : activeToken.id === 'tablet' ? 4 : 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-xs flex flex-col gap-2"
                    >
                      <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300 font-bold font-mono text-xs flex items-center justify-center">
                        #{i + 1}
                      </span>
                      <p className="text-xs font-semibold text-[var(--text-primary)]">
                        Grid Card Unit
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spec Footer */}
              <div className="pt-4 border-t border-[var(--border-default)] text-xs font-mono text-[var(--text-secondary)] flex justify-between items-center relative z-0">
                <span>Margins: {activeToken.marginPx}px</span>
                <span>Gutters: {activeToken.gutterPx}px</span>
                <span>{activeToken.columns} Columns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { SPACING_TOKENS } from '../../data/tokens';
import {
  Grid,
  Copy,
  Check,
  Box,
  Layers,
  Sparkles,
  Maximize2,
  Sliders,
} from 'lucide-react';

export const SpacingSection: React.FC = () => {
  const { searchQuery, addToast } = useTheme();
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Box Model Calculator state
  const [outerRadius, setOuterRadius] = useState<number>(16);
  const [padding, setPadding] = useState<number>(16);
  const [gap, setGap] = useState<number>(12);

  // Inner radius formula: Outer Radius - Padding (minimum 0)
  const innerRadius = Math.max(0, outerRadius - padding);

  const copyToken = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    addToast('Copied Spacing Token', `Copied ${label} (${text}) to clipboard`, 'success');
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const filteredTokens = SPACING_TOKENS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.usage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-10">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
          Spatial System Architecture
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          Spacing & Layout Spatial Grids
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-3xl leading-relaxed">
          Built on an 8pt spatial grid for predictable vertical rhythm and layout alignment, paired with a 4pt scale for tight inline components and micro-padding.
        </p>
      </div>

      {/* 8pt Spatial Grid Scale Visualizer Cards */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Spatial Grid Scale (8pt Baseline)
          </h2>
          <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950 px-3 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
            8 Scale Tokens
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTokens.map((token) => (
            <div
              key={token.name}
              className="p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-indigo-500 transition-all shadow-xs flex flex-col justify-between gap-4 group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold font-mono text-[var(--text-primary)]">
                      {token.name}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {token.alias}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[var(--text-secondary)]">
                    {token.rem}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  {token.usage}
                </p>
              </div>

              {/* Visual Scale Bar */}
              <div className="flex flex-col gap-1.5">
                <div className="w-full h-8 bg-grid-pattern rounded-xl border border-[var(--border-default)] p-1 flex items-center">
                  <div
                    className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-lg transition-all"
                    style={{ width: `${Math.min(100, (token.px / 64) * 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-mono text-[var(--text-secondary)]">
                    Tailwind: p-{token.px / 4} / gap-{token.px / 4}
                  </span>
                  <button
                    onClick={() => copyToken(`${token.px}px`, token.name)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    {copiedToken === token.name ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Spec</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Box Model & Mathematically Nested Border Radius Calculator */}
      <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[var(--border-default)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Box className="w-3.5 h-3.5" /> Optical Nesting Architecture
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Box Model & Nested Corner Radius Calculator
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Rule: <code className="font-mono bg-[var(--bg-surface)] px-1.5 py-0.5 rounded border border-[var(--border-default)]">Inner Corner Radius = Outer Radius - Padding</code>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Outer Radius Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                <span>Outer Container Radius</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{outerRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="32"
                step="4"
                value={outerRadius}
                onChange={(e) => setOuterRadius(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Container Padding Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                <span>Container Inner Padding</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{padding}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="48"
                step="4"
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Child Element Gap Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[var(--text-primary)] mb-1.5">
                <span>Child Elements Gap</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{gap}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="32"
                step="4"
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Calculation Result Cards */}
            <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Outer Radius:</span>
                <span className="text-[var(--text-primary)] font-bold">{outerRadius}px</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Padding Distance:</span>
                <span className="text-[var(--text-primary)] font-bold">{padding}px</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[var(--border-default)] text-indigo-600 dark:text-indigo-400 font-bold">
                <span>Calculated Inner Radius:</span>
                <span>{innerRadius}px</span>
              </div>
            </div>
          </div>

          {/* Interactive Live Nested Preview Box */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 bg-grid-pattern rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)]">
            <div
              className="w-full max-w-md border-2 border-indigo-600 dark:border-indigo-400 bg-indigo-500/10 transition-all flex flex-col shadow-lg"
              style={{
                borderRadius: `${outerRadius}px`,
                padding: `${padding}px`,
                gap: `${gap}px`,
              }}
            >
              <div className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                Outer Container (Radius: {outerRadius}px | Padding: {padding}px)
              </div>

              {/* Nested Child Cards */}
              <div
                className="p-4 bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-xs transition-all"
                style={{ borderRadius: `${innerRadius}px` }}
              >
                <div className="text-xs font-bold text-[var(--text-primary)]">
                  Child Component 1
                </div>
                <div className="text-[11px] font-mono text-[var(--text-secondary)] mt-0.5">
                  Calculated Corner Radius: <span className="font-bold text-indigo-600 dark:text-indigo-400">{innerRadius}px</span>
                </div>
              </div>

              <div
                className="p-4 bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-xs transition-all"
                style={{ borderRadius: `${innerRadius}px` }}
              >
                <div className="text-xs font-bold text-[var(--text-primary)]">
                  Child Component 2
                </div>
                <div className="text-[11px] font-mono text-[var(--text-secondary)] mt-0.5">
                  Seamless optical curve alignment without visual clipping defects.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { TYPOGRAPHY_TOKENS } from '../../data/tokens';
import { TypographyToken } from '../../types';
import {
  Type,
  Copy,
  Check,
  Sliders,
  Sparkles,
  Eye,
  AlignLeft,
} from 'lucide-react';

export const TypographySection: React.FC = () => {
  const { searchQuery, addToast } = useTheme();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [specimenText, setSpecimenText] = useState('Design systems scale product engineering across teams');
  const [showLineHeightGuides, setShowLineHeightGuides] = useState(false);

  const copyCode = (text: string, label: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast('Copied Typography Rule', `Copied ${label} rules to clipboard`, 'success');
    setTimeout(() => setCopiedId(null), 1800);
  };

  const filteredTokens = TYPOGRAPHY_TOKENS.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.usage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.weightLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-10">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
          Typography Hierarchy & Scale
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          Typography Scale (Inter / System UI)
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-3xl leading-relaxed">
          Base font size is 16px (1rem). Every heading and text token adheres strictly to explicit font weight, line height, and proportional scale definitions.
        </p>
      </div>

      {/* Live Specimen Playground */}
      <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border-default)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Sliders className="w-3.5 h-3.5" /> Interactive Specimen Playground
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Live Type Specimen Tester
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLineHeightGuides(!showLineHeightGuides)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                showLineHeightGuides
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-[var(--bg-surface)] border-[var(--border-default)] text-[var(--text-primary)] hover:border-indigo-500'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showLineHeightGuides ? 'Hide Line Height Guides' : 'Show Line Height Guides'}</span>
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[var(--text-primary)] block mb-2">
            Customize Specimen Text
          </label>
          <input
            type="text"
            value={specimenText}
            onChange={(e) => setSpecimenText(e.target.value)}
            className="w-full px-4 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="Type custom text to preview typography scale..."
          />
        </div>

        {/* Live Typography Preview Stack */}
        <div className="flex flex-col gap-8 p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)]">
          {filteredTokens.map((token) => (
            <div
              key={token.id}
              className="group flex flex-col gap-2 border-b border-[var(--border-default)] last:border-0 pb-6 last:pb-0"
            >
              {/* Token metadata strip */}
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                <div className="flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400">
                  <span>{token.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 font-normal">
                    {token.px}px / {token.rem}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span>Line Height: {token.lineHeightPx}px</span>
                  <span>Weight: {token.weight} ({token.weightLabel})</span>
                </div>
              </div>

              {/* Specimen Box */}
              <div
                className={`relative transition-all py-1 ${
                  showLineHeightGuides
                    ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-y border-dashed border-indigo-400/50'
                    : ''
                }`}
                style={{
                  fontSize: `${token.px}px`,
                  lineHeight: `${token.lineHeightPx}px`,
                  fontWeight: token.weight,
                }}
              >
                <div className="text-[var(--text-primary)] break-words">
                  {specimenText || token.name}
                </div>
              </div>

              {/* CSS Rule Copy Footer */}
              <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                <code className="text-[11px] font-mono text-[var(--text-secondary)] bg-[var(--bg-surface-raised)] px-2.5 py-1 rounded-md border border-[var(--border-default)]">
                  {token.cssRule}
                </code>
                <button
                  onClick={() => copyCode(token.cssRule, token.name, token.id)}
                  className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {copiedId === token.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied CSS</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy CSS Rule</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Token Matrix Table */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">
          Typography Token Specification Table
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                <th className="py-3.5 px-4">Level Name</th>
                <th className="py-3.5 px-4">Font Size</th>
                <th className="py-3.5 px-4">Line Height</th>
                <th className="py-3.5 px-4">Font Weight</th>
                <th className="py-3.5 px-4">Usage Specification</th>
                <th className="py-3.5 px-4">Tailwind Utility</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-default)] text-xs">
              {TYPOGRAPHY_TOKENS.map((token) => (
                <tr key={token.id} className="hover:bg-[var(--bg-surface-raised)]/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[var(--text-primary)]">
                    {token.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                    {token.px}px <span className="text-[var(--text-secondary)] font-normal">({token.rem})</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {token.lineHeightPx}px <span className="text-[var(--text-secondary)] font-normal">({token.lineHeightRem})</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {token.weight} <span className="text-[var(--text-secondary)] font-normal">({token.weightLabel})</span>
                  </td>
                  <td className="py-3.5 px-4 text-[var(--text-secondary)] font-medium max-w-xs">
                    {token.usage}
                  </td>
                  <td className="py-3.5 px-4">
                    <code className="text-[11px] font-mono bg-[var(--bg-surface-raised)] border border-[var(--border-default)] px-2 py-0.5 rounded text-[var(--text-primary)]">
                      {token.tailwindClass}
                    </code>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => copyCode(token.tailwindClass, token.name, `tw-${token.id}`)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface-raised)] hover:border-indigo-500 text-[var(--text-primary)] transition-colors text-[11px] font-medium"
                    >
                      <Copy className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                      <span>Copy Class</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

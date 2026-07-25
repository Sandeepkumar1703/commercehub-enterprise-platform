import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { SEMANTIC_TOKENS, PALETTE_FAMILIES } from '../../data/tokens';
import { PaletteFamily, ColorScaleItem } from '../../types';
import {
  Copy,
  Check,
  Info,
  Sliders,
  CheckCircle2,
  XCircle,
  Eye,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';

export const ColorPaletteSection: React.FC = () => {
  const { searchQuery, addToast, themeMode } = useTheme();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [selectedFamily, setSelectedFamily] = useState<string>('indigo');

  // Contrast Ratio Calculator State
  const [fgColor, setFgColor] = useState('#0F172A');
  const [bgColor, setBgColor] = useState('#FFFFFF');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(text);
    addToast('Copied Color Token', `Copied ${text} (${label}) to clipboard`, 'success');
    setTimeout(() => setCopiedHex(null), 1800);
  };

  // Helper function to calculate luminance and WCAG contrast ratio
  const getLuminance = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length !== 6) return 0.5;
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

    const a = [r, g, b].map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const calculateContrast = (hex1: string, hex2: string) => {
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
  };

  const contrastRatio = parseFloat(calculateContrast(fgColor, bgColor));
  const passesAA = contrastRatio >= 4.5;
  const passesAAA = contrastRatio >= 7.0;

  const filteredTokens = SEMANTIC_TOKENS.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.usage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.lightMode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.darkMode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activePalette = PALETTE_FAMILIES.find((f) => f.id === selectedFamily) || PALETTE_FAMILIES[0];

  return (
    <div className="flex flex-col gap-10">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
          Foundations & Token Architecture
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          Color Palette & Semantic Token Mapping
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-3xl leading-relaxed">
          The color foundation utilizes a 100–900 lightness scale mapped directly to semantic variables for seamless Light Mode (#FFFFFF) and Dark Mode (#0F172A) switching.
        </p>
      </div>

      {/* Semantic Token Mapping Table */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Semantic Design Tokens
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Abstracted tokens ensuring theme adaptability and visual consistency.
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-surface-raised)] border border-[var(--border-default)] px-3 py-1 rounded-lg">
            {filteredTokens.length} Tokens
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                <th className="py-3.5 px-4">Token Name</th>
                <th className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-500" /> Light Mode
                  </div>
                </th>
                <th className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5 text-indigo-400" /> Dark Mode
                  </div>
                </th>
                <th className="py-3.5 px-4">Preview Swatch</th>
                <th className="py-3.5 px-4">Usage Specification</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-default)] text-xs">
              {filteredTokens.map((token) => {
                const isCurrentActiveHex = themeMode === 'dark' ? token.darkMode : token.lightMode;
                return (
                  <tr key={token.id} className="hover:bg-[var(--bg-surface-raised)]/80 transition-colors">
                    {/* Token Name */}
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {token.name}
                    </td>

                    {/* Light Mode Value */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full border border-slate-200 dark:border-slate-700 shadow-xs"
                          style={{ backgroundColor: token.lightMode }}
                        />
                        <code className="font-mono text-[var(--text-primary)]">{token.lightMode}</code>
                      </div>
                    </td>

                    {/* Dark Mode Value */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full border border-slate-200 dark:border-slate-700 shadow-xs"
                          style={{ backgroundColor: token.darkMode }}
                        />
                        <code className="font-mono text-[var(--text-primary)]">{token.darkMode}</code>
                      </div>
                    </td>

                    {/* Live Preview Swatch */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="px-3 py-1.5 rounded-lg border border-[var(--border-default)] font-mono text-[11px] font-semibold shadow-xs flex items-center justify-between gap-3 min-w-[130px]"
                          style={{
                            backgroundColor: isCurrentActiveHex,
                            color: getLuminance(isCurrentActiveHex) > 0.45 ? '#0F172A' : '#F8FAFC',
                          }}
                        >
                          <span>{themeMode === 'dark' ? 'Dark' : 'Light'} Swatch</span>
                          <span className="text-[10px] opacity-80">{isCurrentActiveHex}</span>
                        </div>
                      </div>
                    </td>

                    {/* Usage */}
                    <td className="py-3.5 px-4 text-[var(--text-secondary)] font-medium max-w-xs">
                      {token.usage}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => copyToClipboard(isCurrentActiveHex, token.name)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface-raised)] hover:border-indigo-500 text-[var(--text-primary)] transition-colors text-[11px] font-medium"
                      >
                        {copiedHex === isCurrentActiveHex ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                            <span>Copy Hex</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 100–900 Lightness Scale Matrix */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            100–900 Lightness Color Scales
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Systematic color ramps providing precise weight gradations for interactive states, backgrounds, and borders.
          </p>
        </div>

        {/* Color Family Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {PALETTE_FAMILIES.map((fam) => (
            <button
              key={fam.id}
              onClick={() => setSelectedFamily(fam.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFamily === fam.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-[var(--bg-surface-raised)] border border-[var(--border-default)] text-[var(--text-primary)] hover:border-indigo-500'
              }`}
            >
              {fam.name}
            </button>
          ))}
        </div>

        {/* Active Scale Grid */}
        <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-sm flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[var(--border-default)] pb-4">
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                {activePalette.name}
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                {activePalette.description}
              </p>
            </div>
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950 px-3 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
              Scale 100 → 900
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
            {activePalette.shades.map((shade) => {
              const lum = getLuminance(shade.hex);
              const textColor = lum > 0.4 ? '#0F172A' : '#FFFFFF';
              const contrastVersusWhite = calculateContrast(shade.hex, '#FFFFFF');

              return (
                <div
                  key={shade.shade}
                  onClick={() => copyToClipboard(shade.hex, `${activePalette.name} ${shade.shade}`)}
                  className="group cursor-pointer flex flex-col rounded-xl overflow-hidden border border-[var(--border-default)] hover:scale-[1.03] transition-all shadow-xs"
                >
                  {/* Swatch Block */}
                  <div
                    className="h-24 p-3 flex flex-col justify-between transition-colors relative"
                    style={{ backgroundColor: shade.hex }}
                  >
                    <span
                      className="text-[11px] font-bold font-mono px-1.5 py-0.5 rounded backdrop-blur-xs bg-black/10 text-white w-max"
                      style={{ color: textColor }}
                    >
                      {shade.shade}
                    </span>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold" style={{ color: textColor }}>
                        {shade.hex}
                      </span>
                      <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: textColor }} />
                    </div>
                  </div>

                  {/* Info footer */}
                  <div className="p-2.5 bg-[var(--bg-surface-raised)] flex flex-col gap-1 border-t border-[var(--border-default)] text-[10px]">
                    <div className="flex items-center justify-between text-[var(--text-secondary)]">
                      <span>Contrast (vs #FFF)</span>
                      <span className="font-mono font-bold">{contrastVersusWhite}:1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-[var(--text-secondary)]">WCAG AA</span>
                      {parseFloat(contrastVersusWhite) >= 4.5 ? (
                        <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">PASS</span>
                      ) : (
                        <span className="text-[9px] text-slate-400 font-bold">FAIL</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive WCAG Contrast Ratio Checker */}
      <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Sliders className="w-3.5 h-3.5" /> Accessibility Studio
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              WCAG Contrast Ratio Calculator
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Verify color contrast requirements (WCAG 2.1 AA requirement: minimum 4.5:1 for normal body text).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-[var(--text-primary)] block mb-1.5">
                Foreground (Text) Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer border border-[var(--border-default)]"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs font-mono rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] uppercase"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--text-primary)] block mb-1.5">
                Background Surface Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer border border-[var(--border-default)]"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs font-mono rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] uppercase"
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-[var(--text-secondary)]">Token Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setFgColor('#0F172A'); setBgColor('#FFFFFF'); }}
                  className="px-2.5 py-1 text-[10px] font-mono rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-indigo-500"
                >
                  Primary Text / White
                </button>
                <button
                  onClick={() => { setFgColor('#6366F1'); setBgColor('#FFFFFF'); }}
                  className="px-2.5 py-1 text-[10px] font-mono rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-indigo-500"
                >
                  Brand / Surface
                </button>
                <button
                  onClick={() => { setFgColor('#F8FAFC'); setBgColor('#0F172A'); }}
                  className="px-2.5 py-1 text-[10px] font-mono rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-indigo-500"
                >
                  Dark Primary / Surface
                </button>
              </div>
            </div>
          </div>

          {/* Contrast Display */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-center gap-2">
            <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
              Calculated Ratio
            </span>
            <div className="text-4xl font-extrabold font-mono text-[var(--text-primary)]">
              {contrastRatio}:1
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800">
                {passesAA ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span>AA Normal ({passesAA ? 'Pass' : 'Fail'})</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800">
                {passesAAA ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span>AAA Enhanced ({passesAAA ? 'Pass' : 'Fail'})</span>
              </div>
            </div>
          </div>

          {/* Live Text Preview Box */}
          <div
            className="p-6 rounded-2xl border border-[var(--border-default)] flex flex-col justify-center gap-2 shadow-inner"
            style={{ backgroundColor: bgColor }}
          >
            <p className="text-[11px] uppercase tracking-wider font-bold opacity-60" style={{ color: fgColor }}>
              Live Sample Preview
            </p>
            <h4 className="text-lg font-bold" style={{ color: fgColor }}>
              The quick brown fox jumps over the lazy dog.
            </h4>
            <p className="text-xs leading-relaxed" style={{ color: fgColor }}>
              Accessibility ensures design system interfaces are legibly formatted across diverse display devices and lighting conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

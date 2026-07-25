import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ButtonVariant, ButtonSize, ComponentState, ButtonConfig } from '../../types';
import {
  MousePointer,
  Copy,
  Check,
  Loader2,
  Sparkles,
  ArrowRight,
  Plus,
  Trash2,
  Sliders,
  Figma,
} from 'lucide-react';

export const ButtonMatrixSection: React.FC = () => {
  const { addToast } = useTheme();
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Single Component Interactive Studio Config
  const [btnConfig, setBtnConfig] = useState<ButtonConfig>({
    variant: 'primary',
    size: 'medium',
    state: 'default',
    hasLeftIcon: true,
    hasRightIcon: false,
    label: 'Interactive Action',
  });

  const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'destructive'];
  const sizes: ButtonSize[] = ['small', 'medium', 'large'];
  const states: ComponentState[] = ['default', 'hover', 'focused', 'pressed', 'disabled', 'loading'];

  // Helper to render the styled button based on config
  const renderStyledButton = (config: ButtonConfig, customClass = '') => {
    const { variant, size, state, hasLeftIcon, hasRightIcon, label } = config;

    // Height & Padding classes per size
    const sizeClasses = {
      small: 'h-8 px-3 text-xs gap-1.5 rounded-lg font-medium', // 32px height
      medium: 'h-10 px-4 text-sm gap-2 rounded-xl font-semibold', // 40px height
      large: 'h-12 px-5 text-base gap-2.5 rounded-2xl font-semibold', // 48px height
    }[size];

    // Variant classes
    const variantClasses = {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm',
      secondary: 'bg-[var(--bg-surface-raised)] border border-[var(--border-default)] text-[var(--text-primary)] hover:border-indigo-500 active:bg-slate-200 dark:active:bg-slate-700',
      outline: 'border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50',
      ghost: 'text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)] hover:text-indigo-600 dark:hover:text-indigo-400',
      destructive: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 dark:bg-red-500 dark:hover:bg-red-600 shadow-sm',
    }[variant];

    // State override classes
    let stateOverride = '';
    if (state === 'hover') {
      stateOverride = 'ring-2 ring-indigo-500/30 scale-[1.02]';
    } else if (state === 'focused') {
      stateOverride = variant === 'destructive' ? 'focus-ring-danger ring-2 ring-red-500' : 'focus-ring ring-2 ring-indigo-500';
    } else if (state === 'pressed') {
      stateOverride = 'scale-[0.98] brightness-90';
    } else if (state === 'disabled') {
      stateOverride = 'opacity-50 cursor-not-allowed pointer-events-none shadow-none';
    }

    const isLoading = state === 'loading';
    const isDisabled = state === 'disabled' || isLoading;

    return (
      <button
        disabled={isDisabled}
        onClick={() => addToast('Button Triggered', `Clicked ${variant} button (${size})`, 'info')}
        className={`inline-flex items-center justify-center transition-all duration-150 cursor-pointer ${sizeClasses} ${variantClasses} ${stateOverride} ${customClass}`}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          <>
            {hasLeftIcon && <Plus className="w-4 h-4 shrink-0" />}
            <span>{label}</span>
            {hasRightIcon && <ArrowRight className="w-4 h-4 shrink-0" />}
          </>
        )}
      </button>
    );
  };

  // Generate JSX Code Snippet
  const generateCodeSnippet = () => {
    const sizeMap = { small: '32px (h-8)', medium: '40px (h-10)', large: '48px (h-12)' };
    return `<button
  className="${btnConfig.variant === 'primary' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : btnConfig.variant === 'destructive' ? 'bg-red-600 hover:bg-red-700 text-white' : 'border border-slate-200 text-slate-900'} ${btnConfig.size === 'small' ? 'h-8 px-3 text-xs' : btnConfig.size === 'medium' ? 'h-10 px-4 text-sm' : 'h-12 px-5 text-base'} rounded-xl font-semibold transition-all inline-flex items-center gap-2"
  ${btnConfig.state === 'disabled' ? 'disabled' : ''}
>
  ${btnConfig.state === 'loading' ? '<Loader2 className="w-4 h-4 animate-spin" />' : ''}
  ${btnConfig.hasLeftIcon && btnConfig.state !== 'loading' ? '<Plus className="w-4 h-4" />\n  ' : ''}${btnConfig.label}
  ${btnConfig.hasRightIcon && btnConfig.state !== 'loading' ? '\n  <ArrowRight className="w-4 h-4" />' : ''}
</button>`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateCodeSnippet());
    setCopiedCode(true);
    addToast('Copied JSX Code', 'Button code snippet copied to clipboard', 'success');
    setTimeout(() => setCopiedCode(false), 1800);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
          Core Component Matrix
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          Buttons Specification & State Matrix
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-3xl leading-relaxed">
          Comprehensive button matrix supporting 5 variants (Primary, Secondary, Outline, Ghost, Destructive), 3 standardized heights (Small 32px, Medium 40px, Large 48px), and full interactive states.
        </p>
      </div>

      {/* Interactive Button Studio */}
      <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Sliders className="w-3.5 h-3.5" /> Live Component Configurator
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Interactive Component Studio
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-5 flex flex-col gap-5 p-5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)]">
            {/* Variant Switcher */}
            <div>
              <label className="text-xs font-semibold text-[var(--text-primary)] block mb-1.5">
                Variant Property
              </label>
              <div className="flex flex-wrap gap-1.5">
                {variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setBtnConfig({ ...btnConfig, variant: v })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                      btnConfig.variant === v
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'border border-[var(--border-default)] text-[var(--text-primary)] hover:border-indigo-500'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Switcher */}
            <div>
              <label className="text-xs font-semibold text-[var(--text-primary)] block mb-1.5">
                Size (Height Spec)
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setBtnConfig({ ...btnConfig, size: s })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                      btnConfig.size === s
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'border border-[var(--border-default)] text-[var(--text-primary)] hover:border-indigo-500'
                    }`}
                  >
                    {s} ({s === 'small' ? '32px' : s === 'medium' ? '40px' : '48px'})
                  </button>
                ))}
              </div>
            </div>

            {/* State Switcher */}
            <div>
              <label className="text-xs font-semibold text-[var(--text-primary)] block mb-1.5">
                Interactive State
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {states.map((st) => (
                  <button
                    key={st}
                    onClick={() => setBtnConfig({ ...btnConfig, state: st })}
                    className={`px-2 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                      btnConfig.state === st
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'border border-[var(--border-default)] text-[var(--text-primary)] hover:border-indigo-500'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Boolean Icon Toggles & Label Input */}
            <div className="flex flex-col gap-3 pt-3 border-t border-[var(--border-default)]">
              <div>
                <label className="text-xs font-semibold text-[var(--text-primary)] block mb-1">
                  Button Label Text
                </label>
                <input
                  type="text"
                  value={btnConfig.label}
                  onChange={(e) => setBtnConfig({ ...btnConfig, label: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)]"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)]">
                <span>Left Icon Slot (Boolean)</span>
                <input
                  type="checkbox"
                  checked={btnConfig.hasLeftIcon}
                  onChange={(e) => setBtnConfig({ ...btnConfig, hasLeftIcon: e.target.checked })}
                  className="w-4 h-4 accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)]">
                <span>Right Icon Slot (Boolean)</span>
                <input
                  type="checkbox"
                  checked={btnConfig.hasRightIcon}
                  onChange={(e) => setBtnConfig({ ...btnConfig, hasRightIcon: e.target.checked })}
                  className="w-4 h-4 accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Preview Canvas & Code Output */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Live Component Render Stage */}
            <div className="min-h-[220px] p-8 rounded-2xl border border-[var(--border-default)] bg-grid-pattern bg-[var(--bg-surface)] flex flex-col items-center justify-center gap-2 shadow-inner">
              <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                Live Interactive Canvas
              </span>
              {renderStyledButton(btnConfig)}
            </div>

            {/* Code Output Card */}
            <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)]">
                <span>React / JSX Snippet</span>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-lg bg-[var(--bg-surface-raised)] text-[11px] font-mono text-[var(--text-primary)] overflow-x-auto">
                {generateCodeSnippet()}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Variant x Size Matrix Table */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">
          Complete Component Matrix (Variants x Sizes)
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                <th className="py-3.5 px-4">Variant Name</th>
                <th className="py-3.5 px-4">Small (32px h)</th>
                <th className="py-3.5 px-4">Medium (40px h)</th>
                <th className="py-3.5 px-4">Large (48px h)</th>
                <th className="py-3.5 px-4">Disabled State</th>
                <th className="py-3.5 px-4">Loading State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-default)] text-xs">
              {variants.map((v) => (
                <tr key={v} className="hover:bg-[var(--bg-surface-raised)]/80 transition-colors">
                  <td className="py-4 px-4 font-bold capitalize text-indigo-600 dark:text-indigo-400 font-mono">
                    {v}
                  </td>
                  <td className="py-4 px-4">
                    {renderStyledButton({ variant: v, size: 'small', state: 'default', hasLeftIcon: true, hasRightIcon: false, label: 'Small' })}
                  </td>
                  <td className="py-4 px-4">
                    {renderStyledButton({ variant: v, size: 'medium', state: 'default', hasLeftIcon: true, hasRightIcon: false, label: 'Medium' })}
                  </td>
                  <td className="py-4 px-4">
                    {renderStyledButton({ variant: v, size: 'large', state: 'default', hasLeftIcon: true, hasRightIcon: false, label: 'Large' })}
                  </td>
                  <td className="py-4 px-4">
                    {renderStyledButton({ variant: v, size: 'medium', state: 'disabled', hasLeftIcon: false, hasRightIcon: false, label: 'Disabled' })}
                  </td>
                  <td className="py-4 px-4">
                    {renderStyledButton({ variant: v, size: 'medium', state: 'loading', hasLeftIcon: false, hasRightIcon: false, label: 'Loading' })}
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

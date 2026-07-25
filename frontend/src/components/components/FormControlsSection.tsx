import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { InputConfig, InputState } from '../../types';
import {
  FormInput,
  Mail,
  Search,
  CheckCircle2,
  AlertCircle,
  XCircle,
  X,
  Lock,
  ChevronDown,
  Copy,
  Check,
  Sliders,
} from 'lucide-react';

export const FormControlsSection: React.FC = () => {
  const { addToast } = useTheme();
  const [copiedCode, setCopiedCode] = useState(false);

  // Form Input Config State
  const [inputConfig, setInputConfig] = useState<InputConfig>({
    label: 'Email Address',
    placeholder: 'enter.name@company.com',
    helperText: 'We will send a confirmation link to this address.',
    state: 'default',
    hasPrefixIcon: true,
    prefixText: '',
    hasSuffixIcon: true,
    suffixType: 'clear',
    value: 'sandeep@google.com',
  });

  const [selectValue, setSelectValue] = useState('united-states');

  const states: InputState[] = ['default', 'focused', 'invalid', 'disabled'];

  // Clear handler
  const handleClear = () => {
    setInputConfig({ ...inputConfig, value: '' });
  };

  // Generate Form Control Code Snippet
  const generateFormCode = () => {
    return `<div className="flex flex-col gap-1.5 w-full">
  <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
    ${inputConfig.label}
  </label>

  <div className="relative flex items-center w-full">
    ${inputConfig.hasPrefixIcon ? '<Mail className="absolute left-3 w-4 h-4 text-slate-400" />\n    ' : ''}<input
      type="email"
      placeholder="${inputConfig.placeholder}"
      value="${inputConfig.value}"
      ${inputConfig.state === 'disabled' ? 'disabled' : ''}
      className="w-full ${inputConfig.hasPrefixIcon ? 'pl-9' : 'pl-3.5'} ${inputConfig.hasSuffixIcon ? 'pr-9' : 'pr-3.5'} py-2.5 text-sm rounded-xl border ${
        inputConfig.state === 'invalid'
          ? 'border-red-500 focus:ring-2 focus:ring-red-500'
          : inputConfig.state === 'focused'
          ? 'border-indigo-500 focus-ring'
          : 'border-slate-200 dark:border-slate-700'
      } bg-white dark:bg-slate-900 transition-all"
    />
    ${inputConfig.hasSuffixIcon ? '\n    <button className="absolute right-3 text-slate-400 hover:text-slate-600">\n      <X className="w-4 h-4" />\n    </button>' : ''}
  </div>

  <span className="text-xs ${inputConfig.state === 'invalid' ? 'text-red-500 font-semibold' : 'text-slate-500'}">
    ${inputConfig.state === 'invalid' ? 'Please enter a valid email address.' : inputConfig.helperText}
  </span>
</div>`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateFormCode());
    setCopiedCode(true);
    addToast('Copied Form Code', 'Form input code snippet copied to clipboard', 'success');
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
          Form Controls (Inputs, Selects & Dropdowns)
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-3xl leading-relaxed">
          Form inputs engineered with auto-layout container structure, explicit label / helper text hierarchy, focus offset rings, and customizable prefix/suffix slot elements.
        </p>
      </div>

      {/* Interactive Form Controls Studio */}
      <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Sliders className="w-3.5 h-3.5" /> Interactive Input Builder
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Form Control Configurator
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-5 flex flex-col gap-5 p-5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)]">
            {/* Input State Switcher */}
            <div>
              <label className="text-xs font-semibold text-[var(--text-primary)] block mb-1.5">
                Input State
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {states.map((st) => (
                  <button
                    key={st}
                    onClick={() => setInputConfig({ ...inputConfig, state: st })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                      inputConfig.state === st
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'border border-[var(--border-default)] text-[var(--text-primary)] hover:border-indigo-500'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Label & Helper Text Config */}
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-[var(--text-primary)] block mb-1">
                  Label Text
                </label>
                <input
                  type="text"
                  value={inputConfig.label}
                  onChange={(e) => setInputConfig({ ...inputConfig, label: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-primary)] block mb-1">
                  Helper / Error Text
                </label>
                <input
                  type="text"
                  value={inputConfig.helperText}
                  onChange={(e) => setInputConfig({ ...inputConfig, helperText: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)]"
                />
              </div>
            </div>

            {/* Slot Booleans */}
            <div className="flex flex-col gap-3 pt-3 border-t border-[var(--border-default)]">
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)]">
                <span>Prefix Icon Slot (Mail)</span>
                <input
                  type="checkbox"
                  checked={inputConfig.hasPrefixIcon}
                  onChange={(e) => setInputConfig({ ...inputConfig, hasPrefixIcon: e.target.checked })}
                  className="w-4 h-4 accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)]">
                <span>Suffix Clear Button Slot</span>
                <input
                  type="checkbox"
                  checked={inputConfig.hasSuffixIcon}
                  onChange={(e) => setInputConfig({ ...inputConfig, hasSuffixIcon: e.target.checked })}
                  className="w-4 h-4 accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Interactive Live Input Preview */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="p-8 rounded-2xl border border-[var(--border-default)] bg-grid-pattern bg-[var(--bg-surface)] flex flex-col gap-6 shadow-inner">
              {/* Text Input Render */}
              <div className="flex flex-col gap-1.5 w-full max-w-md mx-auto">
                <label className="text-xs font-semibold text-[var(--text-primary)] flex items-center justify-between">
                  <span>{inputConfig.label}</span>
                  {inputConfig.state === 'invalid' && (
                    <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
                      Required Field
                    </span>
                  )}
                </label>

                <div className="relative flex items-center w-full">
                  {inputConfig.hasPrefixIcon && (
                    <Mail className="absolute left-3.5 w-4 h-4 text-[var(--text-secondary)] pointer-events-none" />
                  )}

                  <input
                    type="text"
                    value={inputConfig.value}
                    onChange={(e) => setInputConfig({ ...inputConfig, value: e.target.value })}
                    placeholder={inputConfig.placeholder}
                    disabled={inputConfig.state === 'disabled'}
                    className={`w-full text-sm rounded-xl py-2.5 transition-all bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] ${
                      inputConfig.hasPrefixIcon ? 'pl-10' : 'pl-3.5'
                    } ${inputConfig.hasSuffixIcon ? 'pr-10' : 'pr-3.5'} ${
                      inputConfig.state === 'invalid'
                        ? 'border-2 border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500'
                        : inputConfig.state === 'focused'
                        ? 'border-2 border-indigo-600 dark:border-indigo-400 focus-ring'
                        : inputConfig.state === 'disabled'
                        ? 'bg-[var(--bg-surface-raised)] border border-[var(--border-default)] opacity-60 cursor-not-allowed'
                        : 'border border-[var(--border-default)] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                    }`}
                  />

                  {inputConfig.hasSuffixIcon && inputConfig.value && inputConfig.state !== 'disabled' && (
                    <button
                      onClick={handleClear}
                      className="absolute right-3.5 p-1 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)] transition-colors"
                      title="Clear field"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <p
                  className={`text-xs mt-0.5 ${
                    inputConfig.state === 'invalid'
                      ? 'text-red-500 font-semibold flex items-center gap-1'
                      : 'text-[var(--text-secondary)]'
                  }`}
                >
                  {inputConfig.state === 'invalid' ? (
                    <>
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Please enter a valid email address.</span>
                    </>
                  ) : (
                    inputConfig.helperText
                  )}
                </p>
              </div>

              {/* Select Dropdown Example */}
              <div className="flex flex-col gap-1.5 w-full max-w-md mx-auto pt-6 border-t border-[var(--border-default)]">
                <label className="text-xs font-semibold text-[var(--text-primary)]">
                  Country / Region Select
                </label>

                <div className="relative flex items-center w-full">
                  <select
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value)}
                    className="w-full text-sm rounded-xl py-2.5 pl-3.5 pr-10 appearance-none bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                  >
                    <option value="united-states">United States (US)</option>
                    <option value="canada">Canada (CA)</option>
                    <option value="germany">Germany (DE)</option>
                    <option value="japan">Japan (JP)</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 w-4 h-4 text-[var(--text-secondary)] pointer-events-none" />
                </div>
                <span className="text-xs text-[var(--text-secondary)]">
                  Select container utilizes custom down icon slot with auto-layout padding.
                </span>
              </div>
            </div>

            {/* Code Output */}
            <div className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)]">
                <span>React / JSX Code Snippet</span>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-lg bg-[var(--bg-surface-raised)] text-[11px] font-mono text-[var(--text-primary)] overflow-x-auto">
                {generateFormCode()}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

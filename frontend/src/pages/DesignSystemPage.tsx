import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DESIGN_TOKENS } from '../theme/constants';
import { Palette, Layers, Type, MousePointerClick, ShieldCheck, Globe } from 'lucide-react';

export const DesignSystemPage: React.FC = () => {
  const { language, setLanguage, supportedLanguages } = useLanguage();

  return (
    <div className="space-y-12 py-6">
      
      {/* Title */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white border border-purple-800/40 shadow-xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30">
            <Palette className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            CommerceHub Design System & Tokens
          </h1>
        </div>
        <p className="text-xs text-purple-200 leading-relaxed max-w-3xl">
          Centralized Figma 8pt grid specification for colors, typography scales, spacing tokens, button variants, and multi-language support.
        </p>
      </div>

      {/* Color Palette Grid */}
      <div className="bg-[var(--bg-surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border-default)] shadow-xs space-y-6">
        <h3 className="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
          <Palette className="w-5 h-5 text-indigo-500" />
          <span>Semantic CSS Variables & Color Tokens</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-[var(--border-default)] space-y-2">
            <div className="h-12 rounded-lg bg-[var(--brand-primary)]"></div>
            <p className="text-xs font-bold text-[var(--text-primary)]">Brand Primary</p>
            <p className="text-[10px] font-mono text-[var(--text-secondary)]">var(--brand-primary)</p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border-default)] space-y-2">
            <div className="h-12 rounded-lg bg-[var(--brand-hover)]"></div>
            <p className="text-xs font-bold text-[var(--text-primary)]">Brand Hover</p>
            <p className="text-[10px] font-mono text-[var(--text-secondary)]">var(--brand-hover)</p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border-default)] space-y-2">
            <div className="h-12 rounded-lg bg-emerald-500"></div>
            <p className="text-xs font-bold text-[var(--text-primary)]">Status Success</p>
            <p className="text-[10px] font-mono text-[var(--text-secondary)]">var(--status-success)</p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border-default)] space-y-2">
            <div className="h-12 rounded-lg bg-rose-500"></div>
            <p className="text-xs font-bold text-[var(--text-primary)]">Status Danger</p>
            <p className="text-[10px] font-mono text-[var(--text-secondary)]">var(--status-danger)</p>
          </div>
        </div>
      </div>

      {/* Typography Scale */}
      <div className="bg-[var(--bg-surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border-default)] shadow-xs space-y-6">
        <h3 className="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
          <Type className="w-5 h-5 text-indigo-500" />
          <span>Typography Scales</span>
        </h3>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)]">
            <span className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Heading H1</span>
            <span className={DESIGN_TOKENS.typography.h1}>CommerceHub Monolith</span>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)]">
            <span className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Heading H2</span>
            <span className={DESIGN_TOKENS.typography.h2}>Enterprise Architecture</span>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)]">
            <span className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Heading H3</span>
            <span className={DESIGN_TOKENS.typography.h3}>Modular Component Library</span>
          </div>
        </div>
      </div>

      {/* Interactive Button Components */}
      <div className="bg-[var(--bg-surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border-default)] shadow-xs space-y-6">
        <h3 className="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
          <MousePointerClick className="w-5 h-5 text-indigo-500" />
          <span>Button Component Tokens</span>
        </h3>

        <div className="flex flex-wrap gap-4">
          <button className={DESIGN_TOKENS.buttons.primary}>
            Primary Action
          </button>
          <button className={DESIGN_TOKENS.buttons.secondary}>
            Secondary Action
          </button>
          <button className={DESIGN_TOKENS.buttons.outline}>
            Outline Button
          </button>
          <button className={DESIGN_TOKENS.buttons.ghost}>
            Ghost Action
          </button>
          <button className={DESIGN_TOKENS.buttons.danger}>
            Danger Action
          </button>
        </div>
      </div>

      {/* i18n Matrix */}
      <div className="bg-[var(--bg-surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border-default)] shadow-xs space-y-6">
        <h3 className="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-500" />
          <span>Active Internationalization (i18n) Supported Languages</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {supportedLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                language === lang.code
                  ? 'border-[var(--brand-primary)] bg-[var(--bg-surface-raised)] font-bold'
                  : 'border-[var(--border-default)] hover:border-[var(--brand-primary)]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{lang.flag}</span>
                <span className="text-xs font-bold text-[var(--text-primary)]">{lang.nativeName}</span>
              </div>
              <p className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">
                Code: {lang.code}
              </p>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

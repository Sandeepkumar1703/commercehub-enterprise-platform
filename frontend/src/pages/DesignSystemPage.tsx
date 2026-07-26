import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DESIGN_TOKENS } from '../theme/constants';
import { Palette, Layers, Type, MousePointerClick, ShieldCheck, Globe } from 'lucide-react';

export const DesignSystemPage: React.FC = () => {
  const { language, setLanguage, supportedLanguages } = useLanguage();

  return (
    <div className="space-y-12 py-6">
      
      {/* Title */}
      <div className="p-8 rounded-3xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#EEF4F8] dark:bg-[#2B3645] text-[#4F6D8C] dark:text-[#88BDF2] border border-[#D6DEE6] dark:border-[#374151]">
            <Palette className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            CommerceHub Enterprise Design System
          </h1>
        </div>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-3xl">
          Single brand accent color architecture with neutral backgrounds, high-contrast typography, and refined enterprise tokens for Light (Primary #4F6D8C) and Dark (Primary #88BDF2) themes.
        </p>
      </div>

      {/* Color Palette Grid */}
      <div className="bg-[var(--bg-surface-raised)] p-6 sm:p-8 rounded-3xl border border-[var(--border-default)] shadow-xs space-y-6">
        <h3 className="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#4F6D8C] dark:text-[#88BDF2]" />
          <span>Recommended Enterprise Color Palette</span>
        </h3>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Light Theme Tokens</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] space-y-2">
              <div className="h-10 rounded-lg bg-[#4F6D8C]"></div>
              <p className="text-xs font-bold text-[var(--text-primary)]">Primary</p>
              <p className="text-[10px] font-mono text-[var(--text-secondary)]">#4F6D8C</p>
            </div>
            <div className="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] space-y-2">
              <div className="h-10 rounded-lg bg-[#3E5973]"></div>
              <p className="text-xs font-bold text-[var(--text-primary)]">Primary Hover</p>
              <p className="text-[10px] font-mono text-[var(--text-secondary)]">#3E5973</p>
            </div>
            <div className="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] space-y-2">
              <div className="h-10 rounded-lg bg-[#F8FAFC] border border-[#D6DEE6]"></div>
              <p className="text-xs font-bold text-[var(--text-primary)]">Background</p>
              <p className="text-[10px] font-mono text-[var(--text-secondary)]">#F8FAFC</p>
            </div>
            <div className="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] space-y-2">
              <div className="h-10 rounded-lg bg-[#FFFFFF] border border-[#D6DEE6]"></div>
              <p className="text-xs font-bold text-[var(--text-primary)]">Surface</p>
              <p className="text-[10px] font-mono text-[var(--text-secondary)]">#FFFFFF</p>
            </div>
            <div className="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] space-y-2">
              <div className="h-10 rounded-lg bg-[#EEF4F8] border border-[#D6DEE6]"></div>
              <p className="text-xs font-bold text-[var(--text-primary)]">Secondary BG</p>
              <p className="text-[10px] font-mono text-[var(--text-secondary)]">#EEF4F8</p>
            </div>
            <div className="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] space-y-2">
              <div className="h-10 rounded-lg bg-[#D6DEE6]"></div>
              <p className="text-xs font-bold text-[var(--text-primary)]">Border</p>
              <p className="text-[10px] font-mono text-[var(--text-secondary)]">#D6DEE6</p>
            </div>
          </div>

          <h4 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider pt-4">Dark Theme Tokens</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] space-y-2">
              <div className="h-10 rounded-lg bg-[#88BDF2]"></div>
              <p className="text-xs font-bold text-[var(--text-primary)]">Primary</p>
              <p className="text-[10px] font-mono text-[var(--text-secondary)]">#88BDF2</p>
            </div>
            <div className="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] space-y-2">
              <div className="h-10 rounded-lg bg-[#6EA8DF]"></div>
              <p className="text-xs font-bold text-[var(--text-primary)]">Primary Hover</p>
              <p className="text-[10px] font-mono text-[var(--text-secondary)]">#6EA8DF</p>
            </div>
            <div className="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] space-y-2">
              <div className="h-10 rounded-lg bg-[#111827]"></div>
              <p className="text-xs font-bold text-[var(--text-primary)]">Background</p>
              <p className="text-[10px] font-mono text-[var(--text-secondary)]">#111827</p>
            </div>
            <div className="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] space-y-2">
              <div className="h-10 rounded-lg bg-[#1F2937]"></div>
              <p className="text-xs font-bold text-[var(--text-primary)]">Surface</p>
              <p className="text-[10px] font-mono text-[var(--text-secondary)]">#1F2937</p>
            </div>
            <div className="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] space-y-2">
              <div className="h-10 rounded-lg bg-[#2B3645]"></div>
              <p className="text-xs font-bold text-[var(--text-primary)]">Secondary BG</p>
              <p className="text-[10px] font-mono text-[var(--text-secondary)]">#2B3645</p>
            </div>
            <div className="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] space-y-2">
              <div className="h-10 rounded-lg bg-[#374151]"></div>
              <p className="text-xs font-bold text-[var(--text-primary)]">Border</p>
              <p className="text-[10px] font-mono text-[var(--text-secondary)]">#374151</p>
            </div>
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

import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { SEMANTIC_TOKENS, PALETTE_FAMILIES, TYPOGRAPHY_TOKENS, SPACING_TOKENS } from '../../data/tokens';
import { X, Copy, Check, Download, Code2, FileCode, Sparkles } from 'lucide-react';

export const TokenExporterModal: React.FC = () => {
  const { isExporterOpen, setIsExporterOpen, addToast } = useTheme();
  const [activeTab, setActiveTab] = useState<'css' | 'json' | 'tailwind' | 'ts'>('css');
  const [copied, setCopied] = useState(false);

  if (!isExporterOpen) return null;

  // Generate CSS Variables
  const generateCSS = () => {
    let css = `/* Design System Architecture - Token Export */\n:root {\n  /* Semantic Color Tokens (Light Mode) */\n`;
    SEMANTIC_TOKENS.forEach((t) => {
      css += `  --${t.name}: ${t.lightMode}; /* ${t.usage} */\n`;
    });

    css += `\n  /* Typography Scale */\n`;
    TYPOGRAPHY_TOKENS.forEach((t) => {
      css += `  --font-size-${t.id}: ${t.px}px;\n  --line-height-${t.id}: ${t.lineHeightPx}px;\n  --font-weight-${t.id}: ${t.weight};\n`;
    });

    css += `\n  /* Spacing 8pt Scale */\n`;
    SPACING_TOKENS.forEach((s) => {
      css += `  --spacing-${s.alias}: ${s.px}px;\n`;
    });

    css += `}\n\n.dark {\n  /* Semantic Color Tokens (Dark Mode) */\n`;
    SEMANTIC_TOKENS.forEach((t) => {
      css += `  --${t.name}: ${t.darkMode};\n`;
    });
    css += `}\n`;
    return css;
  };

  // Generate JSON Export
  const generateJSON = () => {
    return JSON.stringify(
      {
        version: '2.4.0',
        semanticTokens: SEMANTIC_TOKENS,
        colorPalettes: PALETTE_FAMILIES,
        typography: TYPOGRAPHY_TOKENS,
        spacing: SPACING_TOKENS,
      },
      null,
      2
    );
  };

  // Generate Tailwind v4 CSS configuration
  const generateTailwind = () => {
    let tw = `@import "tailwindcss";\n\n@theme {\n  /* Semantic Colors */\n`;
    SEMANTIC_TOKENS.forEach((t) => {
      tw += `  --color-${t.name}: var(--${t.name});\n`;
    });

    tw += `\n  /* Spacing Scale */\n`;
    SPACING_TOKENS.forEach((s) => {
      tw += `  --spacing-${s.alias}: ${s.px}px;\n`;
    });

    tw += `}\n`;
    return tw;
  };

  // Generate TypeScript Definitions
  const generateTS = () => {
    let ts = `// Design System Token Architecture Definitions\n\nexport const SEMANTIC_TOKENS = ${JSON.stringify(SEMANTIC_TOKENS, null, 2)} as const;\n\n`;
    ts += `export const SPACING_TOKENS = ${JSON.stringify(SPACING_TOKENS, null, 2)} as const;\n\n`;
    ts += `export type SemanticTokenName = typeof SEMANTIC_TOKENS[number]['name'];\n`;
    return ts;
  };

  const getActiveContent = () => {
    switch (activeTab) {
      case 'css':
        return generateCSS();
      case 'json':
        return generateJSON();
      case 'tailwind':
        return generateTailwind();
      case 'ts':
        return generateTS();
      default:
        return '';
    }
  };

  const copyContent = () => {
    navigator.clipboard.writeText(getActiveContent());
    setCopied(true);
    addToast('Copied Code Spec', `Exported tokens in ${activeTab.toUpperCase()} format`, 'success');
    setTimeout(() => setCopied(false), 1800);
  };

  const downloadFile = () => {
    const extMap = { css: 'css', json: 'json', tailwind: 'css', ts: 'ts' };
    const content = getActiveContent();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `design-tokens.${extMap[activeTab]}`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('Downloaded Tokens', `Downloaded design-tokens.${extMap[activeTab]}`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl max-w-3xl w-full shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--border-default)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600 text-white">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                Export Design Tokens & System Specs
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Export CSS variables, JSON tokens, Tailwind theme config, or TypeScript constants.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExporterOpen(false)}
            className="p-1 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-between px-5 pt-4 bg-[var(--bg-surface-raised)] border-b border-[var(--border-default)]">
          <div className="flex gap-2">
            {[
              { id: 'css', label: 'CSS Variables (:root)' },
              { id: 'json', label: 'JSON Schema' },
              { id: 'tailwind', label: 'Tailwind CSS (@theme)' },
              { id: 'ts', label: 'TypeScript Types' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 text-xs font-bold rounded-t-xl transition-all border-t border-x ${
                  activeTab === tab.id
                    ? 'bg-[var(--bg-surface)] text-indigo-600 dark:text-indigo-400 border-[var(--border-default)] shadow-xs'
                    : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pb-2">
            <button
              onClick={copyContent}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white shadow-xs hover:bg-indigo-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy All'}</span>
            </button>

            <button
              onClick={downloadFile}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-indigo-500 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Code View */}
        <div className="p-5 bg-[var(--bg-surface)] overflow-y-auto max-h-[50vh]">
          <pre className="p-4 rounded-xl bg-[var(--bg-surface-raised)] text-xs font-mono text-[var(--text-primary)] leading-relaxed overflow-x-auto border border-[var(--border-default)]">
            {getActiveContent()}
          </pre>
        </div>
      </div>
    </div>
  );
};

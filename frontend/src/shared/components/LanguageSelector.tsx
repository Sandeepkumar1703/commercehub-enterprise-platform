import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../../core/i18n/LanguageContext';
import { SupportedLanguage } from '../../core/i18n/translations';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, options } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.code === language) || options[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 border border-border/80 rounded-xl bg-surface/80 hover:bg-surface-hover hover:border-brand/40 text-xs font-bold text-content-primary transition-all cursor-pointer shadow-xs"
        title="Change Language"
      >
        <Globe className="w-3.5 h-3.5 text-brand" />
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="hidden sm:inline uppercase text-[11px] tracking-wider">{selected.code}</span>
        <ChevronDown className={`w-3 h-3 text-content-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-surface/95 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl py-1.5 z-50 divide-y divide-border/60 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-content-muted">
            Select Language
          </div>
          <div className="py-1 max-h-64 overflow-y-auto">
            {options.map((opt) => {
              const isSelected = opt.code === language;
              return (
                <button
                  key={opt.code}
                  onClick={() => {
                    setLanguage(opt.code as SupportedLanguage);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold transition-colors cursor-pointer text-left ${
                    isSelected ? 'bg-brand/10 text-brand' : 'text-content-primary hover:bg-surface-hover'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{opt.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-xs">{opt.nativeName}</span>
                      <span className="text-[9px] text-content-muted">{opt.name}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-brand" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

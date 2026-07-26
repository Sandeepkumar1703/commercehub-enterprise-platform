import React from 'react';
import { useRouter } from '../../core/router/Router';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useAppConfig } from '../../context/ConfigContext';
import { ROUTES } from '../../theme/routes';
import { ArrowLeft, ShoppingBag, Sun, Moon, Globe, ChevronDown } from 'lucide-react';

export const AuthHeader: React.FC = () => {
  const { navigate } = useRouter();
  const { t, language, setLanguage, supportedLanguages } = useLanguage();
  const { themeMode, toggleTheme } = useTheme();
  const { config } = useAppConfig();

  const currentLangObj = supportedLanguages?.find((l) => l.code === language) || supportedLanguages?.[0] || { code: 'en', flag: '🇺🇸', name: 'English' };

  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-[var(--border-default)] mb-8">
      {/* Brand & Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="flex items-center gap-2 text-xs font-bold text-[#4F6D8C] dark:text-[#88BDF2] hover:underline transition-all cursor-pointer px-3 py-2 rounded-xl bg-[#EEF4F8] dark:bg-[#2B3645] border border-[#D6DEE6] dark:border-[#374151]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </button>

        <div
          onClick={() => navigate(ROUTES.HOME)}
          className="hidden sm:flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#4F6D8C] text-white dark:bg-[#88BDF2] dark:text-[#111827] flex items-center justify-center font-bold border border-[#4F6D8C]/20 shadow-xs group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="text-sm font-black tracking-tight text-[var(--text-primary)]">
            {config?.applicationName || t('brand.name')}
          </span>
        </div>
      </div>

      {/* Controls: Theme & Language */}
      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <div className="relative group">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] text-xs font-semibold hover:border-[#4F6D8C] transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#4F6D8C] dark:text-[#88BDF2]" />
            <span>{currentLangObj.flag} {currentLangObj.code.toUpperCase()}</span>
            <ChevronDown className="w-3 h-3 text-[var(--text-secondary)]" />
          </button>
          
          <div className="absolute right-0 mt-1 w-36 py-1.5 bg-[var(--bg-surface-raised)] border border-[var(--border-default)] rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            {supportedLanguages?.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-[var(--bg-surface)] cursor-pointer ${
                  language === lang.code ? 'font-bold text-[#4F6D8C] dark:text-[#88BDF2]' : 'text-[var(--text-primary)]'
                }`}
              >
                <span>{lang.flag} {lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] hover:border-[#4F6D8C] transition-all cursor-pointer"
          title="Toggle Theme"
        >
          {themeMode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#4F6D8C]" />}
        </button>
      </div>
    </header>
  );
};

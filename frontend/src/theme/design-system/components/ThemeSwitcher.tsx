import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';

export const ThemeSwitcher: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[#6D8196] text-[var(--text-primary)] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
      title={themeMode === 'dark' ? t('theme.light') : t('theme.dark')}
    >
      {themeMode === 'dark' ? (
        <>
          <Sun className="w-4 h-4 text-[#FFFFE3]" />
          <span className="hidden sm:inline">{t('theme.light')}</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-[#4A4A4A]" />
          <span className="hidden sm:inline">{t('theme.dark')}</span>
        </>
      )}
    </button>
  );
};

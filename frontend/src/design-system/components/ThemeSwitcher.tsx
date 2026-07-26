import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const ThemeSwitcher: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[#4F6D8C] dark:hover:border-[#88BDF2] text-[var(--text-primary)] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
      title={themeMode === 'dark' ? t('theme.light') : t('theme.dark')}
    >
      {themeMode === 'dark' ? (
        <>
          <Sun className="w-4 h-4 text-[#88BDF2]" />
          <span className="hidden sm:inline">{t('theme.light')}</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-[#4F6D8C]" />
          <span className="hidden sm:inline">{t('theme.dark')}</span>
        </>
      )}
    </button>
  );
};

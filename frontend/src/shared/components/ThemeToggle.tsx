import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../app/providers/ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative inline-flex items-center h-8 w-14 rounded-full p-1 bg-surface border border-border/80 hover:border-brand/50 transition-all duration-300 cursor-pointer shadow-inner focus:outline-none focus:ring-2 focus:ring-brand/30"
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      aria-label={`Current theme is ${resolvedTheme}. Click to switch to ${isDark ? 'light' : 'dark'} mode.`}
    >
      {/* Background Icons */}
      <div className="w-full flex items-center justify-between px-0.5 text-content-muted pointer-events-none">
        <Sun className={`w-3.5 h-3.5 transition-opacity duration-200 ${!isDark ? 'opacity-100 text-amber-500' : 'opacity-40'}`} />
        <Moon className={`w-3.5 h-3.5 transition-opacity duration-200 ${isDark ? 'opacity-100 text-indigo-300' : 'opacity-40'}`} />
      </div>

      {/* Sliding Knob */}
      <span
        className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-brand text-brand-foreground shadow-md flex items-center justify-center transform transition-transform duration-300 ease-spring ${
          isDark ? 'translate-x-6 bg-indigo-600 text-amber-300' : 'translate-x-0 bg-amber-400 text-slate-900'
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 fill-current" />
        ) : (
          <Sun className="w-3.5 h-3.5 fill-current" />
        )}
      </span>
    </button>
  );
};

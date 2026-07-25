import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode, ActiveSection, ToastItem, AlertVariant } from '../types';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toasts: ToastItem[];
  addToast: (title: string, message: string, variant?: AlertVariant) => void;
  removeToast: (id: string) => void;
  isExporterOpen: boolean;
  setIsExporterOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('ds_theme_mode');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  const [activeSection, setActiveSection] = useState<ActiveSection>('color-palette');
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isExporterOpen, setIsExporterOpen] = useState(false);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('ds_theme_mode', mode);
  };

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeMode]);

  const addToast = (title: string, message: string, variant: AlertVariant = 'info') => {
    const newToast: ToastItem = {
      id: Math.random().toString(36).substring(2, 9),
      variant,
      title,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setToasts((prev) => [newToast, ...prev].slice(0, 5));
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        setThemeMode,
        toggleTheme,
        activeSection,
        setActiveSection,
        searchQuery,
        setSearchQuery,
        toasts,
        addToast,
        removeToast,
        isExporterOpen,
        setIsExporterOpen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

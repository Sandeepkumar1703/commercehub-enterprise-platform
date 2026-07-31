import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SupportedLanguage, LANGUAGE_OPTIONS, translations, LanguageOption } from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage, syncUrl?: boolean) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
  options: LanguageOption[];
  reloadTranslations: () => Promise<void>;
  getLocalizedPath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const VALID_LANGS: SupportedLanguage[] = ['en', 'hi', 'ar', 'ru', 'es', 'fr', 'de'];

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function setCookie(name: string, value: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${value}; path=/; max-age=31536000; SameSite=Lax`;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    // 1. Check URL path
    if (typeof window !== 'undefined') {
      const pathLang = window.location.pathname.split('/')[1]?.toLowerCase() as SupportedLanguage;
      if (VALID_LANGS.includes(pathLang)) {
        return pathLang;
      }
    }
    // 2. Check localStorage
    const savedLocal = localStorage.getItem('app_language') as SupportedLanguage;
    if (savedLocal && VALID_LANGS.includes(savedLocal)) {
      return savedLocal;
    }
    // 3. Check cookie
    const savedCookie = getCookie('app_language') as SupportedLanguage;
    if (savedCookie && VALID_LANGS.includes(savedCookie)) {
      return savedCookie;
    }
    return 'en';
  });

  const [remoteMap, setRemoteMap] = useState<Record<string, string>>({});

  const currentOption = LANGUAGE_OPTIONS.find((o) => o.code === language) || LANGUAGE_OPTIONS[0];
  const dir = currentOption.dir;
  const isRTL = dir === 'rtl';

  const fetchTranslationsForLang = useCallback(async (lang: SupportedLanguage) => {
    try {
      const res = await fetch(`/api/translations/map/${lang}`);
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object') {
          setRemoteMap(data);
        }
      }
    } catch {
      // Fallback silently to static dictionary
    }
  }, []);

  const reloadTranslations = useCallback(async () => {
    await fetchTranslationsForLang(language);
  }, [fetchTranslationsForLang, language]);

  useEffect(() => {
    localStorage.setItem('app_language', language);
    setCookie('app_language', language);
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', dir);

    fetchTranslationsForLang(language);
  }, [language, dir, fetchTranslationsForLang]);

  const setLanguage = useCallback((newLang: SupportedLanguage, syncUrl = true) => {
    if (!VALID_LANGS.includes(newLang)) return;

    setLanguageState(newLang);
    localStorage.setItem('app_language', newLang);
    setCookie('app_language', newLang);

    if (syncUrl && typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const search = window.location.search;
      const hash = window.location.hash;

      const segments = pathname.split('/').filter(Boolean);
      if (segments.length > 0 && VALID_LANGS.includes(segments[0] as SupportedLanguage)) {
        segments[0] = newLang;
      } else {
        segments.unshift(newLang);
      }

      const newPath = '/' + segments.join('/') + search + hash;
      if (newPath !== pathname + search + hash) {
        window.history.pushState({}, '', newPath);
        window.dispatchEvent(new Event('popstate'));
      }
    }
  }, []);

  const getLocalizedPath = useCallback((path: string): string => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const segments = cleanPath.split('/').filter(Boolean);
    if (segments.length > 0 && VALID_LANGS.includes(segments[0] as SupportedLanguage)) {
      segments[0] = language;
      return '/' + segments.join('/');
    }
    return `/${language}${cleanPath}`;
  }, [language]);

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    let text = remoteMap[key] || translations[language]?.[key] || translations['en']?.[key] || key;
    if (params) {
      Object.entries(params).forEach(([paramKey, paramVal]) => {
        text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
      });
    }
    return text;
  }, [remoteMap, language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        dir,
        isRTL,
        options: LANGUAGE_OPTIONS,
        reloadTranslations,
        getLocalizedPath,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

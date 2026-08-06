import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { languageApi } from '../api/languageApi';
import { translationApi } from '../api/translationApi';

interface LanguageContextType {
  currentLanguage: string;
  languages: Language[];
  translations: Record<string, string>;
  isRTL: boolean;
  setLanguage: (code: string) => Promise<void>;
  t: (key: string, defaultText?: string) => string;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const DEFAULT_LANGUAGES: Language[] = [
  { id: 1, code: 'en', name: 'English', nativeName: 'English', defaultLanguage: true, enabled: true },
  { id: 2, code: 'es', name: 'Spanish', nativeName: 'Español', defaultLanguage: false, enabled: true },
  { id: 3, code: 'fr', name: 'French', nativeName: 'Français', defaultLanguage: false, enabled: true },
  { id: 4, code: 'de', name: 'German', nativeName: 'Deutsch', defaultLanguage: false, enabled: true },
  { id: 5, code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', defaultLanguage: false, enabled: true },
  { id: 6, code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true, defaultLanguage: false, enabled: true },
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [languages, setLanguages] = useState<Language[]>(DEFAULT_LANGUAGES);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const applyRTLIfNeeded = (code: string, langsList: Language[]) => {
    const target = langsList.find((l) => l.code === code);
    const isRightToLeft = target?.rtl === true || target?.direction === 'rtl' || code === 'ar';
    document.documentElement.dir = isRightToLeft ? 'rtl' : 'ltr';
    return isRightToLeft;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const savedLang = urlLang || localStorage.getItem('app_language') || 'en';

    if (urlLang) {
      localStorage.setItem('app_language', urlLang);
    }

    const loadInitialData = async () => {
      setLoading(true);
      let fetchedLanguages: Language[] = DEFAULT_LANGUAGES;
      try {
        const langRes = await languageApi.getEnabledLanguages();
        const data = (langRes as any)?.data || langRes;
        if (Array.isArray(data) && data.length > 0) {
          fetchedLanguages = data;
          setLanguages(data);
        } else {
          setLanguages(DEFAULT_LANGUAGES);
        }
      } catch (e) {
        setLanguages(DEFAULT_LANGUAGES);
      }

      const activeCode = savedLang || fetchedLanguages.find((l) => l.defaultLanguage)?.code || fetchedLanguages[0]?.code || 'en';
      setCurrentLanguage(activeCode);
      applyRTLIfNeeded(activeCode, fetchedLanguages);

      try {
        const transRes = await translationApi.getTranslationMap(activeCode);
        const mapData = (transRes as any)?.data || transRes;
        if (mapData && typeof mapData === 'object') {
          setTranslations(mapData as Record<string, string>);
        }
      } catch (e) {
        // Empty map
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const setLanguage = async (code: string) => {
    setLoading(true);
    setCurrentLanguage(code);
    localStorage.setItem('app_language', code);
    applyRTLIfNeeded(code, languages);

    try {
      const transRes = await translationApi.getTranslationMap(code);
      const mapData = (transRes as any)?.data || transRes;
      if (mapData && typeof mapData === 'object') {
        setTranslations(mapData as Record<string, string>);
      }
    } catch (err) {
      // Keep existing map if request fails
    } finally {
      setLoading(false);
    }
  };

  const targetLang = languages.find((l) => l.code === currentLanguage);
  const isRTL = targetLang?.rtl === true || targetLang?.direction === 'rtl' || currentLanguage === 'ar';

  const t = (key: string, defaultText?: string): string => {
    return translations[key] || defaultText || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        languages,
        translations,
        isRTL,
        setLanguage,
        t,
        loading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguageContext must be used within LanguageProvider');
  return ctx;
};

import { useLanguageContext } from '../context/LanguageContext';

export const useTranslation = () => {
  const { t, currentLanguage, languages, setLanguage, isRTL, loading } = useLanguageContext();
  return {
    t,
    currentLanguage,
    languages,
    setLanguage,
    isRTL,
    loading,
  };
};

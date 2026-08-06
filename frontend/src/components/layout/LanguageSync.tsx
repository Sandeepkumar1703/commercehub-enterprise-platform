import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

export const LanguageSync: React.FC = () => {
  const { currentLanguage, setLanguage } = useTranslation();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  useEffect(() => {
    const langParam = searchParams.get('lang');

    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (langParam && langParam !== currentLanguage) {
        setLanguage(langParam);
        return;
      }
    }

    if (langParam !== currentLanguage) {
      const newSearchParams = new URLSearchParams(location.search);
      newSearchParams.set('lang', currentLanguage);
      navigate(
        {
          pathname: location.pathname,
          search: `?${newSearchParams.toString()}`,
        },
        { replace: true }
      );
    }
  }, [currentLanguage, location.pathname, location.search, navigate, searchParams, setLanguage]);

  return null;
};

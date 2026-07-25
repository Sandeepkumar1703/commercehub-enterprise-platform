import React, { useState, useEffect, createContext, useContext } from 'react';
import { ROUTES } from '../../theme/routes';

interface RouterContextType {
  currentPath: string;
  queryParams: Record<string, string>;
  pathParam: string | null;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentHash, setCurrentHash] = useState<string>(() => {
    if (window.location.hash) return window.location.hash;
    if (window.location.pathname && window.location.pathname !== '/') {
      return `#${window.location.pathname}${window.location.search}`;
    }
    return '#/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    const formatted = path.startsWith('#') ? path : `#${path}`;
    window.location.hash = formatted;
  };

  // Parse path and query parameters
  const cleanHash = currentHash.replace(/^#/, '') || '/';
  const [routePart, queryString] = cleanHash.split('?');

  // Extract path parameter if any (e.g. /product/101 -> base /product, param 101)
  const segments = routePart.split('/').filter(Boolean);
  let baseRoute = '/' + segments.join('/');
  let pathParam: string | null = null;

  if (segments[0] === 'product' && segments[1]) {
    baseRoute = ROUTES.PRODUCT_DETAIL;
    pathParam = segments[1];
  } else if (segments[0] === 'order-success' && segments[1]) {
    baseRoute = ROUTES.ORDER_SUCCESS;
    pathParam = segments[1];
  } else if (segments[0] === 'order-tracking' && segments[1]) {
    baseRoute = ROUTES.ORDER_TRACKING;
    pathParam = segments[1];
  }

  const queryParams: Record<string, string> = {};
  if (queryString) {
    const searchParams = new URLSearchParams(queryString);
    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });
  } else if (window.location.search) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });
  }

  return (
    <RouterContext.Provider
      value={{
        currentPath: baseRoute,
        queryParams,
        pathParam,
        navigate,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

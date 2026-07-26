import React, { createContext, useContext, useState, useEffect } from 'react';
import { ApplicationConfig, DEFAULT_APP_CONFIG, configService } from '../core/api/configService';

interface ConfigContextType {
  config: ApplicationConfig;
  updateConfig: (newConfig: Partial<ApplicationConfig>) => Promise<void>;
  isLoading: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ApplicationConfig>(DEFAULT_APP_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchConfig = async () => {
      setIsLoading(true);
      try {
        const liveConfig = await configService.getApplicationConfig();
        if (isMounted) {
          setConfig(liveConfig);
        }
      } catch {
        if (isMounted) {
          setConfig(DEFAULT_APP_CONFIG);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchConfig();
    return () => {
      isMounted = false;
    };
  }, []);

  const updateConfig = async (newConfig: Partial<ApplicationConfig>) => {
    const updated = await configService.updateApplicationConfig(newConfig);
    setConfig(updated);
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, isLoading }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useAppConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useAppConfig must be used within a ConfigProvider');
  }
  return context;
};

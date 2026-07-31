import React, { createContext, useContext, useState, useEffect } from 'react';
import { FeatureFlags, DEFAULT_FEATURE_FLAGS } from '../../config/featureFlags';

interface FeatureFlagContextType {
  flags: FeatureFlags;
  toggleFlag: (flagName: keyof FeatureFlags) => void;
  isEnabled: (flagName: keyof FeatureFlags) => boolean;
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

export const FeatureFlagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flags, setFlags] = useState<FeatureFlags>(() => {
    try {
      const saved = localStorage.getItem('app_feature_flags');
      return saved ? JSON.parse(saved) : DEFAULT_FEATURE_FLAGS;
    } catch {
      return DEFAULT_FEATURE_FLAGS;
    }
  });

  useEffect(() => {
    localStorage.setItem('app_feature_flags', JSON.stringify(flags));
  }, [flags]);

  const toggleFlag = (flagName: keyof FeatureFlags) => {
    setFlags((prev) => ({
      ...prev,
      [flagName]: !prev[flagName],
    }));
  };

  const isEnabled = (flagName: keyof FeatureFlags) => {
    return !!flags[flagName];
  };

  return (
    <FeatureFlagContext.Provider value={{ flags, toggleFlag, isEnabled }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider');
  }
  return context;
};

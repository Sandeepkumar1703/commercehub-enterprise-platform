// Backend Theme API Service - /api/v1/theme
import { DESIGN_TOKENS } from '../../theme/design-system/tokens';

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  backgroundColor: string;
  textColorPrimary: string;
  textColorSecondary: string;
  borderRadius: string;
  fontFamilyHeading: string;
  fontFamilyBody: string;
  darkTheme: typeof DESIGN_TOKENS.colors.dark;
  lightTheme: typeof DESIGN_TOKENS.colors.light;
}

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  primaryColor: '#4F6D8C',
  secondaryColor: '#88BDF2',
  neutralColor: '#EEF4F8',
  backgroundColor: '#F8FAFC',
  textColorPrimary: '#24313D',
  textColorSecondary: '#64748B',
  borderRadius: '0.75rem',
  fontFamilyHeading: DESIGN_TOKENS.typography.fontFamily.heading,
  fontFamilyBody: DESIGN_TOKENS.typography.fontFamily.body,
  darkTheme: DESIGN_TOKENS.colors.dark,
  lightTheme: DESIGN_TOKENS.colors.light,
};

export const themeService = {
  getThemeConfig: async (): Promise<ThemeConfig> => {
    try {
      const response = await fetch('/api/v1/theme');
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback
    }
    return DEFAULT_THEME_CONFIG;
  },
};

// Enterprise Design System Tokens - Shopify/Stripe/Atlassian/Azure Palette
export const DESIGN_TOKENS = {
  colors: {
    primary: '#4F6D8C',        // Brand Primary
    primaryHover: '#3E5973',   // Primary Hover
    background: '#F8FAFC',     // Background Light
    surface: '#FFFFFF',        // Surface Light
    secondaryBg: '#EEF4F8',    // Secondary BG Light
    border: '#D6DEE6',         // Border Light
    textPrimary: '#24313D',    // Text Primary Light
    textSecondary: '#64748B',  // Text Secondary Light
    success: '#22C55E',        // Success
    warning: '#F59E0B',        // Warning
    error: '#EF4444',          // Error

    light: {
      bgSurface: '#F8FAFC',
      bgSurfaceRaised: '#FFFFFF',
      bgSecondary: '#EEF4F8',
      borderDefault: '#D6DEE6',
      borderSubtle: '#EEF4F8',
      textPrimary: '#24313D',
      textSecondary: '#64748B',
      brandPrimary: '#4F6D8C',
      brandHover: '#3E5973',
      brandAccent: '#88BDF2',
      brandAccentHover: '#6EA8DF',
      statusDanger: '#EF4444',
      statusSuccess: '#22C55E',
      statusWarning: '#F59E0B',
      statusInfo: '#4F6D8C',
    },

    dark: {
      bgSurface: '#111827',
      bgSurfaceRaised: '#1F2937',
      bgSecondary: '#2B3645',
      borderDefault: '#374151',
      borderSubtle: '#2B3645',
      textPrimary: '#F8FAFC',
      textSecondary: '#CBD5E1',
      brandPrimary: '#88BDF2',
      brandHover: '#6EA8DF',
      brandAccent: '#88BDF2',
      brandAccentHover: '#4F6D8C',
      statusDanger: '#EF4444',
      statusSuccess: '#22C55E',
      statusWarning: '#F59E0B',
      statusInfo: '#88BDF2',
    },
  },

  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
  },

  radius: {
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px',
  },

  typography: {
    fontFamily: {
      heading: "'Inter', system-ui, sans-serif",
      body: "'Inter', system-ui, sans-serif",
      mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    },
    headingScaleRatio: 1.25,
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },

  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    medium: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Backend Application Configuration Service - /api/v1/config/application

export interface ApplicationConfig {
  applicationName: string;
  shortName: string;
  companyName: string;
  logoUrl: string;
  lightLogoUrl: string;
  darkLogoUrl: string;
  miniLogoUrl: string;
  faviconUrl: string;
  brandTagline: string;
  supportEmail: string;
  supportPhone: string;
  copyrightText: string;
  version: string;
  buildNumber: string;
  defaultLanguage: string;
  defaultCurrency: string;
  timezone: string;
  maintenanceMode: boolean;
  
  // Dynamic Placeholders
  placeholders: {
    search: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    productName: string;
    sku: string;
    category: string;
    price: string;
  };

  // Dynamic Button Labels
  buttonLabels: {
    login: string;
    register: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    addCart: string;
    checkout: string;
    clear: string;
    apply: string;
    export: string;
    import: string;
    close: string;
    confirm: string;
  };

  // Dynamic Validation & System Messages
  systemMessages: {
    requiredField: string;
    invalidEmail: string;
    passwordTooShort: string;
    loginSuccess: string;
    logoutSuccess: string;
    itemAddedToCart: string;
    itemRemovedFromCart: string;
    configUpdatedSuccess: string;
    errorGeneric: string;
    emptyStateTitle: string;
    emptyStateDescription: string;
  };
}

export const DEFAULT_APP_CONFIG: ApplicationConfig = {
  applicationName: 'CommerceHub Enterprise Platform',
  shortName: 'CommerceHub',
  companyName: 'CommerceHub Technologies Inc.',
  logoUrl: '/assets/logo.png',
  lightLogoUrl: '/assets/logo-light.png',
  darkLogoUrl: '/assets/logo-dark.png',
  miniLogoUrl: '/assets/logo-mini.png',
  faviconUrl: '/favicon.ico',
  brandTagline: 'Enterprise Spring Boot Monolith & React UI Engine',
  supportEmail: 'support@commercehub.enterprise',
  supportPhone: '+1 (800) 555-0199',
  copyrightText: '© 2026 CommerceHub Technologies Inc. All enterprise rights reserved.',
  version: '1.2.0',
  buildNumber: 'BUILD-20260726-PROD',
  defaultLanguage: 'en',
  defaultCurrency: 'USD',
  timezone: 'America/New_York',
  maintenanceMode: false,

  placeholders: {
    search: 'Search catalog items, SKUs, API endpoints...',
    email: 'user@enterprise.com',
    password: '••••••••••••',
    firstName: 'Enter first name...',
    lastName: 'Enter last name...',
    role: 'Select role (e.g. ROLE_ADMIN)',
    productName: 'Enter product title...',
    sku: 'SKU-XXXX-2026',
    category: 'Select category',
    price: '0.00',
  },

  buttonLabels: {
    login: 'Sign In',
    register: 'Create Enterprise Account',
    save: 'Save Configuration',
    cancel: 'Cancel',
    delete: 'Delete Record',
    edit: 'Edit Details',
    addCart: 'Add to Cart',
    checkout: 'Proceed to Checkout',
    clear: 'Clear Filters',
    apply: 'Apply Changes',
    export: 'Export System Specs',
    import: 'Import Schema',
    close: 'Close Window',
    confirm: 'Confirm Action',
  },

  systemMessages: {
    requiredField: 'This field is required by enterprise validation rules.',
    invalidEmail: 'Please enter a valid enterprise email address.',
    passwordTooShort: 'Password must be at least 8 characters long.',
    loginSuccess: 'Authentication successful. Welcome back!',
    logoutSuccess: 'Session terminated safely.',
    itemAddedToCart: 'Product added to enterprise cart session.',
    itemRemovedFromCart: 'Item removed from shopping session.',
    configUpdatedSuccess: 'Backend configuration updated successfully across all clients.',
    errorGeneric: 'An unexpected system error occurred. Please contact support.',
    emptyStateTitle: 'No Records Found',
    emptyStateDescription: 'No matching items exist in the database for the selected criteria.',
  },
};

export const configService = {
  getApplicationConfig: async (): Promise<ApplicationConfig> => {
    try {
      const response = await fetch('/api/v1/config/application');
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback to local default configuration
    }
    return DEFAULT_APP_CONFIG;
  },

  updateApplicationConfig: async (newConfig: Partial<ApplicationConfig>): Promise<ApplicationConfig> => {
    // Allows updating dynamic app settings in real time
    const updated = { ...DEFAULT_APP_CONFIG, ...newConfig };
    try {
      await fetch('/api/v1/config/application', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch {
      // Fallback
    }
    return updated;
  },
};

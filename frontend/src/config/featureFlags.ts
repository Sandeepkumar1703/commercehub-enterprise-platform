export interface FeatureFlags {
  enableCoupons: boolean;
  enableInventoryControl: boolean;
  enableSupportChat: boolean;
  enableAISearch: boolean;
  enableMultiCurrency: boolean;
  enableSuperAdminPortal: boolean;
  enableReviews: boolean;
}

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  enableCoupons: true,
  enableInventoryControl: true,
  enableSupportChat: true,
  enableAISearch: true,
  enableMultiCurrency: true,
  enableSuperAdminPortal: true,
  enableReviews: true,
};

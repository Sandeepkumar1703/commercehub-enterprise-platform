import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { AppRouter } from './app/router/AppRouter';
import { ToastProvider } from './shared/components/Toast';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { LanguageProvider } from './core/i18n/LanguageContext';
import { useAppDispatch, useAppSelector } from './app/store/hooks';
import { cartApi } from './features/cart/cart.api';
import { setCart } from './features/cart/cartSlice';
import { wishlistApi } from './features/wishlist/wishlist.api';
import { setWishlist } from './features/wishlist/wishlistSlice';
import { CompareProvider } from './features/product/compareContext';
import { FlyToCartProvider } from './shared/components/FlyToCart';
import { ProductCompareBar } from './features/product/components/ProductCompareModal';
import { SupportChatDrawer } from './features/support/SupportChatDrawer';
import { OfflineBanner } from './shared/components/OfflineBanner';
import { ErrorBoundary } from './shared/components/ErrorBoundary';

import { PermissionProvider } from './core/auth/PermissionContext';
import { RoleProvider } from './core/auth/RoleContext';
import { JWTProvider } from './core/auth/JWTContext';
import { FeatureFlagProvider } from './core/auth/FeatureFlagContext';

const AppInitializer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Only fetch protected resources (cart, wishlist) if authenticated
    if (isAuthenticated) {
      cartApi
        .getCart()
        .then((c) => dispatch(setCart(c)))
        .catch(() => {});

      wishlistApi
        .getWishlist()
        .then((w) => dispatch(setWishlist(w)))
        .catch(() => {});
    }
  }, [dispatch, isAuthenticated]);

  return (
    <JWTProvider>
      <RoleProvider>
        <PermissionProvider>
          <FeatureFlagProvider>
            <AppRouter />
            <ProductCompareBar />
            <SupportChatDrawer />
            <OfflineBanner />
          </FeatureFlagProvider>
        </PermissionProvider>
      </RoleProvider>
    </JWTProvider>
  );
};

export function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <LanguageProvider>
          <ThemeProvider>
            <ToastProvider>
              <CompareProvider>
                <FlyToCartProvider>
                  <AppInitializer />
                </FlyToCartProvider>
              </CompareProvider>
            </ToastProvider>
          </ThemeProvider>
        </LanguageProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;


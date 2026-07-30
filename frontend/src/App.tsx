import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { AppRouter } from './app/router/AppRouter';
import { ToastProvider } from './shared/components/Toast';
import { ThemeProvider } from './app/providers/ThemeProvider';
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

const AppInitializer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Initial cart load
    cartApi
      .getCart()
      .then((c) => dispatch(setCart(c)))
      .catch(() => {});

    // Initial wishlist load if authenticated
    if (isAuthenticated) {
      wishlistApi
        .getWishlist()
        .then((w) => dispatch(setWishlist(w)))
        .catch(() => {});
    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <AppRouter />
      <ProductCompareBar />
      <SupportChatDrawer />
      <OfflineBanner />
    </>
  );
};

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ToastProvider>
          <CompareProvider>
            <FlyToCartProvider>
              <AppInitializer />
            </FlyToCartProvider>
          </CompareProvider>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;


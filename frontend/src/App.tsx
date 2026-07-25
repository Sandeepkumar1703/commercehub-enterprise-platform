import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { RouterProvider, useRouter } from './core/router/Router';
import { ROUTES } from './theme/routes';

import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/cart/CartDrawer';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { VerifyEmailPage } from './pages/auth/VerifyEmailPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';

import { CustomerDashboardPage } from './pages/customer/CustomerDashboardPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { OrderSuccessPage } from './pages/customer/OrderSuccessPage';
import { OrdersPage } from './pages/customer/OrdersPage';
import { AccountPage } from './pages/customer/AccountPage';
import { WishlistPage } from './pages/customer/WishlistPage';

import { ApiDocsPage } from './pages/ApiDocsPage';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { OrderTrackingPage } from './pages/customer/OrderTrackingPage';
import { AdminDashboardPage } from './pages/admin/adminDashboardPage';

const RouteSwitcher: React.FC = () => {
  const { currentPath } = useRouter();

  switch (currentPath) {
    case ROUTES.HOME:
      return <HomePage />;
    case ROUTES.PRODUCTS:
      return <ProductsPage />;
    case ROUTES.PRODUCT_DETAIL:
      return <ProductDetailPage />;
    case ROUTES.LOGIN:
      return <LoginPage />;
    case ROUTES.REGISTER:
      return <RegisterPage />;
    case ROUTES.VERIFY_EMAIL:
      return <VerifyEmailPage />;
    case ROUTES.FORGOT_PASSWORD:
      return <ForgotPasswordPage />;
    case ROUTES.RESET_PASSWORD:
      return <ResetPasswordPage />;
    case ROUTES.CUSTOMER_DASHBOARD:
      return <CustomerDashboardPage />;
    case ROUTES.CHECKOUT:
      return <CheckoutPage />;
    case ROUTES.ORDER_SUCCESS:
      return <OrderSuccessPage />;
    case ROUTES.ORDERS:
      return <OrdersPage />;
    case ROUTES.ORDER_TRACKING:
      return <OrderTrackingPage />;
    case ROUTES.ADMIN_DASHBOARD:
      return <AdminDashboardPage />;
    case ROUTES.ACCOUNT:
      return <AccountPage />;
    case ROUTES.WISHLIST:
      return <WishlistPage />;
    case ROUTES.API_DOCS:
      return <ApiDocsPage />;
    case ROUTES.DESIGN_SYSTEM:
      return <DesignSystemPage />;
    default:
      return <HomePage />;
  }
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <RouterProvider>
            <ThemeProvider>
              <div className="min-h-screen bg-[var(--bg-surface)] text-[var(--text-primary)] flex flex-col justify-between transition-colors duration-200 selection:bg-indigo-500 selection:text-white">
                <div>
                  <Header />
                  <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <RouteSwitcher />
                  </main>
                </div>
                <CartDrawer />
                <Footer />
              </div>
            </ThemeProvider>
          </RouterProvider>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

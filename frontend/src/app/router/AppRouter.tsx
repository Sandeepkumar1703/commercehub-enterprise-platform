import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation, Outlet } from 'react-router-dom';
import { MainLayout } from '../../shared/layouts/MainLayout';
import { CustomerLayout } from '../../shared/layouts/CustomerLayout';
import { SellerLayout } from '../../shared/layouts/SellerLayout';
import { AdminLayout } from '../../shared/layouts/AdminLayout';
import { SuperAdminLayout } from '../../shared/layouts/SuperAdminLayout';

import { ProtectedRoute } from './ProtectedRoute';
import { RoleGuard } from './RoleGuard';

import { AccessDeniedPage } from '../../shared/pages/AccessDeniedPage';
import { NotFoundPage } from '../../shared/pages/NotFoundPage';
import { AboutPage, ContactPage, FAQPage, PrivacyPage, TermsPage } from '../../shared/pages/InfoPages';

import { LandingPage } from '../../features/product/LandingPage';
import { ProductCatalogPage } from '../../features/product/ProductCatalogPage';
import { ProductDetailPage } from '../../features/product/ProductDetailPage';
import { CartPage } from '../../features/cart/CartPage';
import { WishlistPage } from '../../features/wishlist/WishlistPage';

import { LoginPage } from '../../features/auth/LoginPage';
import { RegisterPage } from '../../features/auth/RegisterPage';
import { ForgotPasswordPage } from '../../features/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '../../features/auth/ResetPasswordPage';
import { VerifyEmailPage } from '../../features/auth/VerifyEmailPage';

import { CheckoutPage } from '../../features/order/CheckoutPage';
import { OrderSuccessPage } from '../../features/order/OrderSuccessPage';
import { OrderHistoryPage } from '../../features/order/OrderHistoryPage';
import { OrderTrackingPage } from '../../features/shipping/OrderTrackingPage';
import { PaymentPage } from '../../features/payment/PaymentPage';

import { CustomerDashboardPage } from '../../features/customer/CustomerDashboardPage';
import { ProfilePage } from '../../features/profile/ProfilePage';
import { AddressesPage } from '../../features/profile/AddressesPage';

import { SellerDashboardPage } from '../../features/seller/SellerDashboardPage';
import { SellerProductsPage } from '../../features/seller/SellerProductsPage';

import { AdminDashboardPage } from '../../features/admin/AdminDashboardPage';
import { AdminProductsPage } from '../../features/admin/AdminProductsPage';
import { AdminCategoriesPage } from '../../features/admin/AdminCategoriesPage';
import { AdminOrdersPage } from '../../features/admin/AdminOrdersPage';
import { AdminPaymentsPage } from '../../features/admin/AdminPaymentsPage';
import { AdminUsersPage } from '../../features/admin/AdminUsersPage';
import { AdminRolesPage } from '../../features/admin/AdminRolesPage';
import { AdminLanguagesPage } from '../../features/admin/AdminLanguagesPage';
import { AdminTranslationsPage } from '../../features/admin/AdminTranslationsPage';
import { AdminMediaPage } from '../../features/admin/AdminMediaPage';
import { AdminCouponsPage } from '../../features/admin/AdminCouponsPage';
import { AdminReviewsPage } from '../../features/admin/AdminReviewsPage';

import { SuperAdminDashboardPage } from '../../features/super-admin/SuperAdminDashboardPage';

import { useLanguage } from '../../core/i18n/LanguageContext';
import { SupportedLanguage } from '../../core/i18n/translations';

const LanguageRouteWrapper: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const validLangs = ['en', 'hi', 'ar', 'ru', 'es', 'fr', 'de'];
    if (lang && validLangs.includes(lang.toLowerCase())) {
      if (lang.toLowerCase() !== language) {
        setLanguage(lang.toLowerCase() as SupportedLanguage, false);
      }
    }
  }, [lang, language, setLanguage]);

  return <Outlet />;
};

const RootRedirect: React.FC = () => {
  const { language } = useLanguage();
  return <Navigate to={`/${language}`} replace />;
};

const FallbackLanguageRedirect: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();

  const targetPath = `/${language}${location.pathname}${location.search}${location.hash}`;
  return <Navigate to={targetPath} replace />;
};

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect to current language */}
        <Route path="/" element={<RootRedirect />} />

        {/* Language Aware Routes */}
        <Route path="/:lang" element={<LanguageRouteWrapper />}>
          {/* Storefront Public & Checkout Routes */}
          <Route element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="products" element={<ProductCatalogPage />} />
            <Route path="products/search" element={<ProductCatalogPage />} />
            <Route path="products/category/:categoryId" element={<ProductCatalogPage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="wishlist" element={<WishlistPage />} />

            {/* Public Info Pages */}
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="403 font-bold" element={<AccessDeniedPage />} />
            <Route path="unauthorized" element={<AccessDeniedPage />} />

            {/* Auth Routes */}
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="verify-email" element={<VerifyEmailPage />} />

            {/* Checkout & Payment (Protected Customer) */}
            <Route
              path="checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="payment/:paymentId"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders/:id/success"
              element={
                <ProtectedRoute>
                  <OrderSuccessPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders/:id/tracking"
              element={
                <ProtectedRoute>
                  <OrderTrackingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders/:id"
              element={
                <ProtectedRoute>
                  <OrderTrackingPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* CUSTOMER PORTAL (ProtectedRoute) */}
          <Route
            element={
              <ProtectedRoute>
                <CustomerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<CustomerDashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/edit" element={<ProfilePage />} />
            <Route path="addresses" element={<AddressesPage />} />
            <Route path="addresses/default" element={<AddressesPage />} />
            <Route path="orders" element={<OrderHistoryPage />} />
          </Route>

          {/* SELLER PORTAL (ROLE_SELLER, ROLE_ADMIN, ROLE_SUPER_ADMIN) */}
          <Route
            path="seller"
            element={
              <RoleGuard allowedRoles={['ROLE_SELLER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN']}>
                <SellerLayout />
              </RoleGuard>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<SellerDashboardPage />} />
            <Route path="products" element={<SellerProductsPage />} />
            <Route path="inventory" element={<SellerProductsPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="customers" element={<AdminUsersPage />} />
            <Route path="coupons" element={<AdminCouponsPage />} />
            <Route path="reviews" element={<AdminReviewsPage />} />
            <Route path="analytics" element={<AdminDashboardPage />} />
            <Route path="payments" element={<AdminPaymentsPage />} />
            <Route path="shipping" element={<AdminOrdersPage />} />
            <Route path="notifications" element={<ProfilePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="support" element={<ContactPage />} />
          </Route>

          {/* ADMIN PORTAL (ROLE_ADMIN, ROLE_SUPER_ADMIN) */}
          <Route
            path="portal/admin"
            element={
              <RoleGuard allowedRoles={['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']}>
                <AdminLayout />
              </RoleGuard>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="payments" element={<AdminPaymentsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="roles" element={<AdminRolesPage />} />
            <Route path="languages" element={<AdminLanguagesPage />} />
            <Route path="translations" element={<AdminTranslationsPage />} />
            <Route path="media" element={<AdminMediaPage />} />
            <Route path="coupons" element={<AdminCouponsPage />} />
            <Route path="reviews" element={<AdminReviewsPage />} />
          </Route>

          {/* Legacy /admin path compatibility */}
          <Route path="admin/*" element={<Navigate to="../portal/admin/dashboard" replace />} />

          {/* SUPER ADMIN PORTAL (ROLE_SUPER_ADMIN ONLY) */}
          <Route
            path="portal/super-admin"
            element={
              <RoleGuard allowedRoles={['ROLE_SUPER_ADMIN']}>
                <SuperAdminLayout />
              </RoleGuard>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<SuperAdminDashboardPage />} />
            <Route path="system" element={<SuperAdminDashboardPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="roles" element={<AdminRolesPage />} />
            <Route path="permissions" element={<AdminRolesPage />} />
            <Route path="admins" element={<AdminUsersPage />} />
            <Route path="security" element={<SuperAdminDashboardPage />} />
            <Route path="configurations" element={<SuperAdminDashboardPage />} />
            <Route path="feature-flags" element={<SuperAdminDashboardPage />} />
            <Route path="integrations" element={<SuperAdminDashboardPage />} />
            <Route path="database" element={<SuperAdminDashboardPage />} />
            <Route path="audit-logs" element={<SuperAdminDashboardPage />} />
          </Route>
        </Route>

        {/* Catch-all page */}
        <Route path="*" element={<FallbackLanguageRedirect />} />
      </Routes>
    </BrowserRouter>
  );
};

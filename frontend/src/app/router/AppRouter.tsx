import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../../shared/layouts/MainLayout';
import { CustomerLayout } from '../../shared/layouts/CustomerLayout';
import { AdminLayout } from '../../shared/layouts/AdminLayout';

import { ProtectedRoute } from './ProtectedRoute';
import { AdminRoute } from './AdminRoute';

import { LandingPage } from '../../features/product/LandingPage';
import { ProductCatalogPage } from '../../features/product/ProductCatalogPage';
import { ProductDetailPage } from '../../features/product/ProductDetailPage';
import { CartPage } from '../../features/cart/CartPage';
import { WishlistPage } from '../../features/wishlist/WishlistPage';

import { LoginPage } from '../../features/auth/LoginPage';
import { RegisterPage } from '../../features/auth/RegisterPage';
import { ForgotPasswordPage } from '../../features/auth/ForgotPasswordPage';

import { CheckoutPage } from '../../features/order/CheckoutPage';
import { OrderSuccessPage } from '../../features/order/OrderSuccessPage';
import { OrderHistoryPage } from '../../features/order/OrderHistoryPage';
import { OrderTrackingPage } from '../../features/shipping/OrderTrackingPage';

import { ProfilePage } from '../../features/profile/ProfilePage';

import { AdminDashboardPage } from '../../features/admin/AdminDashboardPage';
import { AdminProductsPage } from '../../features/admin/AdminProductsPage';
import { AdminOrdersPage } from '../../features/admin/AdminOrdersPage';
import { AdminUsersPage } from '../../features/admin/AdminUsersPage';
import { AdminCouponsPage } from '../../features/admin/AdminCouponsPage';
import { AdminReviewsPage } from '../../features/admin/AdminReviewsPage';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Storefront Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="products" element={<ProductCatalogPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<WishlistPage />} />

          {/* Auth Routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected Checkout & Order Success */}
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
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
        </Route>

        {/* Customer Dashboard Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <CustomerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<ProfilePage />} />
          <Route path="orders" element={<OrderHistoryPage />} />
        </Route>

        {/* Executive Admin Suite Layout */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="coupons" element={<AdminCouponsPage />} />
          <Route path="reviews" element={<AdminReviewsPage />} />
        </Route>

        {/* Catch-all redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

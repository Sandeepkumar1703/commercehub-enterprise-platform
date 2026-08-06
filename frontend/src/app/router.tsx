import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { RoleGuard } from '../components/auth/RoleGuard';

// Pages
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { ForgotPassword } from '../pages/auth/ForgotPassword';
import { ResetPassword } from '../pages/auth/ResetPassword';
import { VerifyEmail } from '../pages/auth/VerifyEmail';

import { ProductList } from '../pages/product/ProductList';
import { ProductDetails } from '../pages/product/ProductDetails';
import { ProductCreate } from '../pages/product/ProductCreate';
import { ProductEdit } from '../pages/product/ProductEdit';
import { VynkStore } from '../components/store/VynkStore';

import { Cart } from '../pages/cart/Cart';
import { Checkout } from '../pages/checkout/Checkout';
import { OrderSuccess } from '../pages/checkout/OrderSuccess';
import { Wishlist } from '../pages/wishlist/Wishlist';
import { AboutVynk } from '../pages/about/AboutVynk';

import { Profile } from '../pages/user/Profile';
import { Addresses } from '../pages/user/Addresses';

import { OrderList } from '../pages/order/OrderList';
import { OrderDetails } from '../pages/order/OrderDetails';

import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { ProductManagement } from '../pages/admin/ProductManagement';
import { OrderManagement } from '../pages/admin/OrderManagement';
import { CustomerList } from '../pages/admin/CustomerList';
import { RevenueAnalytics } from '../pages/admin/RevenueAnalytics';
import { SalesAnalytics } from '../pages/admin/SalesAnalytics';
import { LowStockProducts } from '../pages/admin/LowStockProducts';

import { RoleManagement } from '../pages/permission/RoleManagement';
import { PermissionMatrix } from '../pages/permission/PermissionMatrix';
import { UserPermissions } from '../pages/permission/UserPermissions';

import { LanguageManagement } from '../pages/language/LanguageManagement';

import { PaymentHistory } from '../pages/payment/PaymentHistory';
import { PaymentDetails } from '../pages/payment/PaymentDetails';
import { PaymentStatus } from '../pages/payment/PaymentStatus';

import { ShipmentList } from '../pages/shipping/ShipmentList';
import { ShipmentDetails } from '../pages/shipping/ShipmentDetails';
import { ShipmentTracking } from '../pages/shipping/ShipmentTracking';

import { MediaManagement } from '../pages/media/MediaManagement';
import { InventoryManagement } from '../pages/inventory/InventoryManagement';

import NotFoundPage from '../pages/errors/404';
import ForbiddenPage from '../pages/errors/403';
import ServerErrorPage from '../pages/errors/500';
import NetworkErrorPage from '../pages/errors/NetworkError';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <ProductList /> },
      { path: 'products', element: <ProductList /> },
      { path: 'products/:id', element: <ProductDetails /> },
      { path: 'store', element: <VynkStore /> },
      { path: 'curated', element: <VynkStore /> },
      { path: 'cart', element: <Cart /> },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      { path: 'order-success/:id', element: <OrderSuccess /> },
      { path: 'wishlist', element: <Wishlist /> },
      { path: 'about-vynk', element: <AboutVynk /> },
      { path: 'about', element: <AboutVynk /> },

      // Auth
      { path: 'auth/login', element: <Login /> },
      { path: 'auth/register', element: <Register /> },
      { path: 'auth/forgot-password', element: <ForgotPassword /> },
      { path: 'auth/reset-password', element: <ResetPassword /> },
      { path: 'auth/verify-email', element: <VerifyEmail /> },

      // User Profile
      {
        path: 'user/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/addresses',
        element: (
          <ProtectedRoute>
            <Addresses />
          </ProtectedRoute>
        ),
      },

      // Orders
      {
        path: 'order/orders',
        element: (
          <ProtectedRoute>
            <OrderList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'order/details/:id',
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },

      // Admin & Merchant Portal Routes
      {
        path: 'admin/dashboard',
        element: (
          <ProtectedRoute>
            <RoleGuard roles={['ADMIN', 'SUPER_ADMIN', 'SELLER']}>
              <AdminDashboard />
            </RoleGuard>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/products',
        element: (
          <ProtectedRoute>
            <RoleGuard roles={['ADMIN', 'SUPER_ADMIN', 'SELLER']}>
              <ProductManagement />
            </RoleGuard>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/products/create',
        element: (
          <ProtectedRoute>
            <RoleGuard roles={['ADMIN', 'SUPER_ADMIN', 'SELLER']}>
              <ProductCreate />
            </RoleGuard>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/products/edit/:id',
        element: (
          <ProtectedRoute>
            <RoleGuard roles={['ADMIN', 'SUPER_ADMIN', 'SELLER']}>
              <ProductEdit />
            </RoleGuard>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/orders',
        element: (
          <ProtectedRoute>
            <RoleGuard roles={['ADMIN', 'SUPER_ADMIN', 'SELLER']}>
              <OrderManagement />
            </RoleGuard>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/customers',
        element: (
          <ProtectedRoute>
            <RoleGuard roles={['ADMIN', 'SUPER_ADMIN']}>
              <CustomerList />
            </RoleGuard>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/revenue',
        element: (
          <ProtectedRoute>
            <RoleGuard roles={['ADMIN', 'SUPER_ADMIN', 'SELLER']}>
              <RevenueAnalytics />
            </RoleGuard>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/sales',
        element: (
          <ProtectedRoute>
            <RoleGuard roles={['ADMIN', 'SUPER_ADMIN', 'SELLER']}>
              <SalesAnalytics />
            </RoleGuard>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/low-stock',
        element: (
          <ProtectedRoute>
            <RoleGuard roles={['ADMIN', 'SUPER_ADMIN', 'SELLER']}>
              <LowStockProducts />
            </RoleGuard>
          </ProtectedRoute>
        ),
      },

      // Permission & RBAC Admin
      {
        path: 'permission/roles',
        element: (
          <ProtectedRoute>
            <RoleGuard roles={['SUPER_ADMIN']}>
              <RoleManagement />
            </RoleGuard>
          </ProtectedRoute>
        ),
      },
      {
        path: 'permission/permissions',
        element: (
          <ProtectedRoute>
            <RoleGuard roles={['SUPER_ADMIN']}>
              <PermissionMatrix />
            </RoleGuard>
          </ProtectedRoute>
        ),
      },
      {
        path: 'permission/user-permissions',
        element: (
          <ProtectedRoute>
            <RoleGuard roles={['SUPER_ADMIN']}>
              <UserPermissions />
            </RoleGuard>
          </ProtectedRoute>
        ),
      },

      // Language Management
      {
        path: 'language/management',
        element: (
          <ProtectedRoute>
            <RoleGuard roles={['ADMIN', 'SUPER_ADMIN']}>
              <LanguageManagement />
            </RoleGuard>
          </ProtectedRoute>
        ),
      },

      // Payment Management
      { path: 'payment/history', element: <ProtectedRoute><PaymentHistory /></ProtectedRoute> },
      { path: 'payment/details/:id', element: <ProtectedRoute><PaymentDetails /></ProtectedRoute> },
      { path: 'payment/status', element: <ProtectedRoute><PaymentStatus /></ProtectedRoute> },

      // Shipping Management
      { path: 'shipping/list', element: <ProtectedRoute><ShipmentList /></ProtectedRoute> },
      { path: 'shipping/details/:id', element: <ProtectedRoute><ShipmentDetails /></ProtectedRoute> },
      { path: 'shipping/tracking/:trackingNumber', element: <ProtectedRoute><ShipmentTracking /></ProtectedRoute> },

      // Media Management
      { path: 'media/management', element: <ProtectedRoute><MediaManagement /></ProtectedRoute> },

      // Inventory Management
      { path: 'inventory/management', element: <ProtectedRoute><InventoryManagement /></ProtectedRoute> },

      // Error Pages
      { path: '403', element: <ForbiddenPage /> },
      { path: '500', element: <ServerErrorPage /> },
      { path: 'network-error', element: <NetworkErrorPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

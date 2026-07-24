import React from 'react';
import { AppProvider, useApp } from './app/store/store';
import { MainLayout } from './layouts/MainLayout';
import { SellerLayout } from './layouts/SellerLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Pages
import { PLP } from './features/products/pages/PLP';
import { PDP } from './features/products/pages/PDP';
import { CustomerAccount } from './features/profile/pages/CustomerAccount';

import { SellerDashboard } from './features/seller/pages/SellerDashboard';
import { AddProductWorkflow } from './features/seller/pages/AddProductWorkflow';
import { InventoryOrdersTable } from './features/seller/pages/InventoryOrdersTable';
import { SellerWallet } from './features/seller/pages/SellerWallet';

import { AdminDashboard } from './features/admin/pages/AdminDashboard';
import { UserManagement } from './features/admin/pages/UserManagement';
import { AuditLogs } from './features/admin/pages/AuditLogs';

import { Login } from './features/auth/pages/Login';
import { Register } from './features/auth/pages/Register';
import { ForgotPassword } from './features/auth/pages/ForgotPassword';
import { ResetPassword } from './features/auth/pages/ResetPassword';
import { VerifyOTP } from './features/auth/pages/VerifyOTP';
import { VerifyEmail } from './features/auth/pages/VerifyEmail';

import { MarketingLanding } from './pages/MarketingLanding';
import { PrintableInvoice } from './pages/PrintableInvoice';
import { SystemErrorPages } from './pages/SystemErrorPages';
import PageNavigator from '@/shared/components/PageNavigator';


const AppContent: React.FC = () => {
  const {
    portal,
    customerView,
    sellerView,
    adminView,
    authView,
    systemView
  } = useApp();

  // 1. Customer Shopping Portal
  if (portal === 'customer') {
    return (
      <MainLayout>
        {customerView === 'plp' && <PLP />}
        {customerView === 'pdp' && <PDP />}
        {customerView === 'account' && <CustomerAccount />}
      </MainLayout>
    );
  }

  // 2. Seller Operations Portal
  if (portal === 'seller') {
    return (
      <SellerLayout>
        {sellerView === 'dashboard' && <SellerDashboard />}
        {sellerView === 'add-product' && <AddProductWorkflow />}
        {sellerView === 'inventory' && <InventoryOrdersTable />}
        {sellerView === 'wallet' && <SellerWallet />}
      </SellerLayout>
    );
  }

  // 3. Admin Governance Portal
  if (portal === 'admin') {
    return (
      <AdminLayout>
        {adminView === 'dashboard' && <AdminDashboard />}
        {adminView === 'users' && <UserManagement />}
        {adminView === 'audit' && <AuditLogs />}
      </AdminLayout>
    );
  }

  // 4. Authentication Flow Pages
  if (portal === 'auth') {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4">
        {authView === 'login' && <Login />}
        {authView === 'register' && <Register />}
        {authView === 'forgot' && <ForgotPassword />}
        {authView === 'reset' && <ResetPassword />}
        {authView === 'otp' && <VerifyOTP />}
        {authView === 'verify-email' && <VerifyEmail />}
      </div>
    );
  }

  // 5. Public Marketing Landing Page
  if (portal === 'marketing') {
    return <MarketingLanding />;
  }

  // 6. System Utility Pages (Invoice, Errors)
  if (portal === 'system') {
    if (systemView === 'invoice') return <PrintableInvoice />;
    return <SystemErrorPages />;
  }

  return <MarketingLanding />;
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
      <PageNavigator />
    </AppProvider>
  );
}

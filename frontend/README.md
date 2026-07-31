# CommerceHub Enterprise Platform

CommerceHub Enterprise is a high-performance, multi-tenant e-commerce platform built with React 18, TypeScript, Redux Toolkit, and Tailwind CSS. It connects seamlessly to backend microservices for authentic, API-driven retail management.

---

## Architecture Overview

```
+-----------------------------------------------------------------------+
|                      CommerceHub Frontend App                         |
|                                                                       |
|   +-----------------------+     +-------------------------------+     |
|   |   React UI Components | <-> | Redux Toolkit / Context State |     |
|   +-----------------------+     +-------------------------------+     |
|               |                                 |                     |
|               v                                 v                     |
|   +-------------------------------------------------------------+     |
|   |                    Service Layer Module                     |     |
|   +-------------------------------------------------------------+     |
|                                   |                                   |
|                                   v                                   |
|   +-------------------------------------------------------------+     |
|   |                    Axios HTTP Client                        |     |
|   |   (JWT Auto-injection, Refresh Interceptor, Error Handler)  |     |
|   +-------------------------------------------------------------+     |
+-----------------------------------|-----------------------------------+
                                    |
                                    v API Gateway / Proxy (/api)
+-----------------------------------------------------------------------+
|                       CommerceHub Backend Services                    |
+-----------------------------------------------------------------------+
```

---

## Directory Structure

```
src/
├── app/
│   ├── providers/          # Global theme and layout providers
│   ├── router/             # React Router 6 configuration & Security guards
│   └── store/              # Redux store definition, slices, and custom hooks
├── core/
│   ├── api/                # Axios client setup, interceptors, and constants
│   └── i18n/               # i18n Context, translation keys, and locale maps
├── features/
│   ├── admin/              # Admin Suite: Dashboard, Products, Orders, Roles, etc.
│   ├── auth/               # Auth Pages: Login, Register, Verify Email, Password Reset
│   ├── cart/               # Shopping Cart state & API hooks
│   ├── order/              # Checkout flow & Order history tracking
│   ├── payment/            # Payment transaction status & Retry/Refund flows
│   ├── product/            # Catalog, Search, Filtering, Categories, Compare
│   ├── profile/            # User profile management & Address book
│   ├── shipping/           # Shipment tracking & carrier events
│   ├── support/            # AI-powered Customer Support Chat drawer
│   └── wishlist/           # Saved favorites & Wishlist sync
├── services/               # Modular API services (1:1 mapped to backend)
├── shared/
│   ├── components/         # Reusable UI library (Button, Card, Table, Modal, Toast)
│   └── layouts/            # MainLayout, AdminLayout, CustomerLayout, Footer, Header
├── types/                  # Strict TypeScript interfaces for domain entities
├── App.tsx                 # Root application component with ErrorBoundary
└── main.tsx                # Application entry point
```

---

## Environment Setup

Declare required environment variables in `.env`:

```env
# Server API Base URL
VITE_API_BASE_URL="/api"

# AI Studio Gemini Integration
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

---

## Installation & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:3000`.

### 3. Production Build & Linter Verification
```bash
npm run lint
npm run build
```

---

## Key Features & Enterprise Capabilities

- **100% Real API Driven**: No hardcoded dummy business data or mock responses. All screens consume official service modules.
- **Strict Security & JWT Lifecycle**: Automatic token refresh handling via Axios interceptors, role-based admin route guards, and email verification.
- **Dynamic i18n Engine**: Dynamic language switching with backend translation key fallback, locale URL routing (`/:lang/...`), and RTL support for Arabic.
- **Enterprise Admin Suite**: Comprehensive administration tools for product catalogs, inventory, role management, payments, user access control, categories, languages, translations, and media library.
- **Responsive & Accessible**: Desktop-first precision with mobile-first code, complete touch target sizing, dark mode theme support, and WCAG compliance.

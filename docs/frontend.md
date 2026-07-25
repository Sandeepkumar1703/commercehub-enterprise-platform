# ⚛️ CommerceHub — Frontend Architecture & State Management

Documentation for the React 19 single-page application (SPA).

---

## 🛠️ Tech Stack & Dependencies

- **React**: `19.0.1`
- **Vite**: `6.2.3`
- **TypeScript**: `5.8.2`
- **Tailwind CSS**: `4.1.14`
- **Lucide Icons**: `0.546.0`

---

## 📂 Frontend Directory Structure

```
src/
├── App.tsx                     # Main layout & router container
├── main.tsx                    # Application entry point
├── components/                 # Reusable UI components
│   ├── common/                 # Header, Footer, Hero, ToastContainer
│   ├── admin/                  # Admin Operations Console components
│   └── customer/               # Cart Drawer, Checkout, Order Tracking
├── context/                    # React Context State Hydration
│   ├── AuthContext.tsx         # JWT Session & User State
│   ├── CartContext.tsx         # Shopping Cart & Wishlist State
│   └── LanguageContext.tsx     # Multi-language translation engine
├── core/                       # Core Router & API Client
│   ├── router/Router.tsx       # Custom Client-side Router
│   └── api/apiClient.ts        # Axios client with interceptors
├── data/                       # Product catalog & mock datasets
├── pages/                      # Page Views
│   ├── HomePage.tsx            # Storefront Home
│   ├── ProductsPage.tsx        # Catalog Page (PLP)
│   ├── ProductDetailPage.tsx   # Product Detail View (PDP)
│   ├── ApiDocsPage.tsx         # System Documentation Console
│   ├── admin/                  # Admin Dashboard Page
│   ├── auth/                   # Auth Pages (Login, Register, Reset, Verify)
│   └── customer/               # Customer Pages (Account, Cart, Orders, Tracking)
├── theme/                      # Routes & API endpoint specifications
└── types.ts                    # Global TypeScript interface definitions
```

import React, { useState } from 'react';
import { API_ENDPOINTS, ApiEndpointSpec } from '../theme/apiEndpoints';
import { ApiClient } from '../core/api/apiClient';
import { useLanguage } from '../context/LanguageContext';
import {
  Code2,
  Copy,
  Check,
  Search,
  Terminal,
  Play,
  ChevronDown,
  ChevronUp,
  Loader2,
  CheckCircle2,
  XCircle,
  Database,
  Layers,
  GitBranch,
  ShieldCheck,
  UserCheck,
  Users,
  Server,
  Layout,
  ShoppingBag,
  Truck,
  Key,
  Cpu,
  Workflow,
  ArrowRight,
  FileCode2,
  Box,
} from 'lucide-react';

type DocTab = 'overview' | 'roles' | 'flowcharts' | 'database' | 'backend' | 'frontend' | 'api';

export const ApiDocsPage: React.FC = () => {
  const { t } = useLanguage();

  const [docTab, setDocTab] = useState<DocTab>('overview');

  // API Console State
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeMethod, setActiveMethod] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(API_ENDPOINTS[0].id);

  // Execution states for interactive testing
  const [requestPayloads, setRequestPayloads] = useState<Record<string, string>>({});
  const [executionLoading, setExecutionLoading] = useState<Record<string, boolean>>({});
  const [executionResults, setExecutionResults] = useState<Record<string, { status: number | string; data: unknown; error?: string }>>({});

  const categories = ['ALL', 'User', 'Product', 'Auth', 'Role', 'Test'];
  const methods = ['ALL', 'GET', 'POST', 'PUT', 'DELETE'];

  const filteredEndpoints = API_ENDPOINTS.filter((endpoint) => {
    const matchesCat = activeCategory === 'ALL' || endpoint.category === activeCategory;
    const matchesMethod = activeMethod === 'ALL' || endpoint.method === activeMethod;
    const matchesQuery =
      endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesMethod && matchesQuery;
  });

  const handleCopyCurl = (id: string, curlStr: string) => {
    navigator.clipboard.writeText(curlStr);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExecuteRequest = async (endpoint: ApiEndpointSpec) => {
    const id = endpoint.id;
    setExecutionLoading((prev) => ({ ...prev, [id]: true }));
    setExecutionResults((prev) => ({ ...prev, [id]: { status: 'Executing...', data: null } }));

    let path = endpoint.path;
    if (path.includes('{id}')) path = path.replace('{id}', '101');
    if (path.includes('{token}')) path = path.replace('{token}', 'vtoken_demo_123');
    if (path.includes('{userId}')) path = path.replace('{userId}', '1');
    if (path.includes('{roleId}')) path = path.replace('{roleId}', '2');

    const payloadText = requestPayloads[id] ?? endpoint.requestBody ?? '';
    let parsedBody: unknown = undefined;
    if (payloadText.trim() && (endpoint.method === 'POST' || endpoint.method === 'PUT')) {
      try {
        parsedBody = JSON.parse(payloadText);
      } catch {
        parsedBody = payloadText;
      }
    }

    try {
      let resultData: unknown = null;
      if (endpoint.method === 'GET') {
        resultData = await ApiClient.get(path);
      } else if (endpoint.method === 'POST') {
        resultData = await ApiClient.post(path, parsedBody);
      } else if (endpoint.method === 'PUT') {
        resultData = await ApiClient.put(path, parsedBody);
      } else if (endpoint.method === 'DELETE') {
        resultData = await ApiClient.delete(path);
      }

      setExecutionResults((prev) => ({
        ...prev,
        [id]: {
          status: 200,
          data: resultData ?? { message: 'Success (HTTP 200/204)' },
        },
      }));
    } catch (err) {
      setExecutionResults((prev) => ({
        ...prev,
        [id]: {
          status: 'Offline / Mock Response',
          data: endpoint.responseBody ? JSON.parse(endpoint.responseBody) : { message: 'Processed via client simulation' },
          error: String(err),
        },
      }));
    } finally {
      setExecutionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const getMethodBadgeClass = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'POST':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300 dark:border-blue-800';
      case 'PUT':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'DELETE':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-800';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-8 py-6 animate-in fade-in duration-300">
      
      {/* Platform Banner */}
      <div className="bg-[var(--bg-surface-raised)] text-[var(--text-primary)] p-8 rounded-3xl border border-[var(--border-default)] shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#EEF4F8] dark:bg-[#2B3645] text-[#4F6D8C] dark:text-[#88BDF2] text-xs font-mono font-bold tracking-wider uppercase border border-[#D6DEE6] dark:border-[#374151] flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5 text-[#4F6D8C] dark:text-[#88BDF2]" />
                CommerceHub Platform Blueprints
              </span>
              <span className="text-xs text-[var(--text-secondary)] font-mono">v2.4 Enterprise Edition</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
              Complete System Documentation & Architecture Guide
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-2xl leading-relaxed">
              Comprehensive reference covering RBAC user roles, end-to-end execution flowcharts, PostgreSQL database schema ER diagrams, Spring Boot 3 microservice backend flow, React context frontend state pipeline, and interactive REST APIs.
            </p>
          </div>
        </div>

        {/* Documentation Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-[var(--border-default)] mt-6 scrollbar-none">
          {[
            { id: 'overview', label: '1. Overview', icon: Layers },
            { id: 'roles', label: '2. User Roles & RBAC', icon: Users },
            { id: 'flowcharts', label: '3. System Flowcharts', icon: GitBranch },
            { id: 'database', label: '4. Database Schema (ER)', icon: Database },
            { id: 'backend', label: '5. Backend Flow (Spring Boot)', icon: Server },
            { id: 'frontend', label: '6. Frontend Flow (React)', icon: Layout },
            { id: 'api', label: '7. REST API Console', icon: Code2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = docTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setDocTab(tab.id as DocTab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#4F6D8C] text-white dark:bg-[#88BDF2] dark:text-[#111827] shadow-xs font-extrabold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[#EEF4F8] dark:hover:bg-[#2B3645]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white dark:text-[#111827]' : 'text-[var(--text-secondary)]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {docTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-6">
            <h2 className="text-xl font-black text-[var(--text-primary)] flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-500" />
              <span>CommerceHub Platform Architecture Overview</span>
            </h2>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              CommerceHub is an enterprise-grade multi-tenant e-commerce platform designed with high-throughput microservice decoupled architecture. It features a modern, responsive React 18 TypeScript single-page application (SPA) on the frontend, communicating seamlessly with a Spring Boot 3 backend utilizing PostgreSQL for persistent storage and Redis for high-speed caching and token blacklisting.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-2">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center font-bold">
                  <Layout className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Frontend Layer (React 18 + Vite)</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Single-Page App powered by React Context state hydration, custom client router, Tailwind CSS variable design tokens, Lucide vector iconography, and Axios interceptor network handlers.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 flex items-center justify-center font-bold">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Backend Core (Spring Boot 3)</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Java 17 runtime utilizing Spring Security, Stateless JWT authentication filters, BCrypt password hashing, MapStruct DTO mapping, and Spring Data JPA repositories.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center font-bold">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Data Layer (PostgreSQL)</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  ACID-compliant relational storage with foreign key constraints, indexes on lookup columns (SKU, email, status), coupon usage tracking, and multi-role junction tables.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ROLES & RBAC */}
      {docTab === 'roles' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-black text-[var(--text-primary)] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-500" />
                <span>Role Based Access Control (RBAC) Matrix</span>
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Security privileges enforced via Spring Security <code className="text-indigo-600 font-mono">@PreAuthorize("hasRole('ADMIN')")</code> and frontend protected route guards.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-default)] text-[var(--text-secondary)] uppercase tracking-wider font-semibold">
                    <th className="py-3.5 px-4">Role Code</th>
                    <th className="py-3.5 px-4">User Level</th>
                    <th className="py-3.5 px-4">Key Responsibilities</th>
                    <th className="py-3.5 px-4">Allowed System Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-default)] font-medium">
                  <tr className="hover:bg-[var(--bg-surface-raised)] transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-slate-500">GUEST / ANONYMOUS</td>
                    <td className="py-4 px-4">Public Visitor</td>
                    <td className="py-4 px-4">Storefront browsing & catalog search</td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      View product catalog, filter categories, view product details, register account, submit email verification token, request password reset.
                    </td>
                  </tr>

                  <tr className="hover:bg-[var(--bg-surface-raised)] transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-indigo-600">ROLE_USER</td>
                    <td className="py-4 px-4">Authenticated Customer</td>
                    <td className="py-4 px-4">Personal shopping & account management</td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      Manage shopping cart & wishlist, apply discount coupons, checkout with tax & shipping calculations, view order history, track shipping waybill in real time, print GST invoices, write verified product reviews, update account profile & password.
                    </td>
                  </tr>

                  <tr className="hover:bg-[var(--bg-surface-raised)] transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-amber-600">ROLE_MANAGER</td>
                    <td className="py-4 px-4">Store Operator</td>
                    <td className="py-4 px-4">Inventory & fulfillment operations</td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      All ROLE_USER privileges plus: Restock product inventory levels, update order fulfillment status (PENDING, PAID, SHIPPED, DELIVERED), assign courier tracking numbers.
                    </td>
                  </tr>

                  <tr className="hover:bg-[var(--bg-surface-raised)] transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-emerald-600">ROLE_ADMIN</td>
                    <td className="py-4 px-4">System Administrator</td>
                    <td className="py-4 px-4">Full administrative platform control</td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      All privileges plus: Create & edit products, create new store categories, configure promotional discount campaigns, toggle user RBAC roles (ROLE_ADMIN, ROLE_MANAGER), suspend/activate customer accounts, inspect system metrics.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FLOWCHARTS */}
      {docTab === 'flowcharts' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Auth Flowchart */}
          <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Key className="w-5 h-5 text-indigo-500" />
              <span>1. User Authentication & Verification Flowchart</span>
            </h3>

            <div className="p-6 rounded-2xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
              {`[User Registration Form] 
       │
       ▼
[POST /api/auth/register] ──▶ Validate Email, Password & Name
       │
       ├──(Invalid) ──▶ Return HTTP 400 Bad Request
       │
       ▼
[Save User in DB with is_enabled = false]
       │
       ▼
[Generate Verification Token (24h expiry)] ──▶ Send Welcome Email
       │
       ▼
[User Clicks Verification Link]
       │
       ▼
[GET /api/auth/verify-email?token=xyz]
       │
       ├──(Expired/Invalid) ──▶ Return HTTP 400 "Invalid Token"
       │
       ▼
[Set is_enabled = true] ──▶ Return HTTP 200 "Account Verified"
       │
       ▼
[User Log In: POST /api/auth/login] ──▶ Verify Password via BCrypt
       │
       ▼
[Issue JWT Token] ──▶ Save in Client Local Storage / HTTP-Only Cookie`}
            </div>
          </div>

          {/* E-Commerce Shopping & Checkout Flowchart */}
          <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-500" />
              <span>2. Customer Shopping, Cart & Order Checkout Flowchart</span>
            </h3>

            <div className="p-6 rounded-2xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
              {`[Browse Catalog] ──▶ [Search / Filter Products]
       │
       ▼
[Select Item] ──▶ [Add to Cart (CartContext State Hydration)]
       │
       ▼
[View Cart Page] ──▶ [Apply Discount Coupon (e.g. COMMERCE10)]
       │
       ├──(Validate Code) ──▶ Deduct 10% from Subtotal
       │
       ▼
[Proceed to Checkout] ──▶ [Enter Shipping Address & Payment Details]
       │
       ▼
[Place Order] ──▶ [POST /api/orders or Client Local State]
       │
       ├──(1) Calculate Subtotal, Discount, Shipping ($15 or Free), Tax (10%)
       ├──(2) Deduct Product Stock Inventory
       ├──(3) Generate Order ID (e.g. ORD-98214) & Status = "PENDING" / "PAID"
       │
       ▼
[Order Confirmation Screen] ──▶ [View Real-Time Waybill Tracking]`
}
            </div>
          </div>

          {/* Order Fulfillment & Admin Logistics Flowchart */}
          <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-500" />
              <span>3. Order Fulfillment & Shipping Logistics Flowchart</span>
            </h3>

            <div className="p-6 rounded-2xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
              {`[Order Created (Status: PENDING)]
       │
       ▼
[Admin Dashboard: Order Queue]
       │
       ▼
[Admin Updates Status to "SHIPPED"] ──▶ [Assign Courier & Tracking Code]
       │                                     (e.g. FedEx TRK-9902188214)
       ▼
[Customer Order Tracking Page Updated in Real Time]
       │
       ├── Checkpoint 1: Order Processed at Hub
       ├── Checkpoint 2: Departed Origin Depot
       ├── Checkpoint 3: Out for Final Mile Delivery
       │
       ▼
[Admin Updates Status to "DELIVERED"]
       │
       ▼
[Customer Can Write Verified Product Review & Print Tax Invoice]`}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DATABASE SCHEMA */}
      {docTab === 'database' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-black text-[var(--text-primary)] flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-500" />
                <span>PostgreSQL Relational Schema & Entity Relationships</span>
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                ACID compliant schema with foreign key cascades, unique indices, and junction tables for RBAC.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed space-y-4">
              <div>
                <p className="text-emerald-400 font-bold mb-2">-- 1. USERS TABLE</p>
                <pre>{`CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_enabled BOOLEAN DEFAULT FALSE,
    is_account_non_locked BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);`}</pre>
              </div>

              <div>
                <p className="text-emerald-400 font-bold mb-2">-- 2. ROLES & USER_ROLES JUNCTION TABLE</p>
                <pre>{`CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL -- 'ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN'
);

CREATE TABLE user_roles (
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);`}</pre>
              </div>

              <div>
                <p className="text-emerald-400 font-bold mb-2">-- 3. PRODUCTS & CATEGORIES TABLES</p>
                <pre>{`CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    sku VARCHAR(50) UNIQUE NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    image_url VARCHAR(500),
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    reviews_count INT DEFAULT 0
);
CREATE INDEX idx_products_sku ON products(sku);`}</pre>
              </div>

              <div>
                <p className="text-emerald-400 font-bold mb-2">-- 4. ORDERS & ORDER_ITEMS TABLES</p>
                <pre>{`CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY, -- 'ORD-98214'
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    order_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) NOT NULL, -- 'PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'
    subtotal NUMERIC(10, 2) NOT NULL,
    discount NUMERIC(10, 2) DEFAULT 0.00,
    shipping_fee NUMERIC(10, 2) DEFAULT 0.00,
    tax NUMERIC(10, 2) NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    tracking_number VARCHAR(100),
    carrier VARCHAR(100),
    shipping_address JSONB NOT NULL
);

CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id),
    quantity INT NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL
);`}</pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BACKEND FLOW */}
      {docTab === 'backend' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-6">
            <h2 className="text-xl font-black text-[var(--text-primary)] flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-500" />
              <span>Spring Boot 3 Backend Architecture & Request Lifecycle</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="p-5 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-3">
                <h3 className="font-bold text-[var(--text-primary)] text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-500" />
                  <span>Spring Security & JwtAuthenticationFilter</span>
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Every HTTP request passes through <code className="text-indigo-600 font-mono">JwtAuthenticationFilter</code>. It parses the <code className="text-indigo-600 font-mono">Authorization: Bearer &lt;JWT&gt;</code> header, validates the cryptographic signature, checks Redis token blacklisting, and populates the <code className="text-indigo-600 font-mono">SecurityContextHolder</code> with granted authorities.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-3">
                <h3 className="font-bold text-[var(--text-primary)] text-sm flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-emerald-500" />
                  <span>Controller ──▶ Service ──▶ Repository Pattern</span>
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Controllers (<code className="text-emerald-600 font-mono">UserController</code>, <code className="text-emerald-600 font-mono">ProductController</code>) validate incoming DTOs using <code className="text-emerald-600 font-mono">@Valid</code> annotations, pass business processing to transactional services (<code className="text-emerald-600 font-mono">@Transactional</code>), and interact with JPA Repositories.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: FRONTEND FLOW */}
      {docTab === 'frontend' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-6">
            <h2 className="text-xl font-black text-[var(--text-primary)] flex items-center gap-2">
              <Layout className="w-5 h-5 text-indigo-500" />
              <span>React 18 Frontend State Engine & Context Hydration</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
              <div className="p-5 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-2">
                <p className="font-bold text-[var(--text-primary)] text-sm">AuthContext</p>
                <p className="text-[var(--text-secondary)]">
                  Handles user login, token storage, registration, profile updates, password change, and JWT session persistence.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-2">
                <p className="font-bold text-[var(--text-primary)] text-sm">CartContext</p>
                <p className="text-[var(--text-secondary)]">
                  Manages cart items, coupon discounts, order checkout placement, order status updates, and tracking numbers.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-2">
                <p className="font-bold text-[var(--text-primary)] text-sm">LanguageContext & ThemeContext</p>
                <p className="text-[var(--text-secondary)]">
                  Provides dark/light theme switching and multi-language translations (English & Hindi).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: REST API CONSOLE */}
      {docTab === 'api' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Control Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[var(--bg-surface)] p-5 rounded-2xl border border-[var(--border-default)] shadow-xs">
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search API endpoints (e.g. /api/users/profile, products, roles)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
              />
            </div>

            {/* Category Filter */}
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="px-3.5 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'ALL' ? 'All Controllers' : `${cat} Controller`}
                </option>
              ))}
            </select>

            {/* Method Filter */}
            <select
              value={activeMethod}
              onChange={(e) => setActiveMethod(e.target.value)}
              className="px-3.5 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
            >
              {methods.map((m) => (
                <option key={m} value={m}>
                  {m === 'ALL' ? 'All HTTP Methods' : m}
                </option>
              ))}
            </select>
          </div>

          {/* Endpoints List Accordion */}
          <div className="space-y-4">
            {filteredEndpoints.map((endpoint) => {
              const isExpanded = expandedId === endpoint.id;
              const isLoading = executionLoading[endpoint.id] || false;
              const result = executionResults[endpoint.id];

              return (
                <div
                  key={endpoint.id}
                  className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl overflow-hidden shadow-xs transition-all"
                >
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : endpoint.id)}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer hover:bg-[var(--bg-surface-raised)] transition-colors"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-extrabold border ${getMethodBadgeClass(
                          endpoint.method
                        )}`}
                      >
                        {endpoint.method}
                      </span>
                      <span className="font-mono text-sm font-extrabold text-[var(--text-primary)]">
                        {endpoint.path}
                      </span>
                      <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {endpoint.access}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-xs text-[var(--text-secondary)] line-clamp-1 hidden lg:block">
                        {endpoint.summary}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[var(--text-secondary)]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[var(--text-secondary)]" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-5 sm:p-6 border-t border-[var(--border-default)] bg-[var(--bg-surface-raised)]/50 space-y-5">
                      <p className="text-xs text-[var(--text-primary)] leading-relaxed">
                        {endpoint.summary}
                      </p>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[11px] font-mono text-[var(--text-secondary)] uppercase">
                          <span className="flex items-center gap-1.5">
                            <Terminal className="w-3.5 h-3.5 text-indigo-500" />
                            <span>cURL Execution Command</span>
                          </span>
                          <button
                            onClick={() => handleCopyCurl(endpoint.id, endpoint.curlExample)}
                            className="flex items-center gap-1 px-2.5 py-1 bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--brand-primary)] rounded-md text-[var(--text-primary)] font-sans font-bold cursor-pointer transition-colors"
                          >
                            {copiedId === endpoint.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span className="text-emerald-500">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy cURL</span>
                              </>
                            )}
                          </button>
                        </div>

                        <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-200 text-[11px] font-mono overflow-x-auto border border-slate-800 leading-relaxed">
                          {endpoint.curlExample}
                        </pre>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-[var(--border-default)]/60">
                        <span className="text-xs font-bold text-[var(--text-primary)]">
                          Interactive API Tester
                        </span>
                        <button
                          onClick={() => handleExecuteRequest(endpoint)}
                          disabled={isLoading}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Executing...</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Test Endpoint</span>
                            </>
                          )}
                        </button>
                      </div>

                      {endpoint.requestBody && (
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono font-bold text-[var(--text-secondary)] uppercase">
                            Editable Request Payload (JSON)
                          </span>
                          <textarea
                            rows={5}
                            value={requestPayloads[endpoint.id] ?? endpoint.requestBody}
                            onChange={(e) =>
                              setRequestPayloads((prev) => ({ ...prev, [endpoint.id]: e.target.value }))
                            }
                            className="w-full p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] text-[11px] font-mono text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                          />
                        </div>
                      )}

                      {result && (
                        <div className="space-y-1.5 pt-2">
                          <div className="flex items-center gap-2 text-xs font-bold">
                            {typeof result.status === 'number' ? (
                              <span className="flex items-center gap-1 text-emerald-600 font-mono">
                                <CheckCircle2 className="w-4 h-4" /> HTTP {result.status} OK
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-amber-600 font-mono">
                                <XCircle className="w-4 h-4" /> Status: {result.status}
                              </span>
                            )}
                          </div>
                          <pre className="p-3.5 rounded-xl bg-slate-950 text-emerald-400 text-[11px] font-mono overflow-x-auto border border-slate-800 leading-relaxed max-h-60">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

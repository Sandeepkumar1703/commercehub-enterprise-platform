# Vynk — Production Engineering Manual

Complete production documentation, infrastructure topology, testing coverage, CI/CD pipeline, and architectural specification for **Vynk Commerce Platform** (*Seamlessly Connected Shopping*).

---

## 🏛️ System Topology & Infrastructure Architecture

```
                  ┌────────────────────────┐
                  │   AWS CloudFront CDN   │
                  │ (Global Edge Caching)  │
                  └───────────┬────────────┘
                              │ HTTPS / TLS
                  ┌───────────▼────────────┐
                  │    Nginx Reverse Proxy │
                  │  (SSL/TLS + Rate Limit)│
                  └───────────┬────────────┘
                              │
          ┌───────────────────┴───────────────────┐
          │                                       │
┌─────────▼───────────┐                 ┌─────────▼───────────┐
│   Vynk React SPA    │                 │  Spring Boot REST   │
│ (Vite + TanStack Query)               │   Microservices API │
└─────────────────────┘                 └─────────┬─────────┬─┘
                                                  │         │
                                   ┌──────────────┴─┐     ┌─┴──────────────┐
                                   │ PostgreSQL DB  │     │  Redis Cache   │
                                   │ (Relational)   │     │  (Session/JWT) │
                                   └────────────────┘     └────────────────┘
                                                            │
                                                          ┌─▼──────────────┐
                                                          │ AWS S3 Bucket  │
                                                          │ (Media Assets) │
                                                          └────────────────┘
```

---

## 🧪 Comprehensive Automated Testing Suite

### 1. Vitest Unit & Integration Suites (`npm test`)
- **`src/__tests__/auth.test.ts`**: Verifies login authentication, customer registration, wrong password rejection, and password recovery.
- **`src/__tests__/commerce.test.ts`**: Verifies product fetching, cart additions, item removals, checkout payload conversion, order placement, and payment transaction handling.
- **`src/__tests__/rbac.test.ts`**: Verifies access permissions across `SUPER_ADMIN`, `ADMIN`, `SELLER`, and `CUSTOMER` role tiers.
- **`src/__tests__/unitTests.test.ts`**: Validates Zod form schemas, Vynk design system color tokens, and role definitions.

### 2. Playwright E2E Browser Testing (`npx playwright test`)
- **`e2e/commerce-flow.spec.ts`**: Full customer checkout flow (Login → Product Catalog → Product Detail → Shopping Cart → Checkout) and Admin operations (Dashboard → Analytics → Role Management).

---

## 🚀 Automated GitHub Actions CI/CD Pipeline (`.github/workflows/ci.yml`)

1. **Lint & Unit/Integration Job**:
   - Checks code formatting and TypeScript types (`npm run lint`).
   - Executes Vitest test suite (`npm test`).
   - Verifies standalone production bundling (`npm run build`).
2. **E2E Playwright Browser Job**:
   - Installs Playwright headless chromium/firefox/webkit.
   - Executes cross-browser end-to-end tests.
   - Uploads HTML test report artifacts on completion.
3. **Containerization Job**:
   - Builds optimized Docker production image (`docker build`).

---

## 💼 Senior Portfolio & Resume Positioning Statement

> **Vynk Commerce Platform (Seamlessly Connected Shopping)** — Ultra-fast full-stack e-commerce ecosystem built with React 18, TypeScript, Spring Boot, PostgreSQL, JWT Security, fine-grained RBAC authorization, multilingual dynamic localization, payment processing workflows, inventory controls, real-time analytics dashboards, automated Vitest and Playwright test suites, Docker containerization, and cloud-ready infrastructure.


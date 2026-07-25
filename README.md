# 🛒 CommerceHub — Modular Monolith E-Commerce Platform

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Java](https://img.shields.io/badge/Java-17_LTS-007396?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.2-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

CommerceHub is an enterprise-inspired modular monolith e-commerce platform built with React, Spring Boot, PostgreSQL, JWT authentication, and Flyway database migrations. The project follows software engineering best practices and is being developed incrementally with a focus on modularity, scalability, and maintainability.

---

## 📊 Project Status Matrix

| Domain Module | Backend Status | Frontend Status | Implementation Notes |
| :--- | :---: | :---: | :--- |
| **Authentication & Security** | ✅ Completed | ✅ Completed | JWT authentication, BCrypt hashing, email verification, password reset |
| **User Profile & Admin** | ✅ Completed | ✅ Completed | Profile view/edit, role assignments (`ROLE_ADMIN`, `ROLE_USER`) |
| **Product Catalog** | ✅ Completed | ✅ Completed | Product CRUD, category filtering, search, bulk upload APIs |
| **Interactive API Documentation** | ✅ Completed | ✅ Completed | In-app `/api-docs` console with ER diagrams, cURL tester, and Swagger UI |
| **Shopping Cart & Wishlist** | 🚧 In Progress | ✅ Completed | Frontend state active; server-side cart sync under development |
| **Orders & Fulfillment** | 🚧 In Progress | ✅ Completed | Order UI & waybill tracking live; server order persistence pending |
| **Payment Gateway (Stripe)** | 📋 Planned | 📋 Planned | Stripe PaymentIntent generation & webhook listener |
| **Distributed Caching (Redis)** | 📋 Planned | N/A | Session caching & token revocation store |

---

## 📋 Table of Contents

- [📊 Project Status Matrix](#-project-status-matrix)
- [🛠️ Tech Stack & Exact Versions](#️-tech-stack--exact-versions)
- [🏗️ System & Package Architecture](#️-system--package-architecture)
- [📡 API Endpoint Reference](#-api-endpoint-reference)
- [📂 Directory Structure](#-directory-structure)
- [🚀 Quick Start & Local Setup](#-quick-start--local-setup)
- [📚 Extended Documentation](#-extended-documentation)
- [👤 Author & Portfolio](#-author--portfolio)
- [📌 Project Status](#-project-status)

---

## 🛠️ Tech Stack & Exact Versions

### ⚛️ Frontend (`package.json`)
- **React**: `18.3.1`
- **Vite**: `6.2.0`
- **TypeScript**: `5.8.2`
- **Tailwind CSS**: `4.0.0`
- **Lucide Icons**: `0.475.0`
- **Axios**: `1.8.2`

### ☕ Backend (`pom.xml`)
- **Java**: `17 LTS`
- **Spring Boot**: `3.3.2`
- **Spring Security**: `6.x`
- **JWT**: `jjwt 0.12.x`
- **Database**: PostgreSQL `16`
- **Schema Migrations**: Flyway `10.x`
- **DTO Mapping**: MapStruct `1.5.x`

---

## 🏗️ System & Package Architecture

### 1. Request Flow

```
Client (React 18 SPA)
   │
   ▼
Spring Security Filter Chain (JwtAuthenticationFilter)
   │
   ▼
Controllers (@RestController DTO Validation)
   │
   ▼
Services (@Service Business Logic & Transactions)
   │
   ▼
Repositories (Spring Data JPA Repositories)
   │
   ▼
PostgreSQL 16 Database
```

### 2. Package Architecture (`com.commercehub.backend`)

```
com.commercehub.backend/
├── config/              # Security, CORS, WebMvc, Swagger Beans
├── security/            # JWT Provider & UserDetailsService
├── domain/
│   ├── auth/            # Auth Controller, Service, DTOs
│   ├── user/            # User Controller, Service, Repository, Entity
│   ├── product/         # Product Controller, Service, Repository, Entity
│   └── role/            # Role Controller, Service, Repository, Entity
├── exception/           # Global Exception Handler
└── CommerceHubApplication.java
```

For detailed architectural decisions, see [docs/architecture.md](docs/architecture.md).

---

## 📡 API Endpoint Reference

APIs are grouped by domain controller. OpenAPI/Swagger UI is accessible at `http://localhost:8080/swagger-ui/index.html`.

### 🔑 Authentication (`/api/auth`)
- `✓ POST /api/auth/register` — Account registration & verification token
- `✓ POST /api/auth/login` — Authenticate credentials & return JWT
- `✓ GET  /api/auth/verify-email` — Verify account email token
- `✓ POST /api/auth/forgot-password` — Request password reset token
- `✓ POST /api/auth/reset-password` — Reset password using token
- `✓ PUT  /api/auth/change-password` — Change password (Authenticated)
- `✓ POST /api/auth/logout` — Terminate session

### 📦 Products (`/api/products`)
- `✓ GET    /api/products` — Catalog listing with search & category filtering
- `✓ GET    /api/products/{id}` — Fetch product details by ID
- `✓ POST   /api/products` — Create product (`ROLE_ADMIN`)
- `✓ PUT    /api/products/{id}` — Edit product (`ROLE_ADMIN`)
- `✓ DELETE /api/products/{id}` — Remove product (`ROLE_ADMIN`)
- `✓ POST   /api/products/bulk` — Bulk create products (`ROLE_ADMIN`)

### 👤 Users (`/api/users`)
- `✓ GET /api/users/profile` — Fetch user profile (Authenticated)
- `✓ PUT /api/users/profile` — Update name & details (Authenticated)
- `✓ GET /api/users/admin/all` — List all registered users (`ROLE_ADMIN`)
- `✓ PUT /api/users/admin/{userId}/role` — Update user security role (`ROLE_ADMIN`)

### 🛡️ Roles (`/api/roles`)
- `✓ GET    /api/roles` — List system security roles (`ROLE_ADMIN`)
- `✓ POST   /api/roles` — Create new role (`ROLE_ADMIN`)
- `✓ POST   /api/roles/assign` — Assign role to user (`ROLE_ADMIN`)
- `✓ DELETE /api/roles/remove` — Remove role from user (`ROLE_ADMIN`)

For request payloads and cURL commands, see [docs/api.md](docs/api.md).

---

## 📂 Directory Structure

```
commercehub-enterprise-platform/
├── docs/                                     # Architecture & API Documentation
│   ├── api.md                                # Endpoint specifications
│   ├── architecture.md                       # Package design & security flows
│   ├── database.md                           # Flyway SQL schema & ER specs
│   └── frontend.md                           # React context & router layout
├── src/                                      # React Frontend
│   ├── components/                           # Modular UI components
│   │   ├── admin/                            # Admin Inventory Console
│   │   ├── auth/                             # Auth Modal & Forms
│   │   ├── common/                           # Header, Footer, Hero, Toast
│   │   └── customer/                         # Cart Drawer, Checkout, Tracking
│   ├── context/                              # AuthContext, CartContext, LanguageContext
│   ├── core/                                 # Custom Router & Axios API Client
│   ├── data/                                 # Catalog datasets
│   ├── i18n/                                 # English & Hindi translation dictionaries
│   ├── pages/                                # Page views (Home, Products, ApiDocs, Admin)
│   ├── theme/                                # Route constants & API spec list
│   ├── types.ts                              # TypeScript definitions
│   ├── App.tsx                               # Application shell
│   ├── main.tsx                              # Application entry point
│   └── index.css                             # Tailwind CSS tokens
├── .env.example
├── docker-compose.yml                        # Docker setup for PostgreSQL 16
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 🚀 Quick Start & Local Setup

### 1. Database Setup (PostgreSQL 16)
Start local PostgreSQL database using Docker Compose:

```bash
docker-compose up -d postgres
```

### 2. Backend Setup (Spring Boot)
Launch backend application (Flyway automatically runs database migrations):

```bash
cd backend
./mvnw spring-boot:run
```

- **Backend API**: `http://localhost:8080`
- **Swagger UI**: `http://localhost:8080/swagger-ui/index.html`

### 3. Frontend Setup (React 18)
Launch frontend development server:

```bash
npm install
npm run dev
```

- **Frontend App**: `http://localhost:3000`
- **System Documentation Portal**: `http://localhost:3000/api-docs`

---

## 📚 Extended Documentation

- 🏛️ [System Architecture & Package Design](docs/architecture.md)
- 📡 [API Endpoint Specifications & cURL Commands](docs/api.md)
- 📊 [Database ER Diagrams & Flyway Migrations](docs/database.md)
- ⚛️ [Frontend Context State & Component Hierarchy](docs/frontend.md)

---

## 👤 Author & Portfolio

**Sandeep Kumar Prasad**  
*Full-Stack Software Developer*

- **GitHub**: [@Sandeepkumar1703](https://github.com/Sandeepkumar1703)
- **LinkedIn**: [Sandeep Kumar Prasad](https://www.linkedin.com/in/sandeep-kumar-prasad-1703)
- **Email**: sandeepkumarprasad01@gmail.com
- **Repository**: [CommerceHub Enterprise Platform](https://github.com/Sandeepkumar1703/commercehub-enterprise-platform)

---

## 📌 Project Status

CommerceHub is currently under active development. Features, architecture, APIs, and documentation are subject to continuous refinement as domain modules are integrated. All rights reserved by the author.

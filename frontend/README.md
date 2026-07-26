# 🛒 CommerceHub — Modular Monolith E-Commerce Platform

[![Java](https://img.shields.io/badge/Java-17_LTS-007396?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.2-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Flyway](https://img.shields.io/badge/Flyway-Migrations-CC0200?style=for-the-badge&logo=flyway&logoColor=white)](https://flywaydb.org/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-Apache_2.0-D22128?style=for-the-badge)](LICENSE)

> An enterprise-inspired modular monolith e-commerce platform built with Java 17 LTS, Spring Boot 3.3, and modern React. Designed with strict domain separation, SOLID principles, Flyway database versioning, and JWT security to ensure a seamless path toward microservices refactoring.

---

## 📋 Table of Contents

- [✨ Project Highlights](#-project-highlights)
- [🏛️ Architecture Principles](#️-architecture-principles)
- [📐 Design Decisions: Why Modular Monolith?](#-design-decisions-why-modular-monolith)
- [🚧 Current Project Status](#-current-project-status)
- [⚡ Live Feature Matrix](#-live-feature-matrix)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ System Architecture](#️-system-architecture)
- [🔐 Authentication & Security Flow](#-authentication--security-flow)
- [📊 Database Schema & Tables](#-database-schema--tables)
- [🗄️ Flyway Database Migrations](#️-flyway-database-migrations)
- [📂 Directory Structure](#-directory-structure)
- [📡 API Documentation & Reference](#-api-documentation--reference)
- [🚀 Quick Start & Local Setup](#-quick-start--local-setup)
- [⚙️ Configuration & Environment Variables](#️-configuration--environment-variables)
- [🧪 Testing & Code Quality](#-testing--code-quality)
- [🌿 Development & Git Workflow](#-development--git-workflow)
- [🔮 Future Enhancements & Roadmap](#-future-enhancements--roadmap)
- [⚠️ Known Limitations](#️-known-limitations)
- [📋 Changelog](#-changelog)
- [🤝 Contributing](#-contributing)
- [👤 Author & Portfolio](#-author--portfolio)
- [📄 License](#-license)

---

## ✨ Project Highlights

- **Modular Monolith Architecture**: Strict package boundaries per domain module (`auth`, `user`, `product`, `role`), making future extraction into independent microservices seamless.
- **Enterprise Security Model**: Stateless dual-token JWT architecture (Short-lived Access Token + DB-backed Refresh Session), BCrypt password hashing, and Role-Based Access Control (RBAC).
- **Automated Database Migrations**: Zero-downtime schema evolution powered by Flyway versioning scripts (`V1__`, `V2__`, `V3__`) replacing manual schema scripts.
- **High-Performance React Frontend**: Single-Page Application built with React 18, TypeScript, Vite, and custom design tokens for rapid rendering and responsive interaction.
- **Type-Safe DTO Mapping**: Compile-time MapStruct object mapping eliminating runtime reflection overhead between JPA Entities and REST DTOs.
- **Global Error Management**: Uniform API exception responses with structured error codes (`ErrorResponse`), parameter validation handling (`@Valid`), and HTTP status mapping.

---

## 🏛️ Architecture Principles

The codebase strictly adheres to battle-tested enterprise design patterns:

- ✔ **Layered Domain Separation**: Clear boundaries between Presentation (Controllers), Business (Services), Persistence (Repositories), Data Transfer (DTOs), and Domain Entities.
- ✔ **SOLID Design Principles**: Single Responsibility Controllers/Services, Open-Closed extensibility, and Interface Segregation.
- ✔ **Type-Safe DTO Mapping**: MapStruct compile-time mappers eliminating reflection overhead between entities and DTO payloads.
- ✔ **Repository & Service Pattern**: Spring Data JPA repositories fully encapsulated behind clean Java interfaces.
- ✔ **Dependency Injection**: Clean constructor-based DI via Lombok `@RequiredArgsConstructor` ensuring immutable component state.
- ✔ **Bean Validation**: Declarative input validation via Jakarta `@Valid` annotations (`@NotNull`, `@Email`, `@Size`).
- ✔ **Stateless JWT Security**: SecurityContextHolder authorization via stateless Bearer token validation and BCrypt password hashing.
- ✔ **Role-Based Access Control (RBAC)**: Granular method and endpoint protection (`ROLE_ADMIN`, `ROLE_USER`).
- ✔ **Global Exception Handling**: Centralized `@RestControllerAdvice` transforming runtime exceptions into uniform JSON error envelopes.
- ✔ **Database Versioning**: Automated schema migrations using Flyway versioned SQL scripts.

---

## 📐 Design Decisions: Why Modular Monolith?

Rather than starting with distributed microservices complexity, CommerceHub utilizes a **Modular Monolith** strategy:

1. **Simplified Deployment**: A single runnable JAR artifact reduces infrastructure complexity during initial platform development.
2. **ACID Transaction Boundaries**: Relies on standard RDBMS database transactions without complex saga orchestration or eventual consistency bugs.
3. **Streamlined Local Development**: Simple setup via Docker Compose for PostgreSQL and direct `./mvnw spring-boot:run`.
4. **Clean Microservice Extraction Path**: Package boundaries (`com.commercehub.backend.controller`, `service`, `repository`, `dto`) ensure domain modules remain decoupled, allowing future extraction into dedicated microservices when traffic scale demands it.

---

## 🚧 Current Project Status

### Backend Progress
- ✅ **Authentication**: Registration, Login, Logout, Change Password
- ✅ **User Management**: Get Profile, Update Profile, Role Authorization
- ✅ **Catalog Management**: Product CRUD APIs, Bulk Product Creation
- ✅ **Security**: Role-Based Access Control (`ROLE_ADMIN`, `ROLE_USER`)
- 🟡 **Shopping Cart & Orders**: Cart Item APIs & Order Lifecycle (In Progress)
- ❌ **Category & Payments**: Category APIs, Stripe Integration, Redis Caching, Kafka Events (Planned)

### Frontend Progress
- ✅ **Authentication**: Sign In & Sign Up interface with real-time field validation
- ✅ **Token Management**: Automatic JWT storage & bearer header injection
- ✅ **Design System & Theme**: Theme Context, Color palette matrix, Typography scale, Token exporter
- ✅ **Product Showcase**: Product Listing Page (PLP) with filtering and interactive search
- 🟡 **Shopping Cart**: Slide-over drawer with local state management (In Progress)
- ❌ **Product Details Page (PDP)**: Dedicated item view (Planned)
- ❌ **Admin Dashboard**: Frontend management interface (Planned)
- ❌ **Checkout & Payments**: Multi-step shipping & payment processing (Planned)

---

## ⚡ Live Feature Matrix

### 🟢 Backend (Spring Boot 3.3)
| Module | Feature | Status | Endpoint / Notes |
| :--- | :--- | :---: | :--- |
| **Authentication** | User Registration | ✅ Completed | `POST /api/auth/register` (BCrypt hashing, default `ROLE_USER`) |
| **Authentication** | User Login | ✅ Completed | `POST /api/auth/login` (Returns JWT Access Token) |
| **Authentication** | Logout | ✅ Completed | `POST /api/auth/logout` (Invalidates active session) |
| **Authentication** | Change Password | ✅ Completed | `POST /api/auth/change-password` (Verifies old password) |
| **User Profile** | Fetch Profile | ✅ Completed | `GET /api/users/profile` (Authenticated user details) |
| **User Profile** | Update Profile | ✅ Completed | `PUT /api/users/profile` (Updates name & contact info) |
| **Catalog** | Complete Product CRUD | ✅ Completed | `GET`, `POST`, `PUT`, `DELETE /api/products` & `POST /api/products/bulk` |
| **Security** | Role Authorization | ✅ Completed | Role-Based Access Control (`ROLE_ADMIN` vs `ROLE_USER`) |
| **Shopping Cart** | Cart Management APIs | 🟡 In Progress | `POST /api/cart` (Add, update, remove items) |
| **Orders** | Order Lifecycle | 🟡 In Progress | `POST /api/orders` (Order creation & line items) |
| **Categories** | Category Hierarchy | ❌ Planned | Category management APIs |
| **Caching** | Redis Caching | ❌ Planned | Distributed session cache & token blacklisting |
| **Payments** | Stripe Integration | ❌ Planned | Payment intent webhooks and processing |

### 🔵 Frontend (React + TypeScript + Vite)
| Component / View | Description | Status |
| :--- | :--- | :---: |
| **Auth Pages** | Sign In / Sign Up screens with real-time field validation | ✅ Completed |
| **Token Management** | Automatic JWT storage & header injection | ✅ Completed |
| **User Profile View** | Account overview, profile editing, and security settings | ✅ Completed |
| **Product Showcase (PLP)** | Product grid listing with interactive search & filters | ✅ Completed |
| **Design System Specs** | Color palette, typography scale, spacing matrix, token exporter | ✅ Completed |
| **Shopping Cart Drawer** | Slide-over cart preview with local state management | 🟡 In Progress |
| **Product Details Page (PDP)** | Individual item view with gallery and full specs | ❌ Planned |
| **Admin Dashboard** | Product management table, category creator, role editor | ❌ Planned |
| **Checkout Flow** | Multi-step shipping, summary review, and payment processing | ❌ Planned |

---

## 🛠️ Tech Stack

### ☕ Backend Infrastructure
- **Language**: Java 17 LTS
- **Framework**: Spring Boot 3.3.2
- **Security**: Spring Security 6.x, JWT (`jjwt 0.12.x`)
- **Data Access**: Spring Data JPA, Hibernate 6.x
- **Database**: PostgreSQL 16
- **Schema Management**: Flyway Migration
- **Object Mapper**: MapStruct 1.5.x
- **API Specs**: Springdoc OpenAPI / Swagger UI 3.0
- **Utilities**: Lombok, Jakarta Validation (`@NotNull`, `@Email`, `@Size`)

### ⚛️ Frontend Infrastructure
- **Framework**: React 18.3 (Functional Components, Hooks)
- **Build System**: Vite 5.x
- **Language**: TypeScript 5.x
- **Styling**: CSS Custom Properties (Design Tokens), Modular CSS
- **Icons**: Lucide React
- **HTTP Client**: Native Fetch API with custom wrappers

### 🐳 DevOps & Environment
- **Containerization**: Docker & Docker Compose (PostgreSQL 16)
- **Build Automation**: Apache Maven 3.9+
- **Version Control**: Git (Feature branch workflow)

---

## 🏗️ System Architecture

CommerceHub is architected with clear horizontal separation between concerns. Every request flows sequentially through validation, security context, controller execution, service transaction bounds, and persistence layers.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                              │
│         React 18 SPA (TypeScript, Vite, Design Tokens, Lucide)         │
└────────────────────────────────────────────────────────────────────────┘
                                   │
                      REST Requests / JSON Payload
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      SECURITY & FILTER CHAIN                           │
│   JwtAuthenticationFilter ──► SecurityContextHolder ──► RBAC Rules     │
└────────────────────────────────────────────────────────────────────────┘
                                   │
                           Authenticated Request
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         CONTROLLER LAYER                               │
│       (@RestController, Endpoint Routing, Request DTO Validation)      │
└────────────────────────────────────────────────────────────────────────┘
                                   │
                             DTO Payload
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        MAPPER LAYER (MapStruct)                        │
│            DTO ◄─────────────────────────────────────► Entity          │
└────────────────────────────────────────────────────────────────────────┘
                                   │
                             Entity / Domain
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                          SERVICE LAYER                                 │
│        (@Service, Transaction Management, Business Logic Rules)        │
└────────────────────────────────────────────────────────────────────────┘
                                   │
                             JPA Interface
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        REPOSITORY LAYER                                │
│           (@Repository, Spring Data JPA, Custom JPQL Queries)          │
└────────────────────────────────────────────────────────────────────────┘
                                   │
                            SQL Execution
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    PERSISTENCE & STORAGE LAYER                         │
│           PostgreSQL 16 Database  ◄─── Flyway Migrations               │
│           Redis Cache (Planned - Future Enhancement)                   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication & Security Flow

The system employs a token-based authentication mechanism for stateless REST communication:

1. **Access Token (JWT)**: Short lived (15 minutes). Sent in the `Authorization: Bearer <token>` header for API requests.
2. **Session Security**: BCrypt password hashing (`strength 10`) and role verification on protected REST routes.

```
 Client (React)                 Backend (Spring Boot)             Database / Security
       │                                 │                                 │
       │─── 1. POST /api/auth/login ────►│                                 │
       │    (email, password)            │─── 2. Validate Credentials ────►│
       │                                 │    (BCrypt Password Match)      │
       │                                 │◄── 3. Credentials OK ───────────│
       │◄── 4. Return JWT Access Token ──│                                 │
       │                                 │                                 │
       │─── 5. GET /api/products ───────►│                                 │
       │    Header: Bearer <AccessToken> │─── 6. Validate JWT Claims ─────►│
       │                                 │    (Verify signature, exp)      │
       │◄── 7. HTTP 200 OK (Data) ───────│                                 │
       │                                 │                                 │
       │─── 8. POST /api/auth/logout ───►│─── 9. Clear Security Context ──►│
       │◄── 10. HTTP 200 Success ────────│                                 │
```

---

## 📊 Database Schema & Tables

The relational data model is managed via PostgreSQL 16 and Flyway versioning:

- **`users`**: Customer and administrator accounts (`id`, `email`, `password`, `first_name`, `last_name`, `created_at`).
- **`roles`**: System permission roles (`id`, `name` e.g., `ROLE_USER`, `ROLE_ADMIN`).
- **`user_roles`**: Many-to-Many join table mapping user IDs to role IDs.
- **`products`**: Product catalog items (`id`, `name`, `sku`, `price`, `stock_qty`, `category_id`).
- **`categories`**: Tree hierarchy for products (`id`, `name`, `slug`, `parent_id`).
- **`refresh_tokens`**: Active refresh token sessions (`id`, `token`, `user_id`, `expiry`).

---

## 🗄️ Flyway Database Migrations

CommerceHub enforces automated schema evolution via **Flyway**. Schema modifications are managed through versioned SQL scripts located in `src/main/resources/db/migration/`.

### Key Migration Scripts
- `V1__init_schema.sql`: Primary table creation (`users`, `roles`, `user_roles`, `refresh_tokens`).
- `V2__create_catalog_tables.sql`: Products and Categories schema (`categories`, `products`, `product_images`).
- `V3__insert_initial_roles_and_admin.sql`: Default system roles (`ROLE_USER`, `ROLE_ADMIN`) and seed administrative account.

### Entity-Relationship Diagram Overview

```
 ┌──────────────────────┐             ┌──────────────────────┐
 │        roles         │             │        users         │
 ├──────────────────────┤             ├──────────────────────┤
 │ id (PK)   BIGINT     │◄────┐       │ id (PK)   BIGINT     │
 │ name      VARCHAR    │     │       │ email     VARCHAR    │
 └──────────────────────┘     │       │ password  VARCHAR    │
                              │       │ first_name VARCHAR   │
 ┌──────────────────────┐     │       │ last_name VARCHAR    │
 │      user_roles      │     │       │ created_at TIMESTAMP │
 ├──────────────────────┤     │       └──────────┬───────────┘
 │ user_id (FK) BIGINT  │─────┼──────────────────┘
 │ role_id (FK) BIGINT  │─────┘                  │
 └──────────────────────┘                        │ 1
                                                 │
 ┌──────────────────────┐                        │
 │    categories        │                        │ N
 ├──────────────────────┤             ┌──────────┴───────────┐
 │ id (PK)   BIGINT     │◄────┐       │    refresh_tokens    │
 │ name      VARCHAR    │     │       ├──────────────────────┤
 │ slug      VARCHAR    │     │       │ id (PK)   BIGINT     │
 │ parent_id (FK) BIGINT│─────┘       │ token     VARCHAR    │
 └──────────┬───────────┘             │ user_id   BIGINT     │
            │ 1                       │ expiry    TIMESTAMP  │
            │                         └──────────────────────┘
            │ N
 ┌──────────┴───────────┐
 │       products       │
 ├──────────────────────┤
 │ id (PK)   BIGINT     │
 │ name      VARCHAR    │
 │ sku       VARCHAR    │
 │ price     NUMERIC    │
 │ stock_qty INT        │
 │ category_id (FK)     │
 └──────────────────────┘
```

---

## 📂 Directory Structure

```
commercehub-enterprise-platform/
│
├── backend/                                  # Spring Boot Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/commercehub/backend/
│   │   │   │   ├── config/                   # Security, CORS, OpenAPI configurations
│   │   │   │   ├── controller/               # REST Controllers (Auth, Product, User)
│   │   │   │   ├── dto/                      # Request & Response Data Transfer Objects
│   │   │   │   │   ├── auth/                 # LoginRequest, RegisterRequest, JwtResponse
│   │   │   │   │   ├── product/              # ProductRequest, ProductResponse
│   │   │   │   │   └── user/                 # UserProfileResponse, UpdateProfileRequest
│   │   │   │   ├── entity/                   # JPA Entities (User, Role, Product, Category)
│   │   │   │   ├── exception/                # GlobalExceptionHandler, Custom Exceptions
│   │   │   │   ├── mapper/                   # MapStruct interfaces (UserMapper, ProductMapper)
│   │   │   │   ├── repository/               # Spring Data JPA Repositories
│   │   │   │   ├── security/                 # JwtTokenProvider, CustomUserDetailsService
│   │   │   │   ├── service/                  # Service interfaces & implementations
│   │   │   │   └── CommerceHubApplication.java
│   │   │   └── resources/
│   │   │       ├── application.yml           # Base application configuration
│   │   │       ├── application-dev.yml       # Local development profile
│   │   │       ├── application-prod.yml      # Production environment profile
│   │   │       └── db/migration/             # Versioned Flyway SQL migration scripts
│   │   └── test/                             # Unit & Integration test suites
│   └── pom.xml                               # Backend dependencies & build plugins
│
├── src/                                      # React Frontend Application
│   ├── components/                           # Modular UI components
│   │   ├── common/                           # Header, Sidebar, ToastContainer
│   │   ├── components/                       # ButtonMatrix, FormControls, Feedback
│   │   ├── exporter/                         # TokenExporterModal
│   │   ├── figma/                            # FigmaSpecsSection
│   │   └── foundations/                      # ColorPalette, Typography, Spacing, Breakpoints
│   ├── context/                              # ThemeContext
│   ├── data/                                 # Design system tokens & palette specs
│   ├── types.ts                              # Global TypeScript interfaces
│   ├── App.tsx                               # Main layout & component routing
│   ├── main.tsx                              # Vite application mount point
│   └── index.css                             # Global CSS & Custom Design Tokens
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
│
├── docker-compose.yml                        # Local development stack (PostgreSQL 16)
└── README.md                                 # Platform documentation (This file)
```

---

## 📡 API Documentation & Reference

The backend exposes RESTful endpoints documented via OpenAPI / Swagger UI.

- **Swagger Interactive UI**: `http://localhost:8080/swagger-ui/index.html`
- **OpenAPI v3 JSON Spec**: `http://localhost:8080/v3/api-docs`

### 🔑 Authentication API (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user and receive JWT Access Token |
| `POST` | `/api/auth/logout` | Authenticated | Logout and clear security context |
| `POST` | `/api/auth/change-password` | Authenticated | Change current user's password |

#### Example: Register User Request
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alex",
    "lastName": "Morgan",
    "email": "alex.morgan@example.com",
    "password": "SecurePassword123!"
  }'
```

#### Example Response (`201 Created`)
```json
{
  "status": 201,
  "message": "User registered successfully",
  "data": {
    "id": 4,
    "firstName": "Alex",
    "lastName": "Morgan",
    "email": "alex.morgan@example.com",
    "roles": ["ROLE_USER"]
  }
}
```

---

### 👤 User Profile API (`/api/users`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/profile` | Authenticated | Retrieve authenticated user profile |
| `PUT` | `/api/users/profile` | Authenticated | Update user first/last name & contact info |

---

### 📦 Product Catalog API (`/api/products`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Public | List all active products |
| `GET` | `/api/products/{id}` | Public | Fetch detailed information for single product |
| `POST` | `/api/products` | Admin | Create a new product entry |
| `POST` | `/api/products/bulk` | Admin | Bulk insert list of products |
| `PUT` | `/api/products/{id}` | Admin | Update existing product details |
| `DELETE` | `/api/products/{id}` | Admin | Delete a product |

#### Example: Fetch Products Request
```bash
curl -X GET "http://localhost:8080/api/products" \
  -H "Accept: application/json"
```

---

## 🚀 Quick Start & Local Setup

### 📋 Prerequisites
Ensure you have the following software installed locally:
- **Java JDK 17 LTS**: `java -version`
- **Node.js 20+ & npm**: `node -v`
- **Docker & Docker Compose**: `docker compose version`
- **Maven 3.9+** (optional, wrapper `./mvnw` included)

---

### Step 1: Clone Repository
```bash
git clone https://github.com/Sandeepkumar1703/commercehub-enterprise-platform.git
cd commercehub-enterprise-platform
```

---

### Step 2: Start Local Database (PostgreSQL 16)
Use the included `docker-compose.yml` to spin up PostgreSQL 16:

```bash
docker-compose up -d postgres
```

Verify the database container is running on port `5432`:
```bash
docker-compose ps
```

---

### Step 3: Run Backend Application
Flyway will automatically execute all database migrations upon application startup.

```bash
cd backend

# Compile and run with dev profile
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

The Spring Boot backend will start on **`http://localhost:8080`**.

---

### Step 4: Run Frontend Application
In a separate terminal window, launch the React development server:

```bash
npm install
npm run dev
```

The React application will run on **`http://localhost:5173`** (or `http://localhost:3000`).

---

## ⚙️ Configuration & Environment Variables

### Backend (`application-dev.yml`)
Key properties configured for local development:

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/commercehub_db
    username: postgres
    password: postgres_password
  jpa:
    hibernate:
      ddl-auto: validate # Flyway handles schema creation
    show-sql: true
  flyway:
    enabled: true
    locations: classpath:db/migration

app:
  jwt:
    secret: 404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
    expiration-ms: 900000 # 15 minutes
```

---

## 🧪 Testing & Code Quality

CommerceHub maintains quality benchmarks with automated test coverage across services and controllers.

```bash
# Run unit and integration tests in backend
cd backend
./mvnw clean test
```

### Backend Testing Tools
- **JUnit 5**: Core unit testing framework
- **Mockito**: Mocking service dependencies and repositories
- **MockMvc**: Testing REST controllers without booting full HTTP server

---

## 🌿 Development & Git Workflow

We follow a clean, direct **Feature Branch Workflow**:

```
main ───────────┬────────────────────────────┬──────────► (Main Development Branch)
                │                            │
                └───► feature/add-catalog ───┘ (Pull Request)
```

1. **Main Branch (`main`)**: Primary development branch.
2. **Feature Branches (`feature/feature-name`)**: Created off `main` for active tasks.

```bash
# Create new feature branch from main
git checkout main
git pull origin main
git checkout -b feature/add-product-search

# Commit changes using Conventional Commits
git commit -m "feat(product): add product catalog endpoints"

# Push to remote and open Pull Request into main
git push origin feature/add-product-search
```

### Commit Message Convention
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation updates
- `refactor`: Code restructuring without functional changes
- `test`: Adding or updating test suites

---

## 🔮 Future Enhancements & Roadmap

### 🏁 Phase 1: Core Foundation & Security (Completed ✅)
- [x] Java 17 LTS & Spring Boot 3.3 project architecture initialization
- [x] JWT Authentication engine (Access Tokens & Security Context)
- [x] Flyway migration infrastructure (`V1`, `V2`, `V3`)
- [x] User registration, login, logout, password modification
- [x] Role-Based Access Control (`ROLE_ADMIN`, `ROLE_USER`)
- [x] Product management APIs with MapStruct mapping
- [x] React 18 frontend with design tokens and live component matrix

### 🚧 Phase 2: Order Management & Cart Engine (In Progress 🟡)
- [ ] Cart item persistence (database and local state sync)
- [ ] Order entity lifecycle (`PENDING`, `PAID`, `SHIPPED`, `CANCELLED`)
- [ ] Checkout session creation & inventory reservation
- [ ] Customer order history view in React UI

### 🔮 Phase 3: Distributed Architecture & Infrastructure (Upcoming ❌)
- [ ] **Redis Caching & Revocation**: Distributed session cache and JWT blacklist token store
- [ ] **Apache Kafka**: Event-driven order events and inventory adjustment streaming
- [ ] **Stripe Payments**: Webhook handlers for payment processing
- [ ] **Category Management APIs**: Full hierarchy REST endpoints
- [ ] **CI/CD Pipeline**: GitHub Actions workflow for container automated builds
- [ ] **Cloud Container Deployment**: AWS/GCP Kubernetes deployment manifests

---

## ⚠️ Known Limitations

1. **Frontend Under Active Development**: Frontend UI features are currently focused on design tokens, authentication flows, and product listing layout.
2. **Planned Core Modules**: Cart, Orders, Payments, Category Management, and Admin Dashboard are planned for upcoming phases.
3. **Local File Storage**: Image asset references currently use static URL links; cloud object storage (S3/GCS) integration will be introduced in Phase 3.

---

## 📋 Changelog

### Unreleased
- Shopping cart drawer state persistence & order checkout flow integration.
- Category management endpoints & Redis caching layer.

---

### Version 1.1.0 — July 2026
- Added Flyway migration scripts (`V1`, `V2`, `V3`) for automated schema initialization.
- Added Product REST APIs with MapStruct mapping and Swagger OpenAPI specs.
- Integrated React 18 frontend with theme context, design system specs, and token exporter.

---

### Version 1.0.0 — June 2026
- Initialized Spring Boot 3.3.2 project structure with Spring Security and JWT authentication.
- Configured PostgreSQL database connection and Docker Compose stack.

---

## 🤝 Contributing

Contributions, suggestions, and issue reports are welcome. Please open an issue before submitting significant changes. Follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👤 Author & Portfolio

**Sandeep Kumar Prasad**  
*Java Backend & Full-Stack Software Developer*

- **Location**: India
- **GitHub**: [@Sandeepkumar1703](https://github.com/Sandeepkumar1703)
- **LinkedIn**: [Sandeep Kumar Prasad](https://www.linkedin.com/in/sandeep-kumar-prasad-1703)
- **Email**: sandeepkumarprasad01@gmail.com
- **Project Repository**: [CommerceHub Enterprise Platform](https://github.com/Sandeepkumar1703/commercehub-enterprise-platform)


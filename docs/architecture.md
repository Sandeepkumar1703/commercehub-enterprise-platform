# 🏛️ CommerceHub — System Architecture & Package Design

This document details the modular monolith architecture, request lifecycle, and package organization of the CommerceHub platform.

---

## 🏗️ End-to-End Request Flow

Every REST API request follows a strict layered pattern:

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                       │
│    React 19 SPA / Axios HTTP Client with Interceptors   │
└────────────────────────────┬────────────────────────────┘
                             │ HTTP / JSON
                             ▼
┌─────────────────────────────────────────────────────────┐
│              SPRING SECURITY FILTER CHAIN               │
│   JwtAuthenticationFilter ──► SecurityContextHolder     │
└────────────────────────────┬────────────────────────────┘
                             │ Authenticated Principal
                             ▼
┌─────────────────────────────────────────────────────────┐
│                    CONTROLLER LAYER                     │
│    @RestController endpoints & DTO @Valid Validation    │
└────────────────────────────┬────────────────────────────┘
                             │ DTO Payload
                             ▼
┌─────────────────────────────────────────────────────────┐
│                     SERVICE LAYER                       │
│     @Service business logic & @Transactional bounds     │
└────────────────────────────┬────────────────────────────┘
                             │ JPA Entity
                             ▼
┌─────────────────────────────────────────────────────────┐
│                    REPOSITORY LAYER                     │
│      @Repository interfaces with Spring Data JPA        │
└────────────────────────────┬────────────────────────────┘
                             │ SQL Execution
                             ▼
┌─────────────────────────────────────────────────────────┐
│                   PERSISTENCE LAYER                     │
│               PostgreSQL 16 Relational DB               │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 Backend Package Architecture

To maintain strict domain boundaries and prepare for future microservice extraction, the backend code is organized into modular packages:

```
com.commercehub.backend/
├── config/                  # Security, CORS, and Swagger configurations
│   ├── SecurityConfig.java
│   └── WebMvcConfig.java
├── security/                # JWT Token generation and user details service
│   ├── JwtTokenProvider.java
│   └── CustomUserDetailsService.java
├── domain/
│   ├── auth/                # Authentication Domain Module
│   │   ├── AuthController.java
│   │   ├── AuthService.java
│   │   └── dto/
│   ├── user/                # User & Profile Domain Module
│   │   ├── UserController.java
│   │   ├── UserService.java
│   │   ├── UserRepository.java
│   │   └── User.java
│   ├── product/             # Product Catalog Domain Module
│   │   ├── ProductController.java
│   │   ├── ProductService.java
│   │   ├── ProductRepository.java
│   │   └── Product.java
│   └── role/                # RBAC Role Domain Module
│       ├── RoleController.java
│       ├── RoleService.java
│       └── Role.java
├── exception/               # Global exception handlers & error responses
│   └── GlobalExceptionHandler.java
└── CommerceHubApplication.java
```

---

## 🔒 Security Architecture (JWT & RBAC)

1. **Stateless Authentication**: Users receive a signed JSON Web Token (JWT) upon successful login.
2. **Header Protocol**: Requests include `Authorization: Bearer <JWT_TOKEN>`.
3. **Role Authorization**:
   - `ROLE_USER`: Access personal profile, cart, and orders.
   - `ROLE_MANAGER`: Access inventory updates and order fulfillment.
   - `ROLE_ADMIN`: Access user role assignment, bulk product operations, and system metrics.

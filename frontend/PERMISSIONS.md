# Enterprise RBAC Permission Matrix

This document outlines the Security Authorities and Roles configured for CommerceHub.

## Roles Overview

| Role Code | Description | Scope |
| :--- | :--- | :--- |
| `ROLE_CUSTOMER` | Standard storefront shopper | Orders, Cart, Wishlist, Addresses, Profile |
| `ROLE_SELLER` | Verified Merchant Partner | Product Catalog, Inventory, Merchant Orders, Coupons, Analytics |
| `ROLE_ADMIN` | Platform Administrator | All Store Operations, Users, Roles, Languages, Media |
| `ROLE_SUPER_ADMIN` | Executive System Operator | Microservice Control, Database Backups, Audit Logs, Feature Flags |

---

## Detailed Authority Matrix

### Product Scope
| Authority Code | Description | Customer | Seller | Admin | Super Admin |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `PRODUCT_VIEW` | Browse storefront products | ✅ | ✅ | ✅ | ✅ |
| `PRODUCT_CREATE` | Create product listings | ❌ | ✅ | ✅ | ✅ |
| `PRODUCT_UPDATE` | Edit pricing and product details | ❌ | ✅ | ✅ | ✅ |
| `PRODUCT_DELETE` | Remove products from catalog | ❌ | ❌ | ✅ | ✅ |
| `PRODUCT_APPROVE` | Approve merchant listings | ❌ | ❌ | ✅ | ✅ |

### User & Security Scope
| Authority Code | Description | Customer | Seller | Admin | Super Admin |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `USER_VIEW` | View list of registered accounts | ❌ | ❌ | ✅ | ✅ |
| `USER_MANAGE` | Suspend or update user accounts | ❌ | ❌ | ✅ | ✅ |
| `ROLE_MANAGE` | Assign roles and permissions | ❌ | ❌ | ✅ | ✅ |
| `PERMISSION_MANAGE`| Configure RBAC matrix | ❌ | ❌ | ❌ | ✅ |
| `ADMIN_MANAGE` | Create and manage system admins | ❌ | ❌ | ❌ | ✅ |

### System & Infrastructure Scope
| Authority Code | Description | Customer | Seller | Admin | Super Admin |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `SYSTEM_SETTINGS` | Manage localized languages & configs | ❌ | ❌ | ✅ | ✅ |
| `FEATURE_FLAG_MANAGE` | Toggle dynamic feature flags | ❌ | ❌ | ❌ | ✅ |
| `DATABASE_BACKUP` | Perform PostgreSQL snapshots | ❌ | ❌ | ❌ | ✅ |
| `AUDIT_VIEW` | Inspect live security audit feeds | ❌ | ❌ | ❌ | ✅ |

---

## Spring Boot Security Integration

Backend APIs enforce these exact permission strings using Spring Security annotations:

```java
@PreAuthorize("hasAuthority('PRODUCT_CREATE')")
@PostMapping("/api/products")
public ResponseEntity<ProductDto> createProduct(@Valid @RequestBody ProductCreateDto dto) { ... }
```

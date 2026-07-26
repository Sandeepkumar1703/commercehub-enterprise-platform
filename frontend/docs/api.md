# 📡 CommerceHub — API Reference Manual

Detailed list of REST endpoints implemented in the CommerceHub API.

---

## 🔑 Authentication Endpoints (`/api/auth`)

| Endpoint | Method | Access | Description |
| :--- | :---: | :---: | :--- |
| `/api/auth/register` | `POST` | Public | Register new account and generate email token |
| `/api/auth/login` | `POST` | Public | Authenticate user and receive JWT bearer token |
| `/api/auth/verify-email` | `GET` | Public | Verify account with email token |
| `/api/auth/resend-verification` | `POST` | Public | Resend verification token |
| `/api/auth/forgot-password` | `POST` | Public | Initiate password reset flow |
| `/api/auth/reset-password` | `POST` | Public | Complete password reset with token |
| `/api/auth/change-password` | `PUT` | Authenticated | Change current password |
| `/api/auth/logout` | `POST` | Authenticated | Terminate session |

### Sample cURL: User Registration
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Sandeep",
    "lastName": "Prasad",
    "email": "user@example.com",
    "password": "Password123!"
  }'
```

---

## 📦 Product Catalog Endpoints (`/api/products`)

| Endpoint | Method | Access | Description |
| :--- | :---: | :---: | :--- |
| `/api/products` | `GET` | Public | Fetch product catalog with search & category filters |
| `/api/products/{id}` | `GET` | Public | Fetch single product by ID |
| `/api/products` | `POST` | `ROLE_ADMIN` | Create new product |
| `/api/products/{id}` | `PUT` | `ROLE_ADMIN` | Update existing product |
| `/api/products/{id}` | `DELETE` | `ROLE_ADMIN` | Delete product by ID |
| `/api/products/bulk` | `POST` | `ROLE_ADMIN` | Bulk import product items |

---

## 👤 User Management Endpoints (`/api/users`)

| Endpoint | Method | Access | Description |
| :--- | :---: | :---: | :--- |
| `/api/users/profile` | `GET` | Authenticated | Fetch current authenticated profile |
| `/api/users/profile` | `PUT` | Authenticated | Update user first & last name |
| `/api/users/admin/all` | `GET` | `ROLE_ADMIN` | List all system users |
| `/api/users/admin/{userId}/role` | `PUT` | `ROLE_ADMIN` | Modify user security role |

---

## 🛡️ Role Management Endpoints (`/api/roles`)

| Endpoint | Method | Access | Description |
| :--- | :---: | :---: | :--- |
| `/api/roles` | `GET` | `ROLE_ADMIN` | List system security roles |
| `/api/roles` | `POST` | `ROLE_ADMIN` | Create new permission role |
| `/api/roles/assign` | `POST` | `ROLE_ADMIN` | Assign role to user |
| `/api/roles/remove` | `DELETE` | `ROLE_ADMIN` | Remove role from user |

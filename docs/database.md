# 📊 CommerceHub — Database Schema & Migrations

Database structure managed with Flyway versioning for PostgreSQL 16.

---

## 🗄️ Flyway Migration Scripts

Located in `src/main/resources/db/migration/`:

- `V1__init_schema.sql`: Core tables (`users`, `roles`, `user_roles`).
- `V2__create_catalog_tables.sql`: Product catalog tables (`categories`, `products`).
- `V3__insert_initial_roles_and_admin.sql`: Default roles (`ROLE_USER`, `ROLE_MANAGER`, `ROLE_ADMIN`) and seed admin user.

---

## 📐 Relational Schema SQL

```sql
-- USERS TABLE
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ROLES & JUNCTION TABLE
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE user_roles (
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- PRODUCTS TABLE
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    image_url VARCHAR(500),
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    reviews_count INT DEFAULT 0
);
```

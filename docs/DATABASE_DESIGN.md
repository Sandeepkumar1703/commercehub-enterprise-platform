# CommerceHub - Database Design & Schema

**Date**: July 22, 2026  
**Project Phase**: 2 - Database Design  
**Database**: PostgreSQL 16+  
**ORM**: Hibernate with Spring Data JPA

---

## 📋 Table of Contents

1. [ER Diagram](#-er-diagram)
2. [Entity Descriptions](#-entity-descriptions)
3. [Relationships](#-relationships)
4. [Database Normalization](#-database-normalization)
5. [SQL Scripts](#-sql-scripts)
6. [JPA Entities](#-jpa-entities)
7. [Design Decisions](#-design-decisions)

---

## 🗃️ ER Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│                    COMMERCEHUB E-COMMERCE DATABASE SCHEMA                    │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘


                            ┌─────────────┐
                            │   ROLES     │
                            ├─────────────┤
                            │ ◆ id        │
                            │  name       │ (ADMIN, USER, VENDOR)
                            │  description│
                            │  created_at │
                            └──────┬──────┘
                                   │
                            (Many-to-Many)
                                   │
                    ┌──────────────►+◄──────────────┐
                    │                               │
            ┌───────▼─────────┐          ┌──────────▼────────┐
            │     USERS       │          │   ADDRESSES       │
            ├─────────────────┤          ├───────────────────┤
            │ ◆ id            │          │ ◆ id              │
            │  email (unique) │          │  user_id (FK)     │
            │  password       │◄─────────┤  street           │
            │  first_name     │ (1-to-Many)│  city            │
            │  last_name      │          │  state            │
            │  phone          │          │  zip_code         │
            │  is_active      │          │  country          │
            │  created_at     │          │  is_default       │
            │  updated_at     │          │  type             │
            └───────┬──────────┘          └───────────────────┘
                    │
        (User creates Orders)
                    │
            ┌───────▼─────────────┐
            │     ORDERS          │
            ├─────────────────────┤
            │ ◆ id                │
            │  user_id (FK)       │
            │  order_number       │◄─────────────┐
            │  total_amount       │ (1-to-Many)  │
            │  status             │              │
            │  payment_status     │              │
            │  shipping_address_id│              │
            │  created_at         │         ┌────▼──────────┐
            └─────────┬───────────┘         │  ORDER_ITEMS  │
                      │                     ├───────────────┤
                      │          (1-to-Many)│ ◆ id          │
                      │                     │  order_id (FK)│
                      │                     │  product_id...|
                      │                     │  quantity     │
                      │                     │  price        │
                      │                     │  subtotal     │
                      └─────────┬───────────┤  discount     │
                                │           │  tax          │
                    (1-to-Many) │           │  total        │
                                │           │  created_at   │
                        ┌───────▼────────┐  └───────────────┘
                        │     PAYMENTS   │
                        ├────────────────┤
                        │ ◆ id           │
                        │  order_id (FK) │
                        │  amount        │
                        │  status        │
                        │  method        │
                        │  transaction_id│
                        │  stripe_...    │
                        │  created_at    │
                        │  updated_at    │
                        └────────────────┘


┌─────────────────┐          ┌────────────────────┐          ┌────────────┐
│   CATEGORIES    │          │    PRODUCTS        │          │ INVENTORY  │
├─────────────────┤          ├────────────────────┤          ├────────────┤
│ ◆ id            │          │ ◆ id               │          │ ◆ id       │
│  name           │◄─────────│  category_id (FK)  │◄─────────│  product_id◄────┐
│  description    │(1-to-Many)│  name              │(1-to-1)  │  quantity  │     │
│  image_url      │          │  description       │          │  reserved  │     │
│  is_active      │          │  price             │          │  reorder.. │     │
│  created_at     │          │  discount_price    │          │  updated_at│     │
│                 │          │  sku               │          │            │     │
│                 │          │  image_url         │          │            │     │
│                 │          │  status            │          │            │     │
│                 │          │  is_active         │          │            │     │
│                 │          │  created_at        │          │            │     │
│                 │          │  updated_at        │          │            │     │
└─────────────────┘          └────────────────────┘          └────────────┘     │
                                      ▲                                          │
                                      │ (1-to-Many)                             │
                                      │                                          │
                             (Users add to Carts)                              │
                                      │                                          │
                        ┌─────────────┴──────────┐                              │
                        │      WISHLIST          │                              │
                        ├────────────────────────┤                              │
                        │ ◆ id                   │                              │
                        │  user_id (FK)          │                              │
                        │  product_id (FK) ──────┼──────────────────────────────┤
                        │  created_at            │
                        └────────────────────────┘


┌──────────────────────┐          ┌─────────────────┐
│     REVIEWS          │          │    COUPONS      │
├──────────────────────┤          ├─────────────────┤
│ ◆ id                 │          │ ◆ id            │
│  product_id (FK)     │          │  code           │
│  user_id (FK)        │          │  description    │
│  rating              │          │  discount_type  │
│  title               │          │  discount_value │
│  comment             │          │  max_uses       │
│  helpful_count       │          │  current_uses   │
│  is_verified         │          │  min_amount     │
│  created_at          │          │  valid_from     │
│                      │          │  valid_until    │
│                      │          │  is_active      │
└──────────────────────┘          └─────────────────┘


┌────────────────────────┐          ┌──────────────────────┐
│     SHIPPING           │          │   NOTIFICATIONS      │
├────────────────────────┤          ├──────────────────────┤
│ ◆ id                   │          │ ◆ id                 │
│  order_id (FK)         │          │  user_id (FK)        │
│  status                │          │  type                │
│  carrier               │          │  subject             │
│  tracking_number       │          │  message             │
│  estimated_delivery    │          │  is_read             │
│  actual_delivery       │          │  created_at          │
│  created_at            │          └──────────────────────┘
│  updated_at            │
└────────────────────────┘
```

---

## 📝 Entity Descriptions

### **1. ROLES**

**Purpose**: Define user roles for authorization (Admin, User, Vendor)

**Primary Key**: `id` (UUID or Long)

**Fields**:
- `id` - Primary key
- `name` - Role name (ADMIN, USER, VENDOR)
- `description` - Role description
- `created_at` - Creation timestamp

**Why**:
- Enables role-based access control (RBAC)
- Prevents hardcoding roles in code
- Allows adding new roles without code changes
- Many-to-many with Users

---

### **2. USERS**

**Purpose**: Store user account information

**Primary Key**: `id`

**Fields**:
- `id` - Primary key
- `email` - Unique email (login credential)
- `password` - Encrypted password (bcrypt)
- `first_name` - First name
- `last_name` - Last name
- `phone` - Contact phone number
- `is_active` - Account status (soft delete alternative)
- `created_at` - Registration date
- `updated_at` - Last modification

**Why**:
- Central user identity table
- Email as unique login identifier
- Password encrypted for security
- is_active allows soft deletion without losing history
- Multiple addresses per user (1-to-Many with Addresses)

**Constraints**:
- `email` - UNIQUE, NOT NULL
- `password` - NOT NULL (encrypted)
- `is_active` - DEFAULT true

---

### **3. USER_ROLES** (Junction Table)

**Purpose**: Many-to-many relationship between Users and Roles

**Primary Key**: `(user_id, role_id)` composite key

**Fields**:
- `user_id` - FK to Users
- `role_id` - FK to Roles

**Why**:
- A user can have multiple roles (e.g., both ADMIN and VENDOR)
- A role can be assigned to many users
- Normalized data structure

---

### **4. ADDRESSES**

**Purpose**: Store user addresses (shipping, billing, etc.)

**Primary Key**: `id`

**Foreign Key**: `user_id` → Users (1-to-Many)

**Fields**:
- `id` - Primary key
- `user_id` - FK to Users
- `street` - Street address
- `city` - City name
- `state` - State/Province
- `zip_code` - Postal code
- `country` - Country
- `is_default` - Mark default address
- `type` - Address type (SHIPPING, BILLING, etc.)
- `created_at` - Creation date

**Why**:
- A user can have multiple addresses
- Addresses are reusable for multiple orders
- Type field allows different address purposes
- is_default helps quick checkout

**Constraints**:
- `user_id` - FK NOT NULL
- `is_default` - DEFAULT false

---

### **5. CATEGORIES**

**Purpose**: Product categorization for organization and navigation

**Primary Key**: `id`

**Fields**:
- `id` - Primary key
- `name` - Category name (Electronics, Clothing, etc.)
- `description` - Category description
- `image_url` - Category icon/image
- `is_active` - Status (soft delete)
- `created_at` - Creation date

**Why**:
- Organizes products by type
- Enables category-based navigation
- Soft deletion preserves history
- Reduces data duplication (vs storing category in Product)

---

### **6. PRODUCTS**

**Purpose**: Store product information and pricing

**Primary Key**: `id`

**Foreign Key**: `category_id` → Categories (1-to-Many)

**Fields**:
- `id` - Primary key
- `category_id` - FK to Categories
- `name` - Product name
- `description` - Detailed description (can have HTML)
- `price` - Original price
- `discount_price` - Special/promotional price
- `sku` - Stock keeping unit (unique identifier)
- `image_url` - Product primary image
- `status` - Status (ACTIVE, INACTIVE, DISCONTINUED)
- `is_active` - Soft delete flag
- `created_at` - When product was added
- `updated_at` - Last modification

**Why**:
- Central product catalog table
- Separate discount_price for promotions
- SKU for inventory/warehouse tracking
- status provides workflow control
- is_active allows soft deletion

**Constraints**:
- `category_id` - FK NOT NULL
- `name` - NOT NULL, INDEX for search
- `sku` - UNIQUE NOT NULL
- `price` - NOT NULL, CHECK > 0

---

### **7. INVENTORY**

**Purpose**: Track product stock levels

**Primary Key**: `id`

**Foreign Key**: `product_id` → Products (1-to-1)

**Fields**:
- `id` - Primary key
- `product_id` - FK to Products (UNIQUE - one inventory per product)
- `quantity` - Current stock quantity
- `reserved` - Quantity reserved for pending orders
- `reorder_level` - Threshold for reordering
- `updated_at` - Last stock update

**Why**:
- Separate table for inventory management
- Tracks available quantity
- Track reserved inventory (ordered but not yet fulfilled)
- Denormalization for performance (could be in Products but separate is cleaner)
- Reorder level enables automated restocking alerts

**Constraints**:
- `product_id` - FK UNIQUE NOT NULL
- `quantity` - DEFAULT 0, CHECK >= 0
- `reserved` - DEFAULT 0, CHECK >= 0

---

### **8. ORDERS**

**Purpose**: Store customer orders

**Primary Key**: `id`

**Foreign Keys**:
- `user_id` → Users
- `shipping_address_id` → Addresses

**Fields**:
- `id` - Primary key
- `user_id` - FK to Users (who placed the order)
- `order_number` - Human-readable order ID (e.g., ORD-2024-00001)
- `total_amount` - Final total (including tax, after discount)
- `tax_amount` - Tax calculated
- `discount_amount` - Total discount applied
- `status` - Order status (PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED)
- `payment_status` - Payment status (PENDING, COMPLETED, FAILED, REFUNDED)
- `shipping_address_id` - FK to Addresses (where to ship)
- `coupon_id` - FK to Coupons (if applied)
- `created_at` - Order placement date
- `updated_at` - Last status update

**Why**:
- Each order belongs to one user (1-to-Many)
- order_number is user-facing identifier
- Separate status fields for order and payment
- Stores address at time of order (can't delete address later and lose history)
- Multiple orders per user
- coupon_id nullable if no coupon used

**Constraints**:
- `user_id` - FK NOT NULL
- `status` - DEFAULT 'PENDING'
- `payment_status` - DEFAULT 'PENDING'
- `order_number` - UNIQUE NOT NULL
- `total_amount` - CHECK >= 0
- `created_at` - INDEX for queries

---

### **9. ORDER_ITEMS**

**Purpose**: Line items in an order (products ordered)

**Primary Key**: `id`

**Foreign Keys**:
- `order_id` → Orders (1-to-Many)
- `product_id` → Products

**Fields**:
- `id` - Primary key
- `order_id` - FK to Orders
- `product_id` - FK to Products (snapshot reference)
- `quantity` - How many ordered
- `price` - Unit price at time of order (captured for history)
- `subtotal` - quantity * price
- `discount` - Line item discount
- `tax` - Tax on this line item
- `total` - Final total for this line (subtotal - discount + tax)
- `created_at` - When added to order

**Why**:
- Separate table for normalized structure
- One order can have many products
- Captures price at time of order (product price may change later)
- Allows partial fulfillment/cancellation per item
- Audit trail of what was ordered and when

**Constraints**:
- `order_id` - FK NOT NULL
- `product_id` - FK NOT NULL
- `quantity` - NOT NULL, CHECK > 0
- `price` - NOT NULL, CHECK > 0

---

### **10. PAYMENTS**

**Purpose**: Payment transaction records

**Primary Key**: `id`

**Foreign Key**: `order_id` → Orders (1-to-Many)

**Fields**:
- `id` - Primary key
- `order_id` - FK to Orders
- `amount` - Payment amount
- `status` - Payment status (PENDING, SUCCESS, FAILED, REFUNDED)
- `method` - Payment method (CARD, BANK_TRANSFER, WALLET)
- `transaction_id` - Unique transaction identifier (from payment gateway)
- `stripe_charge_id` - Stripe charge ID (if using Stripe)
- `error_message` - Error details if payment failed
- `created_at` - When payment was initiated
- `updated_at` - Last status update

**Why**:
- One order can have multiple payments (if first fails, retry)
- Stores payment method for future use
- Gateway transaction IDs for reconciliation
- Error message for troubleshooting failed payments
- Audit trail for reconciliation

**Constraints**:
- `order_id` - FK NOT NULL
- `amount` - NOT NULL, CHECK > 0
- `status` - DEFAULT 'PENDING'
- `created_at` - INDEX for financial reports

---

### **11. REVIEWS**

**Purpose**: Product reviews and ratings from customers

**Primary Key**: `id`

**Foreign Keys**:
- `product_id` → Products
- `user_id` → Users

**Fields**:
- `id` - Primary key
- `product_id` - FK to Products
- `user_id` - FK to Users (reviewer)
- `rating` - Rating 1-5
- `title` - Review title
- `comment` - Detailed review text
- `helpful_count` - How many found it helpful
- `is_verified` - Verified purchase flag (only verified buyers can review)
- `created_at` - When review was posted

**Why**:
- Customer feedback for products
- is_verified ensures authentic reviews
- Rating enables product quality assessment
- helpful_count shows review usefulness
- Multiple reviews per product, one per user per product

---

### **12. WISHLIST**

**Purpose**: Save favorite products for later

**Primary Key**: `id`

**Foreign Keys**:
- `user_id` → Users
- `product_id` → Products

**Fields**:
- `id` - Primary key
- `user_id` - FK to Users
- `product_id` - FK to Products
- `created_at` - When added

**Why**:
- Users can save products for later purchase
- Like a "favorites" list
- Can track popular wishlist items for marketing
- Separate junction table (not embedded in Users)

**Constraints**:
- `(user_id, product_id)` - UNIQUE (don't add same product twice)

---

### **13. COUPONS**

**Purpose**: Promotional discount codes

**Primary Key**: `id`

**Fields**:
- `id` - Primary key
- `code` - Unique coupon code (e.g., "SUMMER2024")
- `description` - What the coupon offers
- `discount_type` - PERCENTAGE or FIXED_AMOUNT
- `discount_value` - Either percentage (20) or amount (10.00)
- `max_uses` - How many times this coupon can be used
- `current_uses` - How many times it's been used
- `min_amount` - Minimum order amount to use
- `valid_from` - When coupon starts
- `valid_until` - When coupon expires
- `is_active` - Status

**Why**:
- Marketing and promotional tool
- Limits prevent over-use
- Tracking usage for analytics
- valid_from/valid_until for time-limited promotions
- min_amount prevents using on small orders

**Constraints**:
- `code` - UNIQUE NOT NULL, INDEX for lookup
- `discount_value` - CHECK > 0
- `current_uses` - CHECK <= max_uses
- `valid_until` - CHECK > valid_from

---

### **14. SHIPPING**

**Purpose**: Track package shipments

**Primary Key**: `id`

**Foreign Key**: `order_id` → Orders (1-to-Many)

**Fields**:
- `id` - Primary key
- `order_id` - FK to Orders
- `status` - Shipping status (PROCESSING, SHIPPED, IN_TRANSIT, DELIVERED, RETURNED)
- `carrier` - Shipping company (FedEx, UPS, DHL)
- `tracking_number` - Tracking code provided by carrier
- `estimated_delivery` - Estimated delivery date
- `actual_delivery` - When actually delivered
- `created_at` - Shipping date
- `updated_at` - Last status update

**Why**:
- Separates shipping logic from orders
- Carrier info allows customer tracking
- Multiple shipments per order (if split)
- Estimated vs actual tracking for analytics
- Status workflow for fulfillment

---

### **15. NOTIFICATIONS**

**Purpose**: Store user notifications/messages

**Primary Key**: `id`

**Foreign Key**: `user_id` → Users (1-to-Many)

**Fields**:
- `id` - Primary key
- `user_id` - FK to Users
- `type` - Notification type (ORDER, PAYMENT, SHIPPING, PROMO)
- `subject` - Email subject / notification title
- `message` - Message content
- `is_read` - Read status
- `created_at` - When sent

**Why**:
- Audit trail of notifications sent
- Track communication with users
- Read status for unread notification count
- Type enables filtering by category

---

## 🔗 Relationships

### **One-to-Many**

| Parent | Child | Description |
|--------|-------|-------------|
| Users | Addresses | A user can have multiple addresses |
| Users | Orders | A user can place multiple orders |
| Users | Reviews | A user can write multiple reviews |
| Users | Wishlist Items | A user can wishlist multiple products |
| Users | Notifications | A user receives multiple notifications |
| Categories | Products | A category contains multiple products |
| Products | Inventory | One inventory per product (1-to-1) |
| Products | Reviews | A product can have multiple reviews |
| Products | Wishlist Items | A product can be on multiple wishlists |
| Orders | Order Items | An order can contain multiple items |
| Orders | Payments | An order can have multiple payment attempts |
| Orders | Shipping | An order can have multiple shipments (if split) |

### **Many-to-Many**

| Table 1 | Table 2 | Junction Table | Description |
|---------|---------|----------------|-------------|
| Users | Roles | User_Roles | A user can have multiple roles |
| Orders | Coupons | Orders (coupon_id) | An order uses one coupon, many orders can use same coupon |

---

## 🏗️ Database Normalization

### **Normalization Level: 3NF (Third Normal Form)**

✅ **1NF (First Normal Form)**
- All attributes are atomic (single values)
- No repeating groups
- Each row is unique

✅ **2NF (Second Normal Form)**
- All non-key attributes fully dependent on entire primary key
- No partial dependencies

✅ **3NF (Third Normal Form)**
- No transitive dependencies
- Non-key attributes depend only on primary key
- Orders table doesn't store user email (redundant with Users table)

### **Advantages**
- Prevents data anomalies (insert, update, delete)
- Maintains referential integrity
- Reduces storage space (no duplication)
- Easy to modify data

### **Trade-offs**
- More joins required for queries
- Performance considerations (mitigated with indexes)
- Caching strategy needed (Redis for frequently accessed data)

---

## 📋 SQL Scripts

See [SQL Migration Files](../backend/src/main/resources/db/migration/) for:
- `V1__create_users_and_roles.sql`
- `V2__create_products_and_categories.sql`
- `V3__create_orders_and_payments.sql`
- `V4__create_relationships_and_indexes.sql`

---

## 🎯 Design Decisions

### **1. Soft Delete Approach**

**Decision**: Use `is_active` boolean instead of physical deletion

**Why**:
- Preserves audit trail
- Allows recovery of accidentally deleted records
- No cascading deletes
- Historical data remains intact

**Implementation**:
```sql
-- Don't delete, just mark inactive
UPDATE users SET is_active = false WHERE id = 123;

-- Query only active records
SELECT * FROM users WHERE is_active = true;
```

---

### **2. Separated Address Table**

**Decision**: Users can have multiple addresses

**Why**:
- Users may have shipping and billing addresses
- Can add new addresses over time
- Reusable for multiple orders (reference)
- Normalization (address is an entity itself)

---

### **3. Order Item Price Snapshot**

**Decision**: Store price at time of order (not just product_id)

**Why**:
- Product price can change over time
- Order invoice must show what customer paid
- Audit trail and legal compliance
- Accurate historical reporting

---

### **4. Payment Separation**

**Decision**: Payments as separate entities from Orders

**Why**:
- One order can have multiple payment attempts
- Retry logic on failed payments
- Payment reconciliation easier
- PCI compliance (payment audit trail)

---

### **5. Multiple Shipments Per Order**

**Decision**: Orders can have multiple shipments (Shipping table)

**Why**:
- Orders can be partially fulfilled
- Inventory might be split across warehouses
- Backorders and re-shipments
- Real-world scenario support

---

### **6. Indexes for Performance**

**Added Indexes On**:
- `users.email` - Frequent login lookups
- `products.name`, `products.sku` - Search operations
- `orders.created_at` - Date range queries
- `orders.status` - Status filtering
- `order_items.order_id` - Foreign key joins
- `reviews.product_id` - Product review fetching

---

## ✅ Next Steps

1. ✅ Database design complete
2. ⬜ SQL scripts (Flyway migrations)
3. ⬜ JPA entity classes
4. ⬜ Repository interfaces
5. ⬜ Request approval for Phase 3 (Authentication)

---

## 📚 References

- **PostgreSQL Documentation**: https://www.postgresql.org/docs/16/
- **Database Normalization**: https://en.wikipedia.org/wiki/Database_normalization
- **JPA Documentation**: https://projects.eclipse.org/projects/ee4j.persistence

---

*Created: July 22, 2026*  
*CommerceHub Development Team*  
*Status: Database Design Phase*

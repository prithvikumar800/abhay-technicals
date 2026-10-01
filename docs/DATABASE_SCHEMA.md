# ABHAY TECHNICALS — Database Architecture & Schema Specification
**Engine:** MySQL 8.0  
**Data Access Layer:** Prisma ORM  
**Target Environment:** Hostinger Business Hosting (Isolated Database)  
**Document Version:** 1.0.0 (Phase 4 Specification)  
**Status:** Approved Schema Reference  

---

## 1. Relational Architecture & Entity Overview

The Abhay Technicals database is a normalized relational architecture designed specifically for high-integrity mobile spare parts e-commerce and wholesale operations.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          ENTITY RELATIONSHIP MAP                       │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   [brands] 1 ────< [device_models]                                    │
│       │                   │                                            │
│       │ 1                 │ 1                                          │
│       ▼                   ▼                                            │
│   [products] >────< [device_models]  (via product_compatibilities)    │
│       │                                                                │
│       ├── 1 ────< [product_images]                                     │
│       ├── 1 ────< [product_wholesale_tiers]  (Volume pricing slabs)    │
│       ├── 1 ────< [product_attributes]       (Pins, specs, colors)     │
│       ├── 1 ────< [cart_items] >──── 1 [carts] >──── 1 [users]         │
│       └── 1 ────< [order_items] >──── 1 [orders] >── 1 [users]        │
│                                           │       │   ├── [addresses]  │
│                                           │       │   ├── [devices]    │
│                                           │       │   └── [tokens]     │
│                                           ├── 1 ──< [payments]         │
│                                           ├── 1 ─── [shipments]        │
│                                           │            │               │
│                                           │            └── [tracking]  │
│                                           └── 1 ──< [order_status_hist]│
│                                                                        │
│   [categories] (Self-referential hierarchy for parent/child cats)     │
│   [store_settings] (Dynamic runtime key-value store for wholesale mode)│
│   [audit_logs] (Append-only administrative tracking)                   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Table-by-Table Field Dictionary

### 2.1 Users & Authentication

#### `users` (Table: `users`)
Primary table for all registered customers, repair technicians, and administrative staff.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Stable identifier |
| `phone` | VARCHAR(15) | NO | - | **UNIQUE, INDEX** | Primary login identifier (`+91XXXXXXXXXX`) |
| `name` | VARCHAR(100) | YES | NULL | - | Full customer / contact name |
| `businessName`| VARCHAR(150) | YES | NULL | - | Workshop / Mobile Shop Name |
| `gstin` | VARCHAR(15) | YES | NULL | - | GST Number for B2B input credit |
| `role` | ENUM | NO | `CUSTOMER` | **INDEX** | `CUSTOMER`, `WHOLESALER`, `ADMIN`, `STAFF` |
| `status` | ENUM | NO | `ACTIVE` | **INDEX** | `ACTIVE`, `BLOCKED`, `PENDING_VERIFICATION` |
| `createdAt` | DATETIME | NO | now() | - | Audit creation timestamp |
| `updatedAt` | DATETIME | NO | auto | - | Audit update timestamp |
| `deletedAt` | DATETIME | YES | NULL | - | Soft-delete timestamp |

#### `otp_verifications` (Table: `otp_verifications`)
Ephemeral table handling WhatsApp OTP verification handshakes.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Verification session ID |
| `phone` | VARCHAR(15) | NO | - | **COMPOSITE INDEX** | Target WhatsApp number |
| `hashedOtp` | VARCHAR(255) | NO | - | - | Bcrypt hash of 6-digit OTP |
| `expiresAt` | DATETIME | NO | - | **COMPOSITE INDEX** | 300-second (5 min) TTL |
| `attempts` | INT | NO | 0 | - | Brute-force counter (max 3) |
| `verified` | BOOLEAN | NO | false | **COMPOSITE INDEX** | Prevents OTP replay attacks |
| `createdAt` | DATETIME | NO | now() | - | Session generation time |

#### `refresh_tokens` (Table: `refresh_tokens`)
Manages long-lived JWT refresh sessions across web and Flutter apps.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Token record ID |
| `userId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> users(id)** | `ON DELETE CASCADE` |
| `tokenHash` | VARCHAR(255) | NO | - | **UNIQUE, INDEX** | SHA-256 hash of refresh token |
| `revoked` | BOOLEAN | NO | false | - | Instant revocation flag |
| `expiresAt` | DATETIME | NO | - | - | 30-day token expiration |
| `userAgent` | VARCHAR(255) | YES | NULL | - | Device metadata |
| `ipAddress` | VARCHAR(45) | YES | NULL | - | Client IPv4/IPv6 |
| `createdAt` | DATETIME | NO | now() | - | Login time |

#### `user_addresses` (Table: `user_addresses`)
Stores multiple delivery addresses for customers and business workshops.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Address ID |
| `userId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> users(id)** | `ON DELETE CASCADE`, **INDEX** |
| `name` | VARCHAR(100) | NO | - | - | Recipient contact person |
| `phone` | VARCHAR(15) | NO | - | - | Delivery phone number |
| `addressLine1`| VARCHAR(255)| NO | - | - | Shop / Door number, Street |
| `addressLine2`| VARCHAR(255)| YES| NULL | - | Area, Industrial complex |
| `landmark` | VARCHAR(150) | YES | NULL | - | Nearby prominent landmark |
| `city` | VARCHAR(80) | NO | - | - | City / District |
| `state` | VARCHAR(80) | NO | - | - | State |
| `pincode` | VARCHAR(10) | NO | - | **INDEX** | Indian 6-digit postal code |
| `isDefaultShipping`| BOOLEAN | NO | false | - | Preferred shipping address |
| `isDefaultBilling` | BOOLEAN | NO | false | - | Preferred billing address |
| `createdAt` | DATETIME | NO | now() | - | Created timestamp |
| `updatedAt` | DATETIME | NO | auto | - | Updated timestamp |
| `deletedAt` | DATETIME | YES | NULL | - | Soft-delete timestamp |

#### `user_devices` (Table: `user_devices`)
Stores Firebase Cloud Messaging (FCM) registration tokens for push notifications.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Device registration ID |
| `userId` | VARCHAR(36) | YES | NULL | **FOREIGN KEY -> users(id)** | `ON DELETE CASCADE`, **INDEX** |
| `fcmToken` | VARCHAR(255) | NO | - | **UNIQUE** | Firebase device token |
| `platform` | ENUM | NO | `ANDROID` | **INDEX** | `ANDROID`, `IOS`, `WEB` |
| `deviceModel`| VARCHAR(100)| YES | NULL | - | e.g. "Redmi Note 12", "Chrome" |
| `appVersion` | VARCHAR(30) | YES | NULL | - | Installed client version |
| `createdAt` | DATETIME | NO | now() | - | Registration time |
| `updatedAt` | DATETIME | NO | auto | - | Token refresh time |

---

### 2.2 Catalogue & Taxonomy

#### `brands` (Table: `brands`)
Master registry of smartphone and electronics manufacturers.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | NO | AUTO_INC | **PRIMARY KEY** | Brand identifier |
| `name` | VARCHAR(100) | NO | - | **UNIQUE** | e.g. "Vivo", "Apple", "Realme" |
| `slug` | VARCHAR(120) | NO | - | **UNIQUE, INDEX** | URL slug (`/brands/vivo`) |
| `logoUrl` | VARCHAR(255) | YES | NULL | - | Brand vector/raster logo |
| `isActive` | BOOLEAN | NO | true | **INDEX** | Global visibility toggle |
| `metaTitle` | VARCHAR(255) | YES | NULL | - | Custom SEO Title |
| `metaDescription`| VARCHAR(500)| YES| NULL | - | Custom SEO Meta Description |
| `createdAt` | DATETIME | NO | now() | - | Created timestamp |
| `updatedAt` | DATETIME | NO | auto | - | Updated timestamp |

#### `device_models` (Table: `device_models`)
Specific phone models under each brand.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | NO | AUTO_INC | **PRIMARY KEY** | Model identifier |
| `brandId` | INT | NO | - | **FOREIGN KEY -> brands(id)**| `ON DELETE RESTRICT`, **INDEX** |
| `name` | VARCHAR(120) | NO | - | - | e.g. "Y11 2019", "iPhone 13" |
| `slug` | VARCHAR(150) | NO | - | **UNIQUE, INDEX** | URL slug (`/models/vivo-y11`) |
| `releaseYear`| INT | YES | NULL | - | Approximate launch year |
| `imageUrl` | VARCHAR(255) | YES | NULL | - | Thumbnail image of device |
| `isActive` | BOOLEAN | NO | true | **INDEX** | Model visibility toggle |
| `metaTitle` | VARCHAR(255) | YES | NULL | - | Custom SEO Title |
| `metaDescription`| VARCHAR(500)| YES| NULL | - | Custom SEO Meta Description |
| `createdAt` | DATETIME | NO | now() | - | Created timestamp |
| `updatedAt` | DATETIME | NO | auto | - | Updated timestamp |

#### `categories` (Table: `categories`)
Hierarchical classification of spare parts (Batteries, Flexes, Camera Glasses, ICs).

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | NO | AUTO_INC | **PRIMARY KEY** | Category ID |
| `parentId` | INT | YES | NULL | **FOREIGN KEY -> categories(id)**| `ON DELETE RESTRICT`, **INDEX** |
| `name` | VARCHAR(100) | NO | - | - | Category display name |
| `slug` | VARCHAR(120) | NO | - | **UNIQUE, INDEX** | URL slug (`/category/battery`) |
| `imageUrl` | VARCHAR(255) | YES | NULL | - | Icon/Category visual |
| `sortOrder` | INT | NO | 0 | **INDEX** | Display sort priority |
| `isActive` | BOOLEAN | NO | true | **INDEX** | Category visibility toggle |
| `metaTitle` | VARCHAR(255) | YES | NULL | - | Custom SEO Title |
| `metaDescription`| VARCHAR(500)| YES| NULL | - | Custom SEO Meta Description |
| `createdAt` | DATETIME | NO | now() | - | Created timestamp |
| `updatedAt` | DATETIME | NO | auto | - | Updated timestamp |

---

### 2.3 Products & Wholesale Pricing

#### `products` (Table: `products`)
Central product catalogue table.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Product UUID |
| `sku` | VARCHAR(60) | NO | - | **UNIQUE, INDEX** | Unique stock keeping unit |
| `slug` | VARCHAR(255) | NO | - | **UNIQUE, INDEX** | SEO URL identifier |
| `title` | VARCHAR(255) | NO | - | - | Full commercial title |
| `description`| TEXT | YES | NULL | - | Specifications & details |
| `categoryId`| INT | NO | - | **FOREIGN KEY -> categories(id)**| `ON DELETE RESTRICT`, **INDEX** |
| `brandId` | INT | YES | NULL | **FOREIGN KEY -> brands(id)** | `ON DELETE SET NULL`, **INDEX** |
| `modelId` | INT | YES | NULL | **FOREIGN KEY -> device_models(id)**| `ON DELETE SET NULL`, **INDEX** |
| `retailPrice`| DECIMAL(10,2)| NO | - | **INDEX** | Standard retail unit price (INR) |
| `salePrice` | DECIMAL(10,2)| YES | NULL | - | Discounted promotional price |
| `minOrderQty`| INT | NO | 1 | - | Minimum quantity required |
| `stockQty` | INT | NO | 0 | **INDEX** | Current available warehouse inventory |
| `weightGrams`| INT | NO | 100 | - | Parcel weight for Delhivery calculation |
| `dimensionsJson`| JSON | YES | NULL | - | Box dims: `{"length":10,"width":5,"height":2}` |
| `qualityGrade`| VARCHAR(50) | YES | NULL | - | e.g. "OEM Tested", "Original Pull" |
| `isActive` | BOOLEAN | NO | true | **INDEX** | Live on storefront toggle |
| `metaTitle` | VARCHAR(255) | YES | NULL | - | SEO meta title |
| `metaDescription`| VARCHAR(500)| YES| NULL | - | SEO meta description |
| `createdAt` | DATETIME | NO | now() | - | Created timestamp |
| `updatedAt` | DATETIME | NO | auto | - | Updated timestamp |
| `deletedAt` | DATETIME | YES | NULL | - | Soft-delete timestamp |

#### `product_wholesale_tiers` (Table: `product_wholesale_tiers`)
Defines volume-based discount slabs per product.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Tier record ID |
| `productId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> products(id)**| `ON DELETE CASCADE`, **INDEX** |
| `minQuantity`| INT | NO | - | **COMPOSITE UNIQUE** | Threshold (e.g. 5, 10, 50 pcs) |
| `tierPrice` | DECIMAL(10,2)| NO | - | - | Unit price at or above this quantity |

*Constraint:* `@@unique([productId, minQuantity])` prevents duplicate slab rules on the same product.

#### `product_compatibilities` (Table: `product_compatibilities`)
Many-to-many relationship mapping spare parts to multiple compatible smartphone models.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Record ID |
| `productId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> products(id)**| `ON DELETE CASCADE`, **INDEX** |
| `modelId` | INT | NO | - | **FOREIGN KEY -> device_models(id)**| `ON DELETE CASCADE`, **INDEX** |
| `notes` | VARCHAR(255) | YES | NULL | - | Specific fit notes (e.g. "Revision 2") |

*Constraint:* `@@unique([productId, modelId])` ensures a model is not mapped twice to the same product.

#### `product_images` (Table: `product_images`)
Multi-image gallery per product.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Image record ID |
| `productId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> products(id)**| `ON DELETE CASCADE`, **INDEX** |
| `imageUrl` | VARCHAR(255) | NO | - | - | Optimized WebP storage path |
| `altText` | VARCHAR(255) | YES | NULL | - | Accessible alt description |
| `sortOrder` | INT | NO | 0 | - | Display gallery sequence |
| `isPrimary` | BOOLEAN | NO | false | **INDEX** | Primary catalogue thumbnail |
| `createdAt` | DATETIME | NO | now() | - | Created timestamp |

#### `product_attributes` (Table: `product_attributes`)
Technical specifications list.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Attribute ID |
| `productId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> products(id)**| `ON DELETE CASCADE`, **INDEX** |
| `name` | VARCHAR(80) | NO | - | - | Spec name (e.g., "Pin Count", "Color") |
| `value` | VARCHAR(150) | NO | - | - | Spec value (e.g., "30-Pin", "Gold") |
| `sortOrder` | INT | NO | 0 | - | Sequence on product page |

---

### 2.4 Cart

#### `carts` (Table: `carts`)
Stores active shopping carts for logged-in technicians or guest visitors.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Cart identifier |
| `userId` | VARCHAR(36) | YES | NULL | **FOREIGN KEY -> users(id)** | `ON DELETE CASCADE`, **UNIQUE** |
| `guestSessionId`| VARCHAR(100)| YES| NULL | **UNIQUE, INDEX** | Guest browser cookie / app ID |
| `createdAt` | DATETIME | NO | now() | - | Created timestamp |
| `updatedAt` | DATETIME | NO | auto | - | Last modification timestamp |

#### `cart_items` (Table: `cart_items`)
Line items inside each cart.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Item ID |
| `cartId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> carts(id)** | `ON DELETE CASCADE`, **INDEX** |
| `productId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> products(id)**| `ON DELETE CASCADE`, **INDEX** |
| `quantity` | INT | NO | 1 | - | Active requested quantity |
| `createdAt` | DATETIME | NO | now() | - | Added timestamp |
| `updatedAt` | DATETIME | NO | auto | - | Quantity updated timestamp |

*Constraint:* `@@unique([cartId, productId])` guarantees single row per product with quantity updates.

---

### 2.5 Orders & Fulfillment

#### `orders` (Table: `orders`)
Financial and contractual order record.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Order internal ID |
| `orderNumber` | VARCHAR(32) | NO | - | **UNIQUE, INDEX** | Public human-readable ref (`AT-2026-00001`)|
| `userId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> users(id)** | `ON DELETE RESTRICT`, **INDEX** |
| `subtotal` | DECIMAL(10,2)| NO | - | - | Sum of item subtotals |
| `discountAmount`| DECIMAL(10,2)| NO| 0.00 | - | Coupon or special discount |
| `shippingFee` | DECIMAL(10,2)| NO | 0.00 | - | Delhivery shipping charge |
| `taxAmount` | DECIMAL(10,2)| NO | 0.00 | - | Calculated GST amount |
| `totalAmount` | DECIMAL(10,2)| NO | - | - | Final payable amount (INR) |
| `paymentStatus`| ENUM | NO | `PENDING`| **INDEX** | `PENDING`, `PAID`, `FAILED`, `REFUNDED` |
| `orderStatus` | ENUM | NO | `RECEIVED`| **INDEX** | `RECEIVED`, `PROCESSING`, `MANIFESTED`, `SHIPPED`, `DELIVERED`, `CANCELLED` |
| `customerNotes`| TEXT | YES | NULL | - | Special packaging instructions |
| `createdAt` | DATETIME | NO | now() | **INDEX** | Placed timestamp |
| `updatedAt` | DATETIME | NO | auto | - | Updated timestamp |
| `deletedAt` | DATETIME | YES | NULL | - | Soft-delete timestamp |

#### `order_addresses` (Table: `order_addresses`)
Immutable snapshot of delivery address at checkout time.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Snapshot ID |
| `orderId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> orders(id)**| `ON DELETE CASCADE`, **UNIQUE** |
| `name` | VARCHAR(100) | NO | - | - | Recipient name |
| `phone` | VARCHAR(15) | NO | - | - | Recipient phone |
| `businessName`| VARCHAR(150) | YES | NULL | - | B2B Workshop Name |
| `gstin` | VARCHAR(15) | YES | NULL | - | B2B GST number |
| `addressLine1`| VARCHAR(255)| NO | - | - | Address Line 1 |
| `addressLine2`| VARCHAR(255)| YES| NULL | - | Address Line 2 |
| `landmark` | VARCHAR(150) | YES | NULL | - | Landmark |
| `city` | VARCHAR(80) | NO | - | - | City |
| `state` | VARCHAR(80) | NO | - | - | State |
| `pincode` | VARCHAR(10) | NO | - | - | Delivery pincode |

#### `order_items` (Table: `order_items`)
Immutable snapshot of purchased spare parts.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Order Item ID |
| `orderId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> orders(id)**| `ON DELETE CASCADE`, **INDEX** |
| `productId` | VARCHAR(36) | YES | NULL | **FOREIGN KEY -> products(id)**| `ON DELETE SET NULL`, **INDEX** |
| `sku` | VARCHAR(60) | NO | - | - | SKU at time of purchase |
| `productTitle`| VARCHAR(255)| NO | - | - | Title at time of purchase |
| `unitPrice` | DECIMAL(10,2)| NO | - | - | Locked unit price (tier applied) |
| `quantity` | INT | NO | - | - | Units ordered |
| `totalPrice` | DECIMAL(10,2)| NO | - | - | `unitPrice * quantity` |
| `tierApplied` | VARCHAR(100) | YES | NULL | - | Snapshot description of tier |

#### `order_status_history` (Table: `order_status_history`)
State-machine audit log for order processing milestones.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | History record ID |
| `orderId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> orders(id)**| `ON DELETE CASCADE`, **INDEX** |
| `fromStatus` | ENUM | YES | NULL | - | Previous status |
| `toStatus` | ENUM | NO | - | - | New status |
| `comment` | VARCHAR(255) | YES | NULL | - | Action comment |
| `changedByUserId`| VARCHAR(36)| YES| NULL | **FOREIGN KEY -> users(id)** | `ON DELETE SET NULL` |
| `createdAt` | DATETIME | NO | now() | - | Transition timestamp |

---

### 2.6 Payments & Gateway Abstraction

#### `payments` (Table: `payments`)
Payment gateway transaction log (Razorpay / Cashfree).

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Internal payment ID |
| `orderId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> orders(id)**| `ON DELETE CASCADE`, **INDEX** |
| `gateway` | ENUM | NO | `RAZORPAY`| - | `RAZORPAY`, `CASHFREE`, `MANUAL_COD` |
| `gatewayOrderId`| VARCHAR(100)| YES| NULL | **INDEX** | e.g. `order_M9ABCDEF` |
| `gatewayPaymentId`| VARCHAR(100)| YES| NULL| **INDEX** | e.g. `pay_M9XYZ123` |
| `amount` | DECIMAL(10,2)| NO | - | - | Captured amount |
| `currency` | VARCHAR(5) | NO | "INR" | - | Default Indian Rupee |
| `status` | ENUM | NO | `PENDING`| **INDEX** | `PENDING`, `PAID`, `FAILED`, `REFUNDED`|
| `signature` | VARCHAR(255) | YES | NULL | - | Cryptographic webhook signature |
| `failureReason`| TEXT | YES | NULL | - | Detailed error description |
| `rawWebhookPayload`| JSON | YES | NULL | - | Full verified webhook response |
| `createdAt` | DATETIME | NO | now() | - | Transaction initialized |
| `updatedAt` | DATETIME | NO | auto | - | Status update timestamp |

---

### 2.7 Delhivery & Logistics

#### `shipments` (Table: `shipments`)
Fulfillment consignment record managed with the Delhivery API.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Shipment record ID |
| `orderId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> orders(id)**| `ON DELETE CASCADE`, **UNIQUE** |
| `courier` | VARCHAR(50) | NO | "Delhivery"| - | Courier partner name |
| `awbCode` | VARCHAR(64) | YES | NULL | **UNIQUE, INDEX** | Delhivery Waybill Number |
| `status` | ENUM | NO | `PENDING`| **INDEX** | `PENDING`, `MANIFESTED`, `IN_TRANSIT`, `OUT_FOR_DELIVERY`, `DELIVERED`, `RTO`, `FAILED` |
| `labelPdfUrl` | VARCHAR(255) | YES | NULL | - | Printable thermal label PDF |
| `routingCode` | VARCHAR(50) | YES | NULL | - | Delhivery routing sort code |
| `weightGrams` | INT | NO | 150 | - | Parcel chargeable weight |
| `lengthCm` | DECIMAL(6,2) | YES | NULL | - | Consignment length |
| `widthCm` | DECIMAL(6,2) | YES | NULL | - | Consignment width |
| `heightCm` | DECIMAL(6,2) | YES | NULL | - | Consignment height |
| `pickupLocation`| VARCHAR(100)| NO | "Primary Warehouse"| - | Registered pickup warehouse |
| `dispatchedAt`| DATETIME | YES | NULL | - | Actual dispatch timestamp |
| `deliveredAt` | DATETIME | YES | NULL | - | Actual delivery timestamp |
| `createdAt` | DATETIME | NO | now() | - | Shipment creation time |
| `updatedAt` | DATETIME | NO | auto | - | Status update time |

#### `shipment_tracking_events` (Table: `shipment_tracking_events`)
Real-time tracking milestones received from Delhivery webhooks or polling.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Event record ID |
| `shipmentId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> shipments(id)**| `ON DELETE CASCADE`, **INDEX** |
| `milestone` | VARCHAR(100) | NO | - | - | e.g. "PICKED UP", "IN TRANSIT" |
| `location` | VARCHAR(100) | YES | NULL | - | e.g. "Delhi Hub", "Mumbai Facility" |
| `eventTimestamp`| DATETIME | NO | - | **INDEX** | Time recorded at courier hub |
| `rawEventData`| JSON | YES | NULL | - | Raw Delhivery milestone payload |
| `createdAt` | DATETIME | NO | now() | - | System ingestion timestamp |

---

### 2.8 Product Reviews

#### `reviews` (Table: `reviews`)
Moderated product reviews left by verified buyers.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Review ID |
| `productId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> products(id)**| `ON DELETE CASCADE`, **INDEX** |
| `userId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> users(id)** | `ON DELETE CASCADE` |
| `rating` | INT | NO | - | - | 1 to 5 stars |
| `title` | VARCHAR(150) | YES | NULL | - | Review headline |
| `comment` | TEXT | NO | - | - | Full review text |
| `status` | ENUM | NO | `PENDING`| **INDEX** | `PENDING`, `APPROVED`, `REJECTED` |
| `createdAt` | DATETIME | NO | now() | - | Submitted timestamp |
| `updatedAt` | DATETIME | NO | auto | - | Moderation timestamp |

*Constraint:* `@@unique([productId, userId])` ensures one review per customer per product.

---

### 2.9 Store Configuration, CMS & Audit

#### `store_settings` (Table: `store_settings`)
Central configuration repository.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | NO | AUTO_INC | **PRIMARY KEY** | Setting ID |
| `group` | VARCHAR(50) | NO | - | **INDEX** | e.g. "wholesale", "tax", "shipping" |
| `key` | VARCHAR(80) | NO | - | **UNIQUE, INDEX** | Key name (`wholesale_pricing_mode`)|
| `value` | TEXT | NO | - | - | Active configuration value |
| `description`| VARCHAR(255) | YES | NULL | - | Explanatory note for staff |
| `isPublic` | BOOLEAN | NO | false | - | Allowed in public `/api/v1/config`? |
| `updatedAt` | DATETIME | NO | auto | - | Last modification time |

#### `banners` (Table: `banners`)
Storefront homepage promotional banners.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | NO | AUTO_INC | **PRIMARY KEY** | Banner ID |
| `title` | VARCHAR(150) | NO | - | - | Internal banner title |
| `imageUrl` | VARCHAR(255) | NO | - | - | Optimized WebP graphic path |
| `linkUrl` | VARCHAR(255) | YES | NULL | - | Target destination URL |
| `sortOrder` | INT | NO | 0 | **INDEX** | Carousel sequence order |
| `isActive` | BOOLEAN | NO | true | **INDEX** | Active toggle |
| `createdAt` | DATETIME | NO | now() | - | Created timestamp |

#### `cms_pages` (Table: `cms_pages`)
Legal and informative content pages (Privacy Policy, Terms, Shipping Policy).

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | NO | AUTO_INC | **PRIMARY KEY** | Page ID |
| `title` | VARCHAR(150) | NO | - | - | Page Title |
| `slug` | VARCHAR(150) | NO | - | **UNIQUE, INDEX** | URL Slug (`/pages/shipping-policy`)|
| `contentHtml`| LONGTEXT | NO | - | - | Sanitized rich HTML content |
| `metaTitle` | VARCHAR(255) | YES | NULL | - | SEO meta title |
| `metaDescription`| VARCHAR(500)| YES| NULL | - | SEO meta description |
| `isPublished`| BOOLEAN | NO | true | **INDEX** | Published toggle |
| `createdAt` | DATETIME | NO | now() | - | Created timestamp |
| `updatedAt` | DATETIME | NO | auto | - | Updated timestamp |

#### `blog_posts` (Table: `blog_posts`)
Technician tutorials and repair blog articles.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | INT | NO | AUTO_INC | **PRIMARY KEY** | Post ID |
| `title` | VARCHAR(255) | NO | - | - | Article title |
| `slug` | VARCHAR(255) | NO | - | **UNIQUE, INDEX** | Article URL slug |
| `summary` | TEXT | YES | NULL | - | Excerpt preview |
| `contentHtml`| LONGTEXT | NO | - | - | Full formatted tutorial |
| `featuredImage`| VARCHAR(255)| YES| NULL | - | Thumbnail image |
| `authorId` | VARCHAR(36) | NO | - | **FOREIGN KEY -> users(id)** | `ON DELETE RESTRICT`, **INDEX** |
| `isPublished`| BOOLEAN | NO | false | **INDEX** | Published toggle |
| `publishedAt`| DATETIME | YES | NULL | - | Official publication time |
| `metaTitle` | VARCHAR(255) | YES | NULL | - | SEO meta title |
| `metaDescription`| VARCHAR(500)| YES| NULL | - | SEO meta description |
| `createdAt` | DATETIME | NO | now() | - | Created timestamp |
| `updatedAt` | DATETIME | NO | auto | - | Updated timestamp |

#### `audit_logs` (Table: `audit_logs`)
Tamper-resistant operational and administrative log.

| Field | Type | Nullable | Default | Constraints & Relationships | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | VARCHAR(36) | NO | UUID() | **PRIMARY KEY** | Log ID |
| `actorId` | VARCHAR(36) | YES | NULL | **FOREIGN KEY -> users(id)** | `ON DELETE SET NULL`, **INDEX** |
| `actorPhone` | VARCHAR(15) | YES | NULL | - | Denormalized actor phone |
| `actorRole` | VARCHAR(50) | YES | NULL | - | Actor permission role |
| `action` | VARCHAR(100) | NO | - | **INDEX** | e.g. "UPDATE_PRODUCT_PRICE" |
| `entity` | VARCHAR(80) | NO | - | **COMPOSITE INDEX** | e.g. "Product", "Order" |
| `entityId` | VARCHAR(64) | NO | - | **COMPOSITE INDEX** | Target primary key value |
| `detailsJson`| JSON | YES | NULL | - | Context diff / parameters |
| `ipAddress` | VARCHAR(45) | YES | NULL | - | Client IP |
| `userAgent` | VARCHAR(255) | YES | NULL | - | Browser / App client user agent |
| `createdAt` | DATETIME | NO | now() | **INDEX** | Action timestamp |

---

## 3. Financial Integrity & Decimal Handling

All monetary fields (`retailPrice`, `salePrice`, `tierPrice`, `subtotal`, `shippingFee`, `discountAmount`, `taxAmount`, `totalAmount`, `unitPrice`, `totalPrice`) are strictly defined as:
```sql
DECIMAL(10, 2)
```
- **Range:** `-99,999,999.99` to `+99,999,999.99`.
- **Zero Floating-Point Drift:** Eliminates JavaScript binary floating-point errors (e.g. `0.1 + 0.2 = 0.30000000000000004`).
- **Backend Precision:** Express.js endpoints utilize the `decimal.js` library during line item recalculation, storing exactly formatted decimal strings into Prisma.

---

## 4. Growth & Scale Optimization (Hostinger Shared Constraints)

1. **Strategic Foreign Key Constraints:**
   - Soft-deletes (`deletedAt`) are used on core entities (`users`, `products`, `orders`, `user_addresses`) to prevent accidental cascade deletion of financial records.
   - Deleting a category or brand is `RESTRICTED` if products are attached to it.
2. **Indexed Query Patterns:**
   - Composite index on `otp_verifications(phone, verified, expiresAt)` allows sub-millisecond lookup during high-concurrency login bursts.
   - B-Tree indexes on `products(sku)`, `products(slug)`, `products(categoryId)`, and `products(stockQty)` ensure fast search filtering under 10,000+ SKUs.
3. **Connection Pooling Strategy:**
   - Hostinger shared MySQL instances typically cap concurrent connections between 30 and 50.
   - The Prisma client is configured with connection pool limits (`connection_limit=10`) in the Node.js connection URL to prevent server socket exhaustion.

# ABHAY TECHNICALS — Database Seeding & Import Blueprint
**Target Database:** MySQL 8.0  
**ORM:** Prisma 5/6  
**Document Version:** 1.0.0 (Phase 4 Specification)  
**Status:** Approved Seeding Specification  

---

## 1. Overview & Principles

This document defines the **seeding and bulk import blueprint** for the Abhay Technicals platform. 

### Core Rules
- **No Dummy/Fake Catalogue Inventions:** We do NOT pollute the database with artificial products. Actual production inventory will be imported directly from client-supplied CSV/Excel sheets.
- **Relational Dependency Order:** Seeds must execute in strict hierarchical order to respect foreign key constraints:
  `Store Settings` $\rightarrow$ `Categories` $\rightarrow$ `Brands` $\rightarrow$ `Device Models` $\rightarrow$ `Products` $\rightarrow$ `Images & Attributes` $\rightarrow$ `Wholesale Tiers` $\rightarrow$ `Compatibilities`.
- **Idempotent Execution:** Every seed script uses `upsert` (matching on unique keys such as `slug`, `key`, or `sku`) so that re-running seed scripts does not duplicate records or overwrite live data.
- **Zero Hardcoded Secrets:** Passwords, API tokens, and webhook secrets are never stored in seed files.

---

## 2. Seeding Hierarchy & Execution Sequence

```
1. SYSTEM CONFIGURATION
   └── Store Settings (Initial Launch Defaults: Login-Gated Wholesale, GST, Contact)

2. CORE TAXONOMY
   ├── Categories (20 Mobile Spare Part Categories mapped from live store)
   └── Brands (Top Indian Market Smartphone Brands)
       └── Device Models (Master phone model registry under each brand)

3. CATALOGUE BULK IMPORT (Client-Supplied Data Pipeline)
   ├── Products (SKUs, Titles, Prices, Weights)
   ├── Product Images (CDN / WebP media paths)
   ├── Product Attributes (Specifications, Pin Counts, Colors)
   ├── Product Wholesale Tiers (Volume discount slabs)
   └── Product Compatibilities (Many-to-many model mappings)

4. CORE LEGAL & CONTENT PAGES
   └── CMS Pages (Terms, Privacy, Delhivery Shipping Policy, Refund Policy)
```

---

## 3. Initial System Configuration Seed Blueprint

Executed first to establish global store behavior:

| Group | Key | Value | Description | Public? |
| :--- | :--- | :--- | :--- | :--- |
| `wholesale` | `wholesale_pricing_mode` | `LOGIN_GATED` | Initial launch preference: Retail shown openly, bulk tier pricing revealed upon WhatsApp login | Yes |
| `tax` | `gst_display_mode` | `INCLUSIVE` | Product prices include GST by default | Yes |
| `shipping` | `free_shipping_threshold` | `999` | Orders $\ge$ ₹999 qualify for free Delhivery delivery | Yes |
| `shipping` | `default_shipping_fee` | `49` | Flat shipping fee for orders below threshold | Yes |
| `payment` | `active_payment_gateway` | `RAZORPAY` | Default payment orchestrator (`RAZORPAY` or `CASHFREE`) | No |
| `contact` | `whatsapp_support_phone` | `+917395096715`| Official technician support hotline | Yes |
| `contact` | `contact_email` | `support@abhaytechnicals.com` | Official customer support email | Yes |
| `general` | `store_name` | `Abhay Technicals` | Business identity name | Yes |
| `general` | `default_currency` | `INR` | Store currency symbol: ₹ | Yes |

---

## 4. Master Taxonomy Seeding Blueprint

### 4.1 Master Categories (Mapped from Existing Store)
These 20 categories represent the core structure discovered from the live site:

```typescript
export const initialCategories = [
  { name: 'Mobile Batteries', slug: 'battery', sortOrder: 1 },
  { name: 'Camera Glass', slug: 'camera-glass', sortOrder: 2 },
  { name: 'Charging Connectors', slug: 'charging-connectors', sortOrder: 3 },
  { name: 'Back Panel', slug: 'back-panel', sortOrder: 4 },
  { name: 'Charging Flex', slug: 'charging-flex', sortOrder: 5 },
  { name: 'Original Charging Flex', slug: 'original-charging-flex', sortOrder: 6 },
  { name: 'Main Flex', slug: 'main-flex', sortOrder: 7 },
  { name: 'On / Off Flex', slug: 'on-off-flex', sortOrder: 8 },
  { name: 'Fingerprint Sensor', slug: 'fingerprint-sensor', sortOrder: 9 },
  { name: 'OCA Touch Glass', slug: 'oca-touch-glass', sortOrder: 10 },
  { name: 'Middle Panel', slug: 'middle-panel', sortOrder: 11 },
  { name: 'Keypad LCD', slug: 'keypad-lcd', sortOrder: 12 },
  { name: 'Microphone', slug: 'microphone', sortOrder: 13 },
  { name: 'Speaker & Ringer', slug: 'speaker', sortOrder: 14 },
  { name: 'Speaker Jali / Mesh', slug: 'speaker-jali', sortOrder: 15 },
  { name: 'SIM Holder / Tray', slug: 'sim-holder', sortOrder: 16 },
  { name: 'Side Rubber Key / Buttons', slug: 'side-rubber-key', sortOrder: 17 },
  { name: 'Touch Pad', slug: 'touch-pad', sortOrder: 18 },
  { name: 'Repair Tools & Equipment', slug: 'tools', sortOrder: 19 },
  { name: 'Other Accessories & Spares', slug: 'other-products', sortOrder: 20 },
];
```

### 4.2 Core Smartphone Brands
Top volume smartphone brands for the Indian mobile repair market:

```typescript
export const initialBrands = [
  { name: 'Vivo', slug: 'vivo' },
  { name: 'Oppo', slug: 'oppo' },
  { name: 'Realme', slug: 'realme' },
  { name: 'Xiaomi / Redmi / Poco', slug: 'xiaomi' },
  { name: 'Samsung', slug: 'samsung' },
  { name: 'Apple', slug: 'apple' },
  { name: 'OnePlus', slug: 'oneplus' },
  { name: 'Motorola', slug: 'motorola' },
  { name: 'Infinix', slug: 'infinix' },
  { name: 'Tecno', slug: 'tecno' },
];
```

---

## 5. Client Product Catalogue CSV Import Specification

To streamline client data entry, production catalogue data will be ingested via a standardized CSV / Excel template.

### CSV Column Specification (`products_import_template.csv`)

| Column Header | Required? | Data Type | Example | Validation & Behavior |
| :--- | :--- | :--- | :--- | :--- |
| `sku` | **YES** | String(60) | `BAT-IP6G-01` | Must be strictly unique |
| `title` | **YES** | String(255) | `iPhone 6G Battery 1810mAh OEM Tested` | Display title on web and app |
| `category_slug` | **YES** | String(120) | `battery` | Must match an existing category slug |
| `brand_slug` | NO | String(120) | `apple` | Matches an existing brand slug |
| `primary_model_slug`| NO | String(150) | `iphone-6g` | Primary compatible phone model |
| `retail_price` | **YES** | Decimal | `450.00` | Standard single unit price |
| `sale_price` | NO | Decimal | `399.00` | Optional promotional sale price |
| `min_order_qty` | NO | Integer | `1` | Minimum units required (default: 1) |
| `stock_qty` | **YES** | Integer | `50` | Initial warehouse stock count |
| `weight_grams` | **YES** | Integer | `80` | Required for Delhivery billing |
| `quality_grade` | NO | String(50) | `OEM Tested` | Badge: OEM Tested, Original Pull |
| `description` | NO | Text | `Original capacity replacement battery...` | Technical notes & specs |
| `tier_qty_1` | NO | Integer | `5` | Wholesale Tier 1 threshold |
| `tier_price_1` | NO | Decimal | `360.00` | Unit price for Tier 1 ($\ge$ 5 pcs) |
| `tier_qty_2` | NO | Integer | `10` | Wholesale Tier 2 threshold |
| `tier_price_2` | NO | Decimal | `320.00` | Unit price for Tier 2 ($\ge$ 10 pcs) |
| `tier_qty_3` | NO | Integer | `50` | Wholesale Tier 3 threshold |
| `tier_price_3` | NO | Decimal | `290.00` | Unit price for Tier 3 ($\ge$ 50 pcs) |
| `compatible_model_slugs`| NO | Comma-list | `iphone-6g,iphone-6s` | Additional models this part fits |
| `image_urls` | NO | Pipe-list | `/uploads/ip6-1.webp\|/uploads/ip6-2.webp`| Primary and secondary photos |

---

## 6. Seed Import Script Architecture

The bulk import script will live inside `backend/src/scripts/import-catalogue.ts` and run as an isolated Node.js CLI command:

```
[ Client CSV / Excel ] ──► [ Zod Row Validator ]
                                   │
                                   ├── Valid Row?
                                   │    ├── YES: Upsert Category & Brand
                                   │    │        Upsert Product (SKU)
                                   │    │        Create Wholesale Slabs
                                   │    │        Map Compatible Models
                                   │    └── NO:  Log Row Error to import_errors.log
                                   ▼
                       [ Database Commit (Prisma Transaction) ]
```

### Safety & Integrity Guarantees
1. **Transaction Isolation:** Each product row is processed within a Prisma transaction. If a tier rule or compatibility mapping fails, the product row rolls back cleanly without leaving orphan records.
2. **Wholesale Slab Validation:** The script asserts that `tier_price_1 > tier_price_2 > tier_price_3` and `tier_qty_1 < tier_qty_2 < tier_qty_3`. Invalid price inversions are flagged and rejected immediately.
3. **Dry-Run Mode:** The import script supports a `--dry-run` flag to validate 5,000+ rows of client data and report formatting errors before writing a single byte to MySQL.

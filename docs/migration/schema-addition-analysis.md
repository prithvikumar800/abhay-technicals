# SCHEMA ADDITION ANALYSIS FOR OLD CATALOGUE MIGRATION

## 1. Context & Problem Statement
The ABHAY TECHNICALS old website (`https://abhaytechnicals.com/`) exposes 2,831 catalogue products via WooCommerce and WordPress REST APIs.
Each source product has:
- A permanent, immutable WordPress/WooCommerce Post ID (`id: number`, e.g., `23825`).
- An original canonical permalink (`permalink: string`, e.g., `https://abhaytechnicals.com/shop/realme-p4-lite-mosaic-green-ram-4-gb-rom-64-gb/`).
- An empty/missing SKU in 99.8% of items (`sku: ""`).

In our current Phase 4 Prisma schema ([backend/prisma/schema.prisma](file:///D:/ABHAY%20TECHNICALS/abhay-technicals/backend/prisma/schema.prisma)):
- `Product.sku` is `String @unique @db.VarChar(60)` (non-nullable).
- `Product.slug` is `String @unique @db.VarChar(255)` (derived from product title, subject to change or collisions).
- There is **no persistent source reference column** on `Product` or `Category`.

Without a persistent source reference column:
1. Duplicate detection would have to rely solely on `slug` or a generated `sku`. If a product's name is cleaned up or formatted, subsequent runs would fail to detect the existing record and cause duplication or collision.
2. We cannot store the original WooCommerce product ID directly on the product record.
3. SEO redirect generation (`old_url -> new_url`) would require out-of-band state files rather than native database queries.

---

## 2. Proposed Minimum Schema Addition

### Model: `Product`
Add two optional columns to `Product`:

```prisma
model Product {
  // Existing fields...
  id              String                 @id @default(uuid()) @db.VarChar(36)
  sku             String                 @unique @db.VarChar(60)
  slug            String                 @unique @db.VarChar(255)
  title           String                 @db.VarChar(255)
  description     String?                @db.Text
  categoryId      Int
  brandId         Int?
  modelId         Int?
  retailPrice     Decimal                @db.Decimal(10, 2)
  salePrice       Decimal?               @db.Decimal(10, 2)
  minOrderQty     Int                    @default(1)
  stockQty        Int                    @default(0)
  weightGrams     Int                    @default(100)
  dimensionsJson  Json?                  // Format: {"length": 15, "width": 8, "height": 2}
  qualityGrade    String?                @db.VarChar(50) // e.g. "OEM Tested", "Original Pull", "A+"
  isActive        Boolean                @default(true)
  metaTitle       String?                @db.VarChar(255)
  metaDescription String?                @db.VarChar(500)
  
  // ==========================================
  // MINIMUM MIGRATION ADDITIONS:
  // ==========================================
  sourceId        Int?                   @unique // Original WooCommerce Product ID (e.g. 23825)
  sourceUrl       String?                @db.VarChar(500) // Original canonical permalink for SEO & 301 redirects
  // ==========================================

  createdAt       DateTime               @default(now())
  updatedAt       DateTime               @updatedAt
  deletedAt       DateTime?
  
  // Relationships remain unchanged...
  @@index([sourceId])
}
```

### Model: `Category`
Add one optional column to `Category`:

```prisma
model Category {
  id              Int        @id @default(autoincrement())
  parentId        Int?
  name            String     @db.VarChar(100)
  slug            String     @unique @db.VarChar(120)
  imageUrl        String?    @db.VarChar(255)
  sortOrder       Int        @default(0)
  isActive        Boolean    @default(true)
  metaTitle       String?    @db.VarChar(255)
  metaDescription String?    @db.VarChar(500)
  
  // ==========================================
  // MINIMUM MIGRATION ADDITION:
  // ==========================================
  sourceId        Int?       @unique // Original WooCommerce Category ID (e.g. 21)
  // ==========================================

  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt
  
  // Relationships remain unchanged...
  @@index([sourceId])
}
```

---

## 3. Impact Assessment & Safety Guarantees

| Metric | Evaluation |
| :--- | :--- |
| **Breaking Changes** | **Zero breaking changes.** Both `sourceId` and `sourceUrl` are nullable (`Int?` and `String?`). |
| **Existing Seed Data** | All existing 14 seed products and 8 seed categories remain 100% valid with `sourceId: null`. |
| **MySQL Unique Index** | In MySQL InnoDB, multiple `NULL` values are permitted in `@unique` columns. Existing dev records without source IDs will not violate the constraint. |
| **Idempotency** | Enables atomic `upsert({ where: { sourceId: p.id } })`, ensuring re-running the migration 100 times produces 0 duplicate records. |
| **Performance** | B-tree index on `sourceId` ensures O(1) duplicate lookup during high-throughput batch imports. |
| **SEO Preservation** | Enables native query for generating `url-mapping.csv` and future 301 redirect middleware in Next.js. |

---

## 4. SKU Handling Policy
Because the source catalogue has blank SKUs in nearly all items:
- If a source product provides a non-empty SKU, use the source SKU.
- If the source SKU is empty, deterministically generate: `AT-WC-{sourceId}` (e.g., `AT-WC-23825`).
- This satisfies `sku: String @unique`, avoids null collisions, and provides a clean warehouse barcode/reference format for local testing.

# ABHAY TECHNICALS — SOURCE CATALOGUE INVENTORY SNAPSHOT

**Source URL:** `https://abhaytechnicals.com/`  
**Extraction Timestamp:** 2026-09-25T10:05:00Z  
**Destination:** Local Phase 9 Development Database (`127.0.0.1:3306/abhay_technicals_dev`)  
**Environment Isolation:** 100% Isolated Local Environment. Zero write access to production.

---

## 1. Extraction Method & Protocol Evaluation

| Protocol / Endpoint | HTTP Status | Content Type | Evaluation / Decision |
| :--- | :--- | :--- | :--- |
| `GET /wp-json/wc/store/v1/products` | `200 OK` | `application/json` | **PRIMARY SOURCE**: High-performance public WooCommerce Store API. Provides structured JSON with prices, image galleries, taxonomies, dimensions, and stock without requiring any production credentials. Supports `per_page=100`. |
| `GET /wp-json/wp/v2/product` | `200 OK` | `application/json` | **SECONDARY/ENRICHMENT SOURCE**: Standard WordPress REST API. Exposes `tiered_pricing_fixed_rules`, `tiered_pricing_percentage_rules`, and post meta. Matches product IDs 1-to-1 with Store API. |
| `GET /wp-json/wp/v2/product_cat` | `200 OK` | `application/json` | **TAXONOMY SOURCE**: Returns all 23 source catalogue categories with slugs, parent IDs, and product counts. |
| `GET /product-sitemap.xml` | `200 OK` | `text/xml` | **VALIDATION SOURCE**: Public Yoast XML sitemap containing all canonical product URLs. Used for cross-verifying total catalogue count. |
| `GET /wp-json/wc/v3/products` | `401 Unauthorized` | `application/json` | **SKIPPED**: Requires administrative API keys. Strictly avoided to preserve read-only principle. |

---

## 2. Discovery & Pagination Details

- **Total Products Discovered:** `2,831` (Verified via `X-WP-Total: 2831` header across all REST endpoints and confirmed against XML sitemaps).
- **Pagination Strategy:**
  - `per_page`: 100 products per batch.
  - `total_pages`: 29 pages (Pages 1–28 have 100 items each; Page 29 has 31 items).
  - Rate Limiting: 350ms delay between pages with exponential backoff on 429/5xx (base 2s, max 10s, 3 retries).
  - Checkpoint tracking: Page-level and product-level resume capability with atomic state journaling.

---

## 3. Discovered Source Categories (23 Total)

| ID | Category Name | Source Slug | Product Count | Proposed Local Category |
| :---: | :--- | :--- | :---: | :--- |
| 21 | Back Panel | `back-panel` | 425 | `Back Panel` (id: 4) |
| 178 | Buy Mobile Batteries Wholesale \| Original Quality Battery | `battery` | 43 | `Battery` (id: 2) |
| 49 | Camera Glass | `camera-glass` | 346 | `Camera Glass` (id: 5) |
| 18 | Charging Connectors | `charging-connectors` | 43 | `Charging Connectors` (new) |
| 17 | Charging Flex | `charging-flex` | 55 | `Charging Flex` (id: 3) |
| 236 | Display Conectors | `display-conectors` | 22 | `Display Connectors` (new) |
| 167 | Fingerprint Sensor | `fingerprint-censor` | 108 | `Fingerprint Sensor` (new) |
| 26 | Keypad LCD | `keypad-lcd` | 45 | `Keypad LCD` (new) |
| 32 | Main Flex | `main-flex` | 252 | `Main Flex` (new) |
| 25 | Microphone | `microphone` | 7 | `Microphone` (new) |
| 22 | Middle Panel | `middle-panel` | 138 | `Middle Panel` (new) |
| 24 | Oca Touch Glass | `oca-touch-glass` | 27 | `OCA Glass` (id: 7) |
| 20 | On / Off Flex | `on-off-flex` | 401 | `On / Off Flex` (new) |
| 33 | ORIGNAL CHARGING FLEX | `orignal-charging-flex` | 406 | `Charging Flex` (id: 3, Grade: "Original OEM") |
| 15 | Other Products | `other-products` | 30 | `Other Products` (new) |
| 50 | Side Rubber Key | `side-rubber-key` | 138 | `Side Rubber Key` (new) |
| 35 | Sim Holder | `sim-holder` | 61 | `SIM Holder / Tray` (new) |
| 343 | Smart Phone | `smart-phone` | 4 | `Smart Phone` (new) |
| 23 | Speaker | `speaker` | 120 | `Speaker` (id: 6) |
| 47 | speaker jali | `speaker-jali` | 13 | `Speaker Grill / Jali` (new) |
| 19 | Tools | `tools` | 38 | `Repair Tools` (id: 8) |
| 16 | Touch Pad | `touch-pad` | 43 | `Touch Digitizer` (new) |
| 230 | Volume Flex | `volume-flex` | 66 | `Volume Flex` (new) |
| **SUM** | **All Categories** | — | **2,829** | *(2 products uncategorized / cross-assigned)* |

---

## 4. Discovered Fields & Availability

### Identity Fields
- `id`: WooCommerce integer ID (e.g. `23825`). Always present.
- `name` / `title`: Product title string (e.g. `Realme P4 Lite (Mosaic Green) Ram 4 Gb Rom 64 Gb`). Always present.
- `slug`: URL slug string. Always present.
- `permalink`: Full canonical URL on `https://abhaytechnicals.com/shop/...`. Always present.
- `sku`: Source SKU. **Empty in 99.8% of source catalogue**. Importer must generate deterministic migration SKU `AT-WC-{id}` if empty to satisfy non-null unique DB constraint.
- `type`: `simple` in majority of records.
- `status`: `publish`.

### Pricing Fields
- `prices.price`: String representation of price in smallest currency unit (`currency_minor_unit: 2`, e.g. `"2000"` = ₹20.00, `"1549900"` = ₹15,499.00).
- `prices.regular_price`: Stated MRP/regular price.
- `prices.sale_price`: Discounted sale price if on promotion.
- `currency_code`: Always `INR` (`₹`).

### Wholesale / Tiered Pricing Fields
- `tiered_pricing_fixed_rules`: Present in WP REST endpoint for products with volume pricing (e.g., `{ "5": 15, "10": 12 }` representing minQty 5 at ₹15, minQty 10 at ₹12).
- `tiered_pricing_percentage_rules`: Array of percentage-based rules where configured.
- `tiered_pricing_minimum_quantity`: Explicit MOQ override where set.

### Product Content & Specifications
- `description` / `content.rendered`: Full HTML description including bench repair specs, pin counts, color details, IC specs.
- `short_description` / `excerpt.rendered`: Summary snippet.
- `attributes`: Array of custom WooCommerce attributes (e.g., Color, Pin Count, Quality). Mostly empty at taxonomy level, but rich in product descriptions.

### Inventory & Dimensions
- `is_in_stock`: Boolean stock status (`true` / `false`).
- `stock_availability`: Formatted string (`"In stock"`, `"Out of stock"`).
- `weight` & `dimensions`: Numerical fields with unit formatting (`formatted_weight`, `formatted_dimensions`).

### Image Assets
- `images`: Array of full image objects containing:
  - `id`: WordPress attachment ID.
  - `src`: Original full-resolution image URL (formats observed: `.avif`, `.webp`, `.jpg`, `.png`).
  - `name`: Image filename/title.
  - `alt`: Alt text if provided.
- Featured image is always index `0` (`isPrimary: true`). Remaining images preserve order as gallery items (`sortOrder: 1, 2, ...`).

---

## 5. Compatibility & Model Information
- Source products frequently state handset model compatibility directly in product titles (e.g., `"Vivo Y21 Charging Flex"`, `"Samsung A20 Charging Connector"`, `"Oppo Reno 8 Camera Glass"`).
- Importer will run an extract-and-match routine against known handset brands (`Samsung`, `Xiaomi`, `Vivo`, `Realme`, `Oppo`, `Apple`, `OnePlus`, `Motorola`, `Poco`, `Infinix`, `Tecno`) and models to create accurate `ProductCompatibility` records without inventing data.

---

## 6. Known Source Limitations
1. **Missing SKUs:** The source store rarely populated WooCommerce SKU fields. Importer handles this by deterministically generating `AT-WC-{id}` while recording the absence of source SKU in quality reporting.
2. **Category Redundancy:** Category `33` (`ORIGNAL CHARGING FLEX`) is capitalized and denotes original grade charging flex, whereas Category `17` (`Charging Flex`) contains standard flex. These are cleanly mapped into the target unified category with grade tagging.
3. **No Public Administrative Keys:** Migration is completely zero-privilege and read-only.

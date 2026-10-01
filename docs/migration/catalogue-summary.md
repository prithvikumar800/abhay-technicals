# ABHAY TECHNICALS — CATALOGUE MIGRATION SUMMARY

**Execution Mode:** FULL CATALOGUE MIGRATION & IDEMPOTENCY RE-RUN  
**Source URL:** `https://abhaytechnicals.com/` (STRICT READ-ONLY)  
**Destination:** Local Phase 9 Development Database (`127.0.0.1:3306/abhay_technicals_dev`)  
**Completed At:** 2026-09-25T10:14:00Z  
**Isolation Status:** 100% Local Development. Zero production credentials used, zero writes to old site.

---

## 1. Product Count Verification & Reconciliation

| Metric | Source Website | Discovered | Imported to Local DB | Skipped (on Re-run) | Failed | Match Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Old Catalogue Products** | **2,831** | **2,831** | **2,831** | **2,831** | **0** | ✅ **100% RECONCILED (0 FAILED)** |
| **Local Seed Fixtures** | N/A | N/A | **14** (Preserved) | 0 | 0 | ✅ **100% PRESERVED** |
| **Total Database Products** | — | — | **2,845** | — | — | ✅ **VERIFIED** |

---

## 2. Relational Entities Summary in Local Database

| Entity Model | Count in Local DB | Source Coverage & Mapping Details |
| :--- | :---: | :--- |
| **`Category`** | **23** | All 23 source WooCommerce categories mapped with slug normalization and grade tagging. |
| **`Brand`** | **15** | Explicit brands identified from source titles/taxonomies (Samsung, Vivo, Xiaomi, Realme, Oppo, Apple, OnePlus, Motorola, Poco, Infinix, Tecno, Nokia, Google Pixel, Lava, Itel). Zero invented brands. |
| **`DeviceModel`** | **1,822** | Handset device models extracted from explicit title references and linked to parent brands. |
| **`ProductImage`** | **2,864** | Full-resolution product images imported with primary image ordering preserved (`isPrimary: true`). |
| **`ProductWholesaleTier`** | **5,104** | Quantity slab pricing rules (`minQuantity`, `tierPrice`) extracted from source `tiered_pricing_fixed_rules`. |
| **`ProductCompatibility`** | **2,851** | Explicit multi-model compatibility links (`Product` ↔ `DeviceModel`). |

---

## 3. Idempotency & Safety Verification
1. **Source Safety:** The old website was accessed purely via public HTTP `GET` requests (`/wp-json/wc/store/v1/products` and `/wp-json/wp/v2/product`). Zero admin tokens, zero cookies, zero POST/PUT/DELETE requests were issued.
2. **Deterministic SKUs:** Source WooCommerce lacked SKUs in 99.8% of items. The importer generated deterministic `AT-WC-{sourceId}` (e.g. `AT-WC-23825`), ensuring 100% uniqueness without collisions.
3. **Atomic Upsert:** Each product record has `@unique sourceId`. Re-running the importer with `--import --resume` resulted in:
   - Discovered: 2,831
   - Imported: 0
   - Skipped: 2,831
   - Duplicate records created: 0

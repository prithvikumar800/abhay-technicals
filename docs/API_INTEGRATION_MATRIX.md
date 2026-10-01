# ABHAY TECHNICALS — API Integration Matrix

This document provides the authoritative API contract between the Express.js Backend and all consuming clients:
- **Web Storefront** (Next.js 14)
- **Mobile Application** (Flutter / Android)
- **Admin Panel** (Next.js 14)

---

## 1. Authentication & Session Management

| Endpoint | Method | Auth Guard | Request Payload | Response Schema | Consumers | Error Responses | Mode / Mock Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/v1/auth/otp/request` | `POST` | None (Public) | `{"phone": "9876543210"}` | `{"success": true, "message": "OTP sent", "data": {"session_id": "...", "expires_at": "...", "dev_otp": "123456"}}` | Web, Android | `400` Bad Request (invalid phone)<br>`429` Rate Limit Exceeded | Dev OTP `123456` in local/test; Live WhatsApp in prod |
| `/api/v1/auth/otp/verify` | `POST` | None (Public) | `{"phone": "9876543210", "otp": "123456", "session_id": "..."}` | `{"success": true, "data": {"access_token": "...", "refresh_token": "...", "user": {"id": "...", "phone": "...", "role": "CUSTOMER"}}}` | Web, Android | `400` Bad Request<br>`401` Invalid/Expired OTP<br>`429` Max Attempts Exceeded | Live JWT generation |
| `/api/v1/auth/refresh` | `POST` | None (Public) | `{"refresh_token": "..."}` | `{"success": true, "data": {"access_token": "..."}}` | Web, Android, Admin | `400` Missing Token<br>`401` Invalid/Revoked Token | Live rotation |
| `/api/v1/auth/logout` | `POST` | Bearer JWT | `{"refresh_token": "..."}` | `{"success": true, "message": "Logged out"}` | Web, Android, Admin | `401` Unauthorized | Live session revocation |
| `/api/v1/auth/me` | `GET` | Bearer JWT | None | `{"success": true, "data": {"id": "...", "phone": "...", "name": "...", "role": "TECHNICIAN", "pricing_tier": "WHOLESALE"}}` | Web, Android, Admin | `401` Unauthorized | Authenticated user profile |

---

## 2. Product Catalogue & Device Compatibility

| Endpoint | Method | Auth Guard | Query / Params | Response Schema | Consumers | Error Responses | Mode / Mock Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/v1/brands` | `GET` | None | `?is_active=true` | `{"success": true, "data": [{"id": "...", "name": "Samsung", "slug": "samsung", "logo_url": "..."}]}` | Web, Android, Admin | `500` Server Error | Live Prisma/MySQL |
| `/api/v1/models` | `GET` | None | `?brand_id=...&brand_slug=...` | `{"success": true, "data": [{"id": "...", "name": "Galaxy M31", "model_number": "SM-M315F"}]}` | Web, Android, Admin | `500` Server Error | Live Prisma/MySQL |
| `/api/v1/categories` | `GET` | None | `?parent_id=...` | `{"success": true, "data": [{"id": "...", "name": "Display", "slug": "display"}]}` | Web, Android, Admin | `500` Server Error | Live Prisma/MySQL |
| `/api/v1/products` | `GET` | Optional JWT (Login-Gated Wholesale) | `?category=...&brand=...&model=...&search=...&page=1&limit=20` | `{"success": true, "data": [{"id": "...", "name": "...", "sku": "...", "retail_price": 1499, "wholesale_price": 999, "moq": 5, "stock": 45, "wholesale_tiers": [...]}]}` | Web, Android, Admin | `400` Bad Query<br>`500` Server Error | Live DB. Wholesale hidden for unauthenticated guests |
| `/api/v1/products/:slug` | `GET` | Optional JWT | `slug` (Path param) | `{"success": true, "data": {"id": "...", "name": "...", "sku": "...", "compatible_models": [...], "wholesale_tiers": [...]}}` | Web, Android | `404` Not Found | Live Prisma/MySQL |

---

## 3. Cart Management & Authoritative Recalculation

| Endpoint | Method | Auth Guard | Request Payload | Response Schema | Consumers | Error Responses | Mode / Mock Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/v1/cart` | `GET` | Bearer JWT / Session | Header token | `{"success": true, "data": {"items": [...], "subtotal": 2400, "shipping_fee": 0, "free_shipping_threshold": 999, "total": 2400}}` | Web, Android | `401` Unauthorized | Backend authoritative recalculation |
| `/api/v1/cart/items` | `POST` | Bearer JWT / Session | `{"product_id": "...", "quantity": 5}` | `{"success": true, "data": {"cart": {...}}}` | Web, Android | `400` MOQ Violation / Insufficient Stock<br>`404` Product Not Found | Backend enforces MOQ & Stock |
| `/api/v1/cart/items/:id` | `PATCH` | Bearer JWT / Session | `{"quantity": 10}` | `{"success": true, "data": {"cart": {...}}}` | Web, Android | `400` MOQ Violation<br>`404` Cart Item Not Found | Recalculates volume tier discounts |
| `/api/v1/cart/items/:id` | `DELETE` | Bearer JWT / Session | None | `{"success": true, "data": {"cart": {...}}}` | Web, Android | `404` Cart Item Not Found | Live DB |
| `/api/v1/cart/clear` | `POST` | Bearer JWT / Session | None | `{"success": true, "data": {"items": [], "subtotal": 0, "total": 0}}` | Web, Android | `401` Unauthorized | Live DB |

---

## 4. Checkout & Order Lifecycle

| Endpoint | Method | Auth Guard | Request Payload | Response Schema | Consumers | Error Responses | Mode / Mock Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/v1/checkout/serviceability` | `GET` | None | `?pincode=110019` | `{"success": true, "data": {"pincode": "110019", "serviceable": true, "city": "New Delhi", "state": "Delhi", "cod_available": false}}` | Web, Android | `400` Invalid Pincode | Mock Delhivery check in dev |
| `/api/v1/checkout/orders` | `POST` | Bearer JWT | `{"shipping_address": {...}, "payment_method": "PREPAID", "items": [{"product_id": "...", "quantity": 5}]}` | `{"success": true, "data": {"order_id": "...", "order_number": "AT-2026-0001", "total_amount": 2400, "status": "CONFIRMED"}}` | Web, Android | `400` Validation / MOQ Failure<br>`409` Stock Conflict | Price lock snapshot + Mock Payment auto-confirm |
| `/api/v1/orders` | `GET` | Bearer JWT | `?page=1&limit=10` | `{"success": true, "data": [{"id": "...", "order_number": "...", "status": "...", "total": 2400, "created_at": "..."}]}` | Web, Android | `401` Unauthorized | Customer isolated orders |
| `/api/v1/orders/:id` | `GET` | Bearer JWT | `id` (Path param) | `{"success": true, "data": {"id": "...", "order_number": "...", "items": [...], "shipment": {"awb": "...", "status": "..."}}}` | Web, Android | `404` Order Not Found | Full snapshot + tracking details |

---

## 5. Shipping & Delhivery Tracking

| Endpoint | Method | Auth Guard | Query / Params | Response Schema | Consumers | Error Responses | Mode / Mock Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/v1/shipments/track/:awb` | `GET` | None (Public) | `awb` (Path param) | `{"success": true, "data": {"awb": "DEL9876543210", "carrier": "Delhivery Express", "status": "IN_TRANSIT", "events": [...]}}` | Web, Android, Admin | `404` AWB Not Found | Mock Delhivery tracking in dev |

---

## 6. Admin Panel Management

| Endpoint | Method | Auth Guard | Payload / Params | Response Schema | Consumers | Error Responses | Mode / Mock Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/v1/admin/dashboard/stats` | `GET` | Admin / Staff JWT | None | `{"success": true, "data": {"total_revenue": 154200, "total_orders": 48, "low_stock_count": 3, "total_products": 6}}` | Admin | `403` Forbidden | Live aggregate queries |
| `/api/v1/admin/products` | `GET` | Admin / Staff JWT | `?search=...&page=1` | `{"success": true, "data": [...]}` | Admin | `403` Forbidden | Live Prisma query |
| `/api/v1/admin/products` | `POST` | Admin / Staff JWT | `{"name": "...", "sku": "...", "retail_price": 999, "stock": 50, ...}` | `{"success": true, "data": {"id": "...", "name": "...", "sku": "..."}}` | Admin | `400` Validation Error<br>`409` SKU Exists | Live MySQL write |
| `/api/v1/admin/products/:id` | `PUT` | Admin / Staff JWT | Updated product payload | `{"success": true, "data": {...}}` | Admin | `404` Product Not Found | Live MySQL write |
| `/api/v1/admin/orders` | `GET` | Admin / Staff JWT | `?status=...&page=1` | `{"success": true, "data": [...]}` | Admin | `403` Forbidden | Live orders with customer details |
| `/api/v1/admin/orders/:id/ship` | `POST` | Admin / Staff JWT | `{"carrier": "DELHIVERY"}` | `{"success": true, "data": {"awb": "DEL...", "status": "MANIFESTED"}}` | Admin | `400` Order Not Ready | Mock Delhivery AWB assignment |

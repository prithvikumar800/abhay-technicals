# ABHAY TECHNICALS — REST API Architecture & Specification
**Protocol:** RESTful JSON over HTTPS  
**Base Path:** `/api/v1/`  
**Authentication:** WhatsApp OTP + Dual JWT (Access 15m / Refresh 30d)  
**Document Version:** 1.0.0 (Phase 5 Specification)  
**Status:** Core Foundation Implemented  

---

## 1. Architectural Principles

1. **Strict Layer Separation:**  
   Every incoming request flows deterministically through:
   `Route -> Controller -> Service -> Repository/Prisma`
   Controllers are thin; business rules (wholesale price gating, tier calculations, OTP verification) remain strictly in the service layer.
2. **Deterministic Response Envelopes:**  
   Every endpoint returns a consistent JSON contract with `success`, `statusCode`, `message`, `data`, and a tracking `meta` block.
3. **Zero Client Trust:**  
   Calculated totals, wholesale volume discounts, and shipping fees submitted by frontend apps are completely discarded and recalculated server-side.
4. **Mock Provider Strategy:**  
   External dependencies (Meta WhatsApp Cloud API, Razorpay/Cashfree, Delhivery) operate through standard TypeScript interfaces with mock adapters during development, ensuring complete isolation from production billing and third-party rate limits.

---

## 2. Global Request & Response Conventions

### 2.1 Request Correlation ID
Every HTTP request generates or adopts an `X-Request-Id` header (UUIDv4) that propagates through all logs and error responses for end-to-end auditability.

### 2.2 Standard Success Envelope
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Resource retrieved successfully",
  "data": { ... },
  "meta": {
    "timestamp": "2026-09-25T09:30:00.000Z",
    "requestId": "c1f7b889-42b7-4c07-9b2f-76c2419082ea",
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalItems": 150,
      "totalPages": 8
    }
  }
}
```

### 2.3 Standard Error Envelope
```json
{
  "success": false,
  "statusCode": 422,
  "message": "Validation failed",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "phone",
        "message": "Invalid mobile number. Please provide a valid 10-digit Indian phone number"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-09-25T09:30:00.000Z",
    "requestId": "c1f7b889-42b7-4c07-9b2f-76c2419082ea"
  }
}
```

### 2.4 HTTP Status Codes
- `200 OK`: Request succeeded.
- `201 Created`: Resource successfully created.
- `400 Bad Request`: Malformed payload or broken business rule (e.g. MOQ not met).
- `401 Unauthorized`: Token missing, invalid, or expired.
- `403 Forbidden`: Authenticated user lacks required role (e.g. non-admin accessing admin route).
- `404 Not Found`: Resource or route does not exist.
- `422 Unprocessable Entity`: Zod schema validation failed.
- `429 Too Many Requests`: Rate limit threshold exceeded.
- `500 Internal Server Error`: Unexpected runtime exception.

---

## 3. Authentication & Authorization Architecture

### 3.1 WhatsApp OTP Handshake Flow

```
[ Client ] ──1. POST /api/v1/auth/request-otp { phone: "9876543210" }──► [ API ]
                                                                             │
                                                                   2. Rate Limiter Check (5/hr)
                                                                   3. Generates 6-digit crypto OTP
                                                                   4. Hashes OTP with Bcrypt (5m TTL)
                                                                   5. Dispatches via WhatsAppProvider
                                                                             │
[ Customer WhatsApp ] ◄──6. Receives OTP ("123456")─────────────────────────┘
         │
7. Client Enters OTP
         │
         ▼
[ Client ] ──8. POST /api/v1/auth/verify-otp { phone, otp: "123456" }──► [ API ]
                                                                             │
                                                                   9. Checks Expiry & Max 3 Attempts
                                                                  10. Compares Bcrypt Hash
                                                                  11. Upserts User (Role: CUSTOMER)
                                                                  12. Issues Access (15m) + Refresh (30d)
                                                                             │
[ Client ] ◄──13. Returns { accessToken, refreshToken, user }────────────────┘
```

### 3.2 Role-Based Access Control (RBAC)
- **`CUSTOMER`**: Standard retail customer. Can purchase, manage own addresses, view own orders.
- **`WHOLESALER`**: Verified technician/shop owner. Automatically accesses wholesale tier pricing in all store modes.
- **`STAFF`**: Operational staff. Can update order statuses, generate shipping labels.
- **`ADMIN`**: Superuser. Full access to catalogue, bulk pricing, store settings, and audit logs.

---

## 4. Rate Limiting Architecture

| Target Path | Window | Threshold | Purpose |
| :--- | :--- | :--- | :--- |
| Global API (`*`) | 1 Minute | 120 req / IP | Prevents scraping & DDoS |
| `/api/v1/auth/request-otp` | 1 Hour | 5 requests / IP | Prevents OTP spam & SMS cost drainage |
| `/api/v1/checkout/*` | 1 Minute | 20 req / IP | Prevents automated inventory hoarding |

---

## 5. Catalogue & Wholesale Pricing Rules

### 5.1 Wholesale Pricing Modes
The system setting `wholesale_pricing_mode` dictates product tier visibility:
1. **`LOGIN_GATED` (Default):**
   - **Guest / Unauthenticated User:** Receives `retailPrice` and `salePrice`. The `wholesaleTiers` array is completely stripped from the response envelope; `loginRequiredForWholesale: true` is returned to trigger the WhatsApp login prompt on the UI.
   - **Authenticated User:** Receives full `wholesaleTiers` array with volume slabs.
2. **`PUBLIC`:** All visitors receive wholesale slabs regardless of authentication status.
3. **`WHOLESALER_ONLY`:** Only accounts with `role: 'WHOLESALER'` or `role: 'ADMIN'` receive tier discounts.

---

## 6. Endpoints Status Map

### Implemented & Ready Core Endpoints

#### System & Health
- `GET /health` — Safe system health & uptime check.

#### Authentication (`/api/v1/auth`)
- `POST /api/v1/auth/request-otp` — Request 6-digit WhatsApp OTP.
- `POST /api/v1/auth/verify-otp` — Verify OTP, register/login, issue tokens.
- `POST /api/v1/auth/refresh` — Rotate access token via refresh token.
- `POST /api/v1/auth/logout` — Revoke active refresh session.
- `GET /api/v1/auth/me` — Current authenticated user profile.

#### Catalogue (`/api/v1/`)
- `GET /api/v1/categories` — Master list of active categories.
- `GET /api/v1/brands` — Master list of phone manufacturers.
- `GET /api/v1/brands/:brandId/models` — Smartphone models under brand.
- `GET /api/v1/products` — Paginated catalogue with filters (category, brand, model, price, search).
- `GET /api/v1/products/:slug` — Full product detail view with wholesale tiers.

#### Cart (`/api/v1/cart`)
- `GET /api/v1/cart` — Active cart with live recalculated prices and tiers.
- `POST /api/v1/cart/items` — Add spare part item to cart.
- `PATCH /api/v1/cart/items/:id` — Update quantity with MOQ & stock checks.
- `DELETE /api/v1/cart/items/:id` — Remove item from cart.
- `DELETE /api/v1/cart` — Empty active cart.

#### Checkout (`/api/v1/checkout`)
- `POST /api/v1/checkout/validate` — Pre-checkout validator verifying items, stock, wholesale eligibility, and Delhivery pincode serviceability.

#### Orders (`/api/v1/orders`) — *Phase 9 Active*
- `POST /api/v1/orders` — Create new order from user's active cart with address, stock reservation, and AWB generation.
- `GET /api/v1/orders` — Paginated customer order history with status filters.
- `GET /api/v1/orders/:id` — Granular order details (by ID or order number) with line items, tier pricing snapshot, and Delhivery tracking.
- `GET /api/v1/orders/:id/invoice` — GST tax invoice breakdown (intra-state CGST+SGST vs inter-state IGST, HSN codes).
- `PATCH /api/v1/orders/:id/cancel` — Customer order cancellation with automatic inventory stock replenishment.

#### Admin Orders (`/api/v1/admin/orders`) — *Phase 9 Active*
- `GET /api/v1/admin/orders` — Paginated administrative orders with search (order number, customer name, phone, AWB) and status filters.
- `GET /api/v1/admin/orders/:id` — Detailed administrative view with customer profile, items, and status history.
- `PATCH /api/v1/admin/orders/:id/status` — State machine transition (`RECEIVED` -> `PROCESSING` -> `MANIFESTED` -> `SHIPPED` -> `DELIVERED` -> `CANCELLED`) with comment and user audit logging.

---

### Planned Endpoints (Scheduled for Subsequent Phases)

#### Payments (`/api/v1/payments`) — *Phase 9 Payment Gateway*
- `POST /api/v1/payments/create-intent` — Generate Razorpay / Cashfree order ID.
- `POST /api/v1/payments/webhook` — Webhook listener verifying HMAC signature.

#### Logistics (`/api/v1/shipments`) — *Phase 10*
- `GET /api/v1/shipments/track/:awb` — Public live parcel tracking.
- `POST /api/v1/shipments/admin/manifest` — Dispatch order with Delhivery API.

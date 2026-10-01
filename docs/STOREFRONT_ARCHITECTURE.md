# ABHAY TECHNICALS — Customer Storefront Architecture & Engineering Plan

**Framework:** Next.js 14 (App Router) + React 18  
**Styling:** Tailwind CSS (Phase 3 Design System)  
**Target Environment:** Node.js 20 LTS (Hostinger Business Hosting Standalone Mode)  
**Document Version:** 1.0.0 (Phase 7 Specification)  
**Status:** Approved Reference  

---

## 1. Storefront Route Structure

The customer web application is organized using the Next.js App Router:

```
web/src/app/
├── layout.tsx                     # Global root layout (Header, Footer, Floating WhatsApp CTA)
├── page.tsx                       # Homepage (13 required sections: Hero, ModelExplorer, Slabs, Trust)
├── shop/page.tsx                  # Full product catalogue (faceted filters, SKU search, pagination)
├── categories/page.tsx            # Hardware category grid (batteries, charging flex, OCA glass, etc.)
├── brands/page.tsx                # Smartphone manufacturer directory (Vivo, Realme, Apple, Oppo, etc.)
├── models/page.tsx                # Handset model browser by brand
├── model-explorer/page.tsx        # Interactive 3-step part finder (Brand -> Model -> Components)
├── search/page.tsx                # Multi-attribute search results (Title, SKU, Brand, Model)
├── products/[slug]/page.tsx       # Product detail page (gallery, specs, wholesale tier table, WhatsApp CTA)
├── cart/page.tsx                  # Shopping cart (live wholesale tier recalculation, MOQ checks, free freight bar)
├── checkout/page.tsx              # Checkout (contact, GSTIN, mock Delhivery check, prepaid payment selection)
├── login/page.tsx                 # Passwordless WhatsApp OTP customer authentication
├── account/
│   ├── page.tsx                   # Customer profile overview & wholesale authorization badge
│   ├── orders/page.tsx            # Order history listing
│   ├── orders/[id]/page.tsx       # Detailed order view with locked historical pricing
│   └── addresses/page.tsx         # Saved workshop delivery addresses
├── track-order/page.tsx           # Public Delhivery tracking timeline (Received -> Manifested -> Delivered)
├── wishlist/page.tsx              # Saved parts wishlist
├── notifications/page.tsx         # Milestone & inventory alerts
├── about/page.tsx                 # Company background & workshop focus
├── contact/page.tsx               # Official WhatsApp & email channels
├── faq/page.tsx                   # Frequently asked technician & shipping questions
├── blog/page.tsx                  # Diagnostic blogs & technical repair walkthroughs
├── privacy-policy/page.tsx        # Privacy & token security policy
├── terms-and-conditions/page.tsx  # Terms of sale & compatibility disclaimers
├── shipping-policy/page.tsx       # Delhivery surface logistics & dispatch timelines
└── return-refund-policy/page.tsx  # 7-day bench testing warranty policy
```

---

## 2. Component Design & Reusability

All UI components adhere to the **Phase 3 Design System**:
* **Color Palette:**
  - Primary: `#0B3B60` (Navy)
  - Secondary / Accent: `#0284C7` (Sky Blue)
  - WhatsApp Helpline: `#25D366`
  - Surface: `#FFFFFF` (Card), `#F8FAFC` (Base), `#F1F5F9` (Subtle)
* **`ProductCard.tsx`:**  
  Features a prominent compatibility badge (e.g., `Fits Vivo Y11 2019`), retail/sale price, minimum order quantity (MOQ), and wholesale availability indicator.
* **`ModelExplorer.tsx`:**  
  Interactive 3-tier lookup engine (`Brand` &rarr; `Device Model` &rarr; `Category`) directing technicians straight to verified-fit parts.
* **`WhatsAppCTA.tsx`:**  
  Provides both embedded call-to-actions and a non-intrusive floating button with prefilled enquiry queries.
* **`Header.tsx` & `Footer.tsx`:**  
  Desktop mega-navigation accompanied by a dedicated mobile bottom navigation bar (Home, Categories, Part Finder, Cart, Account) providing minimum **44×44px** touch targets conforming to WCAG 2.1 AA.

---

## 3. Authentication & Token Security Architecture

In strict compliance with the architectural mandate:
1. **Short-Lived Access Token:** Stored **exclusively in client-side memory** (`AuthProvider`). It is never stored in `localStorage`, `sessionStorage`, or `IndexedDB`.
2. **Long-Lived Refresh Token:** Managed via a secure, `HttpOnly`, `SameSite=Strict`, `Secure` cookie issued by the backend at `/api/v1/auth/refresh`.
3. **Session Rehydration:** On page reloads, the application triggers `GET /api/v1/auth/me` with `credentials: 'include'`. If the cookie is valid, customer state is restored without exposing tokens to client scripts.
4. **Customer vs Admin Separation:** Customer interfaces check for `CUSTOMER` or `WHOLESALER` privileges. `ADMIN` and `STAFF` users maintain administrative tokens without mixing state.

---

## 4. Wholesale Pricing Architecture (`LOGIN_GATED`)

* **Unauthenticated State:**  
  Product cards and detail pages display only standard retail prices. Wholesale tier tables are hidden and replaced with an informative banner: *"Wholesale on Login"*.
* **Authenticated State:**  
  Once a technician signs in via WhatsApp OTP, applicable volume discount slabs (e.g., 5+ pcs, 10+ pcs, 50+ pcs) unlock automatically.
* **Cart Engine:**  
  `CartProvider` dynamically inspects line item quantities against `wholesaleTiers` and applies the lowest qualifying unit price, updating the subtotal in real time.
* **Authoritative Verification:**  
  Prices submitted by the client are always re-validated by the backend during `/checkout` creation. The backend database remains the sole source of truth.

---

## 5. Mock Integrations & Decoupled APIs

1. **Centralized API Client (`web/src/lib/api-client.ts`):**  
   All requests route through `NEXT_PUBLIC_API_BASE_URL`.
2. **Delhivery Logistics:**  
   Pincode serviceability checks and waybill tracking simulate surface express milestones without connecting live Delhivery production keys.
3. **Prepaid Checkout:**  
   Simulated Razorpay UPI and Cashfree Card flows confirm order creation without charging real accounts.

---

## 6. SEO & Structured Data Strategy

* **Meta Tags:** Every page exports unique, descriptive `<title>` and `<meta name="description">` tags.
* **JSON-LD Structured Data (`SeoStructuredData.tsx`):**
  - `Organization`: Abhay Technicals contact, address, and support info.
  - `Product`: Exact SKU, real price, new condition, and in-stock availability (without fake review ratings).
  - `BreadcrumbList`: Accurate breadcrumb hierarchies for search engine rich snippets.
* **Open Graph:** Configured for social sharing previews with site title, description, and preview URLs.

---

## 7. Responsive & Accessibility Strategy

* **Tested Viewports:** 360px (compact mobile), 640px (large mobile), 768px (tablet), 1024px (desktop), 1280px (wide desktop).
* **WCAG 2.1 AA:** Minimum 44×44px touch targets on all buttons and bottom nav items. High-contrast typography and visible focus rings (`focus-visible:ring-2 focus-visible:ring-brand-accent`).

---

## 8. Hostinger Business Deployment Plan (Node.js 20 LTS)

1. **Standalone Build:** `next.config.mjs` sets `output: 'standalone'`.
2. **Static Asset Offloading:** `.next/static` assets are served via LiteSpeed Web Server.
3. **Server Execution:** `server.js` is executed under Hostinger's Node.js Application Manager targeting Node.js 20 LTS.

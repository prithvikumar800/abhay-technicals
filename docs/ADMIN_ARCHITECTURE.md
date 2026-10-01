# ABHAY TECHNICALS — Admin Portal Architecture & Engineering Plan
**Framework:** Next.js 14 (App Router) + React 18  
**Styling:** Tailwind CSS (Phase 3 Design System)  
**Target Environment:** Node.js 20 LTS (Hostinger Business Hosting Standalone Mode)  
**Document Version:** 1.0.0 (Phase 6 Specification)  
**Status:** Approved Architecture Reference  

---

## 1. Application Layout & Navigation Structure

The Admin Portal is organized under two primary route groups in the Next.js App Router:

```
src/app/
├── (auth)/
│   └── login/               # Protected Administrator WhatsApp OTP login
└── (dashboard)/             # Authenticated shell layout (Sidebar + Topbar)
    ├── page.tsx             # Executive Dashboard / KPIs
    ├── products/            # Catalogue grid, search, filters
    │   ├── new/             # Multi-tab Product Creator
    │   └── [id]/            # Product Editor & Compatibility Assigner
    ├── categories/          # Category Hierarchy & Sort Ordering
    ├── brands/              # Smartphone Brands Registry
    ├── models/              # Device Models Registry
    ├── wholesale/           # Wholesale Tier Pricing Slabs Manager
    ├── orders/              # Order Processing Queue & Thermal Invoices
    │   └── [id]/            # Detailed Order & Status State Machine
    ├── shipments/           # Delhivery Manifest & AWB Management
    ├── customers/           # Technician & Retailer Profiles
    ├── reviews/             # Moderation Queue (Approve / Reject)
    ├── cms/                 # Banners, Legal CMS Pages, Repair Blog
    ├── settings/            # Store Settings & Integration Status
    └── audit-logs/          # Immutable Operational Audit Trail
```

---

## 2. Component Design & Reusability Matrix

All admin UI components follow the **Phase 3 Design System**:
- **`Sidebar.tsx`:** Collapsible navigation rail with active badge counters (e.g. pending shipments, low-stock alerts). Collapses to icon-only on desktop and slides in as a mobile drawer on smaller screens.
- **`Topbar.tsx`:** Global quick-search input (jumps to SKU / Order / Customer), pending order pill, notification bell, admin profile avatar.
- **`Table.tsx`:** Accessible, responsive data table with sticky headers, zebra striping, sort indicators, pagination controls, and row action triggers.
- **`Modal.tsx` & `ConfirmDialog.tsx`:** Focus-trapped accessible dialogs. Destructive actions (deletions, wholesale slab removals, shipment cancellations) require explicit confirmation.
- **`Toast.tsx`:** Micro-interaction feedback for API state changes (Success, Error, Info, Warning) with auto-dismiss after 4 seconds.
- **`Skeleton.tsx`:** Content-shaped loading placeholders preventing Cumulative Layout Shift (CLS).

---

## 3. API Integration & Error Handling Strategy

1. **Centralized Client (`src/lib/api-client.ts`):**  
   All requests route through a single `apiClient` instance configured with `NEXT_PUBLIC_API_BASE_URL`. Components never fetch arbitrary URLs directly.
2. **Server-Side Pagination:**  
   The product catalogue, orders, and customer lists enforce backend pagination (`page`, `limit`). The browser never loads thousands of SKUs into client memory.
3. **Optimistic Updates & Error Boundaries:**  
   Actions like toggling product active status or updating category sort order reflect immediately in the UI with automatic rollback if the API rejects the request.

---

## 4. Mock & Development Data Strategy

During local development or when backend microservices are offline, the admin portal gracefully falls back to structured mock fixtures located in `src/lib/mock-data.ts`:
- **KPI Metrics:** Simulated GMV, units sold, low-stock warnings, and pending shipments.
- **Sample Orders:** Realistic spare parts orders showcasing locked wholesale prices, Delhivery AWB numbers, and transit events.
- **Visual Indicators:** When mock data is active, an indicator chip (*"Development Mock Data Active"*) displays in the footer to guarantee that developers never confuse mock data with real production inventory.

---

## 5. Hostinger Production Deployment Strategy (Node.js 20 LTS)

1. **Standalone Build:** `next.config.mjs` specifies `output: 'standalone'`.
   - Running `next build` produces `.next/standalone` containing only the exact node dependencies required to serve the admin dashboard.
2. **Static Asset Offloading:** Static assets in `.next/static` and `public/` are served directly by LiteSpeed Web Server, reducing memory consumption to near zero.
3. **Node.js 20 LTS Execution:** The standalone entry point `server.js` is managed via Hostinger's hPanel Node.js Application Manager on a dedicated subdomain (e.g., `admin.abhaytechnicals.com`).

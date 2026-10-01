# ABHAY TECHNICALS — UI/UX & Design System Specification
**Project:** Abhay Technicals E-Commerce Ecosystem  
**Target Platforms:** Storefront Web (Next.js), Admin Dashboard (Next.js), Native Android App (Flutter)  
**Document Version:** 1.0.0 (Phase 3 Foundation)  
**Status:** Approved Specification  

---

## 1. Brand Identity & Design Direction

### 1.1 Brand Positioning
Abhay Technicals is a specialized, high-trust B2B and B2C mobile phone spare parts, tools, and accessories ecosystem. Unlike generic fashion or FMCG e-commerce platforms, technical repair parts require:
- **Precision & Reliability:** Clear model compatibility, exact component dimensions, OEM/tested quality assurance.
- **Data Density & Scannability:** Technicians and shop owners need to quickly identify SKUs, flex cable pin counts, IC numbers, and stock availability without fluff.
- **Fast Reordering & Wholesale Volume Handling:** Clear volume pricing tiers, minimum order quantities (MOQ), and rapid re-order funnels.
- **Dual Audience Architecture:** Friendly and accessible for individual DIY repairers, yet robust and fast for busy mobile repair shop technicians buying in bulk.

### 1.2 Visual Philosophy
- **Industrial Tech Aesthetic:** Clean, high-contrast surfaces, razor-sharp borders (1px solid), purposeful micro-interactions.
- **Zero Ambiguity:** Stock counts, exact model compatibility badges (e.g., "Fits Vivo Y11 2019 only - NOT 2023 5G"), and price breakdowns are highlighted with high visual hierarchy.
- **Mobile-First Realism:** Over 75% of Indian mobile technicians order directly from workbenches on Android smartphones. Every tap target, sheet, and modal is engineered for thumb ergonomics.

---

## 2. Design Tokens & Core System

### 2.1 Color Palette
The color system is built around deep technical blues and slate neutrals, punctuated by energetic brand blue and high-visibility status accents.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRIMARY BRAND SYSTEM                            │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ Token             │ Hex Code          │ Intended Usage                 │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ --brand-primary   │ #0B3B60           │ Deep Precision Blue (Header,   │
│                   │                   │ Primary Buttons, Brand Logos)  │
│ --brand-primary-h │ #07263F           │ Primary Hover / Pressed        │
│ --brand-accent    │ #0284C7           │ Electric Cyan / Interactive    │
│                   │                   │ Links, Focus Rings, Active Tabs│
│ --brand-accent-bg │ #E0F2FE           │ Subtle interactive background  │
│ --brand-whatsapp  │ #25D366           │ WhatsApp Brand Accent (CTA)    │
│ --brand-whatsapp-h│ #1EBE5B           │ WhatsApp Hover State           │
└───────────────────┴───────────────────┴────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                      NEUTRAL & SURFACE TOKENS                          │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ Token             │ Hex Code          │ Intended Usage                 │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ --bg-base         │ #F8FAFC           │ App Canvas / Page Background   │
│ --bg-surface      │ #FFFFFF           │ Card / Modal / Table Surface   │
│ --bg-subtle       │ #F1F5F9           │ Input fills, secondary buttons │
│ --bg-muted        │ #E2E8F0           │ Disabled backgrounds, dividers │
│ --border-subtle   │ #E2E8F0           │ Card borders, subtle divider   │
│ --border-strong   │ #CBD5E1           │ Input borders, active outlines │
│ --text-primary    │ #0F172A           │ High-contrast headings & text  │
│ --text-secondary  │ #475569           │ Metadata, SKUs, subtitles      │
│ --text-muted      │ #94A3B8           │ Placeholders, inactive icons   │
│ --text-inverse    │ #FFFFFF           │ Text on dark buttons & banners │
└───────────────────┴───────────────────┴────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                      SEMANTIC / STATUS TOKENS                          │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ Token             │ Hex Code          │ Intended Usage                 │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ --status-success  │ #16A34A           │ In Stock, Payment Paid, Live   │
│ --status-success-bg#DCFCE7            │ Badge background: Success      │
│ --status-warning  │ #D97706           │ Low Stock, Pending Manifest    │
│ --status-warning-bg#FEF3C7            │ Badge background: Warning      │
│ --status-error    │ #DC2626           │ Out of stock, Payment Failed   │
│ --status-error-bg │ #FEE2E2           │ Badge background: Destructive  │
│ --status-info     │ #2563EB           │ Shipped with Delhivery, Notice │
│ --status-info-bg  │ #DBEAFE           │ Badge background: Info         │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

### 2.2 Typography
- **Primary Interface Font:** `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif` (Optimal x-height and screen legibility at 12–14px).
- **Monospace Code/Data Font:** `JetBrains Mono`, `Fira Code`, `monospace` (Used for SKUs, AWB Numbers, Order IDs, and Technical Part Specifications).

```
┌─────────────────┬───────────┬──────────────┬─────────────┬─────────────┐
│ Token           │ Font Size │ Line Height  │ Font Weight │ Letter-Spc  │
├─────────────────┼───────────┼──────────────┼─────────────┼─────────────┤
│ --text-xs       │ 11px      │ 16px (1.45)  │ 400 / 600   │ +0.02em     │
│ --text-sm       │ 13px      │ 18px (1.38)  │ 400 / 500   │ normal      │
│ --text-base     │ 15px      │ 22px (1.46)  │ 400 / 500   │ normal      │
│ --text-md       │ 17px      │ 24px (1.41)  │ 500 / 600   │ -0.01em     │
│ --text-lg       │ 20px      │ 28px (1.40)  │ 600         │ -0.015em    │
│ --text-xl       │ 24px      │ 32px (1.33)  │ 600 / 700   │ -0.02em     │
│ --text-2xl      │ 30px      │ 38px (1.26)  │ 700         │ -0.025em    │
│ --text-3xl      │ 38px      │ 46px (1.21)  │ 700 / 800   │ -0.03em     │
└─────────────────┴───────────┴──────────────┴─────────────┴─────────────┘
```

### 2.3 Spacing Scale
Built strictly on a **4px base grid**:
`--space-1`: 4px | `--space-2`: 8px | `--space-3`: 12px | `--space-4`: 16px | `--space-5`: 20px | `--space-6`: 24px | `--space-8`: 32px | `--space-10`: 40px | `--space-12`: 48px | `--space-16`: 64px

### 2.4 Border Radius
`--radius-xs`: 3px (Tags, micro-badges)  
`--radius-sm`: 6px (Input fields, buttons, table cells)  
`--radius-md`: 10px (Product cards, alerts, small modals)  
`--radius-lg`: 16px (Flyout drawers, bottom sheets, large dialogs)  
`--radius-full`: 9999px (Pills, avatar chips, floating badges)  

### 2.5 Shadows & Elevation
- **Elevation 1 (Card Rest):** `0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.05)`
- **Elevation 2 (Card Hover):** `0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.06)`
- **Elevation 3 (Dropdown/Popover):** `0 10px 15px -3px rgb(0 0 0 / 0.12), 0 4px 6px -4px rgb(0 0 0 / 0.08)`
- **Elevation 4 (Modal/Drawer):** `0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.10)`

---

## 3. Core Component Library Specifications

### 3.1 Buttons
- **Primary Action:** Solid `--brand-primary` background, `--text-inverse` typography, 10px radius, 44px min height. Focus ring: 2px offset `--brand-accent`.
- **Secondary Action:** White background with `--border-strong` 1px border, `--text-primary` label. Hover: `--bg-subtle`.
- **WhatsApp Direct Action:** Solid `--brand-whatsapp` background, white label, WhatsApp icon left-aligned. High-priority micro-interaction for rapid technician support.
- **Destructive Action:** Solid `--status-error` or white with red outline for cancellations or deletions.
- **Loading State:** Button disables, keeps exact dimensions, displays spinner or SVG pulse with label "Please wait...".

### 3.2 Form Inputs
- **Height:** 42px (Desktop), 46px (Mobile for ergonomics).
- **Default State:** 1px border `--border-strong`, white background, 6px radius, placeholder in `--text-muted`.
- **Focus State:** Border transitions to `--brand-accent` with 3px subtle outer glow (`rgba(2, 132, 199, 0.15)`).
- **Error State:** Border becomes `--status-error` with validation message displayed beneath in 12px red font.
- **Specialized Inputs:**
  - *Model Selector Dropdown:* Searchable combo-box with Brand grouping (e.g., Apple $\rightarrow$ iPhone 13 Pro $\rightarrow$ Rear Camera Glass).
  - *Quantity Stepper:* Inline `[-] [Count] [+]` input supporting Minimum Order Quantity (MOQ) clamping and step increments (e.g. step=5 for connectors).

### 3.3 Product Card (Storefront & Mobile Grid)
A precision component designed specifically for mobile spare parts:
- **Card Container:** White background, 1px `--border-subtle`, 10px radius, smooth hover elevation lift.
- **Header Badges (Top Left/Right):**
  - Left: Quality Tag (`OEM Quality`, `Original Pull`, `Tested A+ Grade`).
  - Right: Stock Status (`In Stock` in green, or `Only 4 Left` in amber).
- **Image Container:** Aspect ratio 1:1, centered product photography on light gray `#F8FAFC` background. Quick-view hover trigger.
- **Model Compatibility Chip:** High-visibility pill: `Compatible: Realme P4 Lite / 9 Pro 5G`.
- **SKU Tag:** Monospace badge: `SKU: FLX-RMP4-01`.
- **Price Matrix Container:**
  - *Retail / Single Unit Price:* Large bold font (e.g., `₹249`).
  - *Strike-through MRP:* In muted text (e.g., `₹599`).
  - *Configurable Wholesale Tier Trigger:* If wholesale is enabled, shows expandable prompt: `Buy 10+ @ ₹180/pc (Wholesale Slabs ▾)`.
- **Action Tray:**
  - Quantity input + "Add to Cart" button.
  - Secondary icon: "Enquire on WhatsApp" (pre-fills message: *"Hello Abhay Technicals, I want to inquire about SKU FLX-RMP4-01..."*).

### 3.4 Price & Wholesale Tier Presentation (Visibility Architecture)
Because wholesale prices may be restricted to verified technicians, the component supports **three distinct display modes** controlled by a global store setting:
1. **Public Mode:** All tier pricing slabs are visible openly in a mini-table:
   `[1–4 pcs: ₹249] | [5–9 pcs: ₹210] | [10+ pcs: ₹180]`.
2. **Login-Gated Mode:** Product shows single retail price + locked badge:
   `🔒 Login with WhatsApp to reveal Bulk Technician Prices`.
3. **Wholesale Verification Mode:** Customers who are tagged `WHOLESALER` in their profile see the active discounted wholesale price automatically applied to their cart.

### 3.5 Tables (Catalogue & Admin Data Tables)
- Dense layout, sticky header row with subtle shadow on vertical scroll.
- Alternating row zebra background (`#FFFFFF` and `#F8FAFC`).
- High-contrast column headers with sort arrows.
- Inline status badges (Payment: `PAID` in green pill, Shipment: `IN TRANSIT` in blue pill).
- Row actions menu pinned to the right (`View`, `Edit`, `Generate AWB`, `Print Label`).

### 3.6 Modals, Drawers & Sheets
- **Desktop:** Centered modal with backdrop blur (`backdrop-filter: blur(4px); background: rgba(15, 23, 42, 0.4)`).
- **Mobile Storefront / App:** Bottom sheet drawer with grab handle (`40px x 4px` gray bar), draggable to close, supporting one-handed cart reviews.

### 3.7 States (Empty, Loading, Error)
- **Loading State:** Clean SVG skeleton shimmer (`linear-gradient(90deg, #F1F5F9 0%, #E2E8F0 50%, #F1F5F9 100%)`) shaped to mimic product cards, tables, and detail screens.
- **Empty State:** High-resolution vector graphic + actionable prompt (e.g. Cart Empty $\rightarrow$ "Browse Mobile Batteries & Flex Cables" CTA button).
- **Error State:** Clear error explanation with a retry button (`"Could not load tracking details. Check your internet connection or retry."`).

---

## 4. Storefront Screen Specifications (Next.js)

### 4.1 Home Screen
- **Announcement Ticker (Top):** "Pan-India Fast Dispatch via Delhivery | Wholesale Discounts on Bulk Mobile Spares | Same Day Dispatch before 3 PM".
- **Hero Section:** High-impact carousel showcasing hot categories: Premium Display Glasses, Original Batteries, ICs & Stencils, Precision Repair Tools.
- **Brand Quick-Filter Bar:** Horizontal scroll of smartphone logos (Vivo, Oppo, Realme, Xiaomi, Apple, Samsung, OnePlus, Poco, Motorola). Clicking any brand instantly navigates to that brand's compatible spares.
- **Category Grid (20 Primary Categories):** Clean 4x5 or 5x4 tile matrix with iconography and representative photography.
- **Flash Wholesale Deals:** Countdown timer, unit progress bar ("73% claimed"), volume tier indicator.
- **"Why Choose Abhay Technicals" Trust Block:** 100% Tested Spare Parts, Secure Razorpay/Cashfree Gateway, Real-Time Delhivery Tracking, Direct Technician WhatsApp Support.
- **Recent Blog / Repair Guides:** Short previews of technician tutorials (e.g., "OCA Lamination troubleshooting guide for curved screens").

### 4.2 Shop & Category Listing Screen
- **Sidebar Filters (Desktop):**
  - Device Brand (Checkboxes with counts)
  - Specific Model Series (Hierarchical accordion)
  - Part Type (Screen, Battery, Camera Glass, Flex, Connector, IC)
  - Price Range Slider (₹10 to ₹25,000)
  - Availability (In Stock only)
- **Mobile Filter Drawer:** Full-screen slide-over with sticky "Apply Filters" button displaying active count.
- **Sort Dropdown:** Popularity, Newest Arrivals, Price: Low to High, Price: High to Low, Best Wholesale Margin.

### 4.3 Device / Model Listing Screen (Technician Quick-Finder)
- Dedicated route: `/models/{brand-slug}` (e.g., `/models/vivo`).
- Visual grid of smartphone models with thumbnail images.
- Selecting a model (e.g., `Vivo Y11 2019`) lands on a pre-filtered catalogue showing **only parts compatible with that exact phone**:
  `[Vivo Y11 Battery] [Vivo Y11 Charging Port] [Vivo Y11 Display Glass] [Vivo Y11 Speaker]`.

### 4.4 Search Screen
- Global instant predictive search bar.
- Highlights matching keywords, brand names, and SKUs in real time.
- Search result split: Top matched products, matched categories, and matched device models.

### 4.5 Product Details Screen
- **Breadcrumb Navigation:** `Home > Vivo > Y Series > Y11 > Charging Flex`.
- **Media Gallery (Left Column, 50% width on desktop):**
  - High-resolution main image with lens zoom.
  - Multi-angle thumbnails (Front, Back, Connector Pin Close-up).
- **Purchase Section (Right Column, 50% width):**
  - Product Title + Model Compatibility Badge + SKU.
  - Retail Price & MRP with savings percentage.
  - **Interactive Wholesale Slab Table:**
    Clicking a slab (e.g., `10+ units`) automatically sets the stepper to 10 and updates the unit price.
  - Stock Availability Indicator (`12 units left in warehouse`).
  - Quantity Stepper with MOQ validation.
  - Dual CTAs: `[Add to Cart]` (Solid Primary) and `[Buy Now]` (Accent).
  - Direct WhatsApp Action: `Inquire on WhatsApp about this part`.
- **Specifications Table:** Pin Count, Material, Quality Grade, Testing Warranty Terms.
- **Delivery Pincode Checker:** Instant check against Delhivery serviceability API with estimated delivery timeline (e.g., "Estimated delivery in 2–3 days to 110001").
- **Related & Compatible Products:** Cross-sell accessories (e.g., buying a screen suggests B-7000 glue and OCA sheets).

### 4.6 Cart & Wholesale Checkout Funnel
- **Cart Review:**
  - Itemized rows with real-time tier calculation (e.g., "You added 5 more! Your price dropped from ₹249 to ₹210/pc").
  - Free Shipping threshold progress bar ("Add ₹350 more for Free Delhivery Express Shipping").
  - Coupon Code input.
- **Checkout Step 1: Authentication:** If not logged in, seamless WhatsApp OTP modal opens in place without losing cart state.
- **Checkout Step 2: Shipping Address:** Saved address selector + "Add New Address" form with pincode auto-fill for City/State. Optional GSTIN entry for B2B input tax credit.
- **Checkout Step 3: Payment:** Razorpay / Cashfree secure checkout integration (UPI Intent, Google Pay, PhonePe, Cards, NetBanking).
- **Order Confirmation Page:** High-contrast checkmark, order number (`#AT-XXXXX`), downloadable PDF invoice button, and Delhivery tracking tracker.

### 4.7 WhatsApp OTP Authentication Modal
- **Step 1:** Enter 10-digit WhatsApp number with `+91` flag prefix.
- **Step 2:** 6-digit numeric OTP entry with auto-focus inputs, 60s resend timer, and WhatsApp channel confirmation message (*"OTP sent to +91 98765 43210 via WhatsApp"*).
- **Step 3 (New User Only):** Quick Name and Business/Shop Name input to complete profile creation.

### 4.8 Customer Account, Orders & Tracking Screens
- **Dashboard:** Recent orders, default delivery address, saved GSTIN.
- **Order History:** Visual status badges (`Order Placed` $\rightarrow$ `Packed` $\rightarrow$ `Delhivery In Transit` $\rightarrow$ `Delivered`).
- **Order Details View:** Line items, prices, shipping address, invoice download, and real-time Delhivery tracking timeline with timestamped transit hubs.
- **Public Order Tracking (`/track-order`):** Unauthenticated tracker where any customer can enter their Order Number or Mobile Number to view live parcel location.

### 4.9 Content & Legal Pages
- **About Us:** The Abhay Technicals story, wholesale warehouse capabilities, commitment to tested spare quality.
- **Contact Us:** Interactive contact form, warehouse address, Google Map embed, direct support WhatsApp link, operating hours.
- **FAQ:** Categorized accordions (Ordering, Wholesale verification, Delivery timelines, Testing warranties).
- **Policies:** Dedicated SEO-optimized pages for Privacy Policy, Terms & Conditions, Shipping & Delhivery Delivery Policy, and Return/Refund/Testing Policy.

---

## 5. Admin Dashboard UI Specifications (Next.js)

### 5.1 Layout & Navigation Frame
- **Collapsible Left Sidebar:**
  - Header: Abhay Technicals Admin Logo + System Status indicator.
  - Navigation Sections:
    - *Operations:* Dashboard, Orders, Shipments (Delhivery), Inventory.
    - *Catalogue:* Products, Categories, Brands, Device Models, Wholesale Slabs.
    - *Customers & Marketing:* Customers, Coupons, Push Broadcasts, Banners.
    - *Content:* CMS Pages, Blog, FAQs.
    - *System:* Staff Roles, Audit Logs, Settings.
- **Top Bar:** Quick search (Jump to SKU / Order / Customer), Live Pending Order count pill, Notification bell, Admin profile avatar.

### 5.2 Key Admin Screen Views
- **Dashboard / KPIs:**
  - Metric Cards: Today's GMV, Orders Count, Pending Shipments, Low-Stock SKUs.
  - Real-time chart: Hourly order volume and revenue breakdown.
  - Urgent Tasks Widget: "14 Orders awaiting Delhivery Manifest", "5 SKUs below threshold".
- **Product Management:**
  - Multi-tab editor: General Info, Compatibility Mapping (multi-select models), Pricing & Wholesale Slabs, Images (drag-and-drop WebP uploader), Inventory & Weight.
  - Bulk Price/Stock update table for rapid price adjustments across 50+ items at once.
- **Order & Shipment Operations (Delhivery Hub):**
  - Filter orders by status: `New`, `Paid`, `Ready for Dispatch`, `Dispatched`, `RTO/Cancelled`.
  - Batch action: `[Generate Delhivery AWB & Manifest]` (dispatches API request, downloads thermal labels in one aggregated PDF).
  - Detailed modal showing raw Delhivery tracking history.
- **Wholesale Tier Pricing Matrix:**
  - Global slab rule builder: apply percentage or fixed discounts to entire categories (e.g., "All Camera Glasses get 20% off when buying $\ge$ 10 pcs").

---

## 6. Native Android Screen Specifications (Flutter)

### 6.1 Flutter Architecture & Design Patterns
- **Material 3 Foundation:** Customized with Abhay Technicals design tokens.
- **Thumb-Zone Navigation:** All primary actions (Search, Cart, Filter, Buy Now) are situated within the bottom 60% of the screen.
- **Offline Resilience:** Local SQLite / Hive caching for catalogue data so technicians can browse parts even in underground markets with spotty cell connectivity.

### 6.2 Key Screen Flows
1. **Splash Screen:** Clean dark-blue background (`#0B3B60`), animated metallic logo, checks secure token in `flutter_secure_storage`.
2. **WhatsApp Login Flow:** Native bottom sheet with phone input $\rightarrow$ auto-reading SMS/WhatsApp OTP $\rightarrow$ biometric fingerprint option for subsequent logins.
3. **App Home Screen:**
   - App Bar: Brand logo, Barcode scanner icon (scans part SKUs), Wishlist icon, Cart with badge.
   - Search Chip: "Search by phone model (e.g. Vivo Y11)..."
   - Brand Avatar Carousel: Circular brand logos for quick navigation.
   - Infinite scroll product feed with staggered grid layout.
4. **Barcode/QR Scanner Screen:** Uses device camera to scan SKU barcodes from physical part packaging for instant re-ordering.
5. **Native Cart & Checkout:**
   - Bottom-sheet summary with sticky "Pay via UPI / Cards" button.
   - Launches native Razorpay / Cashfree UPI intent sheet (one-tap launch into PhonePe, Google Pay, or Paytm).
6. **Order Timeline View:** Native stepped indicator widget showing real-time courier movement from Delhivery API.
7. **Floating WhatsApp Action:** Bottom-right persistent floating action button (FAB) allowing one-tap direct messaging to Abhay Technicals support desk.

---

## 7. Responsive Breakpoints & Device Adaptation

```
┌───────────────┬────────────────┬────────────────────────────────────────┐
│ Breakpoint    │ Viewport Range │ Layout Strategy                        │
├───────────────┼────────────────┼────────────────────────────────────────┤
│ Mobile (xs)   │ < 640px        │ 1 or 2 columns product grid, bottom    │
│               │                │ app navigation bar, slide-up drawers   │
│ Tablet (sm/md)│ 640px – 1023px │ 3 columns grid, collapsible filter     │
│               │                │ drawer, sticky header                  │
│ Desktop (lg)  │ 1024px – 1279px│ 4 columns grid, persistent sidebar     │
│               │                │ filter, 2-column product details       │
│ Wide (xl/2xl) │ $\ge$ 1280px   │ Max-width 1360px container, 4-5 columns│
│               │                │ grid, expanded data tables in admin    │
└───────────────┴────────────────┴────────────────────────────────────────┘
```

---

## 8. Accessibility & Performance Requirements

### 8.1 Accessibility (WCAG 2.1 AA Compliance)
- **Contrast Ratio:** All body text meets at least 4.5:1 against its background. Headers and large text meet at least 3.0:1.
- **Touch Targets:** All buttons, icons, and interactive elements have a minimum clickable area of 44x44px.
- **Keyboard Navigation:** Logical tab indexing across product grids and checkout inputs, with clear high-contrast focus rings (`2px solid #0284C7`).
- **Screen Reader Support:** All product images carry meaningful `alt` text including brand, model, and part type. Buttons with icons only have `aria-label` tags.

### 8.2 Performance Budgets
- **First Contentful Paint (FCP):** < 1.2 seconds.
- **Largest Contentful Paint (LCP):** < 2.2 seconds.
- **Cumulative Layout Shift (CLS):** < 0.05 (All image containers have fixed aspect-ratio placeholders to prevent layout jank).
- **Asset Optimization:** All product images automatically converted to next-gen WebP format with responsive `srcset` resolutions.

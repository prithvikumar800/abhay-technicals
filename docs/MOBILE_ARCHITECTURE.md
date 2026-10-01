# ABHAY TECHNICALS — Native Android (Flutter) Application Architecture

## 1. Overview & Locked Stack

The **ABHAY TECHNICALS** mobile application is a high-performance, native Android application engineered for mobile phone repair technicians and workshop procurement managers. It communicates directly with the centralized Node.js 20 LTS / Express REST API (`/api/v1/`), sharing identical business logic, models, authentication, and validation contracts with the Customer Web Storefront and Admin Portal.

### Technology Stack
* **Framework:** Flutter 3.10.5
* **Language:** Dart 3.0.5
* **Platform Target:** Native Android (Min SDK 21, Target SDK 34)
* **Design System:** Material 3 with customized Phase 3 technician design tokens:
  - Deep Industrial Navy (`#0B3B60`)
  - Tech Sky Blue (`#0284C7`)
  - Official WhatsApp Green (`#25D366`)
  - Slate Neutral Grayscale (`#F8FAFC` to `#0F172A`)
* **State Management:** Provider pattern (clean separation of concerns, reactive, testable without code-gen overhead)
* **Storage:** OS-backed encrypted storage (`flutter_secure_storage` with Android `EncryptedSharedPreferences`)
* **Backend:** Existing Express REST API (`/api/v1/`) on Node.js 20 LTS / MySQL 8.0 / Prisma ORM

---

## 2. Architectural Hierarchy

The mobile application strictly enforces a unidirectional clean data flow:

```text
┌────────────────────────────────────────────────────────┐
│                      UI Screens                        │
│   (HomeScreen, ModelExplorerScreen, ProductDetail...)  │
└───────────────────────────┬────────────────────────────┘
                            │ User Actions / Events
                            ▼
┌────────────────────────────────────────────────────────┐
│                   State Providers                      │
│ (AuthProvider, CatalogueProvider, CartProvider, etc.)  │
└───────────────────────────┬────────────────────────────┘
                            │ Domain Operations
                            ▼
┌────────────────────────────────────────────────────────┐
│                     Repositories                       │
│ (AuthRepository, CatalogueRepository, CartRepository)  │
└───────────────────────────┬────────────────────────────┘
                            │ Structured DTO Requests
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Central ApiClient                    │
│   (Token Refresh, Auth Headers, Timeout, Network Guard)│
└───────────────────────────┬────────────────────────────┘
                            │ JSON over HTTPS
                            ▼
┌────────────────────────────────────────────────────────┐
│         Existing Express REST API (/api/v1/)          │
└────────────────────────────────────────────────────────┘
```

No UI widget initiates HTTP requests or alters raw persistent storage directly.

---

## 3. Directory & Folder Structure

```text
mobile/
├── lib/
│   ├── core/
│   │   ├── config/
│   │   │   └── app_config.dart          # Environment variables & business constants
│   │   ├── constants/
│   │   │   ├── app_colors.dart          # Phase 3 brand & neutral colors
│   │   │   └── app_typography.dart      # Typographic scale & weights
│   │   ├── network/
│   │   │   ├── api_client.dart          # Centralized REST client with memory token
│   │   │   └── api_endpoints.dart       # REST API endpoint routes
│   │   ├── security/
│   │   │   └── secure_storage_service.dart # OS-backed EncryptedSharedPreferences
│   │   ├── errors/
│   │   │   └── exceptions.dart          # Domain & network exception taxonomy
│   │   └── theme/
│   │       └── app_theme.dart           # Material 3 theme & accessible touch targets
│   │
│   ├── models/
│   │   ├── product.dart                 # Spares, compatibility, MOQ, and tiers
│   │   ├── wholesale_tier.dart          # Quantity discount slabs
│   │   ├── brand.dart                   # Smartphone brands (Vivo, Oppo, etc.)
│   │   ├── device_model.dart            # Handset models (Y11, Note 7 Pro, etc.)
│   │   ├── category.dart                # Categories (Batteries, Flex, Panels...)
│   │   ├── cart_item.dart               # Cart item with MOQ and dynamic pricing
│   │   ├── order.dart                   # Locked-price order history and items
│   │   ├── shipment.dart                # Delhivery 6-stage transit tracking
│   │   └── user.dart                    # Customer profile & delivery addresses
│   │
│   ├── services/
│   │   ├── whatsapp_service.dart        # WhatsApp wa.me link with prefilled enquiry
│   │   └── mock_payment_service.dart    # Isolated payment gateway simulation
│   │
│   ├── repositories/
│   │   ├── auth_repository.dart         # WhatsApp OTP verification & tokens
│   │   ├── catalogue_repository.dart    # Paged products, search, & Model Explorer
│   │   ├── cart_repository.dart         # Cart mutations & sync
│   │   └── order_repository.dart        # Order creation, list, & Delhivery tracking
│   │
│   ├── providers/
│   │   ├── auth_provider.dart           # Auth status & login-gated wholesale access
│   │   ├── catalogue_provider.dart      # Server-side pagination & filter state
│   │   ├── model_explorer_provider.dart # 3-step part finder controller
│   │   ├── cart_provider.dart           # Real-time subtotal & MOQ validation
│   │   └── order_provider.dart          # Orders & active tracking milestones
│   │
│   ├── features/
│   │   ├── auth/screens/                # OTP request & 6-digit verify screens
│   │   ├── home/screens/                # Technician home dashboard
│   │   ├── catalogue/screens/           # Filterable search & product catalog
│   │   ├── product/screens/             # Product details & compatibility badge
│   │   ├── model_explorer/screens/      # 3-step Model Explorer part finder
│   │   ├── cart/screens/                # Cart management & MOQ controls
│   │   ├── checkout/screens/            # Address & Delhivery mock payment flow
│   │   ├── orders/screens/              # Order list & locked invoice detail
│   │   ├── tracking/screens/            # Delhivery 6-stage transit timeline
│   │   ├── wishlist/screens/            # Saved workshop fast-moving spares
│   │   ├── notifications/screens/       # Push notifications UI foundation
│   │   └── account/screens/             # Workshop profile & logout
│   │
│   ├── widgets/
│   │   ├── common_header.dart           # Branded AppBar with WhatsApp & cart badge
│   │   ├── product_card.dart            # Technician card with compatibility & MOQ
│   │   ├── wholesale_price_table.dart   # Login-gated wholesale tier table
│   │   ├── quantity_stepper.dart        # 44px touch targets with MOQ boundary
│   │   ├── error_state_widget.dart      # Customer-safe error feedback
│   │   ├── skeleton_loader.dart         # Shimmer placeholder animations
│   │   └── bottom_nav_bar.dart          # 5-tab thumb-zone navigation bar
│   │
│   └── main.dart                        # MultiProvider app setup & route registry
│
├── test/
│   ├── test_helper.dart                 # Mock HTTP client for fast unit tests
│   ├── api_client_test.dart             # Headers & memory token tests
│   ├── auth_provider_test.dart          # OTP validation & role gating tests
│   ├── cart_provider_test.dart          # MOQ & wholesale pricing calculation tests
│   ├── model_explorer_test.dart         # 3-step handset part finder drilldown
│   ├── product_model_test.dart          # Parsing & pricing slab tests
│   └── widget_test.dart                 # Application widget smoke test
│
└── android/                             # Android native build gradle & manifests
```

---

## 4. Mobile Token Security Architecture

1. **In-Memory Access Tokens:**
   - Short-lived JWT access tokens are held strictly in memory in `ApiClient._accessToken`.
   - Never written to `SharedPreferences`, plaintext files, or SQLite.
   - Cleared on app termination or explicit logout.

2. **Secure OS-Backed Refresh Tokens:**
   - Persisted via `flutter_secure_storage` utilizing Android's `EncryptedSharedPreferences`.
   - Keys are backed by the Android Hardware Keystore where available.
   - Used transparently by `ApiClient._tryRefreshToken()` to renew session upon 401 response.

3. **Production Privacy Safeguards:**
   - No OTPs, JWT tokens, or customer passwords printed in production logs.
   - Generic customer-safe error dialogs without exposing backend stack traces.

---

## 5. Customer Role & Wholesale Pricing (`LOGIN_GATED`)

### Access Control Rules:
* **ADMIN / STAFF Accounts:** Gated from accessing the customer mobile application directly. Backend remains the authoritative policy enforcement point.
* **Guest Users:**
  - Can view retail prices and active sale prices.
  - Wholesale volume discount slabs are hidden with a clear prompt: *"Log in to unlock wholesale slabs"*.
* **Authenticated Technicians:**
  - Upon WhatsApp OTP verification, the active wholesale tiers (e.g., 5+, 10+, 25+ pcs) are revealed.
  - Active qualified tier is highlighted in green (`Applied ✓`).
  - Unit and total prices dynamically update in the cart.
* **Authoritative Recalculation:** The final payable amount is always recalculated by the backend checkout and cart endpoints.

---

## 6. Model Explorer (3-Step Part Finder)

Designed specifically for smartphone repair technicians:
1. **Step 1 — Brand:** Technician chooses the handset maker (Vivo, Oppo, Realme, Xiaomi, Samsung).
2. **Step 2 — Model:** Technician selects the device model (e.g. Vivo Y11 2019).
3. **Step 3 — Compatible Parts:** Only parts strictly tagged with compatibility for that handset are displayed (Battery, Charging Flex, Back Panel, Camera Glass, OCA Polarizer).

---

## 7. Delivery & Tracking (Delhivery Integration)

The application models a 6-stage transit progression for spare parts:
```text
Received ➔ Processing ➔ Manifested ➔ Shipped ➔ Out for Delivery ➔ Delivered
```
- Real backend scan events and tracking URLs are presented when available.
- Free delivery threshold is configured at ₹1499.00 with live shortfall indicator.

---

## 8. Development & Build Instructions

### Prerequisites
* Flutter 3.10.x / Dart 3.0.x
* Android SDK (Platforms 21 through 34)
* Java JDK 17 (bundled in `mobile/.tools/jdk17` or configured via `JAVA_HOME`)

### Running Code Analysis & Test Suite
```bash
cd mobile
flutter pub get
flutter analyze
flutter test
```

### Building the Debug APK
```powershell
cd mobile
$env:JAVA_HOME = "D:\ABHAY TECHNICALS\abhay-technicals\mobile\.tools\jdk17"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
flutter build apk --debug
```
The output APK is generated at:
`mobile/build/app/outputs/flutter-apk/app-debug.apk`.

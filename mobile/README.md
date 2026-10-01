# ABHAY TECHNICALS — Native Android (Flutter) Application

Native Android mobile application foundation for **ABHAY TECHNICALS** spare parts and workshop procurement, built using Flutter & Dart.

## Core Features
- **Centralized REST API Integration:** Reuses the existing Node.js / Express `/api/v1/` endpoints.
- **WhatsApp OTP Authentication:** Secure phone verification, token refresh, and login-gated wholesale access.
- **Model Explorer (3-Step Part Finder):** Brand ➔ Device Model ➔ Compatible Parts with minimal taps.
- **Dynamic Wholesale Tiers:** Quantity discount slabs revealed upon technician login.
- **Technician Cart:** Minimum Order Quantity (MOQ) validation, free shipping progress bar, live tier calculation.
- **Delhivery Tracking:** 6-stage transit progression with scan event timelines.
- **Direct WhatsApp Enquiry:** Prefilled handset SKU and model enquiry message.

---

## Local Development Setup

### 1. Prerequisites
- Flutter SDK (>= 3.10.0)
- Dart SDK (>= 3.0.0)
- Android SDK (API 21 - 34)
- JDK 17 (available locally in `.tools/jdk17` or via system `JAVA_HOME`)

### 2. Install Dependencies
```bash
flutter pub get
```

### 3. Run Static Analysis
```bash
flutter analyze
```

### 4. Run Automated Test Suite
```bash
flutter test
```

### 5. Build Debug APK
```powershell
$env:JAVA_HOME = "D:\ABHAY TECHNICALS\abhay-technicals\mobile\.tools\jdk17"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
flutter build apk --debug
```

### 6. Environment Configurations
Configurable at compile time using `--dart-define`:
```bash
flutter run --dart-define=API_BASE_URL=http://10.0.2.2:5000/api/v1 --dart-define=WHATSAPP_NUMBER=+919876543210
```

---

## Project Architecture & Standards
Refer to [docs/MOBILE_ARCHITECTURE.md](../docs/MOBILE_ARCHITECTURE.md) for full architectural guidelines and design system specifications.

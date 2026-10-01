# ABHAY TECHNICALS — Local Development & Orchestration Guide

This guide describes how to run and orchestrate the entire **ABHAY TECHNICALS** ecosystem locally on your development machine.

---

## 1. System Architecture & Port Allocation

| Component | Technology | Local URL / Port | Directory |
| :--- | :--- | :--- | :--- |
| **Local MySQL** | MySQL 8.2 (Isolated Dev Instance) | `127.0.0.1:3306` (`abhay_technicals_dev`) | `backend/.dev_db/` |
| **Express Backend** | Node.js 20 LTS + TypeScript | `http://localhost:5000/api/v1` | `backend/` |
| **Customer Storefront** | Next.js 14 App Router | `http://localhost:3000` | `web/` |
| **Admin Dashboard** | Next.js 14 App Router | `http://localhost:3001` | `admin/` |
| **Mobile Application** | Flutter / Dart (Android) | Connects to `http://10.0.2.2:5000/api/v1` (Emulator) or `http://localhost:5000/api/v1` (Desktop/Web) | `mobile/` |

---

## 2. Dedicated Local MySQL Setup

The local database runs strictly inside an isolated data directory (`backend/.dev_db/data`) using an explicit config file:

```ini
# backend/.dev_db/my.ini
[mysqld]
basedir = "c:/wamp64/bin/mysql/mysql8.2.0"
datadir = "D:/ABHAY TECHNICALS/abhay-technicals/backend/.dev_db/data"
port = 3306
bind-address = 127.0.0.1
default_authentication_plugin = mysql_native_password
```

### Starting the Database Daemon
Run in PowerShell or CMD:
```bash
c:\wamp64\bin\mysql\mysql8.2.0\bin\mysqld.exe --defaults-file="D:/ABHAY TECHNICALS/abhay-technicals/backend/.dev_db/my.ini" --console
```

### Running Migrations & Seeding
From `backend/`:
```bash
# Push Prisma schema to local database
npx prisma db push

# Populate development seed data
npm run prisma:seed
```

---

## 3. Seed Accounts & Development Credentials

| Role | Phone Number | Dev OTP | Access Level |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `+919999900000` | `123456` | Full Admin Panel access (`ADMIN`) |
| **Operations Staff** | `+919999911111` | `123456` | Product & Order management (`STAFF`) |
| **Technician / B2B** | `+919876543210` | `123456` | Wholesale Tier Pricing & MOQ Access (`CUSTOMER` + Verified B2B) |
| **Retail Customer** | `+919811122233` | `123456` | Retail Pricing (`CUSTOMER`) |

> **Security Note:** Dev OTP (`123456`) is only accepted when `NODE_ENV=development` or `NODE_ENV=test`. In production mode (`NODE_ENV=production`), live cryptographic OTP hashes and WhatsApp cloud APIs are strictly required.

---

## 4. Running Components

### Option A: Using Monorepo Orchestration (Root)

From `D:\ABHAY TECHNICALS\abhay-technicals`:

```bash
# 1. Start Express Backend API (Port 5000)
npm run dev:backend

# 2. In a second terminal, start Customer Web Storefront (Port 3000)
npm run dev:web

# 3. In a third terminal, start Admin Panel (Port 3001)
npm run dev:admin
```

### Option B: Running Individual Services

- **Backend:**
  ```bash
  cd backend
  npm run dev
  ```
- **Web Storefront:**
  ```bash
  cd web
  npm run dev
  ```
- **Admin Panel:**
  ```bash
  cd admin
  npm run dev -- -p 3001
  ```
- **Mobile (Android/Flutter):**
  ```bash
  cd mobile
  flutter run
  ```

---

## 5. Unified Business Constants

- **Free Shipping Threshold:** `₹999.00`
- **Standard Shipping Fee:** `₹49.00`
- **Wholesale Pricing Mode:** `LOGIN_GATED` (guests see retail price; authenticated technicians see volume tiers)
- **Minimum Order Quantity (MOQ):** Authoritatively enforced by backend (e.g., Vivo Y11 Charging Flex requires MOQ = 5).

---

## 6. Running Test Suites

```bash
# Backend Test Suite (36/36 tests passing - Unit + Prisma E2E)
cd backend && npm test

# Web Storefront Tests (13/13 tests passing)
cd web && npm test

# Admin Panel Tests (13/13 tests passing)
cd admin && npm test

# Mobile Test Suite (25/25 tests passing)
cd mobile && flutter test
```

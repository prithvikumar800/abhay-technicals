# Hostinger Setup Guide: darkgreen-goat-677875.hostingersite.com

This guide provides the exact configuration and steps for your temporary Hostinger domain and MySQL database.

---

## 1. Credentials Summary

- **Live URL**: `https://darkgreen-goat-677875.hostingersite.com`
- **Database User**: `u408161253_abhyavbdhw`
- **Database Name**: `u408161253_abhyadbsitesga`
- **Database Host**: `127.0.0.1:3306` (or `localhost:3306`)
- **Prisma Connection String**:
  ```env
  DATABASE_URL="mysql://u408161253_abhyavbdhw:YOUR_PASSWORD@127.0.0.1:3306/u408161253_abhyadbsitesga"
  ```

---

## 2. Environment Files for This Domain

### A. `backend/.env`
```env
NODE_ENV=production
PORT=5000
API_PREFIX=/api/v1
CORS_ORIGIN=https://darkgreen-goat-677875.hostingersite.com,http://localhost:3000,http://localhost:3001

DATABASE_URL="mysql://u408161253_abhyavbdhw:YOUR_PASSWORD@127.0.0.1:3306/u408161253_abhyadbsitesga"

JWT_ACCESS_SECRET=abhay_technicals_live_jwt_access_secure_key_2026_hostinger
JWT_REFRESH_SECRET=abhay_technicals_live_jwt_refresh_secure_key_2026_hostinger
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=30d

# Set to 'false' if live credentials are ready, or 'true' for mock testing
USE_MOCK_PROVIDERS=false

WHATSAPP_API_URL=https://graph.facebook.com/v19.0
WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_meta_system_user_token
WHATSAPP_BUSINESS_ACCOUNT_ID=your_meta_business_account_id

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
```

### B. `web/.env.production`
```env
NEXT_PUBLIC_API_BASE_URL=https://darkgreen-goat-677875.hostingersite.com/api/v1
NEXT_PUBLIC_SITE_URL=https://darkgreen-goat-677875.hostingersite.com
NEXT_PUBLIC_WHATSAPP_SUPPORT_PHONE=917295096715
INTERNAL_API_URL=http://127.0.0.1:5000
```

### C. `admin/.env.production`
```env
NEXT_PUBLIC_API_BASE_URL=https://darkgreen-goat-677875.hostingersite.com/api/v1
NEXT_PUBLIC_APP_NAME="Abhay Technicals Admin"
INTERNAL_API_URL=http://127.0.0.1:5000
```

---

## 3. Deployment Steps on Hostinger

### Step 1: Push Database Schema & Seed Initial Data
You can initialize the database directly from your local machine (if Remote MySQL is enabled in Hostinger hPanel) or on the Hostinger server:

```bash
cd backend

# 1. Update backend/.env with your Hostinger DB password
# 2. Push tables to your Hostinger MySQL database
npx prisma db push

# 3. Seed default product catalogue and Super Admin account
npm run prisma:seed

# 4. Compile backend
npm run build
```

### Step 2: Build the Web Storefront & Admin
```bash
# Build Storefront
cd ../web
npm install
npm run build

# Build Admin
cd ../admin
npm install
npm run build
```

### Step 3: Run with PM2 (Hostinger VPS)
```bash
cd ..
npm install -g pm2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

### Step 4: Configure Nginx Proxy
Point `darkgreen-goat-677875.hostingersite.com` to port 3000:
```nginx
server {
    server_name darkgreen-goat-677875.hostingersite.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
*(Because of the Next.js rewrites in `web/next.config.mjs`, all `/api/v1/*` requests are automatically routed directly to the backend on port 5000!)*

---

## 4. Default Seed Admin Account
- **Phone Number**: `+919999900000`
- **Role**: `SUPER_ADMIN`
- Once logged in, add your real personal phone number in Admin Settings.

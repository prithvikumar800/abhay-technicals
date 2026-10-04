# ABHAY TECHNICALS — Hostinger Live Production Deployment Guide

This guide provides end-to-end instructions for deploying the **ABHAY TECHNICALS** platform (Customer Web Storefront, Admin Dashboard, and Express Backend API) to Hostinger.

---

## 1. Domain & Architecture Setup

| Domain / Subdomain | Target Service | Local Port | Hostinger Nginx / Port |
| :--- | :--- | :--- | :--- |
| `abhaytechnicals.com` *(or `www`)* | Next.js Customer Web Storefront (`web/`) | 3000 | Reverse Proxy to `127.0.0.1:3000` |
| `admin.abhaytechnicals.com` | Next.js Admin Dashboard (`admin/`) | 3001 | Reverse Proxy to `127.0.0.1:3001` |
| `api.abhaytechnicals.com` | Express Backend API (`backend/`) | 5000 | Reverse Proxy to `127.0.0.1:5000` |

---

## 2. Step-by-Step Deployment Instructions

### Step 1: Create MySQL Database in Hostinger
1. Log in to your **Hostinger hPanel**.
2. Navigate to **Databases** > **Management**.
3. Create a new MySQL database:
   - **Database Name**: e.g., `u123456789_abhay_live`
   - **Database Username**: e.g., `u123456789_dbuser`
   - **Password**: `YourStrongDatabasePassword123!`
4. Note your Hostinger MySQL Host (usually `localhost` or `127.0.0.1` for local socket, or an IP provided in hPanel).
5. Your `DATABASE_URL` will be:
   ```env
   DATABASE_URL="mysql://u123456789_dbuser:YourStrongDatabasePassword123!@localhost:3306/u123456789_abhay_live"
   ```

---

### Step 2: Configure Subdomains in Hostinger DNS
1. In hPanel, go to **Domains** > **Subdomains** (or DNS Zone Editor).
2. Create two subdomains:
   - `api` (pointing to `api.yourdomain.com`)
   - `admin` (pointing to `admin.yourdomain.com`)
3. Ensure SSL certificates (Let's Encrypt) are activated for the main domain and both subdomains.

---

### Step 3: Clone Code to Hostinger
Connect to your Hostinger server via SSH:
```bash
# Connect to your server
ssh user@your-server-ip

# Navigate to home or deployment directory
cd /var/www  # or your desired app folder
git clone https://github.com/prithvikumar800/abhay-technicals.git
cd abhay-technicals
```

---

### Step 4: Install Dependencies & Build Services

#### 1. Express Backend
```bash
cd /var/www/abhay-technicals/backend
npm install --production=false
# Push database schema & seed initial admin/catalogue
npx prisma db push
npm run prisma:seed
# Compile TypeScript to JavaScript (dist/server.js)
npm run build
```

#### 2. Customer Web Storefront
```bash
cd /var/www/abhay-technicals/web
npm install
npm run build
```

#### 3. Admin Dashboard
```bash
cd /var/www/abhay-technicals/admin
npm install
npm run build
```

---

### Step 5: Start All Applications using PM2

From the project root (`/var/www/abhay-technicals`):
```bash
# Install PM2 globally if not already installed
npm install -g pm2

# Start all three services (backend, web, admin)
pm2 start ecosystem.config.cjs

# Save PM2 process list so it automatically restarts on server reboot
pm2 save
pm2 startup
```

To monitor your running services:
```bash
pm2 status
pm2 logs
```

---

### Step 6: Configure Nginx Reverse Proxy (Hostinger VPS)

Create or edit your Nginx site configuration (e.g., `/etc/nginx/sites-available/abhaytechnicals.conf`):

```nginx
# 1. Express Backend API (api.abhaytechnicals.com)
server {
    server_name api.abhaytechnicals.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# 2. Customer Storefront (abhaytechnicals.com)
server {
    server_name abhaytechnicals.com www.abhaytechnicals.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# 3. Admin Dashboard (admin.abhaytechnicals.com)
server {
    server_name admin.abhaytechnicals.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the configuration and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/abhaytechnicals.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d abhaytechnicals.com -d www.abhaytechnicals.com -d api.abhaytechnicals.com -d admin.abhaytechnicals.com
```

# Abhay Technicals — Admin Portal

Production Admin Dashboard for the Abhay Technicals mobile spare parts and accessories platform.

## Architecture
- **Framework:** Next.js 14 (App Router) + React 18
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS (Phase 3 Design System Tokens)
- **Deployment:** Standalone build mode for Hostinger Business Hosting
- **Authentication:** Role-protected (`ADMIN`, `STAFF`) via Backend REST API (`/api/v1/auth`) with HttpOnly Cookie token storage.
- **Node.js Target:** Node.js 20 LTS

## Directory Organization
- `src/app/(dashboard)/`: Admin modules (Dashboard, Products, Categories, Brands, Models, Wholesale, Orders, Shipments, Customers, Reviews, CMS, Settings, Audit Logs).
- `src/app/(auth)/`: Administrator login via WhatsApp OTP.
- `src/components/layout/`: Collapsible Sidebar, Topbar, Breadcrumbs.
- `src/components/ui/`: Reusable accessible UI components (Button, Input, Badge, Card, Modal, Table, Toast, Skeleton).
- `src/lib/api-client.ts`: Centralized REST API client using `NEXT_PUBLIC_API_BASE_URL`.
- `src/lib/auth-context.tsx`: Admin session provider and role guard.
- `src/lib/mock-data.ts`: Mock operational data for development when backend services are offline.

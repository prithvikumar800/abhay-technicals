export type AdminRole = 'ADMIN' | 'STAFF';

export interface AdminUser {
  id: string;
  phone: string;
  name: string | null;
  businessName: string | null;
  role: AdminRole;
}

export interface KpiSummary {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  lowStockCount: number;
  pendingOrdersCount: number;
  pendingShipmentsCount: number;
  todayRevenue: number;
}

export interface AdminProduct {
  id: string;
  sku: string;
  slug: string;
  title: string;
  category: { id: number; name: string; slug: string };
  brand: { id: number; name: string; slug: string } | null;
  model: { id: number; name: string; slug: string } | null;
  retailPrice: number;
  salePrice: number | null;
  stockQty: number;
  minOrderQty: number;
  weightGrams: number;
  qualityGrade: string | null;
  isActive: boolean;
  sourceId?: number | null;
  sourceUrl?: string | null;
  images?: Array<{ id?: string; imageUrl: string; isPrimary?: boolean }> | string[];
  wholesaleTiers: { id: string; minQuantity: number; tierPrice: number }[];
  compatibleModels: { id: number; name: string; brandName: string }[];
}

export interface AdminCategory {
  id: number;
  parentId: number | null;
  parentName?: string | null;
  name: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
  productCount: number;
}

export interface AdminBrand {
  id: number;
  name: string;
  slug: string;
  logoUrl: string | null;
  isActive: boolean;
  modelCount: number;
}

export interface AdminDeviceModel {
  id: number;
  brandId: number;
  brandName: string;
  name: string;
  slug: string;
  releaseYear: number | null;
  isActive: boolean;
  productCount: number;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  subtotal: number;
  shippingFee: number;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  orderStatus: 'RECEIVED' | 'PROCESSING' | 'MANIFESTED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  shipmentStatus: string | null;
  awbCode: string | null;
  createdAt: string;
  items: {
    id: string;
    sku: string;
    productTitle: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    tierApplied: string | null;
  }[];
  shippingAddress: {
    name: string;
    phone: string;
    addressLine1: string;
    city: string;
    state: string;
    pincode: string;
    gstin?: string | null;
  };
}

export interface AdminShipment {
  id: string;
  orderNumber: string;
  awbCode: string | null;
  courier: string;
  status: string;
  customerName: string;
  customerPhone: string;
  destinationPincode: string;
  weightGrams: number;
  labelPdfUrl: string | null;
  createdAt: string;
}

export interface AdminCustomer {
  id: string;
  phone: string;
  name: string | null;
  businessName: string | null;
  gstin: string | null;
  role: 'CUSTOMER' | 'WHOLESALER' | 'ADMIN' | 'STAFF';
  totalOrders: number;
  totalSpend: number;
  createdAt: string;
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  actorPhone: string;
  actorRole: string;
  action: string;
  entity: string;
  entityId: string;
  detailsSummary: string;
}

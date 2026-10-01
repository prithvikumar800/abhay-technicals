export type CustomerRole = 'CUSTOMER' | 'WHOLESALER' | 'ADMIN' | 'STAFF';

export interface CustomerUser {
  id: string;
  phone: string;
  name: string | null;
  businessName: string | null;
  gstin: string | null;
  role: CustomerRole;
}

export interface WholesaleTier {
  id: string;
  minQuantity: number;
  tierPrice: number;
}

export interface DeviceModelRef {
  id: number;
  name: string;
  brandName: string;
  slug: string;
}

export interface StorefrontProduct {
  id: string;
  sku: string;
  slug: string;
  title: string;
  description: string;
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
  images: string[];
  compatibleModels: DeviceModelRef[];
  wholesaleTiers?: WholesaleTier[]; // Only returned if authenticated or authorized
  rating?: number;
  reviewCount?: number;
}

export interface StorefrontCategory {
  id: number;
  parentId: number | null;
  name: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
  productCount: number;
  iconName?: string;
}

export interface StorefrontBrand {
  id: number;
  name: string;
  slug: string;
  logoUrl: string | null;
  isActive: boolean;
  modelCount: number;
}

export interface StorefrontDeviceModel {
  id: number;
  brandId: number;
  brandName: string;
  name: string;
  slug: string;
  releaseYear: number | null;
  isActive: boolean;
  productCount: number;
}

export interface CartItem {
  product: StorefrontProduct;
  quantity: number;
  unitPrice: number;
  appliedTier: string | null;
  lineTotal: number;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  totalAmount: number;
  subtotal: number;
  shippingFee: number;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  orderStatus: 'RECEIVED' | 'PROCESSING' | 'MANIFESTED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  awbCode: string | null;
  courier: string | null;
  items: {
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

export interface DeliveryAddress {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

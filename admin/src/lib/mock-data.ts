import {
  KpiSummary,
  AdminProduct,
  AdminCategory,
  AdminBrand,
  AdminDeviceModel,
  AdminOrder,
  AdminShipment,
  AdminCustomer,
  AdminAuditLog,
} from '../types';

export const mockKpis: KpiSummary = {
  totalSales: 284500.0,
  totalOrders: 142,
  totalCustomers: 89,
  totalProducts: 340,
  lowStockCount: 6,
  pendingOrdersCount: 9,
  pendingShipmentsCount: 14,
  todayRevenue: 24650.0,
};

export const mockCategories: AdminCategory[] = [
  { id: 1, parentId: null, name: 'Mobile Batteries', slug: 'battery', sortOrder: 1, isActive: true, productCount: 42 },
  { id: 2, parentId: null, name: 'Camera Glass', slug: 'camera-glass', sortOrder: 2, isActive: true, productCount: 88 },
  { id: 3, parentId: null, name: 'Charging Connectors', slug: 'charging-connectors', sortOrder: 3, isActive: true, productCount: 65 },
  { id: 4, parentId: null, name: 'Charging Flex', slug: 'charging-flex', sortOrder: 4, isActive: true, productCount: 54 },
  { id: 5, parentId: null, name: 'OCA Touch Glass', slug: 'oca-touch-glass', sortOrder: 5, isActive: true, productCount: 38 },
];

export const mockBrands: AdminBrand[] = [
  { id: 1, name: 'Vivo', slug: 'vivo', logoUrl: '/brands/vivo.svg', isActive: true, modelCount: 34 },
  { id: 2, name: 'Realme', slug: 'realme', logoUrl: '/brands/realme.svg', isActive: true, modelCount: 28 },
  { id: 3, name: 'Apple', slug: 'apple', logoUrl: '/brands/apple.svg', isActive: true, modelCount: 22 },
  { id: 4, name: 'Oppo', slug: 'oppo', logoUrl: '/brands/oppo.svg', isActive: true, modelCount: 31 },
];

export const mockModels: AdminDeviceModel[] = [
  { id: 1, brandId: 1, brandName: 'Vivo', name: 'Vivo Y11 2019', slug: 'vivo-y11-2019', releaseYear: 2019, isActive: true, productCount: 18 },
  { id: 2, brandId: 2, brandName: 'Realme', name: 'Realme P4 Lite', slug: 'realme-p4-lite', releaseYear: 2024, isActive: true, productCount: 14 },
  { id: 3, brandId: 3, brandName: 'Apple', name: 'iPhone 6G', slug: 'iphone-6g', releaseYear: 2014, isActive: true, productCount: 24 },
  { id: 4, brandId: 4, brandName: 'Oppo', name: 'Oppo Reno 8 Pro', slug: 'oppo-reno-8-pro', releaseYear: 2022, isActive: true, productCount: 16 },
];

export const mockProducts: AdminProduct[] = [
  {
    id: 'prod-001-bat-ip6g',
    sku: 'BAT-IP6G-01',
    slug: 'iphone-6g-battery-1810mah',
    title: 'iPhone 6G Battery 1810mAh OEM Tested',
    category: { id: 1, name: 'Mobile Batteries', slug: 'battery' },
    brand: { id: 3, name: 'Apple', slug: 'apple' },
    model: { id: 3, name: 'iPhone 6G', slug: 'iphone-6g' },
    retailPrice: 450.0,
    salePrice: 399.0,
    stockQty: 85,
    minOrderQty: 1,
    weightGrams: 80,
    qualityGrade: 'OEM Tested',
    isActive: true,
    wholesaleTiers: [
      { id: 'wt-1', minQuantity: 5, tierPrice: 360.0 },
      { id: 'wt-2', minQuantity: 10, tierPrice: 320.0 },
      { id: 'wt-3', minQuantity: 50, tierPrice: 290.0 },
    ],
    compatibleModels: [
      { id: 3, name: 'iPhone 6G', brandName: 'Apple' },
    ],
  },
  {
    id: 'prod-002-flx-vy11',
    sku: 'FLX-VY11-CC',
    slug: 'vivo-y11-charging-flex-pcb',
    title: 'Vivo Y11 2019 Charging Port Flex Board OEM',
    category: { id: 4, name: 'Charging Flex', slug: 'charging-flex' },
    brand: { id: 1, name: 'Vivo', slug: 'vivo' },
    model: { id: 1, name: 'Vivo Y11 2019', slug: 'vivo-y11-2019' },
    retailPrice: 120.0,
    salePrice: 99.0,
    stockQty: 4, // Low stock trigger
    minOrderQty: 2,
    weightGrams: 30,
    qualityGrade: 'Original Quality',
    isActive: true,
    wholesaleTiers: [
      { id: 'wt-4', minQuantity: 10, tierPrice: 75.0 },
      { id: 'wt-5', minQuantity: 50, tierPrice: 60.0 },
    ],
    compatibleModels: [
      { id: 1, name: 'Vivo Y11 2019', brandName: 'Vivo' },
    ],
  },
];

export const mockOrders: AdminOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'AT-2026-00101',
    customerName: 'Suresh Kumar',
    customerPhone: '+91 98765 43210',
    totalAmount: 3200.0,
    subtotal: 3200.0,
    shippingFee: 0.0,
    paymentStatus: 'PAID',
    orderStatus: 'PROCESSING',
    shipmentStatus: 'MANIFESTED',
    awbCode: 'DELHIVERY_1790101101',
    createdAt: '2026-09-25T08:15:00Z',
    items: [
      {
        id: 'oi-1',
        sku: 'BAT-IP6G-01',
        productTitle: 'iPhone 6G Battery 1810mAh OEM Tested',
        quantity: 10,
        unitPrice: 320.0,
        totalPrice: 3200.0,
        tierApplied: 'Wholesale Tier: 10+ pcs @ ₹320.00',
      },
    ],
    shippingAddress: {
      name: 'Suresh Kumar Mobile Care',
      phone: '+91 98765 43210',
      addressLine1: 'Shop #14, Nehru Place Market',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110019',
      gstin: '07AAAAA0000A1Z5',
    },
  },
  {
    id: 'ord-102',
    orderNumber: 'AT-2026-00102',
    customerName: 'Anil Repairs',
    customerPhone: '+91 97123 45678',
    totalAmount: 798.0,
    subtotal: 798.0,
    shippingFee: 49.0,
    paymentStatus: 'PAID',
    orderStatus: 'RECEIVED',
    shipmentStatus: 'PENDING',
    awbCode: null,
    createdAt: '2026-09-25T09:05:00Z',
    items: [
      {
        id: 'oi-2',
        sku: 'FLX-VY11-CC',
        productTitle: 'Vivo Y11 2019 Charging Port Flex Board OEM',
        quantity: 8,
        unitPrice: 99.0,
        totalPrice: 792.0,
        tierApplied: null,
      },
    ],
    shippingAddress: {
      name: 'Anil Repairs',
      phone: '+91 97123 45678',
      addressLine1: 'G-4, Cell City Complex, Station Road',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302001',
    },
  },
];

export const mockShipments: AdminShipment[] = [
  {
    id: 'ship-1',
    orderNumber: 'AT-2026-00101',
    awbCode: 'DELHIVERY_1790101101',
    courier: 'Delhivery Surface',
    status: 'MANIFESTED',
    customerName: 'Suresh Kumar',
    customerPhone: '+91 98765 43210',
    destinationPincode: '110019',
    weightGrams: 800,
    labelPdfUrl: 'https://mock.delhivery.com/labels/DELHIVERY_1790101101.pdf',
    createdAt: '2026-09-25T08:30:00Z',
  },
];

export const mockCustomers: AdminCustomer[] = [
  {
    id: 'usr-1',
    phone: '+91 98765 43210',
    name: 'Suresh Kumar',
    businessName: 'Suresh Mobile Care',
    gstin: '07AAAAA0000A1Z5',
    role: 'WHOLESALER',
    totalOrders: 18,
    totalSpend: 54200.0,
    createdAt: '2025-04-12',
  },
  {
    id: 'usr-2',
    phone: '+91 97123 45678',
    name: 'Anil Verma',
    businessName: 'Anil Repairs Hub',
    gstin: null,
    role: 'CUSTOMER',
    totalOrders: 3,
    totalSpend: 4150.0,
    createdAt: '2026-08-01',
  },
];

export const mockAuditLogs: AdminAuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-09-25T09:12:00Z',
    actorPhone: '+91 73950 96715',
    actorRole: 'ADMIN',
    action: 'UPDATE_PRODUCT_STOCK',
    entity: 'Product',
    entityId: 'prod-001-bat-ip6g',
    detailsSummary: 'Restocked SKU BAT-IP6G-01 (+50 units)',
  },
  {
    id: 'log-2',
    timestamp: '2026-09-25T08:30:00Z',
    actorPhone: '+91 73950 96715',
    actorRole: 'ADMIN',
    action: 'GENERATE_DELHIVERY_AWB',
    entity: 'Shipment',
    entityId: 'ship-1',
    detailsSummary: 'Assigned AWB DELHIVERY_1790101101 to Order AT-2026-00101',
  },
];

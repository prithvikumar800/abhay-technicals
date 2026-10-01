const fs = require('fs');
const path = require('path');
const data = require('./web/src/lib/catalogue-data.json');

const categories = data.categories.map((c, i) => ({
  id: c.id,
  parentId: null,
  name: c.name,
  slug: c.slug,
  sortOrder: i + 1,
  isActive: true,
  productCount: c.count,
  iconName: c.iconName,
}));

const brands = data.brands.map(b => ({
  id: b.id,
  name: b.name,
  slug: b.slug,
  logoUrl: b.logoUrl,
  isActive: true,
  modelCount: data.products.filter(p => p.brand?.id === b.id).length,
}));

// Build unique models
const modelMap = new Map();
let modelId = 1;
for (const p of data.products) {
  if (p.model && p.brand) {
    const key = p.model.name.toLowerCase();
    if (!modelMap.has(key)) {
      modelMap.set(key, {
        id: modelId++,
        brandId: p.brand.id,
        brandName: p.brand.name,
        name: p.model.name,
        slug: p.model.slug,
        releaseYear: 2022,
        isActive: true,
        productCount: 1,
      });
    } else {
      modelMap.get(key).productCount++;
    }
  }
}
const models = Array.from(modelMap.values()).slice(0, 30);

// Clean product model to match { id: number; name: string; slug: string } | null
const cleanedProducts = data.products.map(p => {
  const model = p.model ? { id: p.model.id, name: p.model.name, slug: p.model.slug } : null;
  return {
    ...p,
    model,
  };
});

const tsContent = `import {
  StorefrontProduct,
  StorefrontCategory,
  StorefrontBrand,
  StorefrontDeviceModel,
  CustomerOrder,
  DeliveryAddress,
} from '../types/index';

export const mockCategories: StorefrontCategory[] = ${JSON.stringify(categories, null, 2)};

export const mockBrands: StorefrontBrand[] = ${JSON.stringify(brands, null, 2)};

export const mockModels: StorefrontDeviceModel[] = ${JSON.stringify(models, null, 2)};

export const mockProducts: StorefrontProduct[] = ${JSON.stringify(cleanedProducts, null, 2)};

export const mockOrders: CustomerOrder[] = [
  {
    id: 'ord-1001',
    orderNumber: 'AT-2026-90412',
    createdAt: '2026-09-24T14:32:00Z',
    totalAmount: 1850.0,
    subtotal: 1750.0,
    shippingFee: 100.0,
    paymentStatus: 'PAID',
    orderStatus: 'SHIPPED',
    awbCode: 'DEL-984128941',
    courier: 'Delhivery Surface',
    items: [
      {
        sku: 'AT-WC-128',
        productTitle: 'Vivo Y83 Charging Flex',
        quantity: 10,
        unitPrice: 50.0,
        totalPrice: 500.0,
        tierApplied: '10+ Pcs Wholesale',
      },
    ],
    shippingAddress: {
      name: 'Abhay Mobile Repairing Center',
      phone: '+91 98765 43210',
      addressLine1: 'Shop #12, Ground Floor, Central Electronics Complex',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302001',
      gstin: '08AAAAA0000A1Z5',
    },
  },
];

export const mockAddresses: DeliveryAddress[] = [
  {
    id: 'addr-1',
    name: 'Abhay Mobile Repairing Center',
    phone: '+91 98765 43210',
    addressLine1: 'Shop #12, Ground Floor, Central Electronics Complex',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001',
    isDefault: true,
  },
];

export const mockSavedAddresses: DeliveryAddress[] = mockAddresses;
`;

fs.writeFileSync(path.join(__dirname, 'web', 'src', 'lib', 'mock-data.ts'), tsContent, 'utf8');
console.log('Successfully regenerated mock-data.ts with exact type signatures!');

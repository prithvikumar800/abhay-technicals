import { PrismaClient, UserRole, UserStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting development database seeding for ABHAY TECHNICALS...');

  // 1. Clean up existing dev data
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.orderStatusHistory.deleteMany();
  await prisma.shipmentTrackingEvent.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderAddress.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productWholesaleTier.deleteMany();
  await prisma.productCompatibility.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productAttribute.deleteMany();
  await prisma.product.deleteMany();
  await prisma.deviceModel.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.userAddress.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.otpVerification.deleteMany();
  await prisma.user.deleteMany();
  await prisma.storeSetting.deleteMany();

  console.log('🧹 Cleaned up previous development records.');

  // 2. Store Settings (Unified Shipping & Wholesale Policy)
  await prisma.storeSetting.createMany({
    data: [
      {
        group: 'shipping',
        key: 'free_shipping_threshold',
        value: '999',
        description: 'Orders with subtotal >= 999 qualify for free Delhivery shipping',
        isPublic: true,
      },
      {
        group: 'shipping',
        key: 'standard_shipping_fee',
        value: '49',
        description: 'Standard flat shipping fee below threshold',
        isPublic: true,
      },
      {
        group: 'wholesale',
        key: 'pricing_mode',
        value: 'LOGIN_GATED',
        description: 'Retail prices for guests; wholesale volume slabs revealed upon authentication',
        isPublic: true,
      },
    ],
  });

  // 3. Seed Users
  const adminUser = await prisma.user.create({
    data: {
      phone: '+919999900000',
      name: 'Abhay Admin (DEV ONLY)',
      businessName: 'Abhay Technicals Headquarters',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });

  const staffUser = await prisma.user.create({
    data: {
      phone: '+919999911111',
      name: 'Abhay Staff (DEV ONLY)',
      role: UserRole.STAFF,
      status: UserStatus.ACTIVE,
    },
  });

  const technicianUser = await prisma.user.create({
    data: {
      phone: '+919876543210',
      name: 'Rajesh Technician (DEV ONLY)',
      businessName: 'Rajesh Mobile Care & Repair Center',
      gstin: '07AABCR1234F1Z9',
      role: UserRole.CUSTOMER,
      status: UserStatus.ACTIVE,
      addresses: {
        create: {
          name: 'Rajesh Kumar',
          phone: '+919876543210',
          addressLine1: 'Shop #14, Gaffar Market, Karol Bagh',
          city: 'New Delhi',
          state: 'Delhi',
          pincode: '110005',
          isDefaultShipping: true,
        },
      },
    },
  });

  const regularCustomer = await prisma.user.create({
    data: {
      phone: '+919811122233',
      name: 'Sunil Verma (DEV ONLY)',
      role: UserRole.CUSTOMER,
      status: UserStatus.ACTIVE,
    },
  });

  console.log(`👤 Seeded 4 development users (Admin, Staff, Technician, Customer).`);

  // 4. Seed Brands
  const brandsData = [
    { name: 'Samsung', slug: 'samsung', logoUrl: '/brands/samsung.svg' },
    { name: 'Xiaomi', slug: 'xiaomi', logoUrl: '/brands/xiaomi.svg' },
    { name: 'Vivo', slug: 'vivo', logoUrl: '/brands/vivo.svg' },
    { name: 'Realme', slug: 'realme', logoUrl: '/brands/realme.svg' },
    { name: 'Oppo', slug: 'oppo', logoUrl: '/brands/oppo.svg' },
    { name: 'Apple', slug: 'apple', logoUrl: '/brands/apple.svg' },
  ];

  const brandMap = new Map<string, number>();
  for (const b of brandsData) {
    const created = await prisma.brand.create({ data: b });
    brandMap.set(b.slug, created.id);
  }
  console.log(`🏷️  Seeded ${brandsData.length} mobile handset brands.`);

  // 5. Seed Device Models
  const modelsData = [
    // Samsung
    { brandSlug: 'samsung', name: 'Galaxy M31', slug: 'samsung-galaxy-m31', releaseYear: 2020 },
    { brandSlug: 'samsung', name: 'Galaxy A51', slug: 'samsung-galaxy-a51', releaseYear: 2020 },
    { brandSlug: 'samsung', name: 'Galaxy Note 10 Lite', slug: 'samsung-galaxy-note-10-lite', releaseYear: 2020 },
    // Xiaomi
    { brandSlug: 'xiaomi', name: 'Redmi Note 10 Pro', slug: 'redmi-note-10-pro', releaseYear: 2021 },
    { brandSlug: 'xiaomi', name: 'Redmi 9 Power', slug: 'redmi-9-power', releaseYear: 2020 },
    { brandSlug: 'xiaomi', name: 'Mi 11X', slug: 'mi-11x', releaseYear: 2021 },
    // Vivo
    { brandSlug: 'vivo', name: 'Vivo Y11 2019', slug: 'vivo-y11-2019', releaseYear: 2019 },
    { brandSlug: 'vivo', name: 'Vivo V20', slug: 'vivo-v20', releaseYear: 2020 },
    { brandSlug: 'vivo', name: 'Vivo Y20', slug: 'vivo-y20', releaseYear: 2020 },
    // Realme
    { brandSlug: 'realme', name: 'Realme 7', slug: 'realme-7', releaseYear: 2020 },
    { brandSlug: 'realme', name: 'Realme 8 Pro', slug: 'realme-8-pro', releaseYear: 2021 },
    { brandSlug: 'realme', name: 'Realme Narzo 20', slug: 'realme-narzo-20', releaseYear: 2020 },
    // Oppo
    { brandSlug: 'oppo', name: 'Oppo A53', slug: 'oppo-a53', releaseYear: 2020 },
    { brandSlug: 'oppo', name: 'Oppo Reno 5 Pro', slug: 'oppo-reno-5-pro', releaseYear: 2021 },
    // Apple
    { brandSlug: 'apple', name: 'iPhone 6G', slug: 'iphone-6g', releaseYear: 2014 },
    { brandSlug: 'apple', name: 'iPhone 11', slug: 'iphone-11', releaseYear: 2019 },
    { brandSlug: 'apple', name: 'iPhone 12', slug: 'iphone-12', releaseYear: 2020 },
  ];

  const modelMap = new Map<string, number>();
  for (const m of modelsData) {
    const brandId = brandMap.get(m.brandSlug)!;
    const created = await prisma.deviceModel.create({
      data: {
        brandId,
        name: m.name,
        slug: m.slug,
        releaseYear: m.releaseYear,
        isActive: true,
      },
    });
    modelMap.set(m.slug, created.id);
  }
  console.log(`📱 Seeded ${modelsData.length} device models.`);

  // 6. Seed Categories
  const categoriesData = [
    { name: 'Display', slug: 'display', sortOrder: 1 },
    { name: 'Battery', slug: 'battery', sortOrder: 2 },
    { name: 'Charging Flex', slug: 'charging-flex', sortOrder: 3 },
    { name: 'Back Panel', slug: 'back-panel', sortOrder: 4 },
    { name: 'Camera Glass', slug: 'camera-glass', sortOrder: 5 },
    { name: 'Speaker', slug: 'speaker', sortOrder: 6 },
    { name: 'OCA Glass', slug: 'oca-glass', sortOrder: 7 },
    { name: 'Repair Tools', slug: 'repair-tools', sortOrder: 8 },
  ];

  const categoryMap = new Map<string, number>();
  for (const c of categoriesData) {
    const created = await prisma.category.create({
      data: {
        name: c.name,
        slug: c.slug,
        sortOrder: c.sortOrder,
        isActive: true,
      },
    });
    categoryMap.set(c.slug, created.id);
  }
  console.log(`📂 Seeded ${categoriesData.length} spare parts categories.`);

  // 7. Seed Realistic Development Products
  const productsData = [
    {
      sku: 'DISP-SAM-M31-01',
      slug: 'samsung-m31-display-combo-original',
      title: 'Samsung Galaxy M31 Display Combo (OG Quality) [DEV ONLY]',
      description: 'Original equipment specification Super AMOLED display combo touch assembly for Samsung M31. 100% tested with frame.',
      categorySlug: 'display',
      brandSlug: 'samsung',
      modelSlug: 'samsung-galaxy-m31',
      retailPrice: 2200.0,
      salePrice: 1950.0,
      minOrderQty: 1,
      stockQty: 45,
      weightGrams: 160,
      qualityGrade: 'Original Quality',
      compatibleModelSlugs: ['samsung-galaxy-m31', 'samsung-galaxy-a51'],
      wholesaleTiers: [
        { minQuantity: 5, tierPrice: 1800.0 },
        { minQuantity: 10, tierPrice: 1700.0 },
        { minQuantity: 25, tierPrice: 1600.0 },
      ],
      images: [{ imageUrl: '/uploads/products/disp-sam-m31.webp', isPrimary: true }],
    },
    {
      sku: 'BAT-IP6G-01',
      slug: 'iphone-6g-battery-1810mah',
      title: 'iPhone 6G Battery 1810mAh High Capacity OEM [DEV ONLY]',
      description: 'Zero-cycle replacement battery for Apple iPhone 6G. Integrated TI safety chipset preventing overvoltage.',
      categorySlug: 'battery',
      brandSlug: 'apple',
      modelSlug: 'iphone-6g',
      retailPrice: 450.0,
      salePrice: 399.0,
      minOrderQty: 2,
      stockQty: 80,
      weightGrams: 75,
      qualityGrade: 'OEM Tested',
      compatibleModelSlugs: ['iphone-6g'],
      wholesaleTiers: [
        { minQuantity: 5, tierPrice: 360.0 },
        { minQuantity: 10, tierPrice: 320.0 },
        { minQuantity: 50, tierPrice: 290.0 },
      ],
      images: [{ imageUrl: '/uploads/products/bat-ip6g.webp', isPrimary: true }],
    },
    {
      sku: 'FLX-VY11-CC',
      slug: 'vivo-y11-charging-flex-board',
      title: 'Vivo Y11 2019 Charging Sub-Board Flex PCB [DEV ONLY]',
      description: 'Complete charging connector sub-board flex including microphone and fast charge IC line for Vivo Y11.',
      categorySlug: 'charging-flex',
      brandSlug: 'vivo',
      modelSlug: 'vivo-y11-2019',
      retailPrice: 120.0,
      salePrice: 99.0,
      minOrderQty: 5, // Strict MOQ = 5 test item!
      stockQty: 150,
      weightGrams: 25,
      qualityGrade: 'Original Pull',
      compatibleModelSlugs: ['vivo-y11-2019', 'vivo-y20'],
      wholesaleTiers: [
        { minQuantity: 5, tierPrice: 85.0 },
        { minQuantity: 10, tierPrice: 75.0 },
        { minQuantity: 50, tierPrice: 60.0 },
      ],
      images: [{ imageUrl: '/uploads/products/flx-vy11.webp', isPrimary: true }],
    },
    {
      sku: 'OCA-XIA-RN10-01',
      slug: 'redmi-note-10-pro-oca-glass',
      title: 'Redmi Note 10 Pro Mitsubishi OCA Front Glass Sheet [DEV ONLY]',
      description: 'Premium Mitsubishi 250um optical clear adhesive front outer touch replacement glass with oleophobic coating.',
      categorySlug: 'oca-glass',
      brandSlug: 'xiaomi',
      modelSlug: 'redmi-note-10-pro',
      retailPrice: 150.0,
      salePrice: 120.0,
      minOrderQty: 5,
      stockQty: 200,
      weightGrams: 40,
      qualityGrade: 'Mitsubishi Grade A',
      compatibleModelSlugs: ['redmi-note-10-pro', 'mi-11x'],
      wholesaleTiers: [
        { minQuantity: 10, tierPrice: 95.0 },
        { minQuantity: 25, tierPrice: 80.0 },
        { minQuantity: 100, tierPrice: 65.0 },
      ],
      images: [{ imageUrl: '/uploads/products/oca-rn10.webp', isPrimary: true }],
    },
    {
      sku: 'CAM-OPP-A53-01',
      slug: 'oppo-a53-rear-camera-glass-lens',
      title: 'Oppo A53 Back Camera Glass Lens Cover with Adhesive [DEV ONLY]',
      description: 'Scratch-resistant tempered rear camera glass protector lens with pre-cut 3M frame adhesive.',
      categorySlug: 'camera-glass',
      brandSlug: 'oppo',
      modelSlug: 'oppo-a53',
      retailPrice: 80.0,
      salePrice: 65.0,
      minOrderQty: 2,
      stockQty: 110,
      weightGrams: 15,
      qualityGrade: 'OEM Tested',
      compatibleModelSlugs: ['oppo-a53', 'realme-7'],
      wholesaleTiers: [
        { minQuantity: 10, tierPrice: 45.0 },
        { minQuantity: 50, tierPrice: 35.0 },
      ],
      images: [{ imageUrl: '/uploads/products/cam-opp-a53.webp', isPrimary: true }],
    },
    {
      sku: 'TOOL-HOT-AIR-858D',
      slug: '858d-smd-hot-air-rework-station',
      title: '858D Digital SMD Hot Air Rework Station for Mobile ICs [DEV ONLY]',
      description: '700W microcomputer controlled brushless heat gun station for motherboard BGA reballing and connector soldering.',
      categorySlug: 'repair-tools',
      brandSlug: 'samsung', // Assigned to Samsung brand for tool filter demo
      retailPrice: 2800.0,
      salePrice: 2450.0,
      minOrderQty: 1,
      stockQty: 18,
      weightGrams: 1800,
      qualityGrade: 'Professional Tech Grade',
      wholesaleTiers: [
        { minQuantity: 3, tierPrice: 2200.0 },
        { minQuantity: 5, tierPrice: 2050.0 },
      ],
      images: [{ imageUrl: '/uploads/products/tool-858d.webp', isPrimary: true }],
    },
  ];

  for (const p of productsData) {
    const categoryId = categoryMap.get(p.categorySlug)!;
    const brandId = p.brandSlug ? brandMap.get(p.brandSlug) : undefined;
    const modelId = p.modelSlug ? modelMap.get(p.modelSlug) : undefined;

    const compatibleModelIds = p.compatibleModelSlugs
      ? p.compatibleModelSlugs.map((s) => modelMap.get(s)!).filter(Boolean)
      : [];

    await prisma.product.create({
      data: {
        sku: p.sku,
        slug: p.slug,
        title: p.title,
        description: p.description,
        categoryId,
        brandId,
        modelId,
        retailPrice: p.retailPrice,
        salePrice: p.salePrice,
        minOrderQty: p.minOrderQty,
        stockQty: p.stockQty,
        weightGrams: p.weightGrams,
        qualityGrade: p.qualityGrade,
        isActive: true,
        images: {
          create: p.images.map((img, idx) => ({
            imageUrl: img.imageUrl,
            isPrimary: img.isPrimary,
            sortOrder: idx,
          })),
        },
        wholesaleTiers: {
          create: p.wholesaleTiers.map((t) => ({
            minQuantity: t.minQuantity,
            tierPrice: t.tierPrice,
          })),
        },
        compatibilities: compatibleModelIds.length
          ? {
              create: compatibleModelIds.map((mId) => ({
                modelId: mId,
              })),
            }
          : undefined,
      },
    });
  }

  console.log(`📦 Seeded ${productsData.length} realistic mobile spare parts with wholesale slabs and MOQ limits.`);
  console.log('✅ Development database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

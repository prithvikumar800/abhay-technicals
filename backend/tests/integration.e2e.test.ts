import { describe, it, beforeAll, afterAll } from 'vitest';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/server.js';
import { prisma } from '../src/lib/prisma.js';

describe('ABHAY TECHNICALS — Full Integration & End-to-End Orchestration Suite', () => {
  let app: any;
  let adminToken: string;
  let technicianToken: string;
  let customerToken: string;
  let createdProductId: string;
  let createdProductSlug: string;
  let testAwbCode: string;

  beforeAll(async () => {
    process.env.NODE_ENV = 'development';
    process.env.DATABASE_URL = 'mysql://root:@127.0.0.1:3306/abhay_technicals_dev';
    app = createApp();

    // Generate JWT tokens for test roles using jsonwebtoken directly
    const jwt = (await import('jsonwebtoken')).default;
    const { env } = await import('../src/config/env.js');

    const adminUser = await prisma.user.findUnique({ where: { phone: '+919999900000' } });
    if (adminUser) {
      adminToken = jwt.sign(
        { userId: adminUser.id, phone: adminUser.phone, role: adminUser.role },
        env.JWT_ACCESS_SECRET,
        { expiresIn: '1h' }
      );
    }

    const techUser = await prisma.user.findUnique({ where: { phone: '+919876543210' } });
    if (techUser) {
      technicianToken = jwt.sign(
        { userId: techUser.id, phone: techUser.phone, role: techUser.role },
        env.JWT_ACCESS_SECRET,
        { expiresIn: '1h' }
      );
    }

    const custUser = await prisma.user.findUnique({ where: { phone: '+919811122233' } });
    if (custUser) {
      customerToken = jwt.sign(
        { userId: custUser.id, phone: custUser.phone, role: custUser.role },
        env.JWT_ACCESS_SECRET,
        { expiresIn: '1h' }
      );
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  // --------------------------------------------------------------------------
  // 1. Local Database & Seed Data Verification
  // --------------------------------------------------------------------------
  describe('1. Local Database & Seed Data Verification', () => {
    it('should have all seed brands, models, and categories in MySQL', async () => {
      const [brandsCount, modelsCount, categoriesCount, productsCount] = await Promise.all([
        prisma.brand.count(),
        prisma.deviceModel.count(),
        prisma.category.count(),
        prisma.product.count({ where: { isActive: true } }),
      ]);

      assert.ok(brandsCount >= 6, `Expected at least 6 brands, got ${brandsCount}`);
      assert.ok(modelsCount >= 10, `Expected at least 10 device models, got ${modelsCount}`);
      assert.ok(categoriesCount >= 8, `Expected at least 8 categories, got ${categoriesCount}`);
      assert.ok(productsCount >= 6, `Expected at least 6 products, got ${productsCount}`);
    });
  });

  // --------------------------------------------------------------------------
  // 2. Admin Panel -> Database Product Creation & Retrieval
  // --------------------------------------------------------------------------
  describe('2. Admin Product Management -> Database -> Catalogue API', () => {
    it('should require ADMIN role to create products', async () => {
      const res = await request(app)
        .post('/api/v1/admin/products')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ title: 'Unauthorized Product' });

      assert.strictEqual(res.status, 403);
    });

    it('should create a new spare part with wholesale slabs in MySQL via Admin API', async () => {
      const newSku = `TEST-OCA-${Date.now().toString().slice(-4)}`;
      const newSlug = `test-oca-glass-${Date.now()}`;

      // Find Samsung brand and M31 model
      const samsung = await prisma.brand.findUnique({ where: { slug: 'samsung' } });
      const m31 = await prisma.deviceModel.findUnique({ where: { slug: 'samsung-galaxy-m31' } });
      const ocaCategory = await prisma.category.findUnique({ where: { slug: 'oca-glass' } });

      assert.ok(samsung && m31 && ocaCategory, 'Prerequisites should exist');

      const payload = {
        sku: newSku,
        slug: newSlug,
        title: 'Samsung M31 Polarized OCA Glass (E2E Test Part)',
        description: 'High-purity OCA lamination glass sheet for technician refurbishment testing.',
        categoryId: ocaCategory.id,
        brandId: samsung.id,
        modelId: m31.id,
        retailPrice: 160.0,
        salePrice: 140.0,
        minOrderQty: 5, // Strict MOQ = 5
        stockQty: 75,
        weightGrams: 35,
        qualityGrade: 'Grade A Refurb',
        compatibleModelIds: [m31.id],
        wholesaleTiers: [
          { minQuantity: 5, tierPrice: 120.0 },
          { minQuantity: 10, tierPrice: 105.0 },
          { minQuantity: 25, tierPrice: 90.0 },
        ],
      };

      const res = await request(app)
        .post('/api/v1/admin/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(payload);

      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.sku, newSku);
      assert.strictEqual(res.body.data.minOrderQty, 5);

      createdProductId = res.body.data.id;
      createdProductSlug = newSlug;

      // Verify product is now in MySQL
      const dbProduct = await prisma.product.findUnique({
        where: { id: createdProductId },
        include: { wholesaleTiers: true, compatibilities: true },
      });

      assert.ok(dbProduct, 'Product must be found directly in MySQL');
      assert.strictEqual(dbProduct.wholesaleTiers.length, 3);
      assert.strictEqual(dbProduct.compatibilities.length, 1);
    });

    it('should immediately retrieve the newly created product through Public Catalogue API', async () => {
      const res = await request(app).get(`/api/v1/products/${createdProductSlug}`);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.sku, res.body.data.sku.toUpperCase());
      assert.strictEqual(res.body.data.minOrderQty, 5);
      assert.strictEqual(res.body.data.stockQty, 75);
    });
  });

  // --------------------------------------------------------------------------
  // 3. API -> Web & Android Catalogue Alignment
  // --------------------------------------------------------------------------
  describe('3. Cross-Platform Catalogue & Model Explorer Alignment', () => {
    it('should return categories list with correct sorting', async () => {
      const res = await request(app).get('/api/v1/categories');
      assert.strictEqual(res.status, 200);
      assert.ok(Array.isArray(res.body.data));
      assert.ok(res.body.data.some((c: any) => c.slug === 'display'));
      assert.ok(res.body.data.some((c: any) => c.slug === 'battery'));
    });

    it('should return handset brands with model counts for Model Explorer', async () => {
      const res = await request(app).get('/api/v1/brands');
      assert.strictEqual(res.status, 200);
      assert.ok(Array.isArray(res.body.data));
      assert.ok(res.body.data.some((b: any) => b.slug === 'samsung'));
      assert.ok(res.body.data.some((b: any) => b.slug === 'xiaomi'));
    });

    it('should return models for a selected brand (Step 2 of Model Explorer)', async () => {
      const samsung = await prisma.brand.findUnique({ where: { slug: 'samsung' } });
      const res = await request(app).get(`/api/v1/brands/${samsung!.id}/models`);
      assert.strictEqual(res.status, 200);
      assert.ok(Array.isArray(res.body.data));
      assert.ok(res.body.data.some((m: any) => m.slug === 'samsung-galaxy-m31'));
    });
  });

  // --------------------------------------------------------------------------
  // 4. WhatsApp OTP Authentication Flow
  // --------------------------------------------------------------------------
  describe('4. Authentication & Role Gating E2E', () => {
    const testPhone = '+919988776655';

    it('should reject invalid phone numbers', async () => {
      const res = await request(app).post('/api/v1/auth/request-otp').send({ phone: '123' });
      assert.strictEqual(res.status, 422);
    });

    it('should request an OTP and record an active session', async () => {
      const res = await request(app).post('/api/v1/auth/request-otp').send({ phone: testPhone });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
    });

    it('should reject an incorrect OTP code', async () => {
      const res = await request(app)
        .post('/api/v1/auth/verify-otp')
        .send({ phone: testPhone, otp: '000000' });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.error.code, 'INVALID_OTP');
    });

    it('should verify with correct dev OTP and return access and refresh tokens', async () => {
      // In dev mode with MockWhatsAppProvider, default OTP is '123456'
      const res = await request(app)
        .post('/api/v1/auth/verify-otp')
        .send({ phone: testPhone, otp: '123456' });

      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.ok(res.body.data.accessToken, 'Access token must be returned');
      assert.ok(res.body.data.refreshToken, 'Refresh token must be returned');
      assert.strictEqual(res.body.data.user.role, 'CUSTOMER');
    });
  });

  // --------------------------------------------------------------------------
  // 5. Wholesale Pricing Slabs (LOGIN_GATED)
  // --------------------------------------------------------------------------
  describe('5. LOGIN_GATED Wholesale Pricing Verification', () => {
    it('should hide wholesale tiers from guest unauthenticated requests', async () => {
      const res = await request(app).get(`/api/v1/products/${createdProductSlug}`);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.data.wholesalePricingEnabled, false);
      assert.strictEqual(res.body.data.wholesaleTiers, undefined);
      assert.strictEqual(res.body.data.loginRequiredForWholesale, true);
    });

    it('should reveal wholesale tiers to authenticated technicians', async () => {
      const res = await request(app)
        .get(`/api/v1/products/${createdProductSlug}`)
        .set('Authorization', `Bearer ${technicianToken}`);

      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.data.wholesalePricingEnabled, true);
      assert.ok(Array.isArray(res.body.data.wholesaleTiers));
      assert.strictEqual(res.body.data.wholesaleTiers.length, 3);
      assert.strictEqual(res.body.data.loginRequiredForWholesale, false);
    });
  });

  // --------------------------------------------------------------------------
  // 6. Minimum Order Quantity (MOQ) Backend Enforcement
  // --------------------------------------------------------------------------
  describe('6. Minimum Order Quantity (MOQ) Strict Backend Validation', () => {
    it('should reject adding item when quantity is below MOQ (e.g. qty 1, 2, 4 for MOQ 5)', async () => {
      for (const qty of [1, 2, 4]) {
        const res = await request(app)
          .post('/api/v1/cart/items')
          .set('Authorization', `Bearer ${technicianToken}`)
          .send({ productId: createdProductId, quantity: qty });

        assert.strictEqual(res.status, 400);
        assert.strictEqual(res.body.error.code, 'MIN_ORDER_QTY_NOT_MET');
      }
    });

    it('should accept adding item when quantity meets or exceeds MOQ (qty 5 and 10)', async () => {
      // Add 5 units (satisfies MOQ = 5, activates Tier 1 @ ₹120/pc)
      const res = await request(app)
        .post('/api/v1/cart/items')
        .set('Authorization', `Bearer ${technicianToken}`)
        .send({ productId: createdProductId, quantity: 5 });

      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.success, true);

      const item = res.body.data.items.find((i: any) => i.productId === createdProductId);
      assert.ok(item, 'Item must be in cart');
      assert.strictEqual(item.quantity, 5);
      // Backend must calculate wholesale tier unit price ₹120.00
      assert.strictEqual(item.unitPrice, 120.0);
      assert.strictEqual(item.lineTotal, 600.0);
    });
  });

  // --------------------------------------------------------------------------
  // 7. Cart Recalculation & Free Shipping Threshold
  // --------------------------------------------------------------------------
  describe('7. Cart Pricing Authority & Unified ₹999 Shipping Threshold', () => {
    it('should apply ₹49 standard shipping fee when subtotal is below ₹999', async () => {
      const res = await request(app)
        .get('/api/v1/cart')
        .set('Authorization', `Bearer ${technicianToken}`);

      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.data.subtotal, 600.0);
      assert.strictEqual(res.body.data.freeShippingEligible, false);
    });

    it('should automatically unlock free shipping when subtotal reaches ₹999 or more', async () => {
      // Add 5 more units -> total 10 units @ ₹105 (Tier 2) = ₹1,050.00 >= ₹999.00
      const res = await request(app)
        .post('/api/v1/cart/items')
        .set('Authorization', `Bearer ${technicianToken}`)
        .send({ productId: createdProductId, quantity: 5 });

      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.data.subtotal, 1050.0);
      assert.strictEqual(res.body.data.freeShippingEligible, true);
    });
  });

  // --------------------------------------------------------------------------
  // 8. Checkout & Order Lifecycle E2E
  // --------------------------------------------------------------------------
  describe('8. Checkout -> Order Creation -> Admin Management -> Tracking', () => {
    let createdOrderId: string;
    let createdOrderNumber: string;

    it('should validate checkout with a serviceable Indian pincode', async () => {
      const res = await request(app)
        .post('/api/v1/checkout/validate')
        .set('Authorization', `Bearer ${technicianToken}`)
        .send({ shippingPincode: '110005' });

      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.data.isValid, true);
      assert.strictEqual(res.body.data.shipping.isServiceable, true);
      // Subtotal ₹1050 >= 999 -> shipping fee is 0.00
      assert.strictEqual(res.body.data.pricingSummary.shippingFee, 0.0);
      assert.strictEqual(res.body.data.pricingSummary.totalPayable, 1050.0);
    });

    it('should place an order and create immutable price snapshot in MySQL', async () => {
      const res = await request(app)
        .post('/api/v1/orders')
        .set('Authorization', `Bearer ${technicianToken}`)
        .send({
          shippingPincode: '110005',
          customerNotes: 'Please pack in double bubble-wrap for technician shop testing',
          address: {
            name: 'Rajesh Technician',
            phone: '+919876543210',
            addressLine1: 'Shop #14, Gaffar Market',
            city: 'New Delhi',
            state: 'Delhi',
            pincode: '110005',
          },
        });

      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.success, true);
      assert.ok(res.body.data.id, 'Order ID must exist');
      assert.ok(res.body.data.orderNumber, 'Order Number must exist');
      assert.strictEqual(Number(res.body.data.totalAmount), 1050.0);
      assert.strictEqual(Number(res.body.data.shippingFee), 0.0);

      createdOrderId = res.body.data.id;
      createdOrderNumber = res.body.data.orderNumber;
      testAwbCode = res.body.data.shipment.awbCode;

      assert.ok(testAwbCode, 'AWB code must be generated');

      // Verify the user cart has been cleared
      const cartRes = await request(app)
        .get('/api/v1/cart')
        .set('Authorization', `Bearer ${technicianToken}`);
      assert.strictEqual(cartRes.body.data.items.length, 0);
    });

    it('should display the new order in Admin Panel orders list with full details', async () => {
      const res = await request(app)
        .get('/api/v1/admin/orders')
        .set('Authorization', `Bearer ${adminToken}`);

      assert.strictEqual(res.status, 200);
      assert.ok(Array.isArray(res.body.data));
      const order = res.body.data.find((o: any) => o.id === createdOrderId);
      assert.ok(order, 'Newly placed order must be visible in admin orders query');
      assert.strictEqual(order.orderNumber, createdOrderNumber);
      assert.strictEqual(order.orderStatus, 'RECEIVED');
      assert.strictEqual(order.paymentStatus, 'PAID');
    });

    it('should allow customer and public to track Delhivery shipment milestones via AWB', async () => {
      const res = await request(app).get(`/api/v1/shipments/track/${testAwbCode}`);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.awbCode, testAwbCode);
      assert.ok(Array.isArray(res.body.data.trackingEvents));
      assert.ok(res.body.data.trackingEvents.length >= 2);
    });
  });
});

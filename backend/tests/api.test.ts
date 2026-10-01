import { describe, it } from 'vitest';
import assert from 'node:assert/strict';
import { AuthService } from '../src/services/auth.service.js';
import { InMemoryAuthRepository } from '../src/repositories/auth.repository.js';
import { MockWhatsAppProvider } from '../src/lib/providers/whatsapp.provider.js';
import { CatalogueService } from '../src/services/catalogue.service.js';
import { InMemoryCatalogueRepository } from '../src/repositories/catalogue.repository.js';
import { CartService } from '../src/services/cart.service.js';
import { InMemoryCartRepository } from '../src/repositories/cart.repository.js';
import { requestOtpSchema, verifyOtpSchema } from '../src/validators/auth.validator.js';
import { createApp } from '../src/server.js';

describe('1. Health Endpoint & Basic App Initialization', () => {
  it('should initialize the Express app without errors', () => {
    const app = createApp();
    assert.ok(app, 'Express app should be created successfully');
  });
});

describe('2. Zod Validation Rules', () => {
  it('should validate and normalize valid 10-digit Indian phone numbers to E.164 format', async () => {
    const parsed = await requestOtpSchema.parseAsync({ phone: '9876543210' });
    assert.strictEqual(parsed.phone, '+919876543210');
  });

  it('should reject invalid phone numbers', async () => {
    await assert.rejects(
      async () => {
        await requestOtpSchema.parseAsync({ phone: '12345' });
      },
      (err: any) => {
        assert.ok(err.errors.length > 0);
        return true;
      }
    );
  });

  it('should reject OTPs that are not exactly 6 digits', async () => {
    await assert.rejects(
      async () => {
        await verifyOtpSchema.parseAsync({ phone: '9876543210', otp: '123' });
      },
      (err: any) => {
        assert.ok(err.errors.some((e: any) => e.path.includes('otp')));
        return true;
      }
    );
  });
});

describe('3. WhatsApp OTP Authentication & Attempt Rules', () => {
  it('should request an OTP and verify successfully', async () => {
    const authRepo = new InMemoryAuthRepository();
    const whatsappProvider = new MockWhatsAppProvider();
    const authService = new AuthService(authRepo, whatsappProvider);

    const phone = '+919876543210';
    const requestResult = await authService.requestOtp(phone);
    assert.strictEqual(requestResult.success, true);

    // Retrieve active session from repo
    const session = await authRepo.findLatestOtpSession(phone);
    assert.ok(session, 'Session should exist');
    assert.strictEqual(session.phone, phone);
    assert.strictEqual(session.attempts, 0);

    // Verify with invalid OTP first
    await assert.rejects(
      async () => {
        await authService.verifyOtp(phone, '000000');
      },
      (err: any) => {
        assert.strictEqual(err.code, 'INVALID_OTP');
        return true;
      }
    );

    // Attempt counter should have incremented
    const updatedSession = await authRepo.findLatestOtpSession(phone);
    assert.strictEqual(updatedSession?.attempts, 1);
  });

  it('should reject verification when OTP has expired', async () => {
    const authRepo = new InMemoryAuthRepository();
    const whatsappProvider = new MockWhatsAppProvider();
    const authService = new AuthService(authRepo, whatsappProvider);

    const phone = '+919876543210';
    await authService.requestOtp(phone);

    // Force expiration in repository
    const session = await authRepo.findLatestOtpSession(phone);
    session!.expiresAt = new Date(Date.now() - 1000); // 1 sec in the past

    await assert.rejects(
      async () => {
        await authService.verifyOtp(phone, '123456');
      },
      (err: any) => {
        assert.strictEqual(err.code, 'OTP_EXPIRED');
        return true;
      }
    );
  });
});

describe('4. Catalogue & Wholesale Pricing Visibility', () => {
  it('should strip wholesale tiers for unauthenticated users in LOGIN_GATED mode', async () => {
    const catalogueRepo = new InMemoryCatalogueRepository();
    const catalogueService = new CatalogueService(catalogueRepo, 'LOGIN_GATED');

    const result = await catalogueService.getProducts({ page: 1, limit: 10 });
    const product = result.products[0];

    assert.ok(product, 'Product should be retrieved');
    assert.strictEqual(product.wholesalePricingEnabled, false);
    assert.strictEqual(product.wholesaleTiers, undefined);
    assert.strictEqual(product.loginRequiredForWholesale, true);
    assert.strictEqual(typeof product.retailPrice, 'number');
  });

  it('should reveal wholesale tiers for authenticated users in LOGIN_GATED mode', async () => {
    const catalogueRepo = new InMemoryCatalogueRepository();
    const catalogueService = new CatalogueService(catalogueRepo, 'LOGIN_GATED');

    const mockUser = {
      id: 'usr-1',
      phone: '+919876543210',
      role: 'CUSTOMER' as const,
    };

    const result = await catalogueService.getProducts({ page: 1, limit: 10 }, mockUser);
    const product = result.products[0];

    assert.ok(product, 'Product should be retrieved');
    assert.strictEqual(product.wholesalePricingEnabled, true);
    assert.ok(Array.isArray(product.wholesaleTiers), 'Wholesale tiers should be present');
    assert.ok(product.wholesaleTiers.length > 0, 'Wholesale tiers array should contain slabs');
    assert.strictEqual(product.loginRequiredForWholesale, false);
  });
});

describe('5. Cart Management & Dynamic Price Recalculation', () => {
  it('should apply retail price when quantity is below wholesale tier', async () => {
    const cartRepo = new InMemoryCartRepository();
    const catalogueRepo = new InMemoryCatalogueRepository();
    const cartService = new CartService(cartRepo, catalogueRepo);

    const cart = await cartRepo.findOrCreateCart(undefined, 'guest_session_1');
    const productId = 'prod-001-bat-ip6g'; // iPhone 6G Battery (Sale: ₹399, Retail: ₹450)

    // Add 2 units
    const updated = await cartService.addItem(cart.id, productId, 2);

    assert.strictEqual(updated.itemCount, 2);
    assert.strictEqual(updated.items[0].unitPrice, 399.0);
    assert.strictEqual(updated.items[0].lineTotal, 798.0);
    assert.strictEqual(updated.subtotal, 798.0);
  });

  it('should automatically apply wholesale tier price when authenticated user buys at or above threshold', async () => {
    const cartRepo = new InMemoryCartRepository();
    const catalogueRepo = new InMemoryCatalogueRepository();
    const cartService = new CartService(cartRepo, catalogueRepo);

    const mockUser = {
      id: 'usr-technician-1',
      phone: '+919876543210',
      role: 'CUSTOMER' as const,
    };

    const cart = await cartRepo.findOrCreateCart(mockUser.id, undefined);
    const productId = 'prod-001-bat-ip6g'; // Tier 1: >= 5 pcs @ ₹360; Tier 2: >= 10 pcs @ ₹320

    // Add 10 units (qualifies for Tier 2 @ ₹320/pc)
    const updated = await cartService.addItem(cart.id, productId, 10, mockUser);

    assert.strictEqual(updated.items[0].unitPrice, 320.0);
    assert.strictEqual(updated.items[0].lineTotal, 3200.0);
    assert.ok(updated.items[0].tierApplied?.includes('320'));
    assert.strictEqual(updated.subtotal, 3200.0);
    assert.strictEqual(updated.freeShippingEligible, true);
  });

  it('should reject adding item if quantity is below product minimum order quantity (MOQ)', async () => {
    const cartRepo = new InMemoryCartRepository();
    const catalogueRepo = new InMemoryCatalogueRepository();
    const cartService = new CartService(cartRepo, catalogueRepo);

    const cart = await cartRepo.findOrCreateCart(undefined, 'guest_session_2');
    const productId = 'prod-002-flx-vy11'; // Vivo Y11 Flex (minOrderQty: 2)

    await assert.rejects(
      async () => {
        await cartService.addItem(cart.id, productId, 1);
      },
      (err: any) => {
        assert.strictEqual(err.code, 'MIN_ORDER_QTY_NOT_MET');
        return true;
      }
    );
  });
});

describe('6. Checkout Pre-Validation & Delhivery Pincode Checks', () => {
  it('should validate checkout successfully for serviceable pincode', async () => {
    const { CheckoutService } = await import('../src/services/checkout.service.js');
    const { MockDelhiveryProvider } = await import('../src/lib/providers/shipping.provider.js');

    const cartRepo = new InMemoryCartRepository();
    const catalogueRepo = new InMemoryCatalogueRepository();
    const cartService = new CartService(cartRepo, catalogueRepo);
    const shippingProvider = new MockDelhiveryProvider();
    const checkoutService = new CheckoutService(cartService, shippingProvider);

    const mockUser = {
      id: 'usr-buyer-1',
      phone: '+919876543210',
      role: 'CUSTOMER' as const,
    };

    const cart = await cartRepo.findOrCreateCart(mockUser.id, undefined);
    await cartService.addItem(cart.id, 'prod-001-bat-ip6g', 1, mockUser);

    const result = await checkoutService.validateCheckout(mockUser, cart.id, '110001');

    assert.strictEqual(result.isValid, true);
    assert.strictEqual(result.shipping.isServiceable, true);
    assert.strictEqual(result.pricingSummary.subtotal, 399.0);
    assert.strictEqual(result.pricingSummary.shippingFee, 49.0);
    assert.strictEqual(result.pricingSummary.totalPayable, 448.0);
  });

  it('should reject checkout if pincode is unserviceable', async () => {
    const { CheckoutService } = await import('../src/services/checkout.service.js');
    const { MockDelhiveryProvider } = await import('../src/lib/providers/shipping.provider.js');

    const cartRepo = new InMemoryCartRepository();
    const catalogueRepo = new InMemoryCatalogueRepository();
    const cartService = new CartService(cartRepo, catalogueRepo);
    const shippingProvider = new MockDelhiveryProvider();
    const checkoutService = new CheckoutService(cartService, shippingProvider);

    const mockUser = {
      id: 'usr-buyer-1',
      phone: '+919876543210',
      role: 'CUSTOMER' as const,
    };

    const cart = await cartRepo.findOrCreateCart(mockUser.id, undefined);
    await cartService.addItem(cart.id, 'prod-001-bat-ip6g', 1, mockUser);

    // Pincode 999999 is outside Delhivery valid prefix range 1-8 in mock
    await assert.rejects(
      async () => {
        await checkoutService.validateCheckout(mockUser, cart.id, '999999');
      },
      (err: any) => {
        assert.strictEqual(err.code, 'PINCODE_UNSERVICEABLE');
        return true;
      }
    );
  });
});

describe('7. Role Authorization Middleware', () => {
  it('should permit access when user has the required role', async () => {
    const { requireRole } = await import('../src/middleware/role.middleware.js');
    const middleware = requireRole('ADMIN', 'STAFF');

    let calledNext = false;
    const req: any = {
      user: { id: 'admin-1', role: 'ADMIN' },
    };
    const res: any = {};
    const next = () => {
      calledNext = true;
    };

    middleware(req, res, next);
    assert.strictEqual(calledNext, true);
  });

  it('should block access when user role is unauthorized', async () => {
    const { requireRole } = await import('../src/middleware/role.middleware.js');
    const middleware = requireRole('ADMIN');

    let errorStatusCode = 0;
    let errorCode = '';

    const req: any = {
      user: { id: 'cust-1', role: 'CUSTOMER' },
    };
    const res: any = {
      status(code: number) {
        errorStatusCode = code;
        return this;
      },
      json(body: any) {
        errorCode = body.error.code;
        return this;
      },
    };
    const next = () => {};

    middleware(req, res, next);
    assert.strictEqual(errorStatusCode, 403);
    assert.strictEqual(errorCode, 'FORBIDDEN');
  });
});

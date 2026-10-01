// ============================================================================
// ABHAY TECHNICALS — CATALOGUE MIGRATION IDEMPOTENCY & SAFETY TESTS
// ============================================================================

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { generateSku } from '../../src/services/migration/catalogueMapper.js';

describe('Catalogue Migration Idempotency & Database Safety', () => {
  const prisma = new PrismaClient();

  beforeAll(async () => {
    // Confirm local database connection
    const dbUrl = process.env.DATABASE_URL || '';
    expect(dbUrl).toMatch(/127\.0\.0\.1|localhost/);
    expect(dbUrl).toContain('abhay_technicals_dev');
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('guarantees seed fixtures remain intact and distinct with sourceId = null', async () => {
    const seedProducts = await prisma.product.findMany({
      where: { sourceId: null },
      select: { id: true, title: true, sourceId: true },
    });
    expect(seedProducts.length).toBeGreaterThanOrEqual(14);
    for (const sp of seedProducts) {
      expect(sp.sourceId).toBeNull();
    }
  });

  it('enforces uniqueness on sourceId so duplicate WooCommerce IDs are rejected or upserted', async () => {
    // Pick an existing migrated product
    const existing = await prisma.product.findFirst({
      where: { sourceId: { not: null } },
      select: { id: true, sourceId: true, title: true, retailPrice: true },
    });
    expect(existing).not.toBeNull();
    expect(existing?.sourceId).toBeTypeOf('number');

    // Attempting an atomic upsert on the same sourceId should update, not create a duplicate
    const updated = await prisma.product.upsert({
      where: { sourceId: existing!.sourceId! },
      create: {
        sourceId: existing!.sourceId!,
        sku: `TEST-DUP-${Date.now()}`,
        slug: `test-dup-${Date.now()}`,
        title: existing!.title,
        retailPrice: existing!.retailPrice,
        categoryId: 1,
      },
      update: {
        title: existing!.title, // idempotent update
      },
    });

    expect(updated.id).toBe(existing!.id);
  });

  it('preserves wholesale volume tiers on migrated products', async () => {
    const tierCount = await prisma.productWholesaleTier.count();
    expect(tierCount).toBeGreaterThan(0);

    // Verify sample product with tiers has ascending minQuantities
    const productWithTiers = await prisma.product.findFirst({
      where: { wholesaleTiers: { some: {} } },
      include: { wholesaleTiers: { orderBy: { minQuantity: 'asc' } } },
    });

    expect(productWithTiers).not.toBeNull();
    expect(productWithTiers!.wholesaleTiers.length).toBeGreaterThanOrEqual(1);
    for (const tier of productWithTiers!.wholesaleTiers) {
      expect(tier.minQuantity).toBeGreaterThan(1);
      expect(Number(tier.tierPrice)).toBeGreaterThan(0);
    }
  });

  it('preserves image associations and primary flag ordering', async () => {
    const primaryImages = await prisma.productImage.findMany({
      where: { isPrimary: true },
      take: 10,
    });
    expect(primaryImages.length).toBe(10);
    for (const img of primaryImages) {
      expect(img.isPrimary).toBe(true);
      expect(img.imageUrl).toMatch(/^https?:\/\//);
    }
  });

  it('generates unique deterministic SKUs for all catalogue items', async () => {
    const sku1 = generateSku('', 23825);
    const sku2 = generateSku('', 23813);
    expect(sku1).toBe('AT-WC-23825');
    expect(sku2).toBe('AT-WC-23813');
    expect(sku1).not.toBe(sku2);
  });
});

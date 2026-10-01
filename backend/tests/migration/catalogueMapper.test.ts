// ============================================================================
// ABHAY TECHNICALS — CATALOGUE MIGRATION MAPPER TESTS
// ============================================================================

import { describe, it, expect } from 'vitest';
import {
  parsePrices,
  parseWholesaleTiers,
  generateSku,
  detectBrand,
  extractModels,
  detectQualityGrade,
  resolveCategory,
  mapProduct,
  KnownBrand,
  KnownCategory,
} from '../../src/services/migration/catalogueMapper.js';

describe('Catalogue Migration Mapper', () => {
  const mockBrands: KnownBrand[] = [
    { id: 1, name: 'Samsung', slug: 'samsung' },
    { id: 2, name: 'Xiaomi', slug: 'xiaomi' },
    { id: 3, name: 'Vivo', slug: 'vivo' },
    { id: 4, name: 'Realme', slug: 'realme' },
    { id: 5, name: 'Oppo', slug: 'oppo' },
    { id: 6, name: 'Apple', slug: 'apple' },
  ];

  const mockCategories: KnownCategory[] = [
    { id: 1, name: 'Display', slug: 'display' },
    { id: 2, name: 'Battery', slug: 'battery' },
    { id: 3, name: 'Charging Flex', slug: 'charging-flex' },
    { id: 4, name: 'Back Panel', slug: 'back-panel' },
    { id: 5, name: 'Camera Glass', slug: 'camera-glass' },
    { id: 6, name: 'Speaker', slug: 'speaker' },
    { id: 7, name: 'OCA Glass', slug: 'oca-glass' },
    { id: 8, name: 'Repair Tools', slug: 'repair-tools' },
  ];

  describe('parsePrices', () => {
    it('correctly divides minor currency units by 100 for INR (2000 -> ₹20.00)', () => {
      const result = parsePrices({
        price: '2000',
        regular_price: '2000',
        sale_price: '2000',
        currency_code: 'INR',
        currency_symbol: '₹',
        currency_minor_unit: 2,
      });
      expect(result.retailPrice).toBe(20.0);
      expect(result.salePrice).toBeNull();
    });

    it('correctly maps sale prices when regular price is higher', () => {
      const result = parsePrices({
        price: '1549900',
        regular_price: '2899900',
        sale_price: '1549900',
        currency_code: 'INR',
        currency_symbol: '₹',
        currency_minor_unit: 2,
      });
      expect(result.retailPrice).toBe(28999.0);
      expect(result.salePrice).toBe(15499.0);
    });

    it('handles zero or missing prices gracefully', () => {
      const result = parsePrices({
        price: '0',
        currency_code: 'INR',
        currency_symbol: '₹',
        currency_minor_unit: 2,
      });
      expect(result.retailPrice).toBe(0);
      expect(result.salePrice).toBeNull();
    });
  });

  describe('parseWholesaleTiers', () => {
    it('parses WooCommerce fixed tiered pricing rules into sorted slabs', () => {
      const fixedRules = { '10': 12, '5': 15, '50': 9 };
      const tiers = parseWholesaleTiers(fixedRules, undefined, 20);

      expect(tiers).toHaveLength(3);
      expect(tiers[0]).toEqual({ minQuantity: 5, tierPrice: 15.0 });
      expect(tiers[1]).toEqual({ minQuantity: 10, tierPrice: 12.0 });
      expect(tiers[2]).toEqual({ minQuantity: 50, tierPrice: 9.0 });
    });

    it('ignores invalid tiers with minQuantity <= 1 or invalid price', () => {
      const fixedRules = { '1': 20, '0': 15, '-5': 10, '10': 'invalid', '5': 15 };
      const tiers = parseWholesaleTiers(fixedRules, undefined, 20);

      expect(tiers).toHaveLength(1);
      expect(tiers[0]).toEqual({ minQuantity: 5, tierPrice: 15.0 });
    });

    it('returns empty array when no rules exist', () => {
      expect(parseWholesaleTiers(undefined)).toEqual([]);
      expect(parseWholesaleTiers({})).toEqual([]);
    });
  });

  describe('generateSku', () => {
    it('generates deterministic AT-WC-{id} when source SKU is empty', () => {
      expect(generateSku('', 23825)).toBe('AT-WC-23825');
      expect(generateSku('   ', 101)).toBe('AT-WC-101');
      expect(generateSku(undefined, 999)).toBe('AT-WC-999');
    });

    it('preserves and sanitizes source SKU when present', () => {
      expect(generateSku('SAM-A20-CHG', 101)).toBe('SAM-A20-CHG');
      expect(generateSku('sku 123/abc', 102)).toBe('SKU-123-ABC');
    });
  });

  describe('detectBrand', () => {
    it('identifies explicit brands from product titles', () => {
      expect(detectBrand('Vivo Y21 Charging Flex', mockBrands)?.name).toBe('Vivo');
      expect(detectBrand('Samsung A20 Charging Connector', mockBrands)?.name).toBe('Samsung');
      expect(detectBrand('Oppo Reno 8 Camera Glass', mockBrands)?.name).toBe('Oppo');
      expect(detectBrand('Realme P4 Lite (Mosaic Green)', mockBrands)?.name).toBe('Realme');
    });

    it('resolves brand aliases like iPhone -> Apple, Redmi -> Xiaomi', () => {
      expect(detectBrand('iPhone 12 Back Glass', mockBrands)?.name).toBe('Apple');
      expect(detectBrand('Redmi Note 10 Pro Battery', mockBrands)?.name).toBe('Xiaomi');
    });

    it('returns null for generic tools or unknown brands without guessing', () => {
      expect(detectBrand('Mechanic iCharge 8 Pro 8-Port Charger', mockBrands)).toBeNull();
      expect(detectBrand('Universal 0.1mm Copper Soldering Wire', mockBrands)).toBeNull();
    });
  });

  describe('extractModels', () => {
    it('extracts single handset model from product title', () => {
      const vivo = mockBrands.find((b) => b.name === 'Vivo')!;
      const models = extractModels('Vivo Y21 Charging Flex', vivo);
      expect(models).toHaveLength(1);
      expect(models[0].modelName).toBe('Vivo Y21');
    });

    it('extracts dual compatibility models when separated by slash', () => {
      const vivo = mockBrands.find((b) => b.name === 'Vivo')!;
      const models = extractModels('Vivo Y21 / Y21s Charging Flex', vivo);
      expect(models).toHaveLength(2);
      expect(models[0].modelName).toBe('Vivo Y21');
      expect(models[1].modelName).toBe('Vivo Y21s');
    });

    it('returns empty array when brand is null', () => {
      expect(extractModels('Universal Soldering Wire', null)).toEqual([]);
    });
  });

  describe('detectQualityGrade', () => {
    it('detects Original OEM grade from category or title', () => {
      expect(detectQualityGrade('Vivo Y21 Charging Flex', 'ORIGNAL CHARGING FLEX')).toBe('Original OEM');
      expect(detectQualityGrade('Samsung A51 Battery (OG Quality)', 'Battery')).toBe('Original OEM');
    });

    it('detects OEM Tested and A+ Grade', () => {
      expect(detectQualityGrade('Redmi 9 Display (OEM Tested)', 'Display')).toBe('OEM Tested');
      expect(detectQualityGrade('iPhone 11 Screen A+ Grade', 'Display')).toBe('A+ Grade');
    });

    it('returns null when no grade is specified', () => {
      expect(detectQualityGrade('Standard Sim Tray Holder', 'Sim Holder')).toBeNull();
    });
  });

  describe('resolveCategory', () => {
    it('maps source category to target category via slug or alias', () => {
      const cat = resolveCategory(
        [{ id: 33, name: 'ORIGNAL CHARGING FLEX', slug: 'orignal-charging-flex' }],
        mockCategories
      );
      expect(cat.slug).toBe('charging-flex');
    });

    it('maps OCA Touch Glass to OCA Glass', () => {
      const cat = resolveCategory(
        [{ id: 24, name: 'Oca Touch Glass', slug: 'oca-touch-glass' }],
        mockCategories
      );
      expect(cat.slug).toBe('oca-glass');
    });
  });

  describe('mapProduct', () => {
    it('assembles complete MappedProduct record matching Phase 4 schema', () => {
      const storeProduct: any = {
        id: 23748,
        name: 'Oppo Reno 8 Pro Side Key Button Set',
        slug: 'oppo-reno-8-pro-side-key-button-set',
        permalink: 'https://abhaytechnicals.com/shop/oppo-reno-8-pro-side-key-button-set/',
        sku: '',
        type: 'simple',
        description: '<p>High quality power volume buttons</p>',
        short_description: '<p>Power volume side buttons</p>',
        prices: {
          price: '2000',
          regular_price: '2000',
          sale_price: '2000',
          currency_code: 'INR',
          currency_symbol: '₹',
          currency_minor_unit: 2,
        },
        images: [
          {
            id: 23672,
            src: 'https://abhaytechnicals.com/wp-content/uploads/2026/08/Reno-8-pro.png',
            name: 'Reno 8 pro',
            alt: 'Reno 8 Pro Side Key',
          },
        ],
        categories: [
          {
            id: 50,
            name: 'Side Rubber Key',
            slug: 'side-rubber-key',
          },
        ],
        attributes: [],
        is_in_stock: true,
        low_stock_remaining: 25,
      };

      const wpProduct: any = {
        id: 23748,
        slug: 'oppo-reno-8-pro-side-key-button-set',
        title: { rendered: 'Oppo Reno 8 Pro Side Key Button Set' },
        content: { rendered: '<p>Full repair specifications</p>' },
        excerpt: { rendered: '<p>Short excerpt</p>' },
        tiered_pricing_fixed_rules: { '5': 15, '10': 12 },
      };

      const mapped = mapProduct(storeProduct, wpProduct, mockCategories, mockBrands);

      expect(mapped.sourceId).toBe(23748);
      expect(mapped.sourceUrl).toBe('https://abhaytechnicals.com/shop/oppo-reno-8-pro-side-key-button-set/');
      expect(mapped.sku).toBe('AT-WC-23748');
      expect(mapped.retailPrice).toBe(20.0);
      expect(mapped.salePrice).toBeNull();
      expect(mapped.brandId).toBe(5); // Oppo
      expect(mapped.stockQty).toBe(25);
      expect(mapped.wholesaleTiers).toHaveLength(2);
      expect(mapped.wholesaleTiers[0]).toEqual({ minQuantity: 5, tierPrice: 15.0 });
      expect(mapped.wholesaleTiers[1]).toEqual({ minQuantity: 10, tierPrice: 12.0 });
      expect(mapped.images).toHaveLength(1);
      expect(mapped.images[0].isPrimary).toBe(true);
      expect(mapped.compatibilities).toHaveLength(1);
      expect(mapped.compatibilities[0].modelName).toBe('Oppo Reno 8 Pro');
    });
  });
});

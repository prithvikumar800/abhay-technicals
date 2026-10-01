// ============================================================================
// ABHAY TECHNICALS — CATALOGUE MIGRATION MAPPER
// Pure transformation layer mapping old WooCommerce data to Prisma models.
// ============================================================================

import {
  SourceStorePrices,
  SourceStoreCategory,
  SourceStoreProduct,
  SourceWpProduct,
  MappedProduct,
} from './migration.types.js';

export interface KnownBrand {
  id: number;
  name: string;
  slug: string;
}

export interface KnownCategory {
  id: number;
  name: string;
  slug: string;
  sourceId?: number | null;
}

// 1. Price Parsing
export function parsePrices(prices: SourceStorePrices): {
  retailPrice: number;
  salePrice: number | null;
} {
  const minorUnit = typeof prices.currency_minor_unit === 'number' ? prices.currency_minor_unit : 2;
  const divisor = Math.pow(10, minorUnit);

  const rawCurrent = parseFloat(prices.price || '0');
  const rawRegular = prices.regular_price ? parseFloat(prices.regular_price) : rawCurrent;
  const rawSale = prices.sale_price ? parseFloat(prices.sale_price) : null;

  const currentPrice = Number((rawCurrent / divisor).toFixed(2));
  const regularPrice = Number((rawRegular / divisor).toFixed(2));

  if (rawSale !== null && rawRegular > rawCurrent) {
    return {
      retailPrice: regularPrice,
      salePrice: currentPrice,
    };
  }

  return {
    retailPrice: currentPrice > 0 ? currentPrice : regularPrice,
    salePrice: null,
  };
}

// 2. Wholesale Tier Parsing
export function parseWholesaleTiers(
  fixedRules?: Record<string, number | string>,
  percentageRules?: any[],
  retailPrice: number = 0
): Array<{ minQuantity: number; tierPrice: number }> {
  const tiers: Array<{ minQuantity: number; tierPrice: number }> = [];

  if (fixedRules && typeof fixedRules === 'object') {
    for (const [qtyStr, priceVal] of Object.entries(fixedRules)) {
      const minQuantity = parseInt(qtyStr, 10);
      const tierPrice = typeof priceVal === 'number' ? priceVal : parseFloat(String(priceVal));

      if (!isNaN(minQuantity) && minQuantity > 1 && !isNaN(tierPrice) && tierPrice > 0) {
        tiers.push({
          minQuantity,
          tierPrice: Number(tierPrice.toFixed(2)),
        });
      }
    }
  }

  // Handle percentage rules if fixed rules were not provided
  if (tiers.length === 0 && Array.isArray(percentageRules) && percentageRules.length > 0 && retailPrice > 0) {
    for (const rule of percentageRules) {
      const minQuantity = parseInt(rule.min_qty || rule.quantity || rule.min, 10);
      const discountPercent = parseFloat(rule.discount || rule.value || rule.percentage);
      if (!isNaN(minQuantity) && minQuantity > 1 && !isNaN(discountPercent) && discountPercent > 0 && discountPercent < 100) {
        const calculatedPrice = retailPrice * (1 - discountPercent / 100);
        tiers.push({
          minQuantity,
          tierPrice: Number(calculatedPrice.toFixed(2)),
        });
      }
    }
  }

  // Sort ascending by minQuantity
  return tiers.sort((a, b) => a.minQuantity - b.minQuantity);
}

// 3. SKU Generation
export function generateSku(sourceSku: string | undefined, sourceId: number): string {
  if (sourceSku && sourceSku.trim() !== '') {
    return sourceSku.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '-');
  }
  return `AT-WC-${sourceId}`;
}

// 4. Quality Grade Detection
export function detectQualityGrade(title: string, categoryName: string): string | null {
  const lowerTitle = title.toLowerCase();
  const lowerCat = categoryName.toLowerCase();

  if (lowerCat.includes('orignal charging flex') || lowerTitle.includes('original charging flex')) {
    return 'Original OEM';
  }
  if (lowerTitle.includes('og quality') || lowerTitle.includes('original quality')) {
    return 'Original OEM';
  }
  if (lowerTitle.includes('oem tested') || lowerTitle.includes('oem')) {
    return 'OEM Tested';
  }
  if (lowerTitle.includes('original pull') || lowerTitle.includes('service center pull')) {
    return 'Original Pull';
  }
  if (lowerTitle.includes('grade a+') || lowerTitle.includes('a+')) {
    return 'A+ Grade';
  }
  if (lowerTitle.includes('diamond quality')) {
    return 'Diamond Quality';
  }
  return null;
}

// 5. Brand Detection
const BRAND_ALIASES: Record<string, string> = {
  iphone: 'Apple',
  ipad: 'Apple',
  redmi: 'Xiaomi',
  mi: 'Xiaomi',
  moto: 'Motorola',
  oneplus: 'OnePlus',
  '1+': 'OnePlus',
};

export function detectBrand(
  title: string,
  knownBrands: KnownBrand[]
): KnownBrand | null {
  const cleanTitle = title.trim();

  // 1. Direct match with known brands (case-insensitive word boundary)
  for (const b of knownBrands) {
    const regex = new RegExp(`\\b${b.name}\\b`, 'i');
    if (regex.test(cleanTitle)) {
      return b;
    }
  }

  // 2. Check aliases (e.g. iPhone -> Apple, Redmi -> Xiaomi)
  for (const [alias, targetBrandName] of Object.entries(BRAND_ALIASES)) {
    const regex = new RegExp(`\\b${alias}\\b`, 'i');
    if (regex.test(cleanTitle)) {
      const found = knownBrands.find(
        (b) => b.name.toLowerCase() === targetBrandName.toLowerCase()
      );
      if (found) return found;
    }
  }

  return null;
}

// 6. Device Model Extraction
export function extractModels(
  title: string,
  brand: KnownBrand | null
): Array<{ modelName: string; brandName: string }> {
  if (!brand) return [];

  const results: Array<{ modelName: string; brandName: string }> = [];

  // Patterns for multi-model e.g. "Vivo Y21 / Y21s Charging Flex"
  const multiPattern = /(?:Vivo|Samsung|Oppo|Realme|Xiaomi|Redmi|OnePlus|Apple|Poco|Motorola)?\s*([A-Za-z0-9\s+]+)\s*\/\s*([A-Za-z0-9\s+]+)/i;
  const multiMatch = title.match(multiPattern);

  if (multiMatch && multiMatch[1] && multiMatch[2]) {
    const partNameSuffix = /(Charging Flex|Charging Connector|Camera Glass|Back Panel|Middle Panel|On \/ Off Flex|Volume Flex|Speaker|Battery|Display|Fingerprint Sensor|Side Key|Sim Holder|Main Flex)/i;
    const model1 = multiMatch[1].replace(partNameSuffix, '').trim();
    const model2 = multiMatch[2].replace(partNameSuffix, '').trim();

    if (model1.length > 1 && model1.length < 30) {
      results.push({ modelName: model1.startsWith(brand.name) ? model1 : `${brand.name} ${model1}`, brandName: brand.name });
    }
    if (model2.length > 1 && model2.length < 30) {
      results.push({ modelName: model2.startsWith(brand.name) ? model2 : `${brand.name} ${model2}`, brandName: brand.name });
    }
    if (results.length > 0) return results;
  }

  // Single model pattern: e.g. "Samsung Galaxy M31 Charging Flex" or "Oppo Reno 8 Pro Side Key"
  const partTokens = [
    'Charging Flex',
    'Charging Connector',
    'Camera Glass',
    'Back Panel',
    'Middle Panel',
    'On / Off Flex',
    'On/Off Flex',
    'Volume Flex',
    'Speaker Jali',
    'Speaker',
    'Battery',
    'Display Combo',
    'Display',
    'Fingerprint Sensor',
    'Fingerprint Censor',
    'Side Rubber Key',
    'Side Key Button Set',
    'Side Key',
    'Sim Holder',
    'Main Flex',
    'Microphone',
    'Touch Pad',
    'OCA Touch Glass',
    'OCA Glass',
    'Keypad LCD',
  ];

  let candidate = title;
  for (const token of partTokens) {
    const idx = candidate.toLowerCase().indexOf(token.toLowerCase());
    if (idx !== -1) {
      candidate = candidate.substring(0, idx).trim();
      break;
    }
  }

  // Strip brackets, specs like (Mosaic Green) or 4GB RAM
  candidate = candidate.replace(/\([^)]*\)/g, '').replace(/\[[^\]]*\]/g, '').trim();
  // Strip trailing "Ram 4 Gb..." or "Rom 64 Gb"
  candidate = candidate.replace(/Ram\s*\d+\s*Gb.*$/i, '').trim();

  if (candidate.length > 2 && candidate.length < 40) {
    const finalModel = candidate.toLowerCase().startsWith(brand.name.toLowerCase())
      ? candidate
      : `${brand.name} ${candidate}`;
    results.push({ modelName: finalModel, brandName: brand.name });
  }

  return results;
}

// 7. Category Resolver
export function resolveCategory(
  sourceCategories: SourceStoreCategory[],
  existingCategories: KnownCategory[],
  categoryAliases: Record<string, string> = {
    'orignal-charging-flex': 'charging-flex',
    'battery': 'battery',
    'charging-flex': 'charging-flex',
    'back-panel': 'back-panel',
    'camera-glass': 'camera-glass',
    'speaker': 'speaker',
    'oca-touch-glass': 'oca-glass',
    'tools': 'repair-tools',
  }
): KnownCategory {
  if (!sourceCategories || sourceCategories.length === 0) {
    // Default to 'Other Products' or first available
    const other = existingCategories.find((c) => c.slug === 'other-products') || existingCategories[0];
    return other;
  }

  const primarySource = sourceCategories[0];
  const targetSlug = categoryAliases[primarySource.slug] || primarySource.slug;

  const found =
    existingCategories.find((c) => c.slug === targetSlug) ||
    existingCategories.find((c) => c.name.toLowerCase() === primarySource.name.toLowerCase()) ||
    existingCategories.find((c) => c.slug === primarySource.slug);

  if (found) return found;

  // Fallback to first existing category
  return existingCategories[0];
}

// 8. Full Product Mapping Assembler
export function mapProduct(
  storeProduct: SourceStoreProduct,
  wpProduct: SourceWpProduct | undefined,
  knownCategories: KnownCategory[],
  knownBrands: KnownBrand[]
): MappedProduct {
  const category = resolveCategory(storeProduct.categories, knownCategories);
  const brand = detectBrand(storeProduct.name, knownBrands);
  const compatibilities = extractModels(storeProduct.name, brand);
  const { retailPrice, salePrice } = parsePrices(storeProduct.prices);
  const wholesaleTiers = parseWholesaleTiers(
    wpProduct?.tiered_pricing_fixed_rules,
    wpProduct?.tiered_pricing_percentage_rules,
    retailPrice
  );
  const qualityGrade = detectQualityGrade(
    storeProduct.name,
    storeProduct.categories?.[0]?.name || ''
  );
  const sku = generateSku(storeProduct.sku, storeProduct.id);

  const images = (storeProduct.images || []).map((img, index) => ({
    imageUrl: img.src,
    altText: img.alt || img.name || storeProduct.name,
    sortOrder: index,
    isPrimary: index === 0,
  }));

  const description =
    wpProduct?.content?.rendered ||
    storeProduct.description ||
    storeProduct.short_description ||
    '';

  return {
    sourceId: storeProduct.id,
    sourceUrl: storeProduct.permalink,
    sku,
    slug: storeProduct.slug,
    title: storeProduct.name,
    description,
    categoryId: category.id,
    brandId: brand ? brand.id : null,
    modelId: null, // Linked via compatibilities
    retailPrice,
    salePrice,
    stockQty: storeProduct.is_in_stock ? (storeProduct.low_stock_remaining ?? 50) : 0,
    minOrderQty: wpProduct?.tiered_pricing_minimum_quantity || 1,
    qualityGrade,
    isActive: true,
    images,
    wholesaleTiers,
    compatibilities,
    attributes: (storeProduct.attributes || []).flatMap((attr) =>
      (attr.terms || []).map((term) => ({
        name: attr.name,
        value: term.name,
      }))
    ),
  };
}

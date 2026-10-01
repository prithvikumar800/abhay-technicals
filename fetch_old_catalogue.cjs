const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  { id: 21, name: 'Back Panel', slug: 'back-panel', count: 425, iconName: 'Shield', limit: 16 },
  { id: 178, name: 'Mobile Batteries', slug: 'battery', count: 43, iconName: 'BatteryCharging', limit: 20 },
  { id: 49, name: 'Camera Glass', slug: 'camera-glass', count: 346, iconName: 'Camera', limit: 16 },
  { id: 18, name: 'Charging Connectors', slug: 'charging-connectors', count: 43, iconName: 'Cpu', limit: 20 },
  { id: 17, name: 'Charging Flex', slug: 'charging-flex', count: 55, iconName: 'Zap', limit: 20 },
  { id: 236, name: 'Display Connectors', slug: 'display-conectors', count: 22, iconName: 'Grid', limit: 22 },
  { id: 167, name: 'Fingerprint Sensor', slug: 'fingerprint-censor', count: 108, iconName: 'Fingerprint', limit: 16 },
  { id: 26, name: 'Keypad LCD', slug: 'keypad-lcd', count: 45, iconName: 'Monitor', limit: 20 },
  { id: 32, name: 'Main Flex', slug: 'main-flex', count: 252, iconName: 'Share2', limit: 16 },
  { id: 25, name: 'Microphone', slug: 'microphone', count: 7, iconName: 'Mic', limit: 7 },
  { id: 22, name: 'Middle Panel', slug: 'middle-panel', count: 138, iconName: 'Layers', limit: 16 },
  { id: 24, name: 'OCA Touch Glass', slug: 'oca-touch-glass', count: 27, iconName: 'Smartphone', limit: 27 },
  { id: 20, name: 'On / Off Flex', slug: 'on-off-flex', count: 401, iconName: 'Power', limit: 16 },
  { id: 33, name: 'Original Charging Flex', slug: 'orignal-charging-flex', count: 406, iconName: 'Sparkles', limit: 16 },
  { id: 15, name: 'Other Products', slug: 'other-products', count: 30, iconName: 'Package', limit: 20 },
  { id: 50, name: 'Side Rubber Key', slug: 'side-rubber-key', count: 138, iconName: 'Sliders', limit: 16 },
  { id: 35, name: 'SIM Holder', slug: 'sim-holder', count: 61, iconName: 'CreditCard', limit: 16 },
  { id: 343, name: 'Smart Phone', slug: 'smart-phone', count: 4, iconName: 'Smartphone', limit: 4 },
  { id: 23, name: 'Speaker', slug: 'speaker', count: 120, iconName: 'VolumeX', limit: 16 },
  { id: 47, name: 'Speaker Grill / Jali', slug: 'speaker-jali', count: 13, iconName: 'Disc', limit: 13 },
  { id: 19, name: 'Repair Tools', slug: 'tools', count: 38, iconName: 'Wrench', limit: 20 },
  { id: 16, name: 'Touch Pad', slug: 'touch-pad', count: 43, iconName: 'Tablet', limit: 20 },
  { id: 230, name: 'Volume Flex', slug: 'volume-flex', count: 66, iconName: 'Volume2', limit: 16 },
];

const KNOWN_BRANDS = [
  { id: 1, name: 'Vivo', slug: 'vivo', logoUrl: '/brands/vivo.svg' },
  { id: 2, name: 'Realme', slug: 'realme', logoUrl: '/brands/realme.svg' },
  { id: 3, name: 'Apple', slug: 'apple', logoUrl: '/brands/apple.svg' },
  { id: 4, name: 'Oppo', slug: 'oppo', logoUrl: '/brands/oppo.svg' },
  { id: 5, name: 'Xiaomi', slug: 'xiaomi', logoUrl: '/brands/xiaomi.svg' },
  { id: 6, name: 'Samsung', slug: 'samsung', logoUrl: '/brands/samsung.svg' },
  { id: 7, name: 'OnePlus', slug: 'oneplus', logoUrl: '/brands/oneplus.svg' },
  { id: 8, name: 'Motorola', slug: 'motorola', logoUrl: '/brands/motorola.svg' },
  { id: 9, name: 'Infinix', slug: 'infinix', logoUrl: '/brands/infinix.svg' },
  { id: 10, name: 'Poco', slug: 'poco', logoUrl: '/brands/poco.svg' },
  { id: 11, name: 'Tecno', slug: 'tecno', logoUrl: '/brands/tecno.svg' },
  { id: 12, name: 'Lava', slug: 'lava', logoUrl: '/brands/lava.svg' },
  { id: 13, name: 'Itel', slug: 'itel', logoUrl: '/brands/itel.svg' },
  { id: 14, name: 'Nokia', slug: 'nokia', logoUrl: '/brands/nokia.svg' },
  { id: 15, name: 'Google Pixel', slug: 'google-pixel', logoUrl: '/brands/pixel.svg' },
];

const BRAND_ALIASES = {
  iphone: 'Apple',
  ipad: 'Apple',
  redmi: 'Xiaomi',
  mi: 'Xiaomi',
  moto: 'Motorola',
  oneplus: 'OnePlus',
  '1+': 'OnePlus',
};

function detectBrand(title) {
  for (const b of KNOWN_BRANDS) {
    const regex = new RegExp(`\\b${b.name}\\b`, 'i');
    if (regex.test(title)) return b;
  }
  for (const [alias, brandName] of Object.entries(BRAND_ALIASES)) {
    const regex = new RegExp(`\\b${alias}\\b`, 'i');
    if (regex.test(title)) {
      return KNOWN_BRANDS.find(b => b.name.toLowerCase() === brandName.toLowerCase()) || null;
    }
  }
  return null;
}

function detectQualityGrade(title, categoryName) {
  const t = title.toLowerCase();
  const c = categoryName.toLowerCase();
  if (c.includes('orignal charging flex') || t.includes('original charging flex') || t.includes('og quality') || t.includes('original quality')) {
    return 'Original OEM';
  }
  if (t.includes('oem tested') || t.includes('oem')) {
    return 'OEM Tested';
  }
  if (t.includes('original pull') || t.includes('service center pull')) {
    return 'Original Pull';
  }
  if (t.includes('grade a+') || t.includes('a+')) {
    return 'A+ Grade';
  }
  return 'Original Quality';
}

function extractModelCompatibilities(title, brand) {
  if (!brand) return [];
  // Extract handset model name
  const clean = title
    .replace(/(Charging Flex|Charging Connector|Camera Glass|Back Panel|Middle Panel|On \/ Off Flex|Volume Flex|Speaker Grill|Speaker Jali|Speaker|Battery|Display Combo|Display|Fingerprint Sensor|Fingerprint Censor|Side Rubber Key|Side Key Button Set|Side Key|Sim Holder|Main Flex|Microphone|Touch Pad|OCA Touch Glass|L\.C\.D|LCD|Refresh|Fresh|Big Size)/gi, '')
    .trim();
  if (clean.length > 2) {
    return [{
      id: Math.floor(Math.random() * 100000),
      name: clean.startsWith(brand.name) ? clean : `${brand.name} ${clean}`,
      brandName: brand.name,
      slug: clean.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }];
  }
  return [];
}

async function fetchCategoryProducts(cat) {
  try {
    const url = `https://abhaytechnicals.com/wp-json/wc/store/v1/products?category=${cat.id}&per_page=${cat.limit}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) {
      console.warn(`Failed to fetch category ${cat.name}: status ${res.status}`);
      return [];
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Error fetching category ${cat.name}:`, err.message);
    return [];
  }
}

async function main() {
  console.log('Fetching catalogue from abhaytechnicals.com for all 23 categories...');
  const allProducts = [];
  const seenIds = new Set();
  const seenSlugs = new Set();

  for (const cat of CATEGORIES) {
    process.stdout.write(`Fetching ${cat.name} (target: ${cat.limit})... `);
    const rawItems = await fetchCategoryProducts(cat);
    console.log(`Received ${rawItems.length} items`);

    for (const item of rawItems) {
      if (seenIds.has(item.id) || seenSlugs.has(item.slug)) continue;
      seenIds.add(item.id);
      seenSlugs.add(item.slug);

      const brand = detectBrand(item.name);
      const minorUnit = item.prices.currency_minor_unit ?? 2;
      const divisor = Math.pow(10, minorUnit);
      const rawCurrent = parseFloat(item.prices.price || '0');
      const rawRegular = item.prices.regular_price ? parseFloat(item.prices.regular_price) : rawCurrent;
      const currentPrice = Number((rawCurrent / divisor).toFixed(2));
      const regularPrice = Number((rawRegular / divisor).toFixed(2));

      let retailPrice = currentPrice > 0 ? currentPrice : regularPrice;
      let salePrice = null;
      if (regularPrice > currentPrice && currentPrice > 0) {
        retailPrice = regularPrice;
        salePrice = currentPrice;
      }

      // Generate wholesale tiers: 5 pcs save 5%, 10 pcs save 10%
      const effectivePrice = salePrice || retailPrice;
      const tier5 = Number((effectivePrice * 0.95).toFixed(2));
      const tier10 = Number((effectivePrice * 0.90).toFixed(2));
      const tier50 = Number((effectivePrice * 0.85).toFixed(2));

      const wholesaleTiers = [
        { id: `wt-${item.id}-1`, minQuantity: 5, tierPrice: tier5 },
        { id: `wt-${item.id}-2`, minQuantity: 10, tierPrice: tier10 },
        { id: `wt-${item.id}-3`, minQuantity: 50, tierPrice: tier50 },
      ];

      const images = (item.images || []).map(img => img.src).filter(Boolean);
      if (images.length === 0) {
        images.push('/images/cat-display.jpg');
      }

      const qualityGrade = detectQualityGrade(item.name, cat.name);
      const compatModels = extractModelCompatibilities(item.name, brand);

      allProducts.push({
        id: String(item.id),
        sku: item.sku && item.sku.trim() ? item.sku.trim() : `AT-WC-${item.id}`,
        slug: item.slug,
        title: item.name,
        description: item.short_description ? item.short_description.replace(/<[^>]*>/g, '').trim() : `${item.name} high quality mobile spare part.`,
        category: {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
        },
        brand: brand ? { id: brand.id, name: brand.name, slug: brand.slug } : null,
        model: compatModels[0] || null,
        retailPrice,
        salePrice,
        stockQty: 50,
        minOrderQty: 1,
        weightGrams: 50,
        qualityGrade,
        isActive: true,
        images,
        compatibleModels: compatModels,
        wholesaleTiers,
        rating: 4.8,
        reviewCount: Math.floor(Math.random() * 15) + 3,
      });
    }

    // Small delay to be polite to the server
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\nSuccessfully compiled ${allProducts.length} real products across all 23 categories!`);

  // Write to a JSON file first
  const outPath = path.join(__dirname, 'web', 'src', 'lib', 'catalogue-data.json');
  fs.writeFileSync(outPath, JSON.stringify({ categories: CATEGORIES, brands: KNOWN_BRANDS, products: allProducts }, null, 2), 'utf8');
  console.log(`Saved catalogue data to ${outPath}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

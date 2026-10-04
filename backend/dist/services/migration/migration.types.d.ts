export interface SourceStoreImage {
    id: number;
    src: string;
    name?: string;
    alt?: string;
    thumbnail?: string;
}
export interface SourceStoreCategory {
    id: number;
    name: string;
    slug: string;
    link?: string;
}
export interface SourceStorePrices {
    price: string;
    regular_price?: string;
    sale_price?: string;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
}
export interface SourceStoreProduct {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    sku: string;
    type: string;
    description: string;
    short_description: string;
    prices: SourceStorePrices;
    images: SourceStoreImage[];
    categories: SourceStoreCategory[];
    attributes: Array<{
        id: number;
        name: string;
        taxonomy: string;
        has_variations: boolean;
        terms: Array<{
            id: number;
            name: string;
            slug: string;
        }>;
    }>;
    is_in_stock: boolean;
    low_stock_remaining: number | null;
    weight?: string;
    dimensions?: {
        length: string;
        width: string;
        height: string;
    };
}
export interface SourceWpProduct {
    id: number;
    slug: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    tiered_pricing_fixed_rules?: Record<string, number | string>;
    tiered_pricing_percentage_rules?: any[];
    tiered_pricing_minimum_quantity?: number | null;
    product_cat?: number[];
    product_brand?: number[];
}
export interface MappedProduct {
    sourceId: number;
    sourceUrl: string;
    sku: string;
    slug: string;
    title: string;
    description: string;
    categoryId: number;
    brandId: number | null;
    modelId: number | null;
    retailPrice: number;
    salePrice: number | null;
    stockQty: number;
    minOrderQty: number;
    qualityGrade: string | null;
    isActive: boolean;
    images: Array<{
        imageUrl: string;
        altText: string;
        sortOrder: number;
        isPrimary: boolean;
    }>;
    wholesaleTiers: Array<{
        minQuantity: number;
        tierPrice: number;
    }>;
    compatibilities: Array<{
        modelName: string;
        brandName: string;
    }>;
    attributes: Array<{
        name: string;
        value: string;
    }>;
}
export interface MigrationSummary {
    sourceTotalDiscovered: number;
    pagesProcessed: number;
    productsImported: number;
    productsUpdated: number;
    productsSkipped: number;
    productsFailed: number;
    imagesImported: number;
    imagesFailed: number;
    wholesaleTiersImported: number;
    compatibilitiesImported: number;
    startTime: string;
    endTime: string;
    durationMs: number;
}

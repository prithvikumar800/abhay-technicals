import { SourceStorePrices, SourceStoreCategory, SourceStoreProduct, SourceWpProduct, MappedProduct } from './migration.types.js';
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
export declare function parsePrices(prices: SourceStorePrices): {
    retailPrice: number;
    salePrice: number | null;
};
export declare function parseWholesaleTiers(fixedRules?: Record<string, number | string>, percentageRules?: any[], retailPrice?: number): Array<{
    minQuantity: number;
    tierPrice: number;
}>;
export declare function generateSku(sourceSku: string | undefined, sourceId: number): string;
export declare function detectQualityGrade(title: string, categoryName: string): string | null;
export declare function detectBrand(title: string, knownBrands: KnownBrand[]): KnownBrand | null;
export declare function extractModels(title: string, brand: KnownBrand | null): Array<{
    modelName: string;
    brandName: string;
}>;
export declare function resolveCategory(sourceCategories: SourceStoreCategory[], existingCategories: KnownCategory[], categoryAliases?: Record<string, string>): KnownCategory;
export declare function mapProduct(storeProduct: SourceStoreProduct, wpProduct: SourceWpProduct | undefined, knownCategories: KnownCategory[], knownBrands: KnownBrand[]): MappedProduct;

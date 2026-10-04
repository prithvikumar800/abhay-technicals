export interface CategoryEntity {
    id: number;
    parentId?: number | null;
    name: string;
    slug: string;
    imageUrl?: string | null;
    sortOrder: number;
    isActive: boolean;
}
export interface BrandEntity {
    id: number;
    name: string;
    slug: string;
    logoUrl?: string | null;
    isActive: boolean;
}
export interface DeviceModelEntity {
    id: number;
    brandId: number;
    name: string;
    slug: string;
    releaseYear?: number | null;
    isActive: boolean;
}
export interface WholesaleTierEntity {
    id: string;
    productId: string;
    minQuantity: number;
    tierPrice: number;
}
export interface ProductEntity {
    id: string;
    sku: string;
    slug: string;
    title: string;
    description?: string | null;
    categoryId: number;
    brandId?: number | null;
    modelId?: number | null;
    retailPrice: number;
    salePrice?: number | null;
    minOrderQty: number;
    stockQty: number;
    weightGrams: number;
    qualityGrade?: string | null;
    isActive: boolean;
    category?: CategoryEntity;
    brand?: BrandEntity;
    model?: DeviceModelEntity;
    images?: {
        id: string;
        imageUrl: string;
        isPrimary: boolean;
    }[];
    wholesaleTiers?: WholesaleTierEntity[];
    compatibleModels?: DeviceModelEntity[];
}
export interface CatalogueRepository {
    findCategories(): Promise<CategoryEntity[]>;
    findCategoryBySlug(slug: string): Promise<CategoryEntity | null>;
    findBrands(): Promise<BrandEntity[]>;
    findBrandBySlug(slug: string): Promise<BrandEntity | null>;
    findModelsByBrand(brandId: number): Promise<DeviceModelEntity[]>;
    findModelBySlug(slug: string): Promise<DeviceModelEntity | null>;
    findProducts(filters: {
        categorySlug?: string;
        brandSlug?: string;
        modelSlug?: string;
        search?: string;
        page: number;
        limit: number;
    }): Promise<{
        products: ProductEntity[];
        total: number;
    }>;
    findProductBySlug(slug: string): Promise<ProductEntity | null>;
    findProductById(id: string): Promise<ProductEntity | null>;
}
export declare class InMemoryCatalogueRepository implements CatalogueRepository {
    private categories;
    private brands;
    private models;
    private products;
    constructor();
    private seedInitialData;
    findCategories(): Promise<CategoryEntity[]>;
    findCategoryBySlug(slug: string): Promise<CategoryEntity | null>;
    findBrands(): Promise<BrandEntity[]>;
    findBrandBySlug(slug: string): Promise<BrandEntity | null>;
    findModelsByBrand(brandId: number): Promise<DeviceModelEntity[]>;
    findModelBySlug(slug: string): Promise<DeviceModelEntity | null>;
    findProducts(filters: {
        categorySlug?: string;
        brandSlug?: string;
        modelSlug?: string;
        search?: string;
        page: number;
        limit: number;
    }): Promise<{
        products: ProductEntity[];
        total: number;
    }>;
    findProductBySlug(slug: string): Promise<ProductEntity | null>;
    findProductById(id: string): Promise<ProductEntity | null>;
}

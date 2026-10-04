import { PrismaClient } from '@prisma/client';
import { CatalogueRepository, CategoryEntity, BrandEntity, DeviceModelEntity, ProductEntity } from './catalogue.repository.js';
export declare class PrismaCatalogueRepository implements CatalogueRepository {
    private prisma;
    constructor(prisma?: PrismaClient);
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
    createProduct(data: {
        sku: string;
        slug: string;
        title: string;
        description?: string;
        categoryId: number;
        brandId?: number;
        modelId?: number;
        retailPrice: number;
        salePrice?: number | null;
        minOrderQty: number;
        stockQty: number;
        weightGrams?: number;
        qualityGrade?: string;
        isActive?: boolean;
        compatibleModelIds?: number[];
        wholesaleTiers?: {
            minQuantity: number;
            tierPrice: number;
        }[];
        images?: {
            imageUrl: string;
            isPrimary?: boolean;
            sortOrder?: number;
        }[];
    }): Promise<ProductEntity>;
    private mapPrismaProductToEntity;
}

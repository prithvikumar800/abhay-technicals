import { CatalogueRepository } from '../repositories/catalogue.repository.js';
import { AuthenticatedUser, WholesalePricingMode } from '../types/index.js';
export declare class CatalogueService {
    private catalogueRepo;
    private wholesaleMode;
    constructor(catalogueRepo: CatalogueRepository, wholesaleMode?: WholesalePricingMode);
    setWholesaleMode(mode: WholesalePricingMode): void;
    getWholesaleMode(): WholesalePricingMode;
    getCategories(): Promise<import("../repositories/catalogue.repository.js").CategoryEntity[]>;
    getBrands(): Promise<import("../repositories/catalogue.repository.js").BrandEntity[]>;
    getModelsByBrand(brandId: number): Promise<import("../repositories/catalogue.repository.js").DeviceModelEntity[]>;
    getProducts(filters: {
        categorySlug?: string;
        brandSlug?: string;
        modelSlug?: string;
        search?: string;
        page: number;
        limit: number;
    }, currentUser?: AuthenticatedUser): Promise<{
        products: any[];
        total: number;
    }>;
    getProductBySlug(slug: string, currentUser?: AuthenticatedUser): Promise<any>;
    /**
     * Applies the core Wholesale Pricing Visibility Rule:
     * - LOGIN_GATED: Strips wholesale tiers if user is unauthenticated.
     * - WHOLESALER_ONLY: Strips wholesale tiers if user is not WHOLESALER or ADMIN.
     * - PUBLIC: Keeps wholesale tiers visible to all visitors.
     */
    private sanitizeProductForUser;
    private canUserViewWholesale;
}

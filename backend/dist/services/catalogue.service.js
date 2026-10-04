"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogueService = void 0;
const errorHandler_middleware_js_1 = require("../middleware/errorHandler.middleware.js");
class CatalogueService {
    catalogueRepo;
    wholesaleMode;
    constructor(catalogueRepo, wholesaleMode = 'LOGIN_GATED') {
        this.catalogueRepo = catalogueRepo;
        this.wholesaleMode = wholesaleMode;
    }
    setWholesaleMode(mode) {
        this.wholesaleMode = mode;
    }
    getWholesaleMode() {
        return this.wholesaleMode;
    }
    async getCategories() {
        return this.catalogueRepo.findCategories();
    }
    async getBrands() {
        return this.catalogueRepo.findBrands();
    }
    async getModelsByBrand(brandId) {
        return this.catalogueRepo.findModelsByBrand(brandId);
    }
    async getProducts(filters, currentUser) {
        const result = await this.catalogueRepo.findProducts(filters);
        const sanitizedProducts = result.products.map((p) => this.sanitizeProductForUser(p, currentUser));
        return { products: sanitizedProducts, total: result.total };
    }
    async getProductBySlug(slug, currentUser) {
        const product = await this.catalogueRepo.findProductBySlug(slug);
        if (!product) {
            throw new errorHandler_middleware_js_1.AppError('Product not found', 404, 'PRODUCT_NOT_FOUND');
        }
        return this.sanitizeProductForUser(product, currentUser);
    }
    /**
     * Applies the core Wholesale Pricing Visibility Rule:
     * - LOGIN_GATED: Strips wholesale tiers if user is unauthenticated.
     * - WHOLESALER_ONLY: Strips wholesale tiers if user is not WHOLESALER or ADMIN.
     * - PUBLIC: Keeps wholesale tiers visible to all visitors.
     */
    sanitizeProductForUser(product, user) {
        const canViewWholesale = this.canUserViewWholesale(user);
        return {
            id: product.id,
            sku: product.sku,
            slug: product.slug,
            title: product.title,
            description: product.description,
            categoryId: product.categoryId,
            brandId: product.brandId,
            modelId: product.modelId,
            retailPrice: product.retailPrice,
            salePrice: product.salePrice,
            minOrderQty: product.minOrderQty,
            stockQty: product.stockQty,
            weightGrams: product.weightGrams,
            qualityGrade: product.qualityGrade,
            images: product.images || [],
            category: product.category,
            brand: product.brand,
            model: product.model,
            wholesalePricingEnabled: canViewWholesale,
            wholesaleTiers: canViewWholesale ? product.wholesaleTiers || [] : undefined,
            loginRequiredForWholesale: !canViewWholesale && this.wholesaleMode === 'LOGIN_GATED',
        };
    }
    canUserViewWholesale(user) {
        if (this.wholesaleMode === 'PUBLIC')
            return true;
        if (this.wholesaleMode === 'LOGIN_GATED')
            return !!user;
        if (this.wholesaleMode === 'WHOLESALER_ONLY') {
            return !!user && (user.role === 'WHOLESALER' || user.role === 'ADMIN');
        }
        return false;
    }
}
exports.CatalogueService = CatalogueService;
//# sourceMappingURL=catalogue.service.js.map
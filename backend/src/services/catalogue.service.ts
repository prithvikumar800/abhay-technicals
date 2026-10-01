import { CatalogueRepository, ProductEntity } from '../repositories/catalogue.repository.js';
import { AuthenticatedUser, WholesalePricingMode } from '../types/index.js';
import { AppError } from '../middleware/errorHandler.middleware.js';

export class CatalogueService {
  constructor(
    private catalogueRepo: CatalogueRepository,
    private wholesaleMode: WholesalePricingMode = 'LOGIN_GATED'
  ) {}

  setWholesaleMode(mode: WholesalePricingMode) {
    this.wholesaleMode = mode;
  }

  getWholesaleMode(): WholesalePricingMode {
    return this.wholesaleMode;
  }

  async getCategories() {
    return this.catalogueRepo.findCategories();
  }

  async getBrands() {
    return this.catalogueRepo.findBrands();
  }

  async getModelsByBrand(brandId: number) {
    return this.catalogueRepo.findModelsByBrand(brandId);
  }

  async getProducts(
    filters: {
      categorySlug?: string;
      brandSlug?: string;
      modelSlug?: string;
      search?: string;
      page: number;
      limit: number;
    },
    currentUser?: AuthenticatedUser
  ) {
    const result = await this.catalogueRepo.findProducts(filters);
    const sanitizedProducts = result.products.map((p) => this.sanitizeProductForUser(p, currentUser));
    return { products: sanitizedProducts, total: result.total };
  }

  async getProductBySlug(slug: string, currentUser?: AuthenticatedUser) {
    const product = await this.catalogueRepo.findProductBySlug(slug);
    if (!product) {
      throw new AppError('Product not found', 404, 'PRODUCT_NOT_FOUND');
    }
    return this.sanitizeProductForUser(product, currentUser);
  }

  /**
   * Applies the core Wholesale Pricing Visibility Rule:
   * - LOGIN_GATED: Strips wholesale tiers if user is unauthenticated.
   * - WHOLESALER_ONLY: Strips wholesale tiers if user is not WHOLESALER or ADMIN.
   * - PUBLIC: Keeps wholesale tiers visible to all visitors.
   */
  private sanitizeProductForUser(product: ProductEntity, user?: AuthenticatedUser): any {
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

  private canUserViewWholesale(user?: AuthenticatedUser): boolean {
    if (this.wholesaleMode === 'PUBLIC') return true;
    if (this.wholesaleMode === 'LOGIN_GATED') return !!user;
    if (this.wholesaleMode === 'WHOLESALER_ONLY') {
      return !!user && (user.role === 'WHOLESALER' || user.role === 'ADMIN');
    }
    return false;
  }
}

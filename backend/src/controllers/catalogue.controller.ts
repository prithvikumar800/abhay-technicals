import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { CatalogueService } from '../services/catalogue.service.js';
import { sendSuccess } from '../utils/response.js';

export class CatalogueController {
  constructor(private catalogueService: CatalogueService) {}

  getCategories = async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
    const categories = await this.catalogueService.getCategories();
    sendSuccess(res, categories, 'Categories retrieved successfully');
  };

  getBrands = async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
    const brands = await this.catalogueService.getBrands();
    sendSuccess(res, brands, 'Brands retrieved successfully');
  };

  getModelsByBrand = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const brandId = parseInt(req.params.brandId, 10);
    const models = await this.catalogueService.getModelsByBrand(brandId);
    sendSuccess(res, models, 'Models retrieved successfully');
  };

  getProducts = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const query = req.query as any;
    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '20', 10);

    const result = await this.catalogueService.getProducts(
      {
        categorySlug: query.categorySlug,
        brandSlug: query.brandSlug,
        modelSlug: query.modelSlug,
        search: query.search,
        page,
        limit,
      },
      req.user // Pass authenticated user context for wholesale tier gating
    );

    sendSuccess(res, result.products, 'Products retrieved successfully', 200, {
      pagination: {
        page,
        limit,
        totalItems: result.total,
        totalPages: Math.ceil(result.total / limit),
      },
    });
  };

  getProductBySlug = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { slug } = req.params;
    const product = await this.catalogueService.getProductBySlug(slug, req.user);
    sendSuccess(res, product, 'Product details retrieved successfully');
  };
}

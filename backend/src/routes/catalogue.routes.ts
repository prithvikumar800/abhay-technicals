import { Router, Request, Response, NextFunction } from 'express';
import { CatalogueController } from '../controllers/catalogue.controller.js';
import { CatalogueService } from '../services/catalogue.service.js';
import { PrismaCatalogueRepository } from '../repositories/prisma-catalogue.repository.js';
import { InMemoryCatalogueRepository } from '../repositories/catalogue.repository.js';
import { validate } from '../middleware/validate.middleware.js';
import { productQuerySchema, productSlugParamSchema } from '../validators/catalogue.validator.js';
import { optionalAuth } from '../middleware/auth.middleware.js';

export function createCatalogueRouter(
  catalogueService?: CatalogueService
): Router {
  const router = Router();
  const repo = process.env.DATABASE_URL
    ? new PrismaCatalogueRepository()
    : new InMemoryCatalogueRepository();
  const service = catalogueService || new CatalogueService(repo);
  const controller = new CatalogueController(service);

  // Direct paths when mounted at / or /api/v1
  router.get('/categories', controller.getCategories);
  router.get('/brands', controller.getBrands);
  router.get('/brands/:brandId/models', controller.getModelsByBrand);
  router.get('/products', optionalAuth, validate(productQuerySchema, 'query'), controller.getProducts);
  router.get('/products/:slug', optionalAuth, validate(productSlugParamSchema, 'params'), controller.getProductBySlug);

  // Subpath fallbacks when mounted under specific prefixes
  router.get('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.baseUrl.endsWith('/categories')) {
      void controller.getCategories(req as any, res);
      return;
    }
    if (req.baseUrl.endsWith('/brands')) {
      void controller.getBrands(req as any, res);
      return;
    }
    if (req.baseUrl.endsWith('/products')) {
      void controller.getProducts(req as any, res);
      return;
    }
    next();
  });

  router.get('/:param', (req: Request, res: Response, next: NextFunction) => {
    if (req.baseUrl.endsWith('/products')) {
      (req.params as any).slug = req.params.param;
      void controller.getProductBySlug(req as any, res);
      return;
    }
    next();
  });

  return router;
}

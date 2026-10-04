"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCatalogueRouter = createCatalogueRouter;
const express_1 = require("express");
const catalogue_controller_js_1 = require("../controllers/catalogue.controller.js");
const catalogue_service_js_1 = require("../services/catalogue.service.js");
const prisma_catalogue_repository_js_1 = require("../repositories/prisma-catalogue.repository.js");
const catalogue_repository_js_1 = require("../repositories/catalogue.repository.js");
const validate_middleware_js_1 = require("../middleware/validate.middleware.js");
const catalogue_validator_js_1 = require("../validators/catalogue.validator.js");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
function createCatalogueRouter(catalogueService) {
    const router = (0, express_1.Router)();
    const repo = process.env.DATABASE_URL
        ? new prisma_catalogue_repository_js_1.PrismaCatalogueRepository()
        : new catalogue_repository_js_1.InMemoryCatalogueRepository();
    const service = catalogueService || new catalogue_service_js_1.CatalogueService(repo);
    const controller = new catalogue_controller_js_1.CatalogueController(service);
    // Direct paths when mounted at / or /api/v1
    router.get('/categories', controller.getCategories);
    router.get('/brands', controller.getBrands);
    router.get('/brands/:brandId/models', controller.getModelsByBrand);
    router.get('/products', auth_middleware_js_1.optionalAuth, (0, validate_middleware_js_1.validate)(catalogue_validator_js_1.productQuerySchema, 'query'), controller.getProducts);
    router.get('/products/:slug', auth_middleware_js_1.optionalAuth, (0, validate_middleware_js_1.validate)(catalogue_validator_js_1.productSlugParamSchema, 'params'), controller.getProductBySlug);
    // Subpath fallbacks when mounted under specific prefixes
    router.get('/', (req, res, next) => {
        if (req.baseUrl.endsWith('/categories')) {
            void controller.getCategories(req, res);
            return;
        }
        if (req.baseUrl.endsWith('/brands')) {
            void controller.getBrands(req, res);
            return;
        }
        if (req.baseUrl.endsWith('/products')) {
            void controller.getProducts(req, res);
            return;
        }
        next();
    });
    router.get('/:param', (req, res, next) => {
        if (req.baseUrl.endsWith('/products')) {
            req.params.slug = req.params.param;
            void controller.getProductBySlug(req, res);
            return;
        }
        next();
    });
    return router;
}
//# sourceMappingURL=catalogue.routes.js.map
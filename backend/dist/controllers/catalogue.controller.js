"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogueController = void 0;
const response_js_1 = require("../utils/response.js");
class CatalogueController {
    catalogueService;
    constructor(catalogueService) {
        this.catalogueService = catalogueService;
    }
    getCategories = async (_req, res) => {
        const categories = await this.catalogueService.getCategories();
        (0, response_js_1.sendSuccess)(res, categories, 'Categories retrieved successfully');
    };
    getBrands = async (_req, res) => {
        const brands = await this.catalogueService.getBrands();
        (0, response_js_1.sendSuccess)(res, brands, 'Brands retrieved successfully');
    };
    getModelsByBrand = async (req, res) => {
        const brandId = parseInt(req.params.brandId, 10);
        const models = await this.catalogueService.getModelsByBrand(brandId);
        (0, response_js_1.sendSuccess)(res, models, 'Models retrieved successfully');
    };
    getProducts = async (req, res) => {
        const query = req.query;
        const page = parseInt(query.page || '1', 10);
        const limit = parseInt(query.limit || '20', 10);
        const result = await this.catalogueService.getProducts({
            categorySlug: query.categorySlug,
            brandSlug: query.brandSlug,
            modelSlug: query.modelSlug,
            search: query.search,
            page,
            limit,
        }, req.user // Pass authenticated user context for wholesale tier gating
        );
        (0, response_js_1.sendSuccess)(res, result.products, 'Products retrieved successfully', 200, {
            pagination: {
                page,
                limit,
                totalItems: result.total,
                totalPages: Math.ceil(result.total / limit),
            },
        });
    };
    getProductBySlug = async (req, res) => {
        const { slug } = req.params;
        const product = await this.catalogueService.getProductBySlug(slug, req.user);
        (0, response_js_1.sendSuccess)(res, product, 'Product details retrieved successfully');
    };
}
exports.CatalogueController = CatalogueController;
//# sourceMappingURL=catalogue.controller.js.map
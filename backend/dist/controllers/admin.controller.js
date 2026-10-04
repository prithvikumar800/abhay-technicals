"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const prisma_js_1 = require("../lib/prisma.js");
const response_js_1 = require("../utils/response.js");
const prisma_catalogue_repository_js_1 = require("../repositories/prisma-catalogue.repository.js");
const prisma_order_repository_js_1 = require("../repositories/prisma-order.repository.js");
class AdminController {
    catalogueRepo = new prisma_catalogue_repository_js_1.PrismaCatalogueRepository(prisma_js_1.prisma);
    orderRepo = new prisma_order_repository_js_1.PrismaOrderRepository(prisma_js_1.prisma);
    getDashboardStats = async (_req, res) => {
        try {
            const [totalProducts, lowStockCount, totalOrders, totalCustomers] = await Promise.all([
                prisma_js_1.prisma.product.count({ where: { isActive: true } }),
                prisma_js_1.prisma.product.count({ where: { isActive: true, stockQty: { lte: 10 } } }),
                prisma_js_1.prisma.order.count(),
                prisma_js_1.prisma.user.count({ where: { role: 'CUSTOMER' } }),
            ]);
            const revenueAgg = await prisma_js_1.prisma.order.aggregate({
                _sum: { totalAmount: true },
                where: { paymentStatus: 'PAID' },
            });
            (0, response_js_1.sendSuccess)(res, {
                totalSales: Number(revenueAgg._sum.totalAmount || 0),
                totalOrders,
                totalCustomers,
                totalProducts,
                lowStockCount,
                pendingOrdersCount: 0,
                pendingShipmentsCount: 0,
                todayRevenue: Number(revenueAgg._sum.totalAmount || 0),
            }, 'Admin executive dashboard metrics retrieved successfully');
        }
        catch (err) {
            (0, response_js_1.sendError)(res, err.message, 500, 'FAILED_TO_LOAD_METRICS');
        }
    };
    getProducts = async (req, res) => {
        try {
            const page = parseInt(req.query.page || '1', 10);
            const limit = parseInt(req.query.limit || '50', 10);
            const search = req.query.search;
            const categorySlug = req.query.categorySlug;
            const brandSlug = req.query.brandSlug;
            const result = await this.catalogueRepo.findProducts({
                page,
                limit,
                search,
                categorySlug,
                brandSlug,
            });
            (0, response_js_1.sendSuccess)(res, result.products, 'Admin products retrieved successfully', 200, {
                pagination: {
                    page,
                    limit,
                    totalItems: result.total,
                    totalPages: Math.ceil(result.total / limit),
                },
            });
        }
        catch (err) {
            (0, response_js_1.sendError)(res, err.message, 500, 'FAILED_TO_LOAD_PRODUCTS');
        }
    };
    createProduct = async (req, res) => {
        try {
            const body = req.body;
            if (!body.sku || !body.title || !body.categoryId || body.retailPrice == null) {
                (0, response_js_1.sendError)(res, 'SKU, title, categoryId, and retailPrice are required', 400, 'VALIDATION_ERROR');
                return;
            }
            // Generate or normalize slug
            const slug = (body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
                .toLowerCase()
                .trim()
                .replace(/^-+|-+$/g, '');
            const product = await this.catalogueRepo.createProduct({
                sku: body.sku.toUpperCase(),
                slug,
                title: body.title,
                description: body.description,
                categoryId: Number(body.categoryId),
                brandId: body.brandId ? Number(body.brandId) : undefined,
                modelId: body.modelId ? Number(body.modelId) : undefined,
                retailPrice: Number(body.retailPrice),
                salePrice: body.salePrice ? Number(body.salePrice) : null,
                minOrderQty: body.minOrderQty ? Number(body.minOrderQty) : 1,
                stockQty: body.stockQty ? Number(body.stockQty) : 0,
                weightGrams: body.weightGrams ? Number(body.weightGrams) : 100,
                qualityGrade: body.qualityGrade || 'OEM Tested',
                isActive: body.isActive ?? true,
                compatibleModelIds: Array.isArray(body.compatibleModelIds)
                    ? body.compatibleModelIds.map(Number)
                    : undefined,
                wholesaleTiers: Array.isArray(body.wholesaleTiers)
                    ? body.wholesaleTiers.map((t) => ({
                        minQuantity: Number(t.minQuantity),
                        tierPrice: Number(t.tierPrice),
                    }))
                    : undefined,
                images: Array.isArray(body.images) ? body.images : undefined,
            });
            (0, response_js_1.sendSuccess)(res, product, 'Product created and stored in database successfully', 201);
        }
        catch (err) {
            if (err.code === 'P2002') {
                (0, response_js_1.sendError)(res, 'A product with this SKU or slug already exists', 409, 'DUPLICATE_ENTRY');
                return;
            }
            (0, response_js_1.sendError)(res, err.message, 500, 'FAILED_TO_CREATE_PRODUCT');
        }
    };
    updateProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const updated = await prisma_js_1.prisma.product.update({
                where: { id },
                data: {
                    title: body.title,
                    retailPrice: body.retailPrice != null ? Number(body.retailPrice) : undefined,
                    salePrice: body.salePrice != null ? Number(body.salePrice) : undefined,
                    stockQty: body.stockQty != null ? Number(body.stockQty) : undefined,
                    minOrderQty: body.minOrderQty != null ? Number(body.minOrderQty) : undefined,
                    isActive: body.isActive != null ? Boolean(body.isActive) : undefined,
                },
            });
            (0, response_js_1.sendSuccess)(res, updated, 'Product updated successfully');
        }
        catch (err) {
            (0, response_js_1.sendError)(res, err.message, 500, 'FAILED_TO_UPDATE_PRODUCT');
        }
    };
    deleteProduct = async (req, res) => {
        try {
            const { id } = req.params;
            // Soft-delete by setting isActive to false
            await prisma_js_1.prisma.product.update({
                where: { id },
                data: { isActive: false, deletedAt: new Date() },
            });
            (0, response_js_1.sendSuccess)(res, { deleted: true, id }, 'Product deactivated from catalogue');
        }
        catch (err) {
            (0, response_js_1.sendError)(res, err.message, 500, 'FAILED_TO_DELETE_PRODUCT');
        }
    };
    getOrders = async (_req, res) => {
        try {
            const orders = await this.orderRepo.findAllOrders();
            (0, response_js_1.sendSuccess)(res, orders, 'Orders retrieved successfully');
        }
        catch (err) {
            (0, response_js_1.sendError)(res, err.message, 500, 'FAILED_TO_LOAD_ORDERS');
        }
    };
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map
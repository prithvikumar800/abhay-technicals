import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { prisma } from '../lib/prisma.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { PrismaCatalogueRepository } from '../repositories/prisma-catalogue.repository.js';
import { PrismaOrderRepository } from '../repositories/prisma-order.repository.js';

export class AdminController {
  private catalogueRepo = new PrismaCatalogueRepository(prisma);
  private orderRepo = new PrismaOrderRepository(prisma);

  getDashboardStats = async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const [totalProducts, lowStockCount, totalOrders, totalCustomers] = await Promise.all([
        prisma.product.count({ where: { isActive: true } }),
        prisma.product.count({ where: { isActive: true, stockQty: { lte: 10 } } }),
        prisma.order.count(),
        prisma.user.count({ where: { role: 'CUSTOMER' } }),
      ]);

      const revenueAgg = await prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { paymentStatus: 'PAID' },
      });

      sendSuccess(
        res,
        {
          totalSales: Number(revenueAgg._sum.totalAmount || 0),
          totalOrders,
          totalCustomers,
          totalProducts,
          lowStockCount,
          pendingOrdersCount: 0,
          pendingShipmentsCount: 0,
          todayRevenue: Number(revenueAgg._sum.totalAmount || 0),
        },
        'Admin executive dashboard metrics retrieved successfully'
      );
    } catch (err: any) {
      sendError(res, err.message, 500, 'FAILED_TO_LOAD_METRICS');
    }
  };

  getProducts = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '50', 10);
      const search = req.query.search as string;
      const categorySlug = req.query.categorySlug as string;
      const brandSlug = req.query.brandSlug as string;

      const result = await this.catalogueRepo.findProducts({
        page,
        limit,
        search,
        categorySlug,
        brandSlug,
      });

      sendSuccess(res, result.products, 'Admin products retrieved successfully', 200, {
        pagination: {
          page,
          limit,
          totalItems: result.total,
          totalPages: Math.ceil(result.total / limit),
        },
      });
    } catch (err: any) {
      sendError(res, err.message, 500, 'FAILED_TO_LOAD_PRODUCTS');
    }
  };

  createProduct = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const body = req.body;

      if (!body.sku || !body.title || !body.categoryId || body.retailPrice == null) {
        sendError(res, 'SKU, title, categoryId, and retailPrice are required', 400, 'VALIDATION_ERROR');
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
          ? body.wholesaleTiers.map((t: any) => ({
              minQuantity: Number(t.minQuantity),
              tierPrice: Number(t.tierPrice),
            }))
          : undefined,
        images: Array.isArray(body.images) ? body.images : undefined,
      });

      sendSuccess(res, product, 'Product created and stored in database successfully', 201);
    } catch (err: any) {
      if (err.code === 'P2002') {
        sendError(res, 'A product with this SKU or slug already exists', 409, 'DUPLICATE_ENTRY');
        return;
      }
      sendError(res, err.message, 500, 'FAILED_TO_CREATE_PRODUCT');
    }
  };

  updateProduct = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const body = req.body;

      const updated = await prisma.product.update({
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

      sendSuccess(res, updated, 'Product updated successfully');
    } catch (err: any) {
      sendError(res, err.message, 500, 'FAILED_TO_UPDATE_PRODUCT');
    }
  };

  deleteProduct = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      // Soft-delete by setting isActive to false
      await prisma.product.update({
        where: { id },
        data: { isActive: false, deletedAt: new Date() },
      });
      sendSuccess(res, { deleted: true, id }, 'Product deactivated from catalogue');
    } catch (err: any) {
      sendError(res, err.message, 500, 'FAILED_TO_DELETE_PRODUCT');
    }
  };

  getOrders = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;
      const status = req.query.status as any;
      const search = req.query.search as string | undefined;

      const result = await this.orderRepo.findAllOrdersPaginated({ page, limit, status, search });
      sendSuccess(
        res,
        {
          orders: result.orders,
          pagination: {
            page: result.page,
            limit: result.limit,
            totalItems: result.total,
            totalPages: result.totalPages,
          },
        },
        'Orders retrieved successfully'
      );
    } catch (err: any) {
      sendError(res, err.message, 500, 'FAILED_TO_LOAD_ORDERS');
    }
  };

  getOrderById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      let order = await this.orderRepo.findOrderById(id);
      if (!order) {
        order = await this.orderRepo.findOrderByNumber(id);
      }
      if (!order) {
        sendError(res, `Order "${id}" not found`, 404, 'ORDER_NOT_FOUND');
        return;
      }
      sendSuccess(res, order, 'Order details retrieved successfully');
    } catch (err: any) {
      sendError(res, err.message, 500, 'FAILED_TO_LOAD_ORDER');
    }
  };

  updateOrderStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { orderStatus, comment } = req.body;
      const adminUserId = req.user?.id;

      if (!orderStatus) {
        sendError(res, 'Target orderStatus is required', 400, 'MISSING_STATUS');
        return;
      }

      const updated = await this.orderRepo.updateOrderStatus(id, orderStatus, comment, adminUserId);
      sendSuccess(res, updated, `Order status successfully transitioned to ${orderStatus}`);
    } catch (err: any) {
      sendError(res, err.message, 500, 'FAILED_TO_UPDATE_ORDER_STATUS');
    }
  };
}

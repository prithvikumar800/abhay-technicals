import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { OrderService } from '../services/order.service.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { OrderStatus } from '@prisma/client';

export class OrderController {
  constructor(private orderService: OrderService) {}

  createOrder = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const user = req.user!;
      const body = req.body;
      const address = body.shippingAddress || body.address;

      if (!address) {
        sendError(res, 'Shipping address details are required', 400, 'MISSING_SHIPPING_ADDRESS');
        return;
      }

      const order = await this.orderService.createOrderFromCart(
        user.id,
        {
          address,
          customerNotes: body.customerNotes,
          paymentMethod: body.paymentMethod,
        },
        user
      );

      sendSuccess(
        res,
        order,
        `Order ${order?.orderNumber} created successfully with Delhivery tracking AWB assigned`,
        201
      );
    } catch (err: any) {
      const isCartEmpty = err.message.includes('empty cart');
      const isStockIssue = err.message.includes('Insufficient stock');
      const statusCode = isCartEmpty || isStockIssue ? 400 : 500;
      const errorCode = isCartEmpty ? 'CART_EMPTY' : isStockIssue ? 'STOCK_UNAVAILABLE' : 'ORDER_CREATION_FAILED';

      sendError(res, err.message, statusCode, errorCode);
    }
  };

  getUserOrders = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const user = req.user!;
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const status = req.query.status as OrderStatus | undefined;

      const result = await this.orderService.getUserOrders(user.id, { page, limit, status });

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
        'User order history retrieved successfully'
      );
    } catch (err: any) {
      sendError(res, err.message, 500, 'FAILED_TO_LOAD_ORDERS');
    }
  };

  getOrderById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const user = req.user!;
      const { id } = req.params;
      const isAdmin = user.role === 'ADMIN' || user.role === 'STAFF';

      const order = await this.orderService.getOrderById(id, user.id, isAdmin);
      sendSuccess(res, order, 'Order details retrieved successfully');
    } catch (err: any) {
      const isNotFound = err.message.includes('not found');
      const isAccessDenied = err.message.includes('Access denied');
      const statusCode = isNotFound ? 404 : isAccessDenied ? 403 : 500;
      const errorCode = isNotFound ? 'ORDER_NOT_FOUND' : isAccessDenied ? 'ACCESS_DENIED' : 'FAILED_TO_LOAD_ORDER';

      sendError(res, err.message, statusCode, errorCode);
    }
  };

  cancelOrder = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const user = req.user!;
      const { id } = req.params;
      const { reason } = req.body || {};
      const isAdmin = user.role === 'ADMIN' || user.role === 'STAFF';

      const cancelledOrder = await this.orderService.cancelOrder(id, user.id, reason, isAdmin);
      sendSuccess(res, cancelledOrder, 'Order cancelled and stock inventory replenished successfully');
    } catch (err: any) {
      const isNotFound = err.message.includes('not found');
      const isForbidden = err.message.includes('Access denied');
      const isInvalidState = err.message.includes('can no longer be self-cancelled') || err.message.includes('already cancelled');
      const statusCode = isNotFound ? 404 : isForbidden ? 403 : isInvalidState ? 400 : 500;
      const errorCode = isNotFound ? 'ORDER_NOT_FOUND' : isForbidden ? 'FORBIDDEN' : 'ORDER_CANCEL_FAILED';

      sendError(res, err.message, statusCode, errorCode);
    }
  };

  getOrderInvoice = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const user = req.user!;
      const { id } = req.params;
      const isAdmin = user.role === 'ADMIN' || user.role === 'STAFF';

      const invoice = await this.orderService.getOrderInvoice(id, user.id, isAdmin);
      sendSuccess(res, invoice, 'GST tax invoice breakdown generated successfully');
    } catch (err: any) {
      const isNotFound = err.message.includes('not found');
      const isAccessDenied = err.message.includes('Access denied');
      const statusCode = isNotFound ? 404 : isAccessDenied ? 403 : 500;
      const errorCode = isNotFound ? 'ORDER_NOT_FOUND' : isAccessDenied ? 'ACCESS_DENIED' : 'FAILED_TO_LOAD_INVOICE';

      sendError(res, err.message, statusCode, errorCode);
    }
  };

  getAdminOrders = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;
      const status = req.query.status as OrderStatus | undefined;
      const search = req.query.search as string | undefined;

      const result = await this.orderService.getAdminOrders({ page, limit, status, search });

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
        'All client orders retrieved for admin dashboard'
      );
    } catch (err: any) {
      sendError(res, err.message, 500, 'FAILED_TO_LOAD_ADMIN_ORDERS');
    }
  };

  updateAdminOrderStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { orderStatus, comment } = req.body;
      const adminUserId = req.user?.id;

      const updated = await this.orderService.updateOrderStatusByAdmin(id, orderStatus, comment, adminUserId);
      sendSuccess(res, updated, `Order status successfully transitioned to ${orderStatus}`);
    } catch (err: any) {
      const isNotFound = err.message.includes('not found');
      const statusCode = isNotFound ? 404 : 500;
      sendError(res, err.message, statusCode, 'FAILED_TO_UPDATE_ORDER_STATUS');
    }
  };
}

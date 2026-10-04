"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrdersRouter = createOrdersRouter;
exports.createPaymentsRouter = createPaymentsRouter;
exports.createShipmentsRouter = createShipmentsRouter;
exports.createUsersRouter = createUsersRouter;
exports.createReviewsRouter = createReviewsRouter;
const express_1 = require("express");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const response_js_1 = require("../utils/response.js");
const prisma_order_repository_js_1 = require("../repositories/prisma-order.repository.js");
const prisma_cart_repository_js_1 = require("../repositories/prisma-cart.repository.js");
const prisma_catalogue_repository_js_1 = require("../repositories/prisma-catalogue.repository.js");
const cart_service_js_1 = require("../services/cart.service.js");
const prisma_js_1 = require("../lib/prisma.js");
function createOrdersRouter() {
    const router = (0, express_1.Router)();
    const orderRepo = new prisma_order_repository_js_1.PrismaOrderRepository(prisma_js_1.prisma);
    const cartService = new cart_service_js_1.CartService(new prisma_cart_repository_js_1.PrismaCartRepository(prisma_js_1.prisma), new prisma_catalogue_repository_js_1.PrismaCatalogueRepository(prisma_js_1.prisma));
    router.use(auth_middleware_js_1.requireAuth);
    // GET /api/v1/orders - List user orders
    router.get('/', async (req, res) => {
        try {
            const orders = await orderRepo.findOrdersByUser(req.user.id);
            (0, response_js_1.sendSuccess)(res, { orders }, 'User order history retrieved successfully');
        }
        catch (err) {
            (0, response_js_1.sendError)(res, err.message, 500, 'FAILED_TO_LOAD_ORDERS');
        }
    });
    // GET /api/v1/orders/:id - Get specific order details
    router.get('/:id', async (req, res) => {
        try {
            const order = await orderRepo.findOrderById(req.params.id);
            if (!order) {
                // Fallback search by orderNumber
                const byNum = await orderRepo.findOrderByNumber(req.params.id);
                if (!byNum) {
                    (0, response_js_1.sendError)(res, 'Order not found', 404, 'ORDER_NOT_FOUND');
                    return;
                }
                (0, response_js_1.sendSuccess)(res, byNum, 'Order details retrieved successfully');
                return;
            }
            (0, response_js_1.sendSuccess)(res, order, 'Order details retrieved successfully');
        }
        catch (err) {
            (0, response_js_1.sendError)(res, err.message, 500, 'FAILED_TO_LOAD_ORDER');
        }
    });
    // POST /api/v1/orders - Create new order from cart / checkout
    router.post('/', async (req, res) => {
        try {
            const body = req.body;
            const user = req.user;
            // Retrieve user active cart to ensure backend pricing authority
            const cart = await cartService.getOrCreateCart(user.id, undefined, user);
            if (cart.items.length === 0) {
                (0, response_js_1.sendError)(res, 'Cannot place an order with an empty cart', 400, 'CART_EMPTY');
                return;
            }
            // 1. Calculate backend-authoritative pricing (subtotal, shipping, totals)
            const subtotal = cart.subtotal;
            const freeShippingThreshold = 999.0;
            const standardShippingFee = 49.0;
            const shippingFee = subtotal >= freeShippingThreshold ? 0.0 : standardShippingFee;
            const taxAmount = 0.0; // Inclusive GST
            const totalAmount = subtotal + shippingFee;
            const orderNumber = `AT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
            const addressData = body.address || {
                name: user.phone,
                phone: user.phone,
                addressLine1: 'Gaffar Market, Karol Bagh',
                city: 'New Delhi',
                state: 'Delhi',
                pincode: body.shippingPincode || '110005',
            };
            const order = await orderRepo.createOrder({
                userId: user.id,
                orderNumber,
                subtotal,
                shippingFee,
                taxAmount,
                totalAmount,
                customerNotes: body.customerNotes,
                address: addressData,
                items: cart.items.map((i) => ({
                    productId: i.productId,
                    sku: i.sku,
                    productTitle: i.title,
                    unitPrice: i.unitPrice,
                    quantity: i.quantity,
                    totalPrice: i.lineTotal,
                    tierApplied: i.tierApplied || undefined,
                })),
            });
            // 2. Generate a mock Delhivery shipment & AWB
            const awbCode = `DEL${Math.floor(100000000 + Math.random() * 900000000)}`;
            await orderRepo.createMockShipment(order.id, awbCode);
            // 3. Clear user's cart after successful order creation
            await cartService.clearCart(cart.id);
            const createdOrder = await orderRepo.findOrderById(order.id);
            (0, response_js_1.sendSuccess)(res, createdOrder, 'Order created successfully with tracking AWB generated', 201);
        }
        catch (err) {
            (0, response_js_1.sendError)(res, err.message, 500, 'ORDER_CREATION_FAILED');
        }
    });
    return router;
}
function createPaymentsRouter() {
    const router = (0, express_1.Router)();
    // POST /api/v1/payments/webhook - Webhook listener
    router.post('/webhook', (_req, res) => {
        (0, response_js_1.sendSuccess)(res, { received: true }, 'Webhook received successfully');
    });
    return router;
}
function createShipmentsRouter() {
    const router = (0, express_1.Router)();
    const orderRepo = new prisma_order_repository_js_1.PrismaOrderRepository(prisma_js_1.prisma);
    // GET /api/v1/shipments/track/:awb - Public parcel tracking
    router.get('/track/:awb', async (req, res) => {
        try {
            const shipment = await orderRepo.findShipmentByAwb(req.params.awb);
            if (!shipment) {
                // Fallback for mock demo numbers
                (0, response_js_1.sendSuccess)(res, {
                    awb: req.params.awb,
                    courier: 'Delhivery Surface Express',
                    status: 'IN_TRANSIT',
                    trackingEvents: [
                        { milestone: 'MANIFEST_CREATED', location: 'Delhi Hub', eventTimestamp: new Date() },
                        { milestone: 'IN_TRANSIT', location: 'Regional Hub', eventTimestamp: new Date() },
                    ],
                }, 'Tracking details retrieved');
                return;
            }
            (0, response_js_1.sendSuccess)(res, shipment, 'Tracking details retrieved successfully');
        }
        catch (err) {
            (0, response_js_1.sendError)(res, err.message, 500, 'TRACKING_FAILED');
        }
    });
    return router;
}
function createUsersRouter() {
    const router = (0, express_1.Router)();
    router.use(auth_middleware_js_1.requireAuth);
    // GET /api/v1/users/addresses - Get saved delivery addresses
    router.get('/addresses', async (req, res) => {
        try {
            const addresses = await prisma_js_1.prisma.userAddress.findMany({
                where: { userId: req.user.id },
            });
            (0, response_js_1.sendSuccess)(res, { addresses }, 'Saved delivery addresses retrieved');
        }
        catch (err) {
            (0, response_js_1.sendError)(res, err.message, 500, 'FAILED_TO_LOAD_ADDRESSES');
        }
    });
    return router;
}
function createReviewsRouter() {
    const router = (0, express_1.Router)();
    // GET /api/v1/reviews/product/:productId - Public reviews for a product
    router.get('/product/:productId', async (req, res) => {
        try {
            const reviews = await prisma_js_1.prisma.review.findMany({
                where: { productId: req.params.productId, status: 'APPROVED' },
            });
            (0, response_js_1.sendSuccess)(res, { reviews }, 'Product reviews retrieved');
        }
        catch (err) {
            (0, response_js_1.sendError)(res, err.message, 500, 'FAILED_TO_LOAD_REVIEWS');
        }
    });
    return router;
}
//# sourceMappingURL=modules.routes.js.map
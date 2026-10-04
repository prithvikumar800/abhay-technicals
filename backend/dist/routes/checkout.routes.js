"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutRouter = createCheckoutRouter;
const express_1 = require("express");
const checkout_controller_js_1 = require("../controllers/checkout.controller.js");
const checkout_service_js_1 = require("../services/checkout.service.js");
const cart_service_js_1 = require("../services/cart.service.js");
const prisma_cart_repository_js_1 = require("../repositories/prisma-cart.repository.js");
const cart_repository_js_1 = require("../repositories/cart.repository.js");
const prisma_catalogue_repository_js_1 = require("../repositories/prisma-catalogue.repository.js");
const catalogue_repository_js_1 = require("../repositories/catalogue.repository.js");
const prisma_order_repository_js_1 = require("../repositories/prisma-order.repository.js");
const shipping_provider_js_1 = require("../lib/providers/shipping.provider.js");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const validate_middleware_js_1 = require("../middleware/validate.middleware.js");
const cart_validator_js_1 = require("../validators/cart.validator.js");
const response_js_1 = require("../utils/response.js");
const prisma_js_1 = require("../lib/prisma.js");
function createCheckoutRouter() {
    const router = (0, express_1.Router)();
    const cartRepo = process.env.DATABASE_URL
        ? new prisma_cart_repository_js_1.PrismaCartRepository(prisma_js_1.prisma)
        : new cart_repository_js_1.InMemoryCartRepository();
    const catalogueRepo = process.env.DATABASE_URL
        ? new prisma_catalogue_repository_js_1.PrismaCatalogueRepository(prisma_js_1.prisma)
        : new catalogue_repository_js_1.InMemoryCatalogueRepository();
    const orderRepo = new prisma_order_repository_js_1.PrismaOrderRepository(prisma_js_1.prisma);
    const cartService = new cart_service_js_1.CartService(cartRepo, catalogueRepo);
    const checkoutService = new checkout_service_js_1.CheckoutService(cartService, new shipping_provider_js_1.MockDelhiveryProvider());
    const controller = new checkout_controller_js_1.CheckoutController(checkoutService, cartService);
    // POST /api/v1/checkout/validate (Protected)
    router.post('/validate', auth_middleware_js_1.requireAuth, (0, validate_middleware_js_1.validate)(cart_validator_js_1.checkoutValidateSchema, 'body'), controller.validateCheckout);
    // POST /api/v1/checkout/process (Protected) - Alias to place order
    router.post('/process', auth_middleware_js_1.requireAuth, async (req, res) => {
        try {
            const user = req.user;
            const cart = await cartService.getOrCreateCart(user.id, undefined, user);
            if (cart.items.length === 0) {
                (0, response_js_1.sendError)(res, 'Cannot process checkout with an empty cart', 400, 'CART_EMPTY');
                return;
            }
            const subtotal = cart.subtotal;
            const freeShippingThreshold = 999.0;
            const shippingFee = subtotal >= freeShippingThreshold ? 0.0 : 49.0;
            const totalAmount = subtotal + shippingFee;
            const orderNumber = `AT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
            const addressData = req.body.address || {
                name: user.phone,
                phone: user.phone,
                addressLine1: req.body.addressLine1 || 'Gaffar Market, Karol Bagh',
                city: req.body.city || 'New Delhi',
                state: req.body.state || 'Delhi',
                pincode: req.body.shippingPincode || '110005',
            };
            const order = await orderRepo.createOrder({
                userId: user.id,
                orderNumber,
                subtotal,
                shippingFee,
                taxAmount: 0.0,
                totalAmount,
                customerNotes: req.body.customerNotes,
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
            const awbCode = `DEL${Math.floor(100000000 + Math.random() * 900000000)}`;
            await orderRepo.createMockShipment(order.id, awbCode);
            await cartService.clearCart(cart.id);
            const createdOrder = await orderRepo.findOrderById(order.id);
            (0, response_js_1.sendSuccess)(res, createdOrder, 'Order processed successfully via checkout', 201);
        }
        catch (err) {
            (0, response_js_1.sendError)(res, err.message, 500, 'CHECKOUT_PROCESS_FAILED');
        }
    });
    return router;
}
//# sourceMappingURL=checkout.routes.js.map
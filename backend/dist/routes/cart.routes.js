"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCartRouter = createCartRouter;
const express_1 = require("express");
const cart_controller_js_1 = require("../controllers/cart.controller.js");
const cart_service_js_1 = require("../services/cart.service.js");
const prisma_cart_repository_js_1 = require("../repositories/prisma-cart.repository.js");
const cart_repository_js_1 = require("../repositories/cart.repository.js");
const prisma_catalogue_repository_js_1 = require("../repositories/prisma-catalogue.repository.js");
const catalogue_repository_js_1 = require("../repositories/catalogue.repository.js");
const validate_middleware_js_1 = require("../middleware/validate.middleware.js");
const cart_validator_js_1 = require("../validators/cart.validator.js");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
function createCartRouter(cartService) {
    const router = (0, express_1.Router)();
    const cartRepo = process.env.DATABASE_URL
        ? new prisma_cart_repository_js_1.PrismaCartRepository()
        : new cart_repository_js_1.InMemoryCartRepository();
    const catalogueRepo = process.env.DATABASE_URL
        ? new prisma_catalogue_repository_js_1.PrismaCatalogueRepository()
        : new catalogue_repository_js_1.InMemoryCatalogueRepository();
    const service = cartService ||
        new cart_service_js_1.CartService(cartRepo, catalogueRepo);
    const controller = new cart_controller_js_1.CartController(service);
    // All cart operations support both guest sessions and authenticated users
    router.use(auth_middleware_js_1.optionalAuth);
    // GET /api/v1/cart
    router.get('/', controller.getCart);
    // POST /api/v1/cart/items
    router.post('/items', (0, validate_middleware_js_1.validate)(cart_validator_js_1.addToCartSchema, 'body'), controller.addItem);
    // PATCH /api/v1/cart/items/:id
    router.patch('/items/:id', (0, validate_middleware_js_1.validate)(cart_validator_js_1.updateCartItemSchema, 'body'), controller.updateItem);
    // DELETE /api/v1/cart/items/:id
    router.delete('/items/:id', controller.removeItem);
    // DELETE /api/v1/cart
    router.delete('/', controller.clearCart);
    return router;
}
//# sourceMappingURL=cart.routes.js.map
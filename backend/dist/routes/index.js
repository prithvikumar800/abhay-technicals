"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiRouter = createApiRouter;
const express_1 = require("express");
const auth_routes_js_1 = require("./auth.routes.js");
const catalogue_routes_js_1 = require("./catalogue.routes.js");
const cart_routes_js_1 = require("./cart.routes.js");
const checkout_routes_js_1 = require("./checkout.routes.js");
const modules_routes_js_1 = require("./modules.routes.js");
const admin_routes_js_1 = require("./admin.routes.js");
const health_controller_js_1 = require("../controllers/health.controller.js");
function createApiRouter() {
    const router = (0, express_1.Router)();
    // Health endpoint: GET /health (and also available at /api/v1/health)
    router.get('/health', health_controller_js_1.checkHealth);
    // Grouped route modules under /api/v1/
    router.use('/auth', (0, auth_routes_js_1.createAuthRouter)());
    router.use('/', (0, catalogue_routes_js_1.createCatalogueRouter)());
    router.use('/categories', (0, catalogue_routes_js_1.createCatalogueRouter)());
    router.use('/brands', (0, catalogue_routes_js_1.createCatalogueRouter)());
    router.use('/products', (0, catalogue_routes_js_1.createCatalogueRouter)());
    router.use('/cart', (0, cart_routes_js_1.createCartRouter)());
    router.use('/checkout', (0, checkout_routes_js_1.createCheckoutRouter)());
    router.use('/orders', (0, modules_routes_js_1.createOrdersRouter)());
    router.use('/payments', (0, modules_routes_js_1.createPaymentsRouter)());
    router.use('/shipments', (0, modules_routes_js_1.createShipmentsRouter)());
    router.use('/users', (0, modules_routes_js_1.createUsersRouter)());
    router.use('/reviews', (0, modules_routes_js_1.createReviewsRouter)());
    router.use('/admin', (0, admin_routes_js_1.createAdminRouter)());
    return router;
}
//# sourceMappingURL=index.js.map
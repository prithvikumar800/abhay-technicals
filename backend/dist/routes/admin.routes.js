"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminRouter = createAdminRouter;
const express_1 = require("express");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const role_middleware_js_1 = require("../middleware/role.middleware.js");
const admin_controller_js_1 = require("../controllers/admin.controller.js");
function createAdminRouter(adminController) {
    const router = (0, express_1.Router)();
    const controller = adminController || new admin_controller_js_1.AdminController();
    // Protect all admin endpoints: Must be authenticated and have ADMIN or STAFF role
    router.use(auth_middleware_js_1.requireAuth);
    router.use((0, role_middleware_js_1.requireRole)('ADMIN', 'STAFF'));
    // Metrics
    router.get('/dashboard/stats', controller.getDashboardStats);
    // Products CRUD
    router.get('/products', controller.getProducts);
    router.post('/products', controller.createProduct);
    router.patch('/products/:id', controller.updateProduct);
    router.delete('/products/:id', controller.deleteProduct);
    // Orders
    router.get('/orders', controller.getOrders);
    return router;
}
//# sourceMappingURL=admin.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
const response_js_1 = require("../utils/response.js");
function notFoundHandler(req, res) {
    (0, response_js_1.sendError)(res, `Route ${req.method} ${req.originalUrl} not found`, 404, 'RESOURCE_NOT_FOUND', undefined, req.id);
}
//# sourceMappingURL=notFound.middleware.js.map
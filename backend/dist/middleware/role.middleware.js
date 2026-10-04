"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = requireRole;
const response_js_1 = require("../utils/response.js");
function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            (0, response_js_1.sendError)(res, 'Authentication required.', 401, 'UNAUTHORIZED', undefined, req.id);
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            (0, response_js_1.sendError)(res, 'Forbidden. You do not have permission to perform this action.', 403, 'FORBIDDEN', { requiredRoles: allowedRoles, currentRole: req.user.role }, req.id);
            return;
        }
        next();
    };
}
//# sourceMappingURL=role.middleware.js.map
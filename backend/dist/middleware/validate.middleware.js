"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const zod_1 = require("zod");
const response_js_1 = require("../utils/response.js");
function validate(schema, source = 'body') {
    return async (req, res, next) => {
        try {
            const parsed = await schema.parseAsync(req[source]);
            req[source] = parsed;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const formattedErrors = error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                (0, response_js_1.sendError)(res, 'Validation failed', 422, 'VALIDATION_ERROR', formattedErrors, req.id);
                return;
            }
            next(error);
        }
    };
}
//# sourceMappingURL=validate.middleware.js.map
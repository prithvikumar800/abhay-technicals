"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSlugParamSchema = exports.productQuerySchema = void 0;
const zod_1 = require("zod");
exports.productQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    search: zod_1.z.string().trim().optional(),
    categorySlug: zod_1.z.string().trim().optional(),
    brandSlug: zod_1.z.string().trim().optional(),
    modelSlug: zod_1.z.string().trim().optional(),
    minPrice: zod_1.z.coerce.number().min(0).optional(),
    maxPrice: zod_1.z.coerce.number().min(0).optional(),
    inStockOnly: zod_1.z.coerce.boolean().optional(),
    sortBy: zod_1.z.enum(['price_asc', 'price_desc', 'newest', 'popular']).default('newest'),
});
exports.productSlugParamSchema = zod_1.z.object({
    slug: zod_1.z.string().trim().min(1),
});
//# sourceMappingURL=catalogue.validator.js.map
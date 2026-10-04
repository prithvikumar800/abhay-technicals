"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutValidateSchema = exports.updateCartItemSchema = exports.addToCartSchema = void 0;
const zod_1 = require("zod");
exports.addToCartSchema = zod_1.z.object({
    productId: zod_1.z.string({ required_error: 'Product ID is required' }).uuid('Invalid product ID format'),
    quantity: zod_1.z.number({ required_error: 'Quantity is required' }).int().min(1, 'Quantity must be at least 1'),
});
exports.updateCartItemSchema = zod_1.z.object({
    quantity: zod_1.z.number({ required_error: 'Quantity is required' }).int().min(1, 'Quantity must be at least 1'),
});
exports.checkoutValidateSchema = zod_1.z.object({
    addressId: zod_1.z.string().uuid().optional(),
    shippingPincode: zod_1.z.string().regex(/^\d{6}$/, 'A valid 6-digit Indian pincode is required'),
    paymentMethod: zod_1.z.enum(['ONLINE', 'COD']).default('ONLINE'),
});
//# sourceMappingURL=cart.validator.js.map
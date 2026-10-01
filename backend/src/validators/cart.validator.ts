import { z } from 'zod';

export const addToCartSchema = z.object({
  productId: z.string({ required_error: 'Product ID is required' }).uuid('Invalid product ID format'),
  quantity: z.number({ required_error: 'Quantity is required' }).int().min(1, 'Quantity must be at least 1'),
});

export const updateCartItemSchema = z.object({
  quantity: z.number({ required_error: 'Quantity is required' }).int().min(1, 'Quantity must be at least 1'),
});

export const checkoutValidateSchema = z.object({
  addressId: z.string().uuid().optional(),
  shippingPincode: z.string().regex(/^\d{6}$/, 'A valid 6-digit Indian pincode is required'),
  paymentMethod: z.enum(['ONLINE', 'COD']).default('ONLINE'),
});

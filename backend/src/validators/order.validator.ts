import { z } from 'zod';

export const shippingAddressSchema = z.object({
  name: z.string({ required_error: 'Recipient name is required' }).min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string({ required_error: 'Contact phone is required' }).regex(/^\+?[0-9]{10,15}$/, 'Valid 10-15 digit phone number required'),
  businessName: z.string().max(150).optional().nullable(),
  gstin: z.string().max(15).optional().nullable(),
  addressLine1: z.string({ required_error: 'Address line 1 is required' }).min(3, 'Address line 1 must be at least 3 characters').max(255),
  addressLine2: z.string().max(255).optional().nullable(),
  landmark: z.string().max(150).optional().nullable(),
  city: z.string({ required_error: 'City is required' }).min(2, 'City is required').max(80),
  state: z.string({ required_error: 'State is required' }).min(2, 'State is required').max(80),
  pincode: z.string({ required_error: 'Pincode is required' }).regex(/^\d{6}$/, 'Valid 6-digit Indian postal pincode is required'),
});

export const createOrderSchema = z.object({
  address: shippingAddressSchema.optional(),
  shippingAddress: shippingAddressSchema.optional(),
  customerNotes: z.string().max(500).optional().nullable(),
  paymentMethod: z.enum(['RAZORPAY', 'CASHFREE', 'MANUAL_COD']).default('RAZORPAY'),
}).refine((data) => data.address || data.shippingAddress, {
  message: 'Shipping address details are required',
  path: ['address'],
});

export const updateOrderStatusSchema = z.object({
  orderStatus: z.enum(['RECEIVED', 'PROCESSING', 'MANIFESTED', 'SHIPPED', 'DELIVERED', 'CANCELLED'], {
    required_error: 'Valid order status is required',
  }),
  comment: z.string().max(255).optional(),
});

export const cancelOrderSchema = z.object({
  reason: z.string().max(255).optional(),
});

export const orderQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.enum(['RECEIVED', 'PROCESSING', 'MANIFESTED', 'SHIPPED', 'DELIVERED', 'CANCELLED']).optional(),
  search: z.string().optional(),
});

import { z } from 'zod';
export declare const addToCartSchema: z.ZodObject<{
    productId: z.ZodString;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    productId: string;
    quantity: number;
}, {
    productId: string;
    quantity: number;
}>;
export declare const updateCartItemSchema: z.ZodObject<{
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    quantity: number;
}, {
    quantity: number;
}>;
export declare const checkoutValidateSchema: z.ZodObject<{
    addressId: z.ZodOptional<z.ZodString>;
    shippingPincode: z.ZodString;
    paymentMethod: z.ZodDefault<z.ZodEnum<["ONLINE", "COD"]>>;
}, "strip", z.ZodTypeAny, {
    shippingPincode: string;
    paymentMethod: "ONLINE" | "COD";
    addressId?: string | undefined;
}, {
    shippingPincode: string;
    addressId?: string | undefined;
    paymentMethod?: "ONLINE" | "COD" | undefined;
}>;

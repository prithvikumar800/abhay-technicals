import { z } from 'zod';
export declare const productQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    categorySlug: z.ZodOptional<z.ZodString>;
    brandSlug: z.ZodOptional<z.ZodString>;
    modelSlug: z.ZodOptional<z.ZodString>;
    minPrice: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
    inStockOnly: z.ZodOptional<z.ZodBoolean>;
    sortBy: z.ZodDefault<z.ZodEnum<["price_asc", "price_desc", "newest", "popular"]>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
    sortBy: "price_asc" | "price_desc" | "newest" | "popular";
    search?: string | undefined;
    categorySlug?: string | undefined;
    brandSlug?: string | undefined;
    modelSlug?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    inStockOnly?: boolean | undefined;
}, {
    limit?: number | undefined;
    search?: string | undefined;
    page?: number | undefined;
    categorySlug?: string | undefined;
    brandSlug?: string | undefined;
    modelSlug?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    inStockOnly?: boolean | undefined;
    sortBy?: "price_asc" | "price_desc" | "newest" | "popular" | undefined;
}>;
export declare const productSlugParamSchema: z.ZodObject<{
    slug: z.ZodString;
}, "strip", z.ZodTypeAny, {
    slug: string;
}, {
    slug: string;
}>;

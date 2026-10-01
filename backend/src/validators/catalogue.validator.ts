import { z } from 'zod';

export const productQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().optional(),
  categorySlug: z.string().trim().optional(),
  brandSlug: z.string().trim().optional(),
  modelSlug: z.string().trim().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  inStockOnly: z.coerce.boolean().optional(),
  sortBy: z.enum(['price_asc', 'price_desc', 'newest', 'popular']).default('newest'),
});

export const productSlugParamSchema = z.object({
  slug: z.string().trim().min(1),
});

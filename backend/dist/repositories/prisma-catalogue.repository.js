"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCatalogueRepository = void 0;
const prisma_js_1 = require("../lib/prisma.js");
class PrismaCatalogueRepository {
    prisma;
    constructor(prisma = prisma_js_1.prisma) {
        this.prisma = prisma;
    }
    async findCategories() {
        const categories = await this.prisma.category.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
        return categories.map((c) => ({
            id: c.id,
            parentId: c.parentId,
            name: c.name,
            slug: c.slug,
            imageUrl: c.imageUrl,
            sortOrder: c.sortOrder,
            isActive: c.isActive,
        }));
    }
    async findCategoryBySlug(slug) {
        const c = await this.prisma.category.findFirst({
            where: { slug, isActive: true },
        });
        if (!c)
            return null;
        return {
            id: c.id,
            parentId: c.parentId,
            name: c.name,
            slug: c.slug,
            imageUrl: c.imageUrl,
            sortOrder: c.sortOrder,
            isActive: c.isActive,
        };
    }
    async findBrands() {
        const brands = await this.prisma.brand.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' },
        });
        return brands.map((b) => ({
            id: b.id,
            name: b.name,
            slug: b.slug,
            logoUrl: b.logoUrl,
            isActive: b.isActive,
        }));
    }
    async findBrandBySlug(slug) {
        const b = await this.prisma.brand.findFirst({
            where: { slug, isActive: true },
        });
        if (!b)
            return null;
        return {
            id: b.id,
            name: b.name,
            slug: b.slug,
            logoUrl: b.logoUrl,
            isActive: b.isActive,
        };
    }
    async findModelsByBrand(brandId) {
        const models = await this.prisma.deviceModel.findMany({
            where: { brandId, isActive: true },
            orderBy: { name: 'asc' },
        });
        return models.map((m) => ({
            id: m.id,
            brandId: m.brandId,
            name: m.name,
            slug: m.slug,
            releaseYear: m.releaseYear,
            isActive: m.isActive,
        }));
    }
    async findModelBySlug(slug) {
        const m = await this.prisma.deviceModel.findFirst({
            where: { slug, isActive: true },
        });
        if (!m)
            return null;
        return {
            id: m.id,
            brandId: m.brandId,
            name: m.name,
            slug: m.slug,
            releaseYear: m.releaseYear,
            isActive: m.isActive,
        };
    }
    async findProducts(filters) {
        const where = { isActive: true };
        if (filters.categorySlug) {
            where.category = { slug: filters.categorySlug };
        }
        if (filters.brandSlug) {
            where.brand = { slug: filters.brandSlug };
        }
        if (filters.modelSlug) {
            where.OR = [
                { model: { slug: filters.modelSlug } },
                { compatibilities: { some: { model: { slug: filters.modelSlug } } } },
            ];
        }
        if (filters.search) {
            const q = filters.search.trim();
            where.AND = [
                {
                    OR: [
                        { title: { contains: q } },
                        { sku: { contains: q } },
                        { description: { contains: q } },
                    ],
                },
            ];
        }
        const [total, items] = await Promise.all([
            this.prisma.product.count({ where }),
            this.prisma.product.findMany({
                where,
                skip: (filters.page - 1) * filters.limit,
                take: filters.limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    category: true,
                    brand: true,
                    model: true,
                    images: { orderBy: { sortOrder: 'asc' } },
                    wholesaleTiers: { orderBy: { minQuantity: 'asc' } },
                    compatibilities: { include: { model: true } },
                },
            }),
        ]);
        return {
            total,
            products: items.map(this.mapPrismaProductToEntity),
        };
    }
    async findProductBySlug(slug) {
        const item = await this.prisma.product.findFirst({
            where: { slug, isActive: true },
            include: {
                category: true,
                brand: true,
                model: true,
                images: { orderBy: { sortOrder: 'asc' } },
                wholesaleTiers: { orderBy: { minQuantity: 'asc' } },
                compatibilities: { include: { model: true } },
            },
        });
        return item ? this.mapPrismaProductToEntity(item) : null;
    }
    async findProductById(id) {
        const item = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                brand: true,
                model: true,
                images: { orderBy: { sortOrder: 'asc' } },
                wholesaleTiers: { orderBy: { minQuantity: 'asc' } },
                compatibilities: { include: { model: true } },
            },
        });
        return item ? this.mapPrismaProductToEntity(item) : null;
    }
    async createProduct(data) {
        const created = await this.prisma.product.create({
            data: {
                sku: data.sku,
                slug: data.slug,
                title: data.title,
                description: data.description,
                categoryId: data.categoryId,
                brandId: data.brandId,
                modelId: data.modelId,
                retailPrice: data.retailPrice,
                salePrice: data.salePrice,
                minOrderQty: data.minOrderQty,
                stockQty: data.stockQty,
                weightGrams: data.weightGrams ?? 100,
                qualityGrade: data.qualityGrade,
                isActive: data.isActive ?? true,
                wholesaleTiers: data.wholesaleTiers?.length
                    ? {
                        create: data.wholesaleTiers.map((t) => ({
                            minQuantity: t.minQuantity,
                            tierPrice: t.tierPrice,
                        })),
                    }
                    : undefined,
                compatibilities: data.compatibleModelIds?.length
                    ? {
                        create: data.compatibleModelIds.map((mId) => ({
                            modelId: mId,
                        })),
                    }
                    : undefined,
                images: data.images?.length
                    ? {
                        create: data.images.map((img, idx) => ({
                            imageUrl: img.imageUrl,
                            isPrimary: img.isPrimary ?? idx === 0,
                            sortOrder: img.sortOrder ?? idx,
                        })),
                    }
                    : undefined,
            },
            include: {
                category: true,
                brand: true,
                model: true,
                images: true,
                wholesaleTiers: true,
                compatibilities: { include: { model: true } },
            },
        });
        return this.mapPrismaProductToEntity(created);
    }
    mapPrismaProductToEntity(item) {
        return {
            id: item.id,
            sku: item.sku,
            slug: item.slug,
            title: item.title,
            description: item.description,
            categoryId: item.categoryId,
            brandId: item.brandId,
            modelId: item.modelId,
            retailPrice: Number(item.retailPrice),
            salePrice: item.salePrice ? Number(item.salePrice) : null,
            minOrderQty: item.minOrderQty,
            stockQty: item.stockQty,
            weightGrams: item.weightGrams,
            qualityGrade: item.qualityGrade,
            isActive: item.isActive,
            category: item.category
                ? {
                    id: item.category.id,
                    name: item.category.name,
                    slug: item.category.slug,
                    sortOrder: item.category.sortOrder,
                    isActive: item.category.isActive,
                }
                : undefined,
            brand: item.brand
                ? {
                    id: item.brand.id,
                    name: item.brand.name,
                    slug: item.brand.slug,
                    logoUrl: item.brand.logoUrl,
                    isActive: item.brand.isActive,
                }
                : undefined,
            model: item.model
                ? {
                    id: item.model.id,
                    brandId: item.model.brandId,
                    name: item.model.name,
                    slug: item.model.slug,
                    releaseYear: item.model.releaseYear,
                    isActive: item.model.isActive,
                }
                : undefined,
            images: item.images?.map((img) => ({
                id: img.id,
                imageUrl: img.imageUrl,
                isPrimary: img.isPrimary,
            })),
            wholesaleTiers: item.wholesaleTiers?.map((t) => ({
                id: t.id,
                productId: t.productId,
                minQuantity: t.minQuantity,
                tierPrice: Number(t.tierPrice),
            })),
            compatibleModels: item.compatibilities?.map((c) => ({
                id: c.model.id,
                brandId: c.model.brandId,
                name: c.model.name,
                slug: c.model.slug,
                releaseYear: c.model.releaseYear,
                isActive: c.model.isActive,
            })),
        };
    }
}
exports.PrismaCatalogueRepository = PrismaCatalogueRepository;
//# sourceMappingURL=prisma-catalogue.repository.js.map
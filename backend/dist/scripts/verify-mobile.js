"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('📱 ANDROID / FLUTTER API VERIFICATION');
    console.log('====================================\n');
    // 1. Fetch 10 diverse products across categories, brands, and models
    const samples = await prisma.product.findMany({
        where: { sourceId: { not: null } },
        take: 10,
        include: {
            category: true,
            brand: true,
            images: true,
            wholesaleTiers: true,
            compatibilities: { include: { model: true } },
        },
        orderBy: { retailPrice: 'desc' },
    });
    console.log('1. Sample of 10 Products across Multiple Categories & Brands:');
    console.table(samples.map((p) => ({
        SKU: p.sku,
        Title: p.title.slice(0, 35) + '...',
        Category: p.category.name,
        Brand: p.brand?.name || 'Unbranded',
        Price: `₹${p.retailPrice}`,
        Images: p.images.length,
        Tiers: p.wholesaleTiers.length,
        Models: p.compatibilities.map((c) => c.model.name).join(', ') || 'N/A',
    })));
    // 2. Product with Wholesale Tiers
    const tiered = await prisma.product.findFirst({
        where: { sourceId: { not: null }, wholesaleTiers: { some: {} } },
        include: {
            category: true,
            brand: true,
            wholesaleTiers: { orderBy: { minQuantity: 'asc' } },
            compatibilities: { include: { model: true } },
        },
    });
    console.log('\n2. Verified Product with Wholesale Volume Slabs:');
    console.log({
        title: tiered?.title,
        sku: tiered?.sku,
        retailPrice: `₹${tiered?.retailPrice}`,
        wholesaleTiers: tiered?.wholesaleTiers.map((t) => ({
            minQty: t.minQuantity,
            unitPrice: `₹${t.tierPrice}`,
        })),
        compatibility: tiered?.compatibilities.map((c) => c.model.name),
    });
    // 3. Product with Multiple Gallery Images
    const multiImage = await prisma.product.findFirst({
        where: {
            sourceId: { not: null },
            images: { some: { sortOrder: { gt: 0 } } },
        },
        include: {
            images: { orderBy: { sortOrder: 'asc' } },
        },
    });
    console.log('\n3. Verified Product with Multiple Images:');
    console.log({
        title: multiImage?.title,
        sku: multiImage?.sku,
        totalImages: multiImage?.images.length,
        gallery: multiImage?.images.map((img) => ({
            order: img.sortOrder,
            isPrimary: img.isPrimary,
            url: img.imageUrl,
        })),
    });
    // 4. Test live HTTP endpoint simulating Flutter HTTP client
    const res = await fetch(`http://localhost:5000/api/v1/products/${tiered?.slug}`);
    const json = (await res.json());
    console.log('\n4. Live API Response for Flutter HTTP Client:');
    console.log({
        httpStatus: res.status,
        apiSuccess: json.success,
        productFound: json.data?.title === tiered?.title,
        servedPrice: json.data?.retailPrice,
    });
}
main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=verify-mobile.js.map
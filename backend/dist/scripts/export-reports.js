"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function exportFullReports() {
    const dir = path_1.default.resolve(process.cwd(), '../docs/migration');
    // 1. products-imported.csv
    const products = await prisma.product.findMany({
        where: { sourceId: { not: null } },
        include: {
            category: true,
            brand: true,
            images: true,
            wholesaleTiers: true,
        },
        orderBy: { sourceId: 'asc' },
    });
    const prodRows = [
        'source_id,sku,slug,title,category,brand,retail_price,sale_price,stock_qty,image_count,wholesale_tiers',
    ];
    const urlRows = ['old_url,new_url,product_id,slug'];
    for (const p of products) {
        const titleEscaped = p.title.replace(/"/g, '""');
        prodRows.push(`${p.sourceId},"${p.sku}","${p.slug}","${titleEscaped}","${p.category.name}","${p.brand?.name || 'Unbranded'}",${p.retailPrice},${p.salePrice || ''},${p.stockQty},${p.images.length},${p.wholesaleTiers.length}`);
        urlRows.push(`"${p.sourceUrl || ''}","/products/${p.slug}",${p.sourceId},"${p.slug}"`);
    }
    fs_1.default.writeFileSync(path_1.default.join(dir, 'products-imported.csv'), prodRows.join('\n'));
    fs_1.default.writeFileSync(path_1.default.join(dir, 'url-mapping.csv'), urlRows.join('\n'));
    // 2. brand-mapping.csv
    const brands = await prisma.brand.findMany({
        include: { _count: { select: { products: true } } },
        orderBy: { name: 'asc' },
    });
    const unbrandedCount = await prisma.product.count({
        where: { brandId: null, sourceId: { not: null } },
    });
    const brandRows = ['brand_name,brand_slug,product_count,action'];
    for (const b of brands) {
        brandRows.push(`"${b.name}","${b.slug}",${b._count.products},MAPPED_AND_INDEXED`);
    }
    brandRows.push(`"Unbranded / Generic","unbranded",${unbrandedCount},RETAINED_NULL`);
    fs_1.default.writeFileSync(path_1.default.join(dir, 'brand-mapping.csv'), brandRows.join('\n'));
    console.log(`✅ Exported products-imported.csv: ${prodRows.length} lines`);
    console.log(`✅ Exported url-mapping.csv: ${urlRows.length} lines`);
    console.log(`✅ Exported brand-mapping.csv: ${brandRows.length} lines`);
}
exportFullReports()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=export-reports.js.map
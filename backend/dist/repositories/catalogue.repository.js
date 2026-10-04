"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCatalogueRepository = void 0;
class InMemoryCatalogueRepository {
    categories = [];
    brands = [];
    models = [];
    products = [];
    constructor() {
        this.seedInitialData();
    }
    seedInitialData() {
        // Initial categories
        this.categories = [
            { id: 1, name: 'Mobile Batteries', slug: 'battery', sortOrder: 1, isActive: true },
            { id: 2, name: 'Camera Glass', slug: 'camera-glass', sortOrder: 2, isActive: true },
            { id: 3, name: 'Charging Connectors', slug: 'charging-connectors', sortOrder: 3, isActive: true },
            { id: 4, name: 'Charging Flex', slug: 'charging-flex', sortOrder: 4, isActive: true },
            { id: 5, name: 'OCA Touch Glass', slug: 'oca-touch-glass', sortOrder: 5, isActive: true },
        ];
        // Initial brands
        this.brands = [
            { id: 1, name: 'Vivo', slug: 'vivo', isActive: true },
            { id: 2, name: 'Realme', slug: 'realme', isActive: true },
            { id: 3, name: 'Apple', slug: 'apple', isActive: true },
            { id: 4, name: 'Oppo', slug: 'oppo', isActive: true },
        ];
        // Initial models
        this.models = [
            { id: 1, brandId: 1, name: 'Vivo Y11 2019', slug: 'vivo-y11-2019', isActive: true },
            { id: 2, brandId: 2, name: 'Realme P4 Lite', slug: 'realme-p4-lite', isActive: true },
            { id: 3, brandId: 3, name: 'iPhone 6G', slug: 'iphone-6g', isActive: true },
        ];
        // Sample spare parts products with wholesale slabs
        this.products = [
            {
                id: 'prod-001-bat-ip6g',
                sku: 'BAT-IP6G-01',
                slug: 'iphone-6g-battery-1810mah',
                title: 'iPhone 6G Battery 1810mAh OEM Tested',
                description: 'High performance replacement battery with original IC protection.',
                categoryId: 1,
                brandId: 3,
                modelId: 3,
                retailPrice: 450.0,
                salePrice: 399.0,
                minOrderQty: 1,
                stockQty: 85,
                weightGrams: 80,
                qualityGrade: 'OEM Tested',
                isActive: true,
                category: this.categories[0],
                brand: this.brands[2],
                model: this.models[2],
                images: [{ id: 'img-1', imageUrl: '/uploads/ip6-bat.webp', isPrimary: true }],
                wholesaleTiers: [
                    { id: 'tier-1', productId: 'prod-001-bat-ip6g', minQuantity: 5, tierPrice: 360.0 },
                    { id: 'tier-2', productId: 'prod-001-bat-ip6g', minQuantity: 10, tierPrice: 320.0 },
                    { id: 'tier-3', productId: 'prod-001-bat-ip6g', minQuantity: 50, tierPrice: 290.0 },
                ],
            },
            {
                id: 'prod-002-flx-vy11',
                sku: 'FLX-VY11-CC',
                slug: 'vivo-y11-charging-flex-pcb',
                title: 'Vivo Y11 2019 Charging Port Flex Board OEM',
                description: 'Complete sub-board with microphone and USB charging port.',
                categoryId: 4,
                brandId: 1,
                modelId: 1,
                retailPrice: 120.0,
                salePrice: 99.0,
                minOrderQty: 2,
                stockQty: 150,
                weightGrams: 30,
                qualityGrade: 'Original Quality',
                isActive: true,
                category: this.categories[3],
                brand: this.brands[0],
                model: this.models[0],
                images: [{ id: 'img-2', imageUrl: '/uploads/vy11-flex.webp', isPrimary: true }],
                wholesaleTiers: [
                    { id: 'tier-4', productId: 'prod-002-flx-vy11', minQuantity: 10, tierPrice: 75.0 },
                    { id: 'tier-5', productId: 'prod-002-flx-vy11', minQuantity: 50, tierPrice: 60.0 },
                ],
            },
        ];
    }
    async findCategories() {
        return this.categories.filter((c) => c.isActive);
    }
    async findCategoryBySlug(slug) {
        return this.categories.find((c) => c.slug === slug && c.isActive) || null;
    }
    async findBrands() {
        return this.brands.filter((b) => b.isActive);
    }
    async findBrandBySlug(slug) {
        return this.brands.find((b) => b.slug === slug && b.isActive) || null;
    }
    async findModelsByBrand(brandId) {
        return this.models.filter((m) => m.brandId === brandId && m.isActive);
    }
    async findModelBySlug(slug) {
        return this.models.find((m) => m.slug === slug && m.isActive) || null;
    }
    async findProducts(filters) {
        let list = this.products.filter((p) => p.isActive);
        if (filters.categorySlug) {
            const cat = this.categories.find((c) => c.slug === filters.categorySlug);
            if (cat)
                list = list.filter((p) => p.categoryId === cat.id);
        }
        if (filters.brandSlug) {
            const br = this.brands.find((b) => b.slug === filters.brandSlug);
            if (br)
                list = list.filter((p) => p.brandId === br.id);
        }
        if (filters.modelSlug) {
            const mo = this.models.find((m) => m.slug === filters.modelSlug);
            if (mo)
                list = list.filter((p) => p.modelId === mo.id);
        }
        if (filters.search) {
            const q = filters.search.toLowerCase();
            list = list.filter((p) => p.title.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
        }
        const total = list.length;
        const startIndex = (filters.page - 1) * filters.limit;
        const paginated = list.slice(startIndex, startIndex + filters.limit);
        return { products: paginated, total };
    }
    async findProductBySlug(slug) {
        return this.products.find((p) => p.slug === slug && p.isActive) || null;
    }
    async findProductById(id) {
        return this.products.find((p) => p.id === id && p.isActive) || null;
    }
}
exports.InMemoryCatalogueRepository = InMemoryCatalogueRepository;
//# sourceMappingURL=catalogue.repository.js.map
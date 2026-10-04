"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaOrderRepository = void 0;
const client_1 = require("@prisma/client");
const prisma_js_1 = require("../lib/prisma.js");
class PrismaOrderRepository {
    prisma;
    constructor(prisma = prisma_js_1.prisma) {
        this.prisma = prisma;
    }
    async createOrder(data) {
        return this.prisma.order.create({
            data: {
                orderNumber: data.orderNumber,
                userId: data.userId,
                subtotal: data.subtotal,
                discountAmount: data.discountAmount ?? 0,
                shippingFee: data.shippingFee,
                taxAmount: data.taxAmount,
                totalAmount: data.totalAmount,
                customerNotes: data.customerNotes,
                orderStatus: client_1.OrderStatus.RECEIVED,
                paymentStatus: client_1.PaymentStatus.PAID,
                address: {
                    create: {
                        name: data.address.name,
                        phone: data.address.phone,
                        businessName: data.address.businessName,
                        gstin: data.address.gstin,
                        addressLine1: data.address.addressLine1,
                        addressLine2: data.address.addressLine2,
                        landmark: data.address.landmark,
                        city: data.address.city,
                        state: data.address.state,
                        pincode: data.address.pincode,
                    },
                },
                items: {
                    create: data.items.map((i) => ({
                        productId: i.productId,
                        sku: i.sku,
                        productTitle: i.productTitle,
                        unitPrice: i.unitPrice,
                        quantity: i.quantity,
                        totalPrice: i.totalPrice,
                        tierApplied: i.tierApplied,
                    })),
                },
                statusHistory: {
                    create: {
                        toStatus: client_1.OrderStatus.RECEIVED,
                        comment: 'Order placed and payment confirmed via Mock Payment Gateway',
                    },
                },
            },
            include: {
                address: true,
                items: true,
                statusHistory: true,
                shipment: { include: { trackingEvents: true } },
            },
        });
    }
    async findOrderById(id) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                address: true,
                items: true,
                statusHistory: true,
                shipment: { include: { trackingEvents: true } },
            },
        });
    }
    async findOrderByNumber(orderNumber) {
        return this.prisma.order.findUnique({
            where: { orderNumber },
            include: {
                address: true,
                items: true,
                statusHistory: true,
                shipment: { include: { trackingEvents: true } },
            },
        });
    }
    async findOrdersByUser(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                address: true,
                items: true,
                statusHistory: true,
                shipment: { include: { trackingEvents: true } },
            },
        });
    }
    async findAllOrders() {
        return this.prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { id: true, phone: true, name: true, businessName: true, role: true } },
                address: true,
                items: true,
                shipment: { include: { trackingEvents: true } },
            },
        });
    }
    async createMockShipment(orderId, awbCode) {
        const now = new Date();
        return this.prisma.shipment.create({
            data: {
                orderId,
                courier: 'Delhivery Surface Express',
                awbCode,
                status: client_1.ShipmentStatus.IN_TRANSIT,
                routingCode: 'DEL/BOM-01',
                weightGrams: 250,
                pickupLocation: 'Abhay Technicals Central Hub, New Delhi',
                dispatchedAt: now,
                trackingEvents: {
                    create: [
                        {
                            milestone: 'MANIFEST_CREATED',
                            location: 'New Delhi Fulfilment Center',
                            eventTimestamp: new Date(now.getTime() - 3600000 * 4),
                        },
                        {
                            milestone: 'PICKED_UP',
                            location: 'Delhi Central Hub',
                            eventTimestamp: new Date(now.getTime() - 3600000 * 2),
                        },
                        {
                            milestone: 'IN_TRANSIT',
                            location: 'Regional Sorting Facility',
                            eventTimestamp: now,
                        },
                    ],
                },
            },
            include: { trackingEvents: true },
        });
    }
    async findShipmentByAwb(awbCode) {
        return this.prisma.shipment.findUnique({
            where: { awbCode },
            include: {
                order: {
                    include: {
                        address: true,
                        items: true,
                    },
                },
                trackingEvents: { orderBy: { eventTimestamp: 'desc' } },
            },
        });
    }
}
exports.PrismaOrderRepository = PrismaOrderRepository;
//# sourceMappingURL=prisma-order.repository.js.map
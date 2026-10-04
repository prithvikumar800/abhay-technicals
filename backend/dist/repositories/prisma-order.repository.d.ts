import { PrismaClient } from '@prisma/client';
export interface CreateOrderInput {
    userId: string;
    orderNumber: string;
    subtotal: number;
    discountAmount?: number;
    shippingFee: number;
    taxAmount: number;
    totalAmount: number;
    customerNotes?: string;
    address: {
        name: string;
        phone: string;
        businessName?: string;
        gstin?: string;
        addressLine1: string;
        addressLine2?: string;
        landmark?: string;
        city: string;
        state: string;
        pincode: string;
    };
    items: {
        productId?: string;
        sku: string;
        productTitle: string;
        unitPrice: number;
        quantity: number;
        totalPrice: number;
        tierApplied?: string;
    }[];
}
export declare class PrismaOrderRepository {
    private prisma;
    constructor(prisma?: PrismaClient);
    createOrder(data: CreateOrderInput): Promise<{
        shipment: ({
            trackingEvents: {
                id: string;
                createdAt: Date;
                shipmentId: string;
                milestone: string;
                location: string | null;
                eventTimestamp: Date;
                rawEventData: import("@prisma/client/runtime/library").JsonValue | null;
            }[];
        } & {
            status: import(".prisma/client").$Enums.ShipmentStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            orderId: string;
            weightGrams: number;
            courier: string;
            awbCode: string | null;
            labelPdfUrl: string | null;
            routingCode: string | null;
            lengthCm: import("@prisma/client/runtime/library").Decimal | null;
            widthCm: import("@prisma/client/runtime/library").Decimal | null;
            heightCm: import("@prisma/client/runtime/library").Decimal | null;
            pickupLocation: string;
            dispatchedAt: Date | null;
            deliveredAt: Date | null;
        }) | null;
        items: {
            id: string;
            productId: string | null;
            orderId: string;
            quantity: number;
            sku: string;
            productTitle: string;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            tierApplied: string | null;
        }[];
        address: {
            phone: string;
            name: string;
            businessName: string | null;
            id: string;
            gstin: string | null;
            addressLine1: string;
            addressLine2: string | null;
            landmark: string | null;
            city: string;
            state: string;
            pincode: string;
            orderId: string;
        } | null;
        statusHistory: {
            id: string;
            createdAt: Date;
            comment: string | null;
            orderId: string;
            fromStatus: import(".prisma/client").$Enums.OrderStatus | null;
            toStatus: import(".prisma/client").$Enums.OrderStatus;
            changedByUserId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        discountAmount: import("@prisma/client/runtime/library").Decimal;
        shippingFee: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        orderStatus: import(".prisma/client").$Enums.OrderStatus;
        customerNotes: string | null;
    }>;
    findOrderById(id: string): Promise<({
        shipment: ({
            trackingEvents: {
                id: string;
                createdAt: Date;
                shipmentId: string;
                milestone: string;
                location: string | null;
                eventTimestamp: Date;
                rawEventData: import("@prisma/client/runtime/library").JsonValue | null;
            }[];
        } & {
            status: import(".prisma/client").$Enums.ShipmentStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            orderId: string;
            weightGrams: number;
            courier: string;
            awbCode: string | null;
            labelPdfUrl: string | null;
            routingCode: string | null;
            lengthCm: import("@prisma/client/runtime/library").Decimal | null;
            widthCm: import("@prisma/client/runtime/library").Decimal | null;
            heightCm: import("@prisma/client/runtime/library").Decimal | null;
            pickupLocation: string;
            dispatchedAt: Date | null;
            deliveredAt: Date | null;
        }) | null;
        items: {
            id: string;
            productId: string | null;
            orderId: string;
            quantity: number;
            sku: string;
            productTitle: string;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            tierApplied: string | null;
        }[];
        address: {
            phone: string;
            name: string;
            businessName: string | null;
            id: string;
            gstin: string | null;
            addressLine1: string;
            addressLine2: string | null;
            landmark: string | null;
            city: string;
            state: string;
            pincode: string;
            orderId: string;
        } | null;
        statusHistory: {
            id: string;
            createdAt: Date;
            comment: string | null;
            orderId: string;
            fromStatus: import(".prisma/client").$Enums.OrderStatus | null;
            toStatus: import(".prisma/client").$Enums.OrderStatus;
            changedByUserId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        discountAmount: import("@prisma/client/runtime/library").Decimal;
        shippingFee: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        orderStatus: import(".prisma/client").$Enums.OrderStatus;
        customerNotes: string | null;
    }) | null>;
    findOrderByNumber(orderNumber: string): Promise<({
        shipment: ({
            trackingEvents: {
                id: string;
                createdAt: Date;
                shipmentId: string;
                milestone: string;
                location: string | null;
                eventTimestamp: Date;
                rawEventData: import("@prisma/client/runtime/library").JsonValue | null;
            }[];
        } & {
            status: import(".prisma/client").$Enums.ShipmentStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            orderId: string;
            weightGrams: number;
            courier: string;
            awbCode: string | null;
            labelPdfUrl: string | null;
            routingCode: string | null;
            lengthCm: import("@prisma/client/runtime/library").Decimal | null;
            widthCm: import("@prisma/client/runtime/library").Decimal | null;
            heightCm: import("@prisma/client/runtime/library").Decimal | null;
            pickupLocation: string;
            dispatchedAt: Date | null;
            deliveredAt: Date | null;
        }) | null;
        items: {
            id: string;
            productId: string | null;
            orderId: string;
            quantity: number;
            sku: string;
            productTitle: string;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            tierApplied: string | null;
        }[];
        address: {
            phone: string;
            name: string;
            businessName: string | null;
            id: string;
            gstin: string | null;
            addressLine1: string;
            addressLine2: string | null;
            landmark: string | null;
            city: string;
            state: string;
            pincode: string;
            orderId: string;
        } | null;
        statusHistory: {
            id: string;
            createdAt: Date;
            comment: string | null;
            orderId: string;
            fromStatus: import(".prisma/client").$Enums.OrderStatus | null;
            toStatus: import(".prisma/client").$Enums.OrderStatus;
            changedByUserId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        discountAmount: import("@prisma/client/runtime/library").Decimal;
        shippingFee: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        orderStatus: import(".prisma/client").$Enums.OrderStatus;
        customerNotes: string | null;
    }) | null>;
    findOrdersByUser(userId: string): Promise<({
        shipment: ({
            trackingEvents: {
                id: string;
                createdAt: Date;
                shipmentId: string;
                milestone: string;
                location: string | null;
                eventTimestamp: Date;
                rawEventData: import("@prisma/client/runtime/library").JsonValue | null;
            }[];
        } & {
            status: import(".prisma/client").$Enums.ShipmentStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            orderId: string;
            weightGrams: number;
            courier: string;
            awbCode: string | null;
            labelPdfUrl: string | null;
            routingCode: string | null;
            lengthCm: import("@prisma/client/runtime/library").Decimal | null;
            widthCm: import("@prisma/client/runtime/library").Decimal | null;
            heightCm: import("@prisma/client/runtime/library").Decimal | null;
            pickupLocation: string;
            dispatchedAt: Date | null;
            deliveredAt: Date | null;
        }) | null;
        items: {
            id: string;
            productId: string | null;
            orderId: string;
            quantity: number;
            sku: string;
            productTitle: string;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            tierApplied: string | null;
        }[];
        address: {
            phone: string;
            name: string;
            businessName: string | null;
            id: string;
            gstin: string | null;
            addressLine1: string;
            addressLine2: string | null;
            landmark: string | null;
            city: string;
            state: string;
            pincode: string;
            orderId: string;
        } | null;
        statusHistory: {
            id: string;
            createdAt: Date;
            comment: string | null;
            orderId: string;
            fromStatus: import(".prisma/client").$Enums.OrderStatus | null;
            toStatus: import(".prisma/client").$Enums.OrderStatus;
            changedByUserId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        discountAmount: import("@prisma/client/runtime/library").Decimal;
        shippingFee: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        orderStatus: import(".prisma/client").$Enums.OrderStatus;
        customerNotes: string | null;
    })[]>;
    findAllOrders(): Promise<({
        user: {
            phone: string;
            name: string | null;
            businessName: string | null;
            id: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
        shipment: ({
            trackingEvents: {
                id: string;
                createdAt: Date;
                shipmentId: string;
                milestone: string;
                location: string | null;
                eventTimestamp: Date;
                rawEventData: import("@prisma/client/runtime/library").JsonValue | null;
            }[];
        } & {
            status: import(".prisma/client").$Enums.ShipmentStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            orderId: string;
            weightGrams: number;
            courier: string;
            awbCode: string | null;
            labelPdfUrl: string | null;
            routingCode: string | null;
            lengthCm: import("@prisma/client/runtime/library").Decimal | null;
            widthCm: import("@prisma/client/runtime/library").Decimal | null;
            heightCm: import("@prisma/client/runtime/library").Decimal | null;
            pickupLocation: string;
            dispatchedAt: Date | null;
            deliveredAt: Date | null;
        }) | null;
        items: {
            id: string;
            productId: string | null;
            orderId: string;
            quantity: number;
            sku: string;
            productTitle: string;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            tierApplied: string | null;
        }[];
        address: {
            phone: string;
            name: string;
            businessName: string | null;
            id: string;
            gstin: string | null;
            addressLine1: string;
            addressLine2: string | null;
            landmark: string | null;
            city: string;
            state: string;
            pincode: string;
            orderId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: string;
        orderNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        discountAmount: import("@prisma/client/runtime/library").Decimal;
        shippingFee: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        orderStatus: import(".prisma/client").$Enums.OrderStatus;
        customerNotes: string | null;
    })[]>;
    createMockShipment(orderId: string, awbCode: string): Promise<{
        trackingEvents: {
            id: string;
            createdAt: Date;
            shipmentId: string;
            milestone: string;
            location: string | null;
            eventTimestamp: Date;
            rawEventData: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
    } & {
        status: import(".prisma/client").$Enums.ShipmentStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: string;
        weightGrams: number;
        courier: string;
        awbCode: string | null;
        labelPdfUrl: string | null;
        routingCode: string | null;
        lengthCm: import("@prisma/client/runtime/library").Decimal | null;
        widthCm: import("@prisma/client/runtime/library").Decimal | null;
        heightCm: import("@prisma/client/runtime/library").Decimal | null;
        pickupLocation: string;
        dispatchedAt: Date | null;
        deliveredAt: Date | null;
    }>;
    findShipmentByAwb(awbCode: string): Promise<({
        order: {
            items: {
                id: string;
                productId: string | null;
                orderId: string;
                quantity: number;
                sku: string;
                productTitle: string;
                unitPrice: import("@prisma/client/runtime/library").Decimal;
                totalPrice: import("@prisma/client/runtime/library").Decimal;
                tierApplied: string | null;
            }[];
            address: {
                phone: string;
                name: string;
                businessName: string | null;
                id: string;
                gstin: string | null;
                addressLine1: string;
                addressLine2: string | null;
                landmark: string | null;
                city: string;
                state: string;
                pincode: string;
                orderId: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: string;
            orderNumber: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discountAmount: import("@prisma/client/runtime/library").Decimal;
            shippingFee: import("@prisma/client/runtime/library").Decimal;
            taxAmount: import("@prisma/client/runtime/library").Decimal;
            totalAmount: import("@prisma/client/runtime/library").Decimal;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            orderStatus: import(".prisma/client").$Enums.OrderStatus;
            customerNotes: string | null;
        };
        trackingEvents: {
            id: string;
            createdAt: Date;
            shipmentId: string;
            milestone: string;
            location: string | null;
            eventTimestamp: Date;
            rawEventData: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
    } & {
        status: import(".prisma/client").$Enums.ShipmentStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: string;
        weightGrams: number;
        courier: string;
        awbCode: string | null;
        labelPdfUrl: string | null;
        routingCode: string | null;
        lengthCm: import("@prisma/client/runtime/library").Decimal | null;
        widthCm: import("@prisma/client/runtime/library").Decimal | null;
        heightCm: import("@prisma/client/runtime/library").Decimal | null;
        pickupLocation: string;
        dispatchedAt: Date | null;
        deliveredAt: Date | null;
    }) | null>;
}

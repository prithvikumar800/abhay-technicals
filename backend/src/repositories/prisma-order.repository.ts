import { PrismaClient, OrderStatus, PaymentStatus, ShipmentStatus } from '@prisma/client';
import { prisma as defaultPrisma } from '../lib/prisma.js';

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

export class PrismaOrderRepository {
  constructor(private prisma: PrismaClient = defaultPrisma) {}

  async createOrder(data: CreateOrderInput) {
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
        orderStatus: OrderStatus.RECEIVED,
        paymentStatus: PaymentStatus.PAID,
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
            toStatus: OrderStatus.RECEIVED,
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

  async findOrderById(id: string) {
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

  async findOrderByNumber(orderNumber: string) {
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

  async findOrdersByUser(userId: string) {
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

  async findOrdersByUserPaginated(userId: string, options: { page?: number; limit?: number; status?: OrderStatus }) {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(100, Math.max(1, options.limit || 10));
    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (options.status) {
      where.orderStatus = options.status;
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          address: true,
          items: true,
          statusHistory: { orderBy: { createdAt: 'desc' } },
          shipment: { include: { trackingEvents: true } },
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
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

  async findAllOrdersPaginated(options: { page?: number; limit?: number; status?: OrderStatus; search?: string }) {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(100, Math.max(1, options.limit || 10));
    const skip = (page - 1) * limit;

    const where: any = {};
    if (options.status) {
      where.orderStatus = options.status;
    }

    if (options.search) {
      const term = options.search.trim();
      where.OR = [
        { orderNumber: { contains: term } },
        { address: { name: { contains: term } } },
        { address: { phone: { contains: term } } },
        { user: { phone: { contains: term } } },
        { user: { name: { contains: term } } },
        { shipment: { awbCode: { contains: term } } },
      ];
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, phone: true, name: true, businessName: true, role: true } },
          address: true,
          items: true,
          statusHistory: { orderBy: { createdAt: 'desc' } },
          shipment: { include: { trackingEvents: true } },
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateOrderStatus(orderId: string, toStatus: OrderStatus, comment?: string, changedByUserId?: string) {
    const existing = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { orderStatus: true },
    });

    if (!existing) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.order.update({
        where: { id: orderId },
        data: {
          orderStatus: toStatus,
          statusHistory: {
            create: {
              fromStatus: existing.orderStatus,
              toStatus,
              comment: comment || `Status updated to ${toStatus}`,
              changedByUserId,
            },
          },
        },
        include: {
          address: true,
          items: true,
          statusHistory: { orderBy: { createdAt: 'desc' } },
          shipment: { include: { trackingEvents: true } },
        },
      });

      return updated;
    });
  }

  async cancelOrder(orderId: string, comment?: string, changedByUserId?: string) {
    const existing = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!existing) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    if (existing.orderStatus === OrderStatus.CANCELLED) {
      throw new Error('Order is already cancelled');
    }

    if (existing.orderStatus === OrderStatus.SHIPPED || existing.orderStatus === OrderStatus.DELIVERED) {
      throw new Error(`Cannot cancel order in ${existing.orderStatus} status. Please initiate a return instead.`);
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Replenish inventory stock
      for (const item of existing.items) {
        if (item.productId) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stockQty: { increment: item.quantity } },
          });
        }
      }

      // 2. Update order status to CANCELLED
      const updated = await tx.order.update({
        where: { id: orderId },
        data: {
          orderStatus: OrderStatus.CANCELLED,
          statusHistory: {
            create: {
              fromStatus: existing.orderStatus,
              toStatus: OrderStatus.CANCELLED,
              comment: comment || 'Order cancelled by customer',
              changedByUserId,
            },
          },
        },
        include: {
          address: true,
          items: true,
          statusHistory: { orderBy: { createdAt: 'desc' } },
          shipment: { include: { trackingEvents: true } },
        },
      });

      return updated;
    });
  }

  async decrementProductStock(items: { productId?: string | null; quantity: number }[]) {
    for (const item of items) {
      if (item.productId) {
        await this.prisma.product.update({
          where: { id: item.productId },
          data: {
            stockQty: {
              decrement: item.quantity,
            },
          },
        });
      }
    }
  }

  async createMockShipment(orderId: string, awbCode: string) {
    const now = new Date();
    return this.prisma.shipment.create({
      data: {
        orderId,
        courier: 'Delhivery Surface Express',
        awbCode,
        status: ShipmentStatus.IN_TRANSIT,
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

  async findShipmentByAwb(awbCode: string) {
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

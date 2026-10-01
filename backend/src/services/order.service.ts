import { OrderStatus } from '@prisma/client';
import { PrismaOrderRepository } from '../repositories/prisma-order.repository.js';
import { CartService } from './cart.service.js';
import { PrismaCatalogueRepository } from '../repositories/prisma-catalogue.repository.js';
import { AuthenticatedUser } from '../types/index.js';

export interface CreateOrderServiceInput {
  address: {
    name: string;
    phone: string;
    businessName?: string | null;
    gstin?: string | null;
    addressLine1: string;
    addressLine2?: string | null;
    landmark?: string | null;
    city: string;
    state: string;
    pincode: string;
  };
  customerNotes?: string | null;
  paymentMethod?: 'RAZORPAY' | 'CASHFREE' | 'MANUAL_COD';
}

export class OrderService {
  constructor(
    private orderRepo: PrismaOrderRepository,
    private cartService: CartService,
    private catalogueRepo: PrismaCatalogueRepository
  ) {}

  async createOrderFromCart(userId: string, input: CreateOrderServiceInput, user: AuthenticatedUser) {
    // 1. Fetch user's authoritative active cart
    const cart = await this.cartService.getOrCreateCart(userId, undefined, user);

    if (!cart.items || cart.items.length === 0) {
      throw new Error('Cannot place an order with an empty cart');
    }

    // 2. Validate stock availability for each item in the cart
    for (const item of cart.items) {
      const product = await this.catalogueRepo.findProductById(item.productId);
      if (!product) {
        throw new Error(`Product "${item.title}" (${item.sku}) is no longer available in the catalogue.`);
      }
      if (!product.isActive) {
        throw new Error(`Product "${item.title}" (${item.sku}) is currently deactivated.`);
      }
      if (product.stockQty < item.quantity) {
        throw new Error(
          `Insufficient stock for "${item.title}". Requested: ${item.quantity}, Available: ${product.stockQty}`
        );
      }
    }

    // 3. Backend Authoritative Calculations
    const subtotal = cart.subtotal;
    const freeShippingThreshold = 999.0;
    const standardShippingFee = 49.0;
    const shippingFee = subtotal >= freeShippingThreshold ? 0.0 : standardShippingFee;
    const taxAmount = 0.0; // Inclusive GST in catalogue prices
    const totalAmount = subtotal + shippingFee;

    // 4. Deterministic Order Number
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `AT-${year}-${randomDigits}`;

    // 5. Create Order and Line Items Snapshot in database
    const order = await this.orderRepo.createOrder({
      userId,
      orderNumber,
      subtotal,
      discountAmount: 0,
      shippingFee,
      taxAmount,
      totalAmount,
      customerNotes: input.customerNotes || undefined,
      address: {
        name: input.address.name,
        phone: input.address.phone,
        businessName: input.address.businessName || undefined,
        gstin: input.address.gstin || undefined,
        addressLine1: input.address.addressLine1,
        addressLine2: input.address.addressLine2 || undefined,
        landmark: input.address.landmark || undefined,
        city: input.address.city,
        state: input.address.state,
        pincode: input.address.pincode,
      },
      items: cart.items.map((i) => ({
        productId: i.productId,
        sku: i.sku,
        productTitle: i.title,
        unitPrice: i.unitPrice,
        quantity: i.quantity,
        totalPrice: i.lineTotal,
        tierApplied: i.tierApplied || undefined,
      })),
    });

    // 6. Atomically Decrement Inventory
    await this.orderRepo.decrementProductStock(
      cart.items.map((i) => ({ productId: i.productId, quantity: i.quantity }))
    );

    // 7. Auto-provision Delhivery tracking AWB
    const awbCode = `DEL${Math.floor(100000000 + Math.random() * 900000000)}`;
    await this.orderRepo.createMockShipment(order.id, awbCode);

    // 8. Flush cart after successful order creation
    await this.cartService.clearCart(cart.id);

    // 9. Return populated order
    return this.orderRepo.findOrderById(order.id);
  }

  async getUserOrders(userId: string, options: { page?: number; limit?: number; status?: OrderStatus }) {
    return this.orderRepo.findOrdersByUserPaginated(userId, options);
  }

  async getOrderById(orderIdOrNumber: string, userId?: string, isAdmin = false) {
    let order = await this.orderRepo.findOrderById(orderIdOrNumber);
    if (!order) {
      order = await this.orderRepo.findOrderByNumber(orderIdOrNumber);
    }

    if (!order) {
      throw new Error(`Order "${orderIdOrNumber}" not found`);
    }

    if (!isAdmin && userId && order.userId !== userId) {
      throw new Error('Access denied: You are not authorized to view this order');
    }

    return order;
  }

  async cancelOrder(orderIdOrNumber: string, userId: string, reason?: string, isAdmin = false) {
    const order = await this.getOrderById(orderIdOrNumber, userId, isAdmin);

    if (!isAdmin && order.userId !== userId) {
      throw new Error('Access denied: You cannot cancel an order that belongs to another customer');
    }

    if (order.orderStatus !== OrderStatus.RECEIVED && !isAdmin) {
      throw new Error(
        `Order is in "${order.orderStatus}" status and can no longer be self-cancelled. Please contact support via WhatsApp.`
      );
    }

    return this.orderRepo.cancelOrder(order.id, reason, userId);
  }

  async getAdminOrders(options: { page?: number; limit?: number; status?: OrderStatus; search?: string }) {
    return this.orderRepo.findAllOrdersPaginated(options);
  }

  async updateOrderStatusByAdmin(orderId: string, toStatus: OrderStatus, comment?: string, adminUserId?: string) {
    return this.orderRepo.updateOrderStatus(orderId, toStatus, comment, adminUserId);
  }

  async getOrderInvoice(orderIdOrNumber: string, userId?: string, isAdmin = false) {
    const order = await this.getOrderById(orderIdOrNumber, userId, isAdmin);

    const subtotal = Number(order.subtotal);
    const shippingFee = Number(order.shippingFee);
    const totalAmount = Number(order.totalAmount);

    // B2B GST Calculation (Inclusive rate 18% standard on mobile spares)
    const gstRate = 0.18;
    const taxableValue = Math.round((subtotal / (1 + gstRate)) * 100) / 100;
    const totalGst = Math.round((subtotal - taxableValue) * 100) / 100;

    const buyerState = (order.address?.state || '').trim().toLowerCase();
    const isDelhi = buyerState === 'delhi' || buyerState === 'dl' || buyerState === 'new delhi';

    const cgst = isDelhi ? Math.round((totalGst / 2) * 100) / 100 : 0;
    const sgst = isDelhi ? Math.round((totalGst / 2) * 100) / 100 : 0;
    const igst = !isDelhi ? totalGst : 0;

    return {
      invoiceNumber: `INV-${order.orderNumber.replace('AT-', '')}`,
      invoiceDate: order.createdAt,
      orderNumber: order.orderNumber,
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
      seller: {
        legalName: 'Abhay Technicals Private Limited',
        brandName: 'ABHAY TECHNICALS',
        address: 'Gaffar Market, Karol Bagh, Central Delhi, Delhi - 110005',
        gstin: '07AAAAA0000A1Z5',
        supportPhone: '+91 98765 43210',
        supportEmail: 'support@abhaytechnicals.com',
      },
      buyer: {
        name: order.address?.name,
        phone: order.address?.phone,
        businessName: order.address?.businessName || null,
        gstin: order.address?.gstin || null,
        address: [
          order.address?.addressLine1,
          order.address?.addressLine2,
          order.address?.landmark,
          `${order.address?.city}, ${order.address?.state} - ${order.address?.pincode}`,
        ]
          .filter(Boolean)
          .join(', '),
      },
      items: order.items.map((item) => {
        const itemTotal = Number(item.totalPrice);
        const itemTaxable = Math.round((itemTotal / (1 + gstRate)) * 100) / 100;
        const itemGst = Math.round((itemTotal - itemTaxable) * 100) / 100;
        return {
          id: item.id,
          sku: item.sku,
          description: item.productTitle,
          hsnCode: '85177090', // Standard Indian HSN for phone components/spares
          quantity: item.quantity,
          unitPrice: Number(item.unitPrice),
          tierApplied: item.tierApplied,
          taxableAmount: itemTaxable,
          gstRate: '18%',
          taxAmount: itemGst,
          totalAmount: itemTotal,
        };
      }),
      summary: {
        subtotal,
        taxableValue,
        cgst,
        sgst,
        igst,
        totalGst,
        shippingFee,
        totalAmount,
        currency: 'INR',
      },
      shipment: order.shipment
        ? {
            courier: order.shipment.courier,
            awbCode: order.shipment.awbCode,
            status: order.shipment.status,
          }
        : null,
    };
  }
}

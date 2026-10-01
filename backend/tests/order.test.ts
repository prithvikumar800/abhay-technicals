import { describe, it } from 'vitest';
import assert from 'node:assert/strict';
import {
  createOrderSchema,
  cancelOrderSchema,
  updateOrderStatusSchema,
  orderQuerySchema,
} from '../src/validators/order.validator.js';
import { OrderService } from '../src/services/order.service.js';
import { OrderStatus, PaymentStatus, ShipmentStatus } from '@prisma/client';

describe('Phase 9: Order Endpoints & Validation Suite', () => {
  describe('1. Zod Validation Schemas for Orders', () => {
    it('should validate a complete shipping address and order payload', async () => {
      const validPayload = {
        shippingAddress: {
          name: 'Ramesh Sharma',
          phone: '+919876543210',
          businessName: 'Sharma Mobile Care',
          gstin: '07AAAAA0000A1Z5',
          addressLine1: 'Shop No. 12, Gaffar Market',
          city: 'New Delhi',
          state: 'Delhi',
          pincode: '110005',
        },
        customerNotes: 'Please pack screen with double bubble wrap',
        paymentMethod: 'RAZORPAY',
      };

      const result = await createOrderSchema.parseAsync(validPayload);
      assert.ok(result.shippingAddress);
      assert.strictEqual(result.shippingAddress?.name, 'Ramesh Sharma');
      assert.strictEqual(result.shippingAddress?.pincode, '110005');
      assert.strictEqual(result.paymentMethod, 'RAZORPAY');
    });

    it('should accept flat address field as fallback', async () => {
      const validPayload = {
        address: {
          name: 'Pooja Verma',
          phone: '9876543210',
          addressLine1: 'Flat 402, Green Enclave',
          city: 'Jaipur',
          state: 'Rajasthan',
          pincode: '302001',
        },
      };

      const result = await createOrderSchema.parseAsync(validPayload);
      assert.ok(result.address);
      assert.strictEqual(result.address?.state, 'Rajasthan');
    });

    it('should reject order if shipping address is missing entirely', async () => {
      await assert.rejects(
        async () => {
          await createOrderSchema.parseAsync({ customerNotes: 'Deliver fast' });
        },
        (err: any) => {
          assert.ok(err.errors.some((e: any) => e.path.includes('address')));
          return true;
        }
      );
    });

    it('should reject invalid pincodes (must be exactly 6 digits)', async () => {
      await assert.rejects(
        async () => {
          await createOrderSchema.parseAsync({
            shippingAddress: {
              name: 'Amit Patel',
              phone: '9876543210',
              addressLine1: 'Station Road',
              city: 'Ahmedabad',
              state: 'Gujarat',
              pincode: '38000', // Only 5 digits
            },
          });
        },
        (err: any) => {
          assert.ok(err.errors.some((e: any) => e.path.includes('pincode')));
          return true;
        }
      );
    });

    it('should validate order status update schema and reject unauthorized status strings', async () => {
      const valid = await updateOrderStatusSchema.parseAsync({
        orderStatus: 'PROCESSING',
        comment: 'Assigned to warehouse packing line 2',
      });
      assert.strictEqual(valid.orderStatus, 'PROCESSING');

      await assert.rejects(async () => {
        await updateOrderStatusSchema.parseAsync({
          orderStatus: 'COMPLETED_INVALID',
        });
      });
    });

    it('should coerce and default pagination queries in orderQuerySchema', async () => {
      const parsed = await orderQuerySchema.parseAsync({});
      assert.strictEqual(parsed.page, 1);
      assert.strictEqual(parsed.limit, 10);

      const custom = await orderQuerySchema.parseAsync({ page: '3', limit: '25' });
      assert.strictEqual(custom.page, 3);
      assert.strictEqual(custom.limit, 25);
    });
  });

  describe('2. OrderService Business Logic & GST Tax Invoicing', () => {
    it('should calculate Delhi intra-state GST as equal 9% CGST and 9% SGST', async () => {
      const mockOrder = {
        id: 'ord-test-01',
        orderNumber: 'AT-2026-12345',
        userId: 'usr-1',
        subtotal: 1180.0, // 1000 taxable + 180 GST (18% inclusive)
        discountAmount: 0,
        shippingFee: 0,
        taxAmount: 0,
        totalAmount: 1180.0,
        paymentStatus: PaymentStatus.PAID,
        orderStatus: OrderStatus.RECEIVED,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        address: {
          name: 'Rajesh Kumar',
          phone: '9876543210',
          businessName: 'Rajesh Telecom',
          gstin: '07AAAAA1111A1Z1',
          addressLine1: 'Karol Bagh Market',
          city: 'New Delhi',
          state: 'Delhi',
          pincode: '110005',
        },
        items: [
          {
            id: 'item-1',
            sku: 'AT-SCR-VIVO-Y11',
            productTitle: 'Vivo Y11 2019 Display Folder LCD Combo',
            unitPrice: 1180.0,
            quantity: 1,
            totalPrice: 1180.0,
            tierApplied: 'Wholesale Tier: 1+ pcs @ 1180.00',
          },
        ],
        shipment: {
          courier: 'Delhivery Surface Express',
          awbCode: 'DEL987654321',
          status: ShipmentStatus.MANIFESTED,
        },
      };

      const mockOrderRepo: any = {
        findOrderById: async () => mockOrder,
        findOrderByNumber: async () => mockOrder,
      };
      const mockCartService: any = {};
      const mockCatalogueRepo: any = {};

      const orderService = new OrderService(mockOrderRepo, mockCartService, mockCatalogueRepo);
      const invoice = await orderService.getOrderInvoice('AT-2026-12345', 'usr-1', false);

      assert.strictEqual(invoice.orderNumber, 'AT-2026-12345');
      assert.strictEqual(invoice.invoiceNumber, 'INV-2026-12345');
      assert.strictEqual(invoice.summary.subtotal, 1180);
      assert.strictEqual(invoice.summary.taxableValue, 1000);
      assert.strictEqual(invoice.summary.totalGst, 180);
      assert.strictEqual(invoice.summary.cgst, 90); // 9% CGST
      assert.strictEqual(invoice.summary.sgst, 90); // 9% SGST
      assert.strictEqual(invoice.summary.igst, 0); // 0 IGST for intra-state
      assert.strictEqual(invoice.items[0].hsnCode, '85177090');
      assert.strictEqual(invoice.seller.gstin, '07AAAAA0000A1Z5');
      assert.strictEqual(invoice.buyer.gstin, '07AAAAA1111A1Z1');
    });

    it('should calculate Inter-state GST as 18% IGST for non-Delhi shipping destination', async () => {
      const mockOrder = {
        id: 'ord-test-02',
        orderNumber: 'AT-2026-67890',
        userId: 'usr-2',
        subtotal: 1180.0,
        discountAmount: 0,
        shippingFee: 49.0,
        taxAmount: 0,
        totalAmount: 1229.0,
        paymentStatus: PaymentStatus.PAID,
        orderStatus: OrderStatus.RECEIVED,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        address: {
          name: 'Sunil Sharma',
          phone: '9876543211',
          businessName: 'Sharma Electronics',
          gstin: '08BBBBB2222B2Z2',
          addressLine1: 'MI Road',
          city: 'Jaipur',
          state: 'Rajasthan',
          pincode: '302001',
        },
        items: [
          {
            id: 'item-2',
            sku: 'AT-BAT-REALME-5',
            productTitle: 'Realme 5 Pro BLP743 4035mAh Battery',
            unitPrice: 590.0,
            quantity: 2,
            totalPrice: 1180.0,
            tierApplied: null,
          },
        ],
        shipment: null,
      };

      const mockOrderRepo: any = {
        findOrderById: async () => mockOrder,
        findOrderByNumber: async () => mockOrder,
      };
      const orderService = new OrderService(mockOrderRepo, {} as any, {} as any);
      const invoice = await orderService.getOrderInvoice('AT-2026-67890', 'usr-2', false);

      assert.strictEqual(invoice.summary.taxableValue, 1000);
      assert.strictEqual(invoice.summary.totalGst, 180);
      assert.strictEqual(invoice.summary.cgst, 0);
      assert.strictEqual(invoice.summary.sgst, 0);
      assert.strictEqual(invoice.summary.igst, 180); // 18% IGST for Rajasthan
      assert.strictEqual(invoice.summary.shippingFee, 49);
      assert.strictEqual(invoice.summary.totalAmount, 1229);
    });

    it('should reject order creation if user cart is empty', async () => {
      const mockOrderRepo: any = {};
      const mockCartService: any = {
        getOrCreateCart: async () => ({ id: 'cart-1', items: [], subtotal: 0 }),
      };
      const mockCatalogueRepo: any = {};

      const orderService = new OrderService(mockOrderRepo, mockCartService, mockCatalogueRepo);

      await assert.rejects(
        async () => {
          await orderService.createOrderFromCart(
            'usr-1',
            {
              address: {
                name: 'Test',
                phone: '9876543210',
                addressLine1: 'Line 1',
                city: 'Delhi',
                state: 'Delhi',
                pincode: '110001',
              },
            },
            { id: 'usr-1', phone: '9876543210', role: 'CUSTOMER' }
          );
        },
        (err: any) => {
          assert.strictEqual(err.message, 'Cannot place an order with an empty cart');
          return true;
        }
      );
    });

    it('should prevent unauthorized users from viewing another customer’s order', async () => {
      const mockOrder = {
        id: 'ord-test-03',
        userId: 'usr-owner-id',
      };
      const mockOrderRepo: any = {
        findOrderById: async () => mockOrder,
      };
      const orderService = new OrderService(mockOrderRepo, {} as any, {} as any);

      await assert.rejects(
        async () => {
          await orderService.getOrderById('ord-test-03', 'usr-attacker-id', false);
        },
        (err: any) => {
          assert.strictEqual(err.message, 'Access denied: You are not authorized to view this order');
          return true;
        }
      );
    });
  });
});

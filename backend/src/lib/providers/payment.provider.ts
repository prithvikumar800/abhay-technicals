import { logger } from '../../utils/logger.js';

export interface CreatePaymentParams {
  orderId: string;
  orderNumber: string;
  amount: number;
  currency: string;
  customerPhone: string;
}

export interface PaymentOrderResult {
  gatewayOrderId: string;
  amount: number;
  currency: string;
  gateway: 'RAZORPAY' | 'CASHFREE';
}

export interface PaymentWebhookResult {
  isValid: boolean;
  orderId?: string;
  gatewayPaymentId?: string;
  amount?: number;
  status: 'PAID' | 'FAILED';
}

export interface PaymentProvider {
  createPaymentOrder(params: CreatePaymentParams): Promise<PaymentOrderResult>;
  verifyWebhook(payload: any, signature: string): Promise<PaymentWebhookResult>;
}

export class MockPaymentProvider implements PaymentProvider {
  constructor(private gatewayName: 'RAZORPAY' | 'CASHFREE' = 'RAZORPAY') {}

  async createPaymentOrder(params: CreatePaymentParams): Promise<PaymentOrderResult> {
    logger.info({
      event: 'PAYMENT_MOCK_ORDER_CREATED',
      orderNumber: params.orderNumber,
      amount: params.amount,
      gateway: this.gatewayName,
    });

    return {
      gatewayOrderId: `mock_${this.gatewayName.toLowerCase()}_order_${Date.now()}`,
      amount: params.amount,
      currency: params.currency,
      gateway: this.gatewayName,
    };
  }

  async verifyWebhook(_payload: any, _signature: string): Promise<PaymentWebhookResult> {
    return {
      isValid: true,
      status: 'PAID',
      gatewayPaymentId: `mock_pay_${Date.now()}`,
    };
  }
}

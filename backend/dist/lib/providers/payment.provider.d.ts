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
export declare class MockPaymentProvider implements PaymentProvider {
    private gatewayName;
    constructor(gatewayName?: 'RAZORPAY' | 'CASHFREE');
    createPaymentOrder(params: CreatePaymentParams): Promise<PaymentOrderResult>;
    verifyWebhook(_payload: any, _signature: string): Promise<PaymentWebhookResult>;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockPaymentProvider = void 0;
const logger_js_1 = require("../../utils/logger.js");
class MockPaymentProvider {
    gatewayName;
    constructor(gatewayName = 'RAZORPAY') {
        this.gatewayName = gatewayName;
    }
    async createPaymentOrder(params) {
        logger_js_1.logger.info({
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
    async verifyWebhook(_payload, _signature) {
        return {
            isValid: true,
            status: 'PAID',
            gatewayPaymentId: `mock_pay_${Date.now()}`,
        };
    }
}
exports.MockPaymentProvider = MockPaymentProvider;
//# sourceMappingURL=payment.provider.js.map
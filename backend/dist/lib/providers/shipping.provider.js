"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockDelhiveryProvider = void 0;
const logger_js_1 = require("../../utils/logger.js");
class MockDelhiveryProvider {
    async checkPincodeServiceability(pincode) {
        logger_js_1.logger.info({
            event: 'DELHIVERY_MOCK_PINCODE_CHECK',
            pincode,
        });
        // Mock rule: all standard 6-digit Indian pincodes starting with 1-8 are serviceable
        const isValidPin = /^[1-8]\d{5}$/.test(pincode);
        return {
            pincode,
            isServiceable: isValidPin,
            isCodAvailable: true,
            estimatedDays: 3,
            courierName: 'Delhivery Surface / Express',
        };
    }
    async createShipment(params) {
        const mockAwb = `DELHIVERY_${Date.now()}`;
        logger_js_1.logger.info({
            event: 'DELHIVERY_MOCK_SHIPMENT_CREATED',
            orderNumber: params.orderNumber,
            awbCode: mockAwb,
        });
        return {
            awbCode: mockAwb,
            courierName: 'Delhivery',
            labelPdfUrl: `https://mock.delhivery.com/labels/${mockAwb}.pdf`,
            routingCode: 'DEL/NCT/HUB-01',
        };
    }
    async trackShipment(awbCode) {
        return {
            awbCode,
            status: 'IN_TRANSIT',
            currentLocation: 'Regional Sorting Hub',
            events: [
                { milestone: 'PICKED_UP', location: 'Primary Warehouse', timestamp: new Date().toISOString() },
                { milestone: 'IN_TRANSIT', location: 'Regional Sorting Hub', timestamp: new Date().toISOString() },
            ],
        };
    }
}
exports.MockDelhiveryProvider = MockDelhiveryProvider;
//# sourceMappingURL=shipping.provider.js.map
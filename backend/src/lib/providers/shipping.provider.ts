import { logger } from '../../utils/logger.js';

export interface PincodeServiceabilityResult {
  pincode: string;
  isServiceable: boolean;
  isCodAvailable: boolean;
  estimatedDays: number;
  courierName: string;
}

export interface CreateShipmentParams {
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  pincode: string;
  weightGrams: number;
}

export interface ShipmentResult {
  awbCode: string;
  courierName: string;
  labelPdfUrl: string;
  routingCode: string;
}

export interface ShippingProvider {
  checkPincodeServiceability(pincode: string): Promise<PincodeServiceabilityResult>;
  createShipment(params: CreateShipmentParams): Promise<ShipmentResult>;
  trackShipment(awbCode: string): Promise<any>;
}

export class MockDelhiveryProvider implements ShippingProvider {
  async checkPincodeServiceability(pincode: string): Promise<PincodeServiceabilityResult> {
    logger.info({
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

  async createShipment(params: CreateShipmentParams): Promise<ShipmentResult> {
    const mockAwb = `DELHIVERY_${Date.now()}`;
    logger.info({
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

  async trackShipment(awbCode: string): Promise<any> {
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

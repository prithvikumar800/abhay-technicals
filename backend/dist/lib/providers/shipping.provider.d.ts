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
export declare class MockDelhiveryProvider implements ShippingProvider {
    checkPincodeServiceability(pincode: string): Promise<PincodeServiceabilityResult>;
    createShipment(params: CreateShipmentParams): Promise<ShipmentResult>;
    trackShipment(awbCode: string): Promise<any>;
}

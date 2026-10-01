import '../core/network/api_client.dart';
import '../core/network/api_endpoints.dart';
import '../models/order.dart';
import '../models/shipment.dart';
import '../models/user.dart';

class OrderRepository {
  final ApiClient _apiClient;
  final List<Order> _mockOrders = [];

  OrderRepository({required ApiClient apiClient}) : _apiClient = apiClient {
    _initMockOrders();
  }

  void _initMockOrders() {
    _mockOrders.addAll([
      Order(
        id: 'ord-8801',
        orderNumber: 'AT-2026-8801',
        status: 'SHIPPED',
        paymentStatus: 'PAID',
        paymentMethod: 'UPI',
        subtotal: 1048.0,
        shippingFee: 0.0,
        totalAmount: 1048.0,
        createdAt: DateTime.now().subtract(const Duration(days: 2)),
        shippingAddress: const Address(
          id: 'addr-1',
          name: 'Rajesh Sharma',
          phone: '+919876543210',
          addressLine1: 'Shop #4, Mobile Market, Station Road',
          city: 'Jaipur',
          state: 'Rajasthan',
          pincode: '302001',
          isDefault: true,
        ),
        shipment: Shipment(
          id: 'shp-101',
          orderId: 'ord-8801',
          courierName: 'Delhivery',
          awbNumber: 'DEL-992384712',
          currentStage: TrackingStage.shipped,
          estimatedDelivery: DateTime.now().add(const Duration(days: 1)),
          events: [
            TrackingEvent(
              status: 'MANIFESTED',
              description: 'Consignment booked & manifested at Delhivery Jaipur Hub',
              location: 'Jaipur Hub',
              timestamp: DateTime.now().subtract(const Duration(days: 2)),
            ),
            TrackingEvent(
              status: 'SHIPPED',
              description: 'In transit from Jaipur sorting center to destination delivery hub',
              location: 'Transit Center',
              timestamp: DateTime.now().subtract(const Duration(days: 1)),
            ),
          ],
        ),
        items: const [
          OrderItem(
            id: 'item-1',
            productId: 'prod-001',
            productName: 'Original 5000mAh Battery for Vivo Y11 (B-K3)',
            sku: 'BAT-VIV-Y11-BK3',
            productImage: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
            quantity: 2,
            unitPrice: 499.0,
            totalPrice: 998.0,
          ),
          OrderItem(
            id: 'item-2',
            productId: 'prod-002',
            productName: 'Charging Port PCB Board Flex for Vivo Y11',
            sku: 'FLX-VIV-Y11-SUB',
            quantity: 1,
            unitPrice: 149.0,
            totalPrice: 149.0,
          ),
        ],
      ),
    ]);
  }

  Future<List<Order>> getOrders() async {
    try {
      final response = await _apiClient.get(ApiEndpoints.orders);
      final data = response['data'] ?? response;
      if (data is Map<String, dynamic> && data['orders'] is List) {
        final list = (data['orders'] as List)
            .map((o) => Order.fromJson(o as Map<String, dynamic>))
            .toList();
        if (list.isNotEmpty) return list;
      }
    } catch (_) {
      // Dev mock fallback
    }

    return List.unmodifiable(_mockOrders);
  }

  Future<Order?> getOrderById(String orderId) async {
    try {
      final response = await _apiClient.get(ApiEndpoints.orderDetail(orderId));
      final data = response['data'] ?? response;
      if (data != null && data is Map<String, dynamic>) {
        return Order.fromJson(data);
      }
    } catch (_) {
      // Dev mock fallback
    }

    return _mockOrders.firstWhere(
      (o) => o.id == orderId || o.orderNumber == orderId,
      orElse: () => _mockOrders.first,
    );
  }

  Future<Shipment> trackShipment(String awb) async {
    try {
      final response = await _apiClient.get(ApiEndpoints.shipmentTrack(awb));
      final data = response['data'] ?? response;
      if (data != null && data is Map<String, dynamic>) {
        return Shipment.fromJson(data);
      }
    } catch (_) {
      // Dev mock fallback
    }

    return Shipment(
      id: 'shp-mock-$awb',
      orderId: 'ord-mock',
      courierName: 'Delhivery',
      awbNumber: awb,
      currentStage: TrackingStage.shipped,
      events: [
        TrackingEvent(
          status: 'RECEIVED',
          description: 'Package picked up by Delhivery Logistics',
          location: 'Origin Facility',
          timestamp: DateTime.now().subtract(const Duration(hours: 36)),
        ),
        TrackingEvent(
          status: 'PROCESSING',
          description: 'Sorted at Delhivery Central Air Facility',
          location: 'Hub',
          timestamp: DateTime.now().subtract(const Duration(hours: 24)),
        ),
        TrackingEvent(
          status: 'MANIFESTED',
          description: 'Manifest generated and bagged',
          location: 'Sorting Hub',
          timestamp: DateTime.now().subtract(const Duration(hours: 18)),
        ),
        TrackingEvent(
          status: 'SHIPPED',
          description: 'In transit to local destination center',
          location: 'Transit',
          timestamp: DateTime.now().subtract(const Duration(hours: 6)),
        ),
      ],
    );
  }

  Future<Order> createOrder({
    required Address shippingAddress,
    required String paymentMethod,
    required List<OrderItem> items,
    required double subtotal,
    required double shippingFee,
    required double totalAmount,
    String? gstin,
  }) async {
    final orderNumber = 'AT-${DateTime.now().year}-${(1000 + _mockOrders.length + 1)}';
    final newOrder = Order(
      id: 'ord-${DateTime.now().millisecondsSinceEpoch}',
      orderNumber: orderNumber,
      status: 'CONFIRMED',
      paymentStatus: paymentMethod == 'COD' ? 'PENDING' : 'PAID',
      paymentMethod: paymentMethod,
      items: items,
      subtotal: subtotal,
      shippingFee: shippingFee,
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      createdAt: DateTime.now(),
    );

    try {
      await _apiClient.post(
        ApiEndpoints.checkoutProcess,
        body: {
          'addressId': shippingAddress.id,
          'paymentMethod': paymentMethod,
          'gstin': gstin,
        },
      );
    } catch (_) {
      // In-memory mock
    }

    _mockOrders.insert(0, newOrder);
    return newOrder;
  }
}

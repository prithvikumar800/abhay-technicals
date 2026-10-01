import 'package:flutter/foundation.dart';
import '../models/order.dart';
import '../models/shipment.dart';
import '../models/user.dart';
import '../repositories/order_repository.dart';

class OrderProvider extends ChangeNotifier {
  final OrderRepository _orderRepository;

  List<Order> _orders = [];
  Order? _currentOrder;
  Shipment? _activeTrackingShipment;
  bool _isLoading = false;
  String? _errorMessage;

  OrderProvider({required OrderRepository orderRepository}) : _orderRepository = orderRepository;

  List<Order> get orders => _orders;
  Order? get currentOrder => _currentOrder;
  Shipment? get activeTrackingShipment => _activeTrackingShipment;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadOrders() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _orders = await _orderRepository.getOrders();
    } catch (e) {
      _errorMessage = 'Unable to fetch your past orders.';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> loadOrderDetail(String orderId) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _currentOrder = await _orderRepository.getOrderById(orderId);
      if (_currentOrder?.shipment != null) {
        _activeTrackingShipment = _currentOrder!.shipment;
      }
    } catch (e) {
      _errorMessage = 'Could not load order details.';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> trackShipment(String awb) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _activeTrackingShipment = await _orderRepository.trackShipment(awb);
    } catch (e) {
      _errorMessage = 'Could not track AWB $awb. Please verify the tracking number.';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<Order?> placeOrder({
    required Address shippingAddress,
    required String paymentMethod,
    required List<OrderItem> items,
    required double subtotal,
    required double shippingFee,
    required double totalAmount,
    String? gstin,
  }) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final order = await _orderRepository.createOrder(
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        items: items,
        subtotal: subtotal,
        shippingFee: shippingFee,
        totalAmount: totalAmount,
        gstin: gstin,
      );
      _currentOrder = order;
      _orders.insert(0, order);
      return order;
    } catch (e) {
      _errorMessage = 'Checkout failed: ${e.toString()}';
      return null;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}

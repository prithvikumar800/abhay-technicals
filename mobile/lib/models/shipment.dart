enum TrackingStage {
  received,
  processing,
  manifested,
  shipped,
  outForDelivery,
  delivered;

  String get label {
    switch (this) {
      case TrackingStage.received:
        return 'Received';
      case TrackingStage.processing:
        return 'Processing';
      case TrackingStage.manifested:
        return 'Manifested';
      case TrackingStage.shipped:
        return 'Shipped';
      case TrackingStage.outForDelivery:
        return 'Out for Delivery';
      case TrackingStage.delivered:
        return 'Delivered';
    }
  }

  int get stepIndex {
    switch (this) {
      case TrackingStage.received:
        return 0;
      case TrackingStage.processing:
        return 1;
      case TrackingStage.manifested:
        return 2;
      case TrackingStage.shipped:
        return 3;
      case TrackingStage.outForDelivery:
        return 4;
      case TrackingStage.delivered:
        return 5;
    }
  }
}

class TrackingEvent {
  final String status;
  final String description;
  final String location;
  final DateTime timestamp;

  const TrackingEvent({
    required this.status,
    required this.description,
    required this.location,
    required this.timestamp,
  });

  factory TrackingEvent.fromJson(Map<String, dynamic> json) {
    return TrackingEvent(
      status: json['status']?.toString() ?? 'UPDATE',
      description: json['description']?.toString() ?? json['activity']?.toString() ?? '',
      location: json['location']?.toString() ?? 'Hub',
      timestamp: json['timestamp'] != null
          ? DateTime.tryParse(json['timestamp'].toString()) ?? DateTime.now()
          : DateTime.now(),
    );
  }
}

class Shipment {
  final String id;
  final String orderId;
  final String courierName;
  final String? awbNumber;
  final TrackingStage currentStage;
  final String? trackingUrl;
  final DateTime? estimatedDelivery;
  final List<TrackingEvent> events;

  const Shipment({
    required this.id,
    required this.orderId,
    this.courierName = 'Delhivery',
    this.awbNumber,
    this.currentStage = TrackingStage.processing,
    this.trackingUrl,
    this.estimatedDelivery,
    this.events = const [],
  });

  factory Shipment.fromJson(Map<String, dynamic> json) {
    List<TrackingEvent> eventList = [];
    if (json['events'] is List) {
      eventList = (json['events'] as List)
          .map((e) => TrackingEvent.fromJson(e as Map<String, dynamic>))
          .toList();
    }

    TrackingStage stage = TrackingStage.processing;
    final stageStr = json['status']?.toString().toUpperCase() ?? '';
    if (stageStr.contains('DELIVERED')) {
      stage = TrackingStage.delivered;
    } else if (stageStr.contains('OUT') || stageStr.contains('DISPATCH')) {
      stage = TrackingStage.outForDelivery;
    } else if (stageStr.contains('SHIPPED') || stageStr.contains('IN_TRANSIT')) {
      stage = TrackingStage.shipped;
    } else if (stageStr.contains('MANIFEST')) {
      stage = TrackingStage.manifested;
    } else if (stageStr.contains('RECEIVED')) {
      stage = TrackingStage.received;
    }

    return Shipment(
      id: json['id']?.toString() ?? '',
      orderId: json['orderId']?.toString() ?? '',
      courierName: json['courierName']?.toString() ?? 'Delhivery',
      awbNumber: json['awbNumber']?.toString() ?? json['awb']?.toString(),
      currentStage: stage,
      trackingUrl: json['trackingUrl']?.toString(),
      estimatedDelivery: json['estimatedDelivery'] != null
          ? DateTime.tryParse(json['estimatedDelivery'].toString())
          : null,
      events: eventList,
    );
  }
}

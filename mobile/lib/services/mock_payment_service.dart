enum MockPaymentStatus {
  success,
  failed,
  cancelled;
}

class MockPaymentResult {
  final MockPaymentStatus status;
  final String? transactionId;
  final String? message;

  const MockPaymentResult({
    required this.status,
    this.transactionId,
    this.message,
  });

  bool get isSuccess => status == MockPaymentStatus.success;
}

class MockPaymentService {
  /// Simulates initiating a simulated payment gateway modal / UPI intent flow
  Future<MockPaymentResult> processPayment({
    required double amount,
    required String orderId,
    required String customerPhone,
    bool simulateFailure = false,
  }) async {
    // Artificial network latency simulation
    await Future.delayed(const Duration(milliseconds: 600));

    if (simulateFailure) {
      return const MockPaymentResult(
        status: MockPaymentStatus.failed,
        message: 'Payment was declined by issuing bank (Simulated Test).',
      );
    }

    final txId = 'mock_tx_${DateTime.now().millisecondsSinceEpoch}_${orderId.hashCode.abs()}';
    return MockPaymentResult(
      status: MockPaymentStatus.success,
      transactionId: txId,
      message: 'Simulated payment succeeded for ₹${amount.toStringAsFixed(2)}',
    );
  }
}

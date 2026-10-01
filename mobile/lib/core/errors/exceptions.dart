class ApiException implements Exception {
  final String message;
  final int? statusCode;
  final dynamic details;

  const ApiException(this.message, {this.statusCode, this.details});

  @override
  String toString() => 'ApiException: $message (Status: $statusCode)';
}

class NetworkException extends ApiException {
  const NetworkException([String message = 'Network connection unavailable. Please check your internet.'])
      : super(message, statusCode: 0);
}

class TimeoutException extends ApiException {
  const TimeoutException([String message = 'The server took too long to respond. Please try again.'])
      : super(message, statusCode: 408);
}

class UnauthorizedException extends ApiException {
  const UnauthorizedException([String message = 'Session expired or unauthorized. Please verify OTP again.'])
      : super(message, statusCode: 401);
}

class ForbiddenException extends ApiException {
  const ForbiddenException([String message = 'Access denied. You do not have permission for this resource.'])
      : super(message, statusCode: 403);
}

class NotFoundException extends ApiException {
  const NotFoundException([String message = 'Requested resource not found.'])
      : super(message, statusCode: 404);
}

class ValidationException extends ApiException {
  const ValidationException(String message, {dynamic details})
      : super(message, statusCode: 422, details: details);
}

class MoqException extends ApiException {
  final int requiredMoq;
  final int currentQuantity;

  const MoqException({
    required this.requiredMoq,
    required this.currentQuantity,
    String? message,
  }) : super(
          message ?? 'Minimum order quantity for wholesale is $requiredMoq units (current: $currentQuantity).',
          statusCode: 400,
        );
}

import 'package:flutter/foundation.dart';
import '../core/errors/exceptions.dart';
import '../models/user.dart';
import '../repositories/auth_repository.dart';

enum AuthStatus {
  uninitialized,
  unauthenticated,
  otpSent,
  authenticating,
  authenticated,
  error;
}

class AuthProvider extends ChangeNotifier {
  final AuthRepository _authRepository;

  AuthStatus _status = AuthStatus.uninitialized;
  User? _currentUser;
  String? _pendingPhone;
  String? _errorMessage;

  AuthProvider({required AuthRepository authRepository})
      : _authRepository = authRepository;

  AuthStatus get status => _status;
  User? get currentUser => _currentUser;
  String? get pendingPhone => _pendingPhone;
  String? get errorMessage => _errorMessage;

  bool get isAuthenticated => _status == AuthStatus.authenticated && _currentUser != null;

  /// LOGIN_GATED Wholesale Pricing policy:
  /// Wholesale tiers are strictly gated behind authentication.
  /// Customer or Technician role grants access to wholesale quantity discounts.
  bool get isWholesaleAuthorized {
    if (!isAuthenticated || _currentUser == null) return false;
    // Disallow ADMIN/STAFF from inheriting customer privileges directly
    if (_currentUser!.role == 'ADMIN' || _currentUser!.role == 'STAFF') {
      return false;
    }
    return _currentUser!.isWholesaleAuthorized || _currentUser!.isCustomer;
  }

  Future<void> initializeSession() async {
    _status = AuthStatus.authenticating;
    notifyListeners();

    try {
      final success = await _authRepository.tryAutoLogin();
      if (success) {
        final user = await _authRepository.getCurrentUser();
        if (user != null && (user.isCustomer || user.isWholesaleAuthorized)) {
          _currentUser = user;
          _status = AuthStatus.authenticated;
          _errorMessage = null;
          notifyListeners();
          return;
        }
      }
    } catch (_) {
      // Ignore initial restore errors
    }

    _status = AuthStatus.unauthenticated;
    _currentUser = null;
    notifyListeners();
  }

  Future<bool> requestOtp(String phone) async {
    final sanitizedPhone = phone.replaceAll(RegExp(r'\s+'), '');
    if (sanitizedPhone.length < 10) {
      _status = AuthStatus.unauthenticated;
      _errorMessage = 'Please enter a valid 10-digit mobile number.';
      notifyListeners();
      return false;
    }

    _status = AuthStatus.authenticating;
    _errorMessage = null;
    notifyListeners();

    try {
      await _authRepository.requestOtp(sanitizedPhone);
      _pendingPhone = sanitizedPhone;
      _status = AuthStatus.otpSent;
      notifyListeners();
      return true;
    } catch (e) {
      _status = AuthStatus.unauthenticated;
      _errorMessage = e is ApiException ? e.message : 'Failed to send WhatsApp OTP. Please try again.';
      notifyListeners();
      return false;
    }
  }

  Future<bool> verifyOtp(String otp) async {
    if (_pendingPhone == null) {
      _errorMessage = 'Phone number missing. Please request OTP again.';
      notifyListeners();
      return false;
    }

    if (otp.length != 6) {
      _errorMessage = 'OTP must be exactly 6 digits.';
      notifyListeners();
      return false;
    }

    _status = AuthStatus.authenticating;
    _errorMessage = null;
    notifyListeners();

    try {
      final session = await _authRepository.verifyOtp(_pendingPhone!, otp);

      // Verify customer authorization
      if (session.user.role == 'ADMIN' || session.user.role == 'STAFF') {
        throw const ForbiddenException(
          'Admin and Staff accounts must access the Admin Web Portal, not the Customer Application.',
        );
      }

      _currentUser = session.user;
      _status = AuthStatus.authenticated;
      _pendingPhone = null;
      notifyListeners();
      return true;
    } catch (e) {
      _status = AuthStatus.otpSent;
      _errorMessage = e is ApiException ? e.message : 'Invalid OTP. Please check and retry.';
      notifyListeners();
      return false;
    }
  }

  Future<void> logout() async {
    await _authRepository.logout();
    _currentUser = null;
    _pendingPhone = null;
    _status = AuthStatus.unauthenticated;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }

  void setMockAuthenticatedUser(User user) {
    _currentUser = user;
    _status = AuthStatus.authenticated;
    notifyListeners();
  }
}

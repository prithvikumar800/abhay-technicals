import '../core/network/api_client.dart';
import '../core/network/api_endpoints.dart';
import '../core/security/secure_storage_service.dart';
import '../models/user.dart';

class AuthSession {
  final String accessToken;
  final String refreshToken;
  final User user;

  const AuthSession({
    required this.accessToken,
    required this.refreshToken,
    required this.user,
  });
}

class AuthRepository {
  final ApiClient _apiClient;
  final ISecureStorageService _storage;

  AuthRepository({
    required ApiClient apiClient,
    ISecureStorageService? storage,
  })  : _apiClient = apiClient,
        _storage = storage ?? SecureStorageService();

  Future<String> requestOtp(String phone) async {
    final response = await _apiClient.post(
      ApiEndpoints.authRequestOtp,
      body: {'phone': phone},
    );

    return response['message']?.toString() ?? 'OTP sent to WhatsApp';
  }

  Future<AuthSession> verifyOtp(String phone, String otp) async {
    final response = await _apiClient.post(
      ApiEndpoints.authVerifyOtp,
      body: {'phone': phone, 'otp': otp},
    );

    final data = response['data'] ?? response;
    final accessToken = data['accessToken']?.toString() ?? '';
    final refreshToken = data['refreshToken']?.toString() ?? '';
    final userData = data['user'] as Map<String, dynamic>? ?? {};

    final user = User.fromJson(userData);

    // Keep access token in memory
    _apiClient.setAccessToken(accessToken);

    // Persist refresh token securely in OS-backed storage
    if (refreshToken.isNotEmpty) {
      await _storage.saveRefreshToken(refreshToken);
    }

    return AuthSession(
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user,
    );
  }

  Future<User?> getCurrentUser() async {
    try {
      final response = await _apiClient.get(ApiEndpoints.authMe);
      final data = response['data'] ?? response;
      if (data != null && data is Map<String, dynamic>) {
        return User.fromJson(data);
      }
    } catch (_) {
      // Return null if not authenticated
    }
    return null;
  }

  Future<void> logout() async {
    try {
      await _apiClient.post(ApiEndpoints.authLogout);
    } catch (_) {
      // Ignore network errors on logout
    } finally {
      _apiClient.clearSession();
      await _storage.deleteRefreshToken();
    }
  }

  Future<bool> tryAutoLogin() async {
    final refreshToken = await _storage.getRefreshToken();
    if (refreshToken == null || refreshToken.isEmpty) {
      return false;
    }

    try {
      final response = await _apiClient.post(
        '/auth/refresh',
        body: {'refreshToken': refreshToken},
      );

      final data = response['data'] ?? response;
      final newAccessToken = data['accessToken']?.toString();
      if (newAccessToken != null && newAccessToken.isNotEmpty) {
        _apiClient.setAccessToken(newAccessToken);
        return true;
      }
    } catch (_) {
      await _storage.deleteRefreshToken();
    }
    return false;
  }
}

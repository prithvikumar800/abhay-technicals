import 'package:flutter_test/flutter_test.dart';
import 'package:abhay_technicals/core/network/api_client.dart';
import 'package:abhay_technicals/core/security/secure_storage_service.dart';

void main() {
  group('ApiClient & Secure Storage Tests', () {
    late InMemorySecureStorageService storage;
    late ApiClient apiClient;

    setUp(() {
      storage = InMemorySecureStorageService();
      apiClient = ApiClient(storage: storage);
    });

    test('1. Initial ApiClient has no access token', () {
      expect(apiClient.hasAccessToken, false);
    });

    test('2. Setting access token retains token in memory', () {
      apiClient.setAccessToken('mock_access_token_123');
      expect(apiClient.hasAccessToken, true);
    });

    test('3. Clearing session wipes access token from memory', () {
      apiClient.setAccessToken('mock_access_token_123');
      apiClient.clearSession();
      expect(apiClient.hasAccessToken, false);
    });

    test('4. Secure storage service stores and retrieves refresh token', () async {
      await storage.saveRefreshToken('mock_refresh_token_xyz');
      final retrieved = await storage.getRefreshToken();
      expect(retrieved, 'mock_refresh_token_xyz');

      await storage.deleteRefreshToken();
      final afterDelete = await storage.getRefreshToken();
      expect(afterDelete, null);
    });
  });
}

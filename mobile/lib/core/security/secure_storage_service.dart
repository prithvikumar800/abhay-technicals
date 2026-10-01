import 'package:flutter_secure_storage/flutter_secure_storage.dart';

abstract class ISecureStorageService {
  Future<void> saveRefreshToken(String token);
  Future<String?> getRefreshToken();
  Future<void> deleteRefreshToken();
  Future<void> clearAll();
}

class SecureStorageService implements ISecureStorageService {
  final FlutterSecureStorage _storage;

  static const String _keyRefreshToken = 'auth_refresh_token_v1';
  static const String _keyCustomerRole = 'auth_customer_role_v1';

  SecureStorageService({FlutterSecureStorage? storage})
      : _storage = storage ??
            const FlutterSecureStorage(
              aOptions: AndroidOptions(
                encryptedSharedPreferences: true,
              ),
            );

  @override
  Future<void> saveRefreshToken(String token) async {
    await _storage.write(key: _keyRefreshToken, value: token);
  }

  @override
  Future<String?> getRefreshToken() async {
    return await _storage.read(key: _keyRefreshToken);
  }

  @override
  Future<void> deleteRefreshToken() async {
    await _storage.delete(key: _keyRefreshToken);
  }

  Future<void> saveCustomerRole(String role) async {
    await _storage.write(key: _keyCustomerRole, value: role);
  }

  Future<String?> getCustomerRole() async {
    return await _storage.read(key: _keyCustomerRole);
  }

  @override
  Future<void> clearAll() async {
    await _storage.deleteAll();
  }
}

/// In-memory implementation used for automated testing without platform channels
class InMemorySecureStorageService implements ISecureStorageService {
  final Map<String, String> _memory = {};

  @override
  Future<void> saveRefreshToken(String token) async {
    _memory['auth_refresh_token_v1'] = token;
  }

  @override
  Future<String?> getRefreshToken() async {
    return _memory['auth_refresh_token_v1'];
  }

  @override
  Future<void> deleteRefreshToken() async {
    _memory.remove('auth_refresh_token_v1');
  }

  @override
  Future<void> clearAll() async {
    _memory.clear();
  }
}

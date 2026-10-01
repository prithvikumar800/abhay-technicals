import 'package:flutter_test/flutter_test.dart';
import 'package:abhay_technicals/core/network/api_client.dart';
import 'package:abhay_technicals/core/security/secure_storage_service.dart';
import 'package:abhay_technicals/models/user.dart';
import 'package:abhay_technicals/providers/auth_provider.dart';
import 'package:abhay_technicals/repositories/auth_repository.dart';

void main() {
  group('Auth Provider & Role Gating Tests', () {
    late InMemorySecureStorageService storage;
    late ApiClient apiClient;
    late AuthRepository authRepository;
    late AuthProvider authProvider;

    setUp(() {
      storage = InMemorySecureStorageService();
      apiClient = ApiClient(storage: storage);
      authRepository = AuthRepository(apiClient: apiClient, storage: storage);
      authProvider = AuthProvider(authRepository: authRepository);
    });

    test('1. Initial auth state is uninitialized or unauthenticated', () {
      expect(authProvider.isAuthenticated, false);
      expect(authProvider.isWholesaleAuthorized, false);
      expect(authProvider.currentUser, null);
    });

    test('2. Request OTP rejects invalid phone numbers < 10 digits', () async {
      final result = await authProvider.requestOtp('12345');
      expect(result, false);
      expect(authProvider.errorMessage, contains('valid 10-digit'));
      expect(authProvider.status, AuthStatus.unauthenticated);
    });

    test('3. Technician user receives authenticated status and wholesale authorization', () {
      const technician = User(
        id: 'usr-tech-1',
        phone: '+919876543210',
        name: 'Sharma Mobile Repair',
        role: 'TECHNICIAN',
        isVerified: true,
      );

      authProvider.setMockAuthenticatedUser(technician);

      expect(authProvider.isAuthenticated, true);
      expect(authProvider.currentUser?.role, 'TECHNICIAN');
      // Login-gated wholesale authorization is active for verified technician
      expect(authProvider.isWholesaleAuthorized, true);
    });

    test('4. ADMIN and STAFF accounts must NOT receive customer privileges', () {
      const adminUser = User(
        id: 'usr-admin-1',
        phone: '+919999999999',
        name: 'Super Admin',
        role: 'ADMIN',
      );

      authProvider.setMockAuthenticatedUser(adminUser);

      expect(authProvider.isAuthenticated, true);
      // Strictly enforced: admin does not inherit customer wholesale privileges
      expect(authProvider.isWholesaleAuthorized, false);
    });

    test('5. Logout clears active session and resets state', () async {
      const technician = User(
        id: 'usr-tech-1',
        phone: '+919876543210',
        role: 'CUSTOMER',
      );
      authProvider.setMockAuthenticatedUser(technician);
      expect(authProvider.isAuthenticated, true);

      await authProvider.logout();

      expect(authProvider.isAuthenticated, false);
      expect(authProvider.currentUser, null);
      expect(authProvider.isWholesaleAuthorized, false);
    });
  });
}

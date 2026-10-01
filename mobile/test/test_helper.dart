import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:abhay_technicals/core/network/api_client.dart';
import 'package:abhay_technicals/core/security/secure_storage_service.dart';

ApiClient createMockApiClient({
  Map<String, dynamic>? getResponse,
  Map<String, dynamic>? postResponse,
}) {
  final storage = InMemorySecureStorageService();
  final mockClient = MockClient((request) async {
    if (request.method == 'GET') {
      return http.Response(
        jsonEncode(getResponse ?? {'success': true, 'data': []}),
        200,
        headers: {'content-type': 'application/json'},
      );
    } else if (request.method == 'POST') {
      return http.Response(
        jsonEncode(postResponse ?? {'success': true, 'data': {}}),
        200,
        headers: {'content-type': 'application/json'},
      );
    }
    return http.Response(
      jsonEncode({'success': true}),
      200,
      headers: {'content-type': 'application/json'},
    );
  });

  return ApiClient(httpClient: mockClient, storage: storage);
}

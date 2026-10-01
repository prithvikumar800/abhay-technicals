import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import '../config/app_config.dart';
import '../errors/exceptions.dart';
import '../security/secure_storage_service.dart';

class ApiResponse<T> {
  final bool success;
  final T? data;
  final String? message;
  final dynamic meta;

  const ApiResponse({
    required this.success,
    this.data,
    this.message,
    this.meta,
  });

  factory ApiResponse.fromJson(Map<String, dynamic> json, T Function(dynamic)? transform) {
    return ApiResponse<T>(
      success: json['success'] == true,
      message: json['message'] as String?,
      data: json['data'] != null && transform != null ? transform(json['data']) : json['data'] as T?,
      meta: json['meta'] ?? json['pagination'],
    );
  }
}

class ApiClient {
  final http.Client _httpClient;
  final ISecureStorageService _storage;
  final String _baseUrl;

  // Short-lived access token held strictly in memory for security
  String? _accessToken;

  ApiClient({
    http.Client? httpClient,
    ISecureStorageService? storage,
    String? baseUrl,
  })  : _httpClient = httpClient ?? http.Client(),
        _storage = storage ?? SecureStorageService(),
        _baseUrl = baseUrl ?? AppConfig.apiBaseUrl;

  String get baseUrl => _baseUrl;
  bool get hasAccessToken => _accessToken != null && _accessToken!.isNotEmpty;

  void setAccessToken(String? token) {
    _accessToken = token;
  }

  void clearSession() {
    _accessToken = null;
  }

  Map<String, String> _buildHeaders({Map<String, String>? extraHeaders}) {
    final headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Client-Platform': 'android-flutter',
      'X-App-Version': AppConfig.appVersion,
    };

    if (_accessToken != null && _accessToken!.isNotEmpty) {
      headers['Authorization'] = 'Bearer $_accessToken';
    }

    if (extraHeaders != null) {
      headers.addAll(extraHeaders);
    }

    return headers;
  }

  Uri _buildUri(String path, [Map<String, dynamic>? queryParameters]) {
    final cleanPath = path.startsWith('/') ? path : '/$path';
    final fullUrl = '$_baseUrl$cleanPath';

    if (queryParameters != null && queryParameters.isNotEmpty) {
      final sanitizedParams = <String, String>{};
      queryParameters.forEach((key, value) {
        if (value != null) {
          sanitizedParams[key] = value.toString();
        }
      });
      return Uri.parse(fullUrl).replace(queryParameters: sanitizedParams);
    }

    return Uri.parse(fullUrl);
  }

  Future<dynamic> get(
    String path, {
    Map<String, dynamic>? queryParameters,
    Map<String, String>? headers,
  }) async {
    return _sendWithRetry(() async {
      final uri = _buildUri(path, queryParameters);
      final response = await _httpClient
          .get(uri, headers: _buildHeaders(extraHeaders: headers))
          .timeout(AppConfig.connectTimeout);
      return _handleResponse(response);
    });
  }

  Future<dynamic> post(
    String path, {
    dynamic body,
    Map<String, String>? headers,
  }) async {
    return _sendWithRetry(() async {
      final uri = _buildUri(path);
      final response = await _httpClient
          .post(
            uri,
            headers: _buildHeaders(extraHeaders: headers),
            body: body != null ? jsonEncode(body) : null,
          )
          .timeout(AppConfig.connectTimeout);
      return _handleResponse(response);
    });
  }

  Future<dynamic> put(
    String path, {
    dynamic body,
    Map<String, String>? headers,
  }) async {
    return _sendWithRetry(() async {
      final uri = _buildUri(path);
      final response = await _httpClient
          .put(
            uri,
            headers: _buildHeaders(extraHeaders: headers),
            body: body != null ? jsonEncode(body) : null,
          )
          .timeout(AppConfig.connectTimeout);
      return _handleResponse(response);
    });
  }

  Future<dynamic> patch(
    String path, {
    dynamic body,
    Map<String, String>? headers,
  }) async {
    return _sendWithRetry(() async {
      final uri = _buildUri(path);
      final response = await _httpClient
          .patch(
            uri,
            headers: _buildHeaders(extraHeaders: headers),
            body: body != null ? jsonEncode(body) : null,
          )
          .timeout(AppConfig.connectTimeout);
      return _handleResponse(response);
    });
  }

  Future<dynamic> delete(
    String path, {
    Map<String, String>? headers,
  }) async {
    return _sendWithRetry(() async {
      final uri = _buildUri(path);
      final response = await _httpClient
          .delete(uri, headers: _buildHeaders(extraHeaders: headers))
          .timeout(AppConfig.connectTimeout);
      return _handleResponse(response);
    });
  }

  dynamic _handleResponse(http.Response response) {
    dynamic parsedBody;
    try {
      if (response.body.isNotEmpty) {
        parsedBody = jsonDecode(response.body);
      }
    } catch (_) {
      parsedBody = null;
    }

    final statusCode = response.statusCode;

    if (statusCode >= 200 && statusCode < 300) {
      return parsedBody;
    }

    final message = (parsedBody is Map && parsedBody['message'] != null)
        ? parsedBody['message'].toString()
        : 'Server returned error status $statusCode';

    if (statusCode == 401) {
      throw UnauthorizedException(message);
    } else if (statusCode == 403) {
      throw ForbiddenException(message);
    } else if (statusCode == 404) {
      throw NotFoundException(message);
    } else if (statusCode == 422) {
      throw ValidationException(message, details: parsedBody is Map ? parsedBody['errors'] : null);
    } else {
      throw ApiException(message, statusCode: statusCode, details: parsedBody);
    }
  }

  Future<T> _sendWithRetry<T>(Future<T> Function() action) async {
    try {
      return await action();
    } on SocketException {
      throw const NetworkException();
    } on TimeoutException {
      throw const TimeoutException();
    } on UnauthorizedException {
      // Attempt token refresh if a refresh token exists in secure storage
      final refreshed = await _tryRefreshToken();
      if (refreshed) {
        // Retry original request once
        try {
          return await action();
        } catch (e) {
          rethrow;
        }
      }
      rethrow;
    } catch (e) {
      if (e is ApiException) rethrow;
      throw ApiException('Unexpected network error: $e');
    }
  }

  Future<bool> _tryRefreshToken() async {
    try {
      final refreshToken = await _storage.getRefreshToken();
      if (refreshToken == null || refreshToken.isEmpty) {
        return false;
      }

      final uri = _buildUri('/auth/refresh-token');
      final response = await _httpClient.post(
        uri,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'refreshToken': refreshToken}),
      ).timeout(AppConfig.connectTimeout);

      if (response.statusCode == 200) {
        final body = jsonDecode(response.body);
        final newAccessToken = body['data']?['accessToken'] ?? body['accessToken'];
        if (newAccessToken != null) {
          setAccessToken(newAccessToken.toString());
          return true;
        }
      }
    } catch (_) {
      // Refresh failed, user will be prompted to re-authenticate
    }
    return false;
  }
}

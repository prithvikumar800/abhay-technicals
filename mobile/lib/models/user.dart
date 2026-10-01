class Address {
  final String id;
  final String name;
  final String phone;
  final String addressLine1;
  final String? addressLine2;
  final String city;
  final String state;
  final String pincode;
  final bool isDefault;

  const Address({
    required this.id,
    required this.name,
    required this.phone,
    required this.addressLine1,
    this.addressLine2,
    required this.city,
    required this.state,
    required this.pincode,
    this.isDefault = false,
  });

  factory Address.fromJson(Map<String, dynamic> json) {
    return Address(
      id: json['id']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      phone: json['phone']?.toString() ?? '',
      addressLine1: json['addressLine1']?.toString() ?? json['address']?.toString() ?? '',
      addressLine2: json['addressLine2']?.toString(),
      city: json['city']?.toString() ?? '',
      state: json['state']?.toString() ?? '',
      pincode: json['pincode']?.toString() ?? '',
      isDefault: json['isDefault'] == true,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'phone': phone,
        'addressLine1': addressLine1,
        'addressLine2': addressLine2,
        'city': city,
        'state': state,
        'pincode': pincode,
        'isDefault': isDefault,
      };
}

class User {
  final String id;
  final String phone;
  final String? name;
  final String? email;
  final String role;
  final String? businessName;
  final String? gstin;
  final bool isVerified;
  final List<Address> addresses;

  const User({
    required this.id,
    required this.phone,
    this.name,
    this.email,
    this.role = 'CUSTOMER',
    this.businessName,
    this.gstin,
    this.isVerified = false,
    this.addresses = const [],
  });

  bool get isCustomer => role == 'CUSTOMER' || role == 'TECHNICIAN' || role == 'WHOLESALE_BUYER';
  bool get isWholesaleAuthorized => role == 'WHOLESALE_BUYER' || role == 'TECHNICIAN' || (gstin != null && gstin!.isNotEmpty);

  factory User.fromJson(Map<String, dynamic> json) {
    List<Address> addressList = [];
    if (json['addresses'] is List) {
      addressList = (json['addresses'] as List)
          .map((a) => Address.fromJson(a as Map<String, dynamic>))
          .toList();
    }

    return User(
      id: json['id']?.toString() ?? '',
      phone: json['phone']?.toString() ?? '',
      name: json['name']?.toString(),
      email: json['email']?.toString(),
      role: json['role']?.toString() ?? 'CUSTOMER',
      businessName: json['businessName']?.toString(),
      gstin: json['gstin']?.toString(),
      isVerified: json['isVerified'] == true,
      addresses: addressList,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'phone': phone,
        'name': name,
        'email': email,
        'role': role,
        'businessName': businessName,
        'gstin': gstin,
        'isVerified': isVerified,
        'addresses': addresses.map((a) => a.toJson()).toList(),
      };
}

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../models/order.dart';
import '../../../models/user.dart';
import '../../../providers/auth_provider.dart';
import '../../../providers/cart_provider.dart';
import '../../../providers/order_provider.dart';
import '../../../services/mock_payment_service.dart';
import '../../../widgets/common_header.dart';

class CheckoutScreen extends StatefulWidget {
  const CheckoutScreen({super.key});

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  final _formKey = GlobalKey<FormState>();

  final _nameController = TextEditingController();
  final _phoneController = TextEditingController();
  final _addressController = TextEditingController();
  final _cityController = TextEditingController();
  final _stateController = TextEditingController();
  final _pincodeController = TextEditingController();
  final _gstinController = TextEditingController();

  String _selectedPaymentMethod = 'UPI';
  bool _isServiceablePincode = true;
  bool _isProcessing = false;

  @override
  void initState() {
    super.initState();
    final auth = context.read<AuthProvider>();
    final user = auth.currentUser;
    if (user != null) {
      _nameController.text = user.name ?? '';
      _phoneController.text = user.phone;
      _gstinController.text = user.gstin ?? '';
      if (user.addresses.isNotEmpty) {
        final addr = user.addresses.first;
        _addressController.text = addr.addressLine1;
        _cityController.text = addr.city;
        _stateController.text = addr.state;
        _pincodeController.text = addr.pincode;
      }
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    _phoneController.dispose();
    _addressController.dispose();
    _cityController.dispose();
    _stateController.dispose();
    _pincodeController.dispose();
    _gstinController.dispose();
    super.dispose();
  }

  void _verifyPincode(String pincode) {
    if (pincode.length == 6) {
      // Mock Delhivery serviceability check
      setState(() {
        _isServiceablePincode = true;
      });
    }
  }

  Future<void> _handlePlaceOrder() async {
    if (!_formKey.currentState!.validate()) return;

    final cart = context.read<CartProvider>();
    final orderProvider = context.read<OrderProvider>();

    if (cart.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Cart is empty.')),
      );
      return;
    }

    setState(() {
      _isProcessing = true;
    });

    final shippingAddress = Address(
      id: 'addr-${DateTime.now().millisecondsSinceEpoch}',
      name: _nameController.text.trim(),
      phone: _phoneController.text.trim(),
      addressLine1: _addressController.text.trim(),
      city: _cityController.text.trim(),
      state: _stateController.text.trim(),
      pincode: _pincodeController.text.trim(),
    );

    // Mock payment execution for PREPAID methods
    if (_selectedPaymentMethod != 'COD') {
      final paymentResult = await MockPaymentService().processPayment(
        amount: cart.total,
        orderId: 'mock_ord_${DateTime.now().millisecondsSinceEpoch}',
        customerPhone: _phoneController.text.trim(),
      );

      if (!paymentResult.isSuccess) {
        setState(() {
          _isProcessing = false;
        });
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(paymentResult.message ?? 'Payment failed.'),
              backgroundColor: AppColors.error,
            ),
          );
        }
        return;
      }
    }

    final orderItems = cart.items
        .map((item) => OrderItem(
              id: item.id,
              productId: item.productId,
              productName: item.productName,
              sku: item.productSku,
              productImage: item.productImage,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              totalPrice: item.totalPrice,
            ))
        .toList();

    final order = await orderProvider.placeOrder(
      shippingAddress: shippingAddress,
      paymentMethod: _selectedPaymentMethod,
      items: orderItems,
      subtotal: cart.subtotal,
      shippingFee: cart.shippingFee,
      totalAmount: cart.total,
      gstin: _gstinController.text.trim().isNotEmpty ? _gstinController.text.trim() : null,
    );

    setState(() {
      _isProcessing = false;
    });

    if (order != null) {
      await cart.clearCart();
      if (!mounted) return;
      Navigator.of(context).pushReplacementNamed(
        '/order-detail',
        arguments: order.id,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartProvider>();

    return Scaffold(
      appBar: const CommonHeader(
        title: 'Checkout & Delivery',
        showBackButton: true,
        showCartAction: false,
      ),
      body: _isProcessing
          ? const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircularProgressIndicator(color: AppColors.primary),
                  SizedBox(height: 16),
                  Text('Processing your order securely with Delhivery...'),
                ],
              ),
            )
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Step 1: Delivery Address
                    const Text(
                      '1. Workshop / Delivery Address',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                    ),
                    const SizedBox(height: 10),
                    TextFormField(
                      controller: _nameController,
                      decoration: const InputDecoration(labelText: 'Recipient / Technician Name *'),
                      validator: (v) => v == null || v.isEmpty ? 'Please enter name' : null,
                    ),
                    const SizedBox(height: 10),
                    TextFormField(
                      controller: _phoneController,
                      decoration: const InputDecoration(labelText: 'Contact Mobile Number *'),
                      keyboardType: TextInputType.phone,
                      validator: (v) => v == null || v.length < 10 ? 'Enter valid 10-digit phone' : null,
                    ),
                    const SizedBox(height: 10),
                    TextFormField(
                      controller: _addressController,
                      decoration: const InputDecoration(labelText: 'Shop / Street Address *'),
                      validator: (v) => v == null || v.isEmpty ? 'Please enter address' : null,
                    ),
                    const SizedBox(height: 10),
                    Row(
                      children: [
                        Expanded(
                          child: TextFormField(
                            controller: _cityController,
                            decoration: const InputDecoration(labelText: 'City *'),
                            validator: (v) => v == null || v.isEmpty ? 'Required' : null,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: TextFormField(
                            controller: _stateController,
                            decoration: const InputDecoration(labelText: 'State *'),
                            validator: (v) => v == null || v.isEmpty ? 'Required' : null,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    TextFormField(
                      controller: _pincodeController,
                      decoration: InputDecoration(
                        labelText: 'Pincode *',
                        suffixIcon: _pincodeController.text.length == 6
                            ? const Icon(Icons.check_circle, color: AppColors.success)
                            : null,
                      ),
                      keyboardType: TextInputType.number,
                      maxLength: 6,
                      onChanged: _verifyPincode,
                      validator: (v) => v == null || v.length != 6 ? 'Enter 6-digit pincode' : null,
                    ),
                    if (_isServiceablePincode)
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                        margin: const EdgeInsets.only(bottom: 12),
                        decoration: BoxDecoration(
                          color: AppColors.successBg,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: const Row(
                          children: [
                            Icon(Icons.local_shipping, size: 16, color: AppColors.success),
                            SizedBox(width: 6),
                            Text(
                              'Delhivery Express Serviceable Hub Active',
                              style: TextStyle(fontSize: 11, color: AppColors.success, fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                      ),

                    // Step 2: GSTIN (Optional for Technicians)
                    TextFormField(
                      controller: _gstinController,
                      decoration: const InputDecoration(
                        labelText: 'GSTIN (Optional - for Input Tax Credit)',
                        hintText: 'e.g. 08AAAAA0000A1Z5',
                      ),
                      textCapitalization: TextCapitalization.characters,
                    ),

                    const Divider(height: 32),

                    // Step 3: Payment Method
                    const Text(
                      '2. Select Payment Method',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                    ),
                    const SizedBox(height: 8),
                    _buildPaymentOption('UPI', 'Instant UPI (Google Pay, PhonePe, Paytm)', Icons.qr_code_2),
                    _buildPaymentOption('CARD', 'Credit / Debit Card / Netbanking', Icons.credit_card),
                    _buildPaymentOption('COD', 'Cash on Delivery (Verified Technicians)', Icons.money),

                    const Divider(height: 32),

                    // Step 4: Order Summary Review
                    const Text(
                      '3. Order Summary',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: AppColors.border),
                      ),
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text('Items (${cart.itemCount} units):'),
                              Text('₹${cart.subtotal.toStringAsFixed(2)}'),
                            ],
                          ),
                          const SizedBox(height: 6),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Text('Delhivery Surface Shipping:'),
                              Text(
                                cart.shippingFee == 0 ? 'FREE' : '₹${cart.shippingFee.toStringAsFixed(2)}',
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  color: cart.shippingFee == 0 ? AppColors.success : AppColors.textPrimary,
                                ),
                              ),
                            ],
                          ),
                          const Divider(height: 16),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Text('Final Payable:', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
                              Text(
                                '₹${cart.total.toStringAsFixed(2)}',
                                style: const TextStyle(
                                  fontWeight: FontWeight.w900,
                                  fontSize: 18,
                                  color: AppColors.primary,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),

                    const SizedBox(height: 24),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                        minimumSize: const Size.fromHeight(50),
                      ),
                      onPressed: _handlePlaceOrder,
                      child: Text(
                        'CONFIRM ORDER • ₹${cart.total.toStringAsFixed(0)}',
                        style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                      ),
                    ),
                    const SizedBox(height: 16),
                  ],
                ),
              ),
            ),
    );
  }

  Widget _buildPaymentOption(String value, String label, IconData icon) {
    final isSelected = _selectedPaymentMethod == value;
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: isSelected ? AppColors.infoBg : Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: isSelected ? AppColors.secondary : AppColors.border,
          width: isSelected ? 1.5 : 1,
        ),
      ),
      child: RadioListTile<String>(
        value: value,
        groupValue: _selectedPaymentMethod,
        activeColor: AppColors.secondary,
        onChanged: (val) {
          if (val != null) {
            setState(() {
              _selectedPaymentMethod = val;
            });
          }
        },
        title: Text(label, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
        secondary: Icon(icon, color: isSelected ? AppColors.secondary : AppColors.slate500),
      ),
    );
  }
}

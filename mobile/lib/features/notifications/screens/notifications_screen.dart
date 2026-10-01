import 'package:flutter/material.dart';
import '../../../core/constants/app_colors.dart';
import '../../../widgets/common_header.dart';

class NotificationItem {
  final String title;
  final String message;
  final String time;
  final IconData icon;

  const NotificationItem({
    required this.title,
    required this.message,
    required this.time,
    required this.icon,
  });
}

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({super.key});

  static const List<NotificationItem> _foundationItems = [
    NotificationItem(
      title: 'Delhivery Shipment Out for Delivery',
      message: 'Order #AT-2026-8801 with 5000mAh battery has been assigned for delivery.',
      time: '2 hours ago',
      icon: Icons.local_shipping,
    ),
    NotificationItem(
      title: 'Wholesale Tier Discount Unlocked',
      message: 'Your workshop mobile account is active for 5+ and 10+ wholesale pricing slabs.',
      time: '1 day ago',
      icon: Icons.verified,
    ),
    NotificationItem(
      title: 'Restock Alert: Vivo Y11 Charging Flex',
      message: 'High demand replacement flex cables are back in warehouse stock.',
      time: '3 days ago',
      icon: Icons.inventory_2,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CommonHeader(
        title: 'Notifications',
        showBackButton: true,
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(12),
        itemCount: _foundationItems.length,
        separatorBuilder: (_, __) => const SizedBox(height: 8),
        itemBuilder: (context, index) {
          final item = _foundationItems[index];
          return Card(
            elevation: 0,
            margin: EdgeInsets.zero,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
              side: const BorderSide(color: AppColors.border),
            ),
            child: ListTile(
              leading: Container(
                padding: const EdgeInsets.all(8),
                decoration: const BoxDecoration(
                  color: AppColors.infoBg,
                  shape: BoxShape.circle,
                ),
                child: Icon(item.icon, color: AppColors.secondary, size: 20),
              ),
              title: Text(item.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 4),
                  Text(item.message, style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
                  const SizedBox(height: 4),
                  Text(item.time, style: const TextStyle(fontSize: 10, color: AppColors.textMuted)),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

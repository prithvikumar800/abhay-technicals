import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../providers/auth_provider.dart';
import '../../../services/whatsapp_service.dart';
import '../../../widgets/common_header.dart';

class AccountScreen extends StatelessWidget {
  const AccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final user = auth.currentUser;
    final isAuthenticated = auth.isAuthenticated;

    return Scaffold(
      appBar: const CommonHeader(
        title: 'Technician Account',
        showCartAction: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // User Profile Card / Login Prompt
            Card(
              elevation: 0,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
                side: const BorderSide(color: AppColors.border),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: isAuthenticated
                    ? Row(
                        children: [
                          CircleAvatar(
                            radius: 28,
                            backgroundColor: AppColors.primary,
                            child: Text(
                              (user?.name != null && user!.name!.isNotEmpty)
                                  ? user.name![0].toUpperCase()
                                  : 'T',
                              style: const TextStyle(
                                fontSize: 22,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                          ),
                          const SizedBox(width: 14),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  user?.name ?? 'Technician User',
                                  style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
                                ),
                                Text(
                                  user?.phone ?? '',
                                  style: const TextStyle(color: AppColors.textSecondary, fontSize: 12),
                                ),
                                const SizedBox(height: 4),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                  decoration: BoxDecoration(
                                    color: AppColors.whatsappLight,
                                    borderRadius: BorderRadius.circular(4),
                                  ),
                                  child: Text(
                                    auth.isWholesaleAuthorized
                                        ? 'WHOLESALE PRICING UNLOCKED'
                                        : 'STANDARD CUSTOMER',
                                    style: const TextStyle(
                                      color: AppColors.whatsappDark,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 10,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      )
                    : Column(
                        children: [
                          const Icon(Icons.account_circle, size: 56, color: AppColors.slate400),
                          const SizedBox(height: 10),
                          const Text(
                            'Technician & Workshop Access',
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          const SizedBox(height: 4),
                          const Text(
                            'Log in with your WhatsApp number to view wholesale rates and manage repair orders.',
                            textAlign: TextAlign.center,
                            style: TextStyle(color: AppColors.textSecondary, fontSize: 12),
                          ),
                          const SizedBox(height: 16),
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppColors.primary,
                              minimumSize: const Size.fromHeight(44),
                            ),
                            onPressed: () {
                              Navigator.of(context).pushNamed('/login');
                            },
                            child: const Text('Login with WhatsApp OTP'),
                          ),
                        ],
                      ),
              ),
            ),
            const SizedBox(height: 16),

            // Navigation Links
            _buildActionTile(
              icon: Icons.assignment_outlined,
              title: 'Order History & Status',
              subtitle: 'View active orders and past invoices',
              onTap: () {
                if (!isAuthenticated) {
                  Navigator.of(context).pushNamed('/login');
                } else {
                  Navigator.of(context).pushNamed('/orders');
                }
              },
            ),
            _buildActionTile(
              icon: Icons.bookmark_outline,
              title: 'Saved Workshop Spares',
              subtitle: 'Fast reordering for fast-moving items',
              onTap: () {
                Navigator.of(context).pushNamed('/wishlist');
              },
            ),
            _buildActionTile(
              icon: Icons.notifications_none,
              title: 'Notifications & Alerts',
              subtitle: 'Restock updates and dispatch alerts',
              onTap: () {
                Navigator.of(context).pushNamed('/notifications');
              },
            ),
            _buildActionTile(
              icon: Icons.chat_bubble_outline,
              title: 'WhatsApp Technical Support',
              subtitle: 'Direct help for unlisted parts or diagnostics',
              onTap: () {
                WhatsAppService().launchGeneralSupport();
              },
            ),

            if (isAuthenticated) ...[
              const SizedBox(height: 16),
              OutlinedButton.icon(
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppColors.error,
                  side: const BorderSide(color: AppColors.error),
                  minimumSize: const Size.fromHeight(46),
                ),
                onPressed: () async {
                  await auth.logout();
                },
                icon: const Icon(Icons.logout, size: 18),
                label: const Text('LOGOUT FROM THIS DEVICE', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ],

            const SizedBox(height: 24),
            const Text(
              'ABHAY TECHNICALS • Version 1.0.0 (Native Android Foundation)',
              style: TextStyle(fontSize: 10, color: AppColors.textMuted),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionTile({
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return Card(
      elevation: 0,
      margin: const EdgeInsets.only(bottom: 8),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
        side: const BorderSide(color: AppColors.border),
      ),
      child: ListTile(
        leading: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: AppColors.slate100,
            borderRadius: BorderRadius.circular(6),
          ),
          child: Icon(icon, color: AppColors.primary, size: 20),
        ),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
        subtitle: Text(subtitle, style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
        trailing: const Icon(Icons.chevron_right, size: 18, color: AppColors.slate400),
        onTap: onTap,
      ),
    );
  }
}

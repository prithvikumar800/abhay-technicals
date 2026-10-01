import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../core/constants/app_colors.dart';
import '../../../models/shipment.dart';
import '../../../providers/order_provider.dart';
import '../../../widgets/common_header.dart';

class TrackingScreen extends StatefulWidget {
  final String awb;

  const TrackingScreen({super.key, required this.awb});

  @override
  State<TrackingScreen> createState() => _TrackingScreenState();
}

class _TrackingScreenState extends State<TrackingScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<OrderProvider>().trackShipment(widget.awb);
    });
  }

  @override
  Widget build(BuildContext context) {
    final orderProvider = context.watch<OrderProvider>();
    final shipment = orderProvider.activeTrackingShipment;

    return Scaffold(
      appBar: CommonHeader(
        title: 'Delhivery AWB: ${widget.awb}',
        showBackButton: true,
      ),
      body: orderProvider.isLoading && shipment == null
          ? const Center(child: CircularProgressIndicator(color: AppColors.primary))
          : shipment == null
              ? const Center(child: Text('Shipment tracking unavailable.'))
              : SingleChildScrollView(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Overview card
                      Card(
                        elevation: 0,
                        margin: EdgeInsets.zero,
                        color: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                          side: const BorderSide(color: AppColors.border),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  const Text(
                                    'Delhivery Surface Express',
                                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                                  ),
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                    decoration: BoxDecoration(
                                      color: AppColors.secondary.withOpacity(0.1),
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                    child: Text(
                                      shipment.currentStage.label,
                                      style: const TextStyle(
                                        color: AppColors.secondary,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 11,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 6),
                              Text(
                                'AWB: ${shipment.awbNumber ?? widget.awb}',
                                style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                              ),
                              if (shipment.estimatedDelivery != null) ...[
                                const SizedBox(height: 6),
                                Text(
                                  'Estimated Delivery: ${shipment.estimatedDelivery!.day}/${shipment.estimatedDelivery!.month}/${shipment.estimatedDelivery!.year}',
                                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.success),
                                ),
                              ],
                            ],
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),

                      // 6-Stage Timeline
                      const Text(
                        'Dispatch & Transit Progression',
                        style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 12),
                      _buildStageTimeline(shipment.currentStage),

                      const SizedBox(height: 24),

                      // Milestone Activity Log
                      const Text(
                        'Milestone Activity Log',
                        style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 8),
                      if (shipment.events.isEmpty)
                        const Padding(
                          padding: EdgeInsets.symmetric(vertical: 8),
                          child: Text('No detailed scan events yet.', style: TextStyle(color: AppColors.textMuted)),
                        )
                      else
                        ListView.separated(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          itemCount: shipment.events.length,
                          separatorBuilder: (_, __) => const Divider(height: 16),
                          itemBuilder: (context, index) {
                            final event = shipment.events[index];
                            return Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Icon(Icons.circle, size: 10, color: AppColors.secondary),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        event.description,
                                        style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13),
                                      ),
                                      const SizedBox(height: 2),
                                      Text(
                                        '${event.location} • ${event.timestamp.hour}:${event.timestamp.minute.toString().padLeft(2, '0')}',
                                        style: const TextStyle(fontSize: 11, color: AppColors.textMuted),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            );
                          },
                        ),
                    ],
                  ),
                ),
    );
  }

  Widget _buildStageTimeline(TrackingStage activeStage) {
    const stages = TrackingStage.values;
    final activeIndex = activeStage.stepIndex;

    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        children: stages.map((stage) {
          final isPast = stage.stepIndex < activeIndex;
          final isCurrent = stage.stepIndex == activeIndex;

          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Column(
                children: [
                  Container(
                    width: 22,
                    height: 22,
                    decoration: BoxDecoration(
                      color: isCurrent
                          ? AppColors.secondary
                          : (isPast ? AppColors.primary : AppColors.slate200),
                      shape: BoxShape.circle,
                    ),
                    child: Icon(
                      isPast ? Icons.check : (isCurrent ? Icons.radio_button_checked : Icons.circle),
                      size: 12,
                      color: isPast || isCurrent ? Colors.white : AppColors.slate400,
                    ),
                  ),
                  if (stage.stepIndex < stages.length - 1)
                    Container(
                      width: 2,
                      height: 28,
                      color: isPast ? AppColors.primary : AppColors.slate200,
                    ),
                ],
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.only(top: 2),
                  child: Text(
                    stage.label,
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: isCurrent ? FontWeight.bold : FontWeight.w500,
                      color: isCurrent ? AppColors.secondaryDark : (isPast ? AppColors.textPrimary : AppColors.textMuted),
                    ),
                  ),
                ),
              ),
            ],
          );
        }).toList(),
      ),
    );
  }
}

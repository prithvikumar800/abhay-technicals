import 'package:flutter/material.dart';
import '../core/constants/app_colors.dart';

class QuantityStepper extends StatelessWidget {
  final int value;
  final int min;
  final int max;
  final ValueChanged<int> onChanged;

  const QuantityStepper({
    super.key,
    required this.value,
    this.min = 1,
    this.max = 999,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: AppColors.border, width: 1.5),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Decrement Button (44px target)
          SizedBox(
            width: 44,
            height: 44,
            child: IconButton(
              icon: const Icon(Icons.remove, size: 18),
              color: value > min ? AppColors.textPrimary : AppColors.textMuted,
              onPressed: value > min ? () => onChanged(value - 1) : null,
              tooltip: 'Decrease quantity',
            ),
          ),
          Container(
            constraints: const BoxConstraints(minWidth: 40),
            padding: const EdgeInsets.symmetric(horizontal: 4),
            alignment: Alignment.center,
            child: Text(
              '$value',
              style: const TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w700,
                color: AppColors.textPrimary,
              ),
            ),
          ),
          // Increment Button (44px target)
          SizedBox(
            width: 44,
            height: 44,
            child: IconButton(
              icon: const Icon(Icons.add, size: 18),
              color: value < max ? AppColors.textPrimary : AppColors.textMuted,
              onPressed: value < max ? () => onChanged(value + 1) : null,
              tooltip: 'Increase quantity',
            ),
          ),
        ],
      ),
    );
  }
}

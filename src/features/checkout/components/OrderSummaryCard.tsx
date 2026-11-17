import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/core/theme/ThemeProvider';
import type { CartLine } from '@/features/checkout/types/checkout.types';
import { AppText } from '@/shared/components/AppText';
import { formatCurrency } from '@/shared/utils/formatCurrency';

type OrderSummaryCardProps = {
  line: CartLine;
  onDecrease: (productId: string) => void;
  onIncrease: (productId: string) => void;
  onRemove: (productId: string) => void;
};

export function OrderSummaryCard({ line, onDecrease, onIncrease, onRemove }: OrderSummaryCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radii.md,
          padding: theme.spacing.md,
          gap: theme.spacing.sm,
        },
      ]}
    >
      <AppText>{line.title}</AppText>
      <AppText variant="caption">{formatCurrency(line.price * line.quantity)}</AppText>
      <View style={styles.row}>
        <Pressable accessibilityRole="button" onPress={() => onDecrease(line.productId)} style={styles.stepper}>
          <AppText>-</AppText>
        </Pressable>
        <AppText>{line.quantity}</AppText>
        <Pressable accessibilityRole="button" onPress={() => onIncrease(line.productId)} style={styles.stepper}>
          <AppText>+</AppText>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => onRemove(line.productId)}>
          <AppText variant="error">Remove</AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepper: {
    minWidth: 32,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

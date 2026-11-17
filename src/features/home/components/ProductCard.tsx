import { Image, Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/core/theme/ThemeProvider';
import type { Product } from '@/features/home/types/home.types';
import { AppText } from '@/shared/components/AppText';
import { formatCurrency } from '@/shared/utils/formatCurrency';

type ProductCardProps = {
  product: Product;
  onPress: (product: Product) => void;
};

export function ProductCard({ product, onPress }: ProductCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(product)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radii.md,
          opacity: pressed ? 0.85 : 1,
          padding: theme.spacing.md,
          gap: theme.spacing.sm,
        },
      ]}
    >
      <Image source={{ uri: product.thumbnailUrl }} style={styles.image} />
      <View style={styles.copy}>
        <AppText>{product.title}</AppText>
        <AppText variant="caption">{formatCurrency(product.price)}</AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#E7E5E4',
  },
  copy: {
    flex: 1,
    gap: 4,
  },
});

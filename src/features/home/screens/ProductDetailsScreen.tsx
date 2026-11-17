import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

import { useTheme } from '@/core/theme/ThemeProvider';
import { useProductDetails } from '@/features/home/hooks/useProductDetails';
import { AppButton } from '@/shared/components/AppButton';
import { AppText } from '@/shared/components/AppText';
import { ScreenWrapper } from '@/shared/components/ScreenWrapper';

export function ProductDetailsScreen() {
  const theme = useTheme();
  const { product, priceLabel, isLoading, errorMessage, refetch, addToCart } = useProductDetails();

  if (isLoading) {
    return (
      <ScreenWrapper>
        <ActivityIndicator color={theme.colors.primary} />
      </ScreenWrapper>
    );
  }

  if (errorMessage || !product) {
    return (
      <ScreenWrapper>
        <AppText variant="error">{errorMessage ?? 'Product unavailable'}</AppText>
        <AppButton label="Try again" onPress={refetch} variant="secondary" />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper scroll>
      <Image source={{ uri: product.thumbnailUrl }} style={styles.image} />
      <View style={styles.copy}>
        <AppText variant="title">{product.title}</AppText>
        <AppText>{priceLabel}</AppText>
      </View>
      <AppButton label="Add to cart" onPress={addToCart} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    backgroundColor: '#E7E5E4',
  },
  copy: {
    gap: 8,
  },
});

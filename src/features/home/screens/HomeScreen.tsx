import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { useTheme } from '@/core/theme/ThemeProvider';
import { ProductCard } from '@/features/home/components/ProductCard';
import { useHomeScreen } from '@/features/home/hooks/useHomeScreen';
import type { Product } from '@/features/home/types/home.types';
import { AppButton } from '@/shared/components/AppButton';
import { AppInput } from '@/shared/components/AppInput';
import { AppText } from '@/shared/components/AppText';
import { ScreenWrapper } from '@/shared/components/ScreenWrapper';

export function HomeScreen() {
  const theme = useTheme();
  const {
    firstName,
    search,
    setSearch,
    products,
    isLoading,
    errorMessage,
    refetch,
    openProduct,
    openAbout,
    logout,
  } = useHomeScreen();

  return (
    <ScreenWrapper>
      <AppText variant="title">Hello, {firstName}</AppText>
      <AppInput
        autoCapitalize="none"
        autoCorrect={false}
        label="Search products"
        onChangeText={setSearch}
        value={search}
      />
      {isLoading ? <ActivityIndicator color={theme.colors.primary} /> : null}
      {errorMessage ? (
        <View style={styles.stack}>
          <AppText variant="error">{errorMessage}</AppText>
          <AppButton label="Try again" onPress={refetch} variant="secondary" />
        </View>
      ) : (
        <FlashList
          contentContainerStyle={{ paddingBottom: theme.spacing.lg }}
          data={products}
          ItemSeparatorComponent={() => <View style={{ height: theme.spacing.sm }} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            isLoading ? null : <AppText variant="caption">No products match that search.</AppText>
          }
          renderItem={({ item }: { item: Product }) => (
            <ProductCard onPress={openProduct} product={item} />
          )}
          style={styles.list}
        />
      )}
      <AppButton label="About" onPress={openAbout} variant="secondary" />
      <AppButton label="Log out" onPress={logout} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  stack: {
    gap: 8,
  },
});

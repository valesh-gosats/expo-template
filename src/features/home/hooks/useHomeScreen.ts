import { useState } from 'react';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { resetAllStores } from '@/core/store/resetAllStores';
import { useAuthStore } from '@/core/store/useAuthStore';
import { useProductsQuery } from '@/features/home/hooks/useProductsQuery';
import type { HomeStackParamList, Product } from '@/features/home/types/home.types';
import type { MainTabParamList, RootStackParamList } from '@/navigation/navigation.types';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';

type HomeScreenNavigation = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'Home'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, 'HomeTab'>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;

export function useHomeScreen() {
  const navigation = useNavigation<HomeScreenNavigation>();
  const firstName = useAuthStore((state) => state.user?.firstName ?? 'there');
  const query = useProductsQuery();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 250);
  const normalizedSearch = debouncedSearch.trim().toLowerCase();
  const products = (query.data ?? []).filter((product) =>
    product.title.toLowerCase().includes(normalizedSearch),
  );

  return {
    firstName,
    search,
    setSearch,
    products,
    isLoading: query.isPending,
    errorMessage: query.error ? getErrorMessage(query.error) : null,
    refetch: () => {
      void query.refetch();
    },
    openProduct: (product: Product) => {
      navigation.navigate('ProductDetails', { productId: product.id });
    },
    openAbout: () => {
      navigation.navigate('About');
    },
    logout: () => {
      resetAllStores();
    },
  };
}

import { CompositeNavigationProp, useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useProductQuery } from '@/features/home/hooks/useProductsQuery';
import type { HomeStackParamList } from '@/features/home/types/home.types';
import type { MainTabParamList } from '@/navigation/navigation.types';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';

type ProductDetailsNavigation = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'ProductDetails'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export function useProductDetails() {
  const navigation = useNavigation<ProductDetailsNavigation>();
  const route = useRoute<RouteProp<HomeStackParamList, 'ProductDetails'>>();
  const query = useProductQuery(route.params.productId);
  const product = query.data;

  return {
    product,
    priceLabel: product ? formatCurrency(product.price) : '',
    isLoading: query.isPending,
    errorMessage: query.error ? getErrorMessage(query.error) : null,
    refetch: () => {
      void query.refetch();
    },
    addToCart: () => {
      if (!product) {
        return;
      }

      navigation.navigate('CheckoutTab', {
        screen: 'Cart',
        params: {
          pendingItem: {
            nonce: `${Date.now()}`,
            productId: product.id,
            title: product.title,
            price: product.price,
          },
        },
      });
    },
  };
}

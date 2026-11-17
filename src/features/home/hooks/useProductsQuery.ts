import { useQuery } from '@tanstack/react-query';

import { fetchProduct, fetchProducts } from '@/features/home/services/productsApi';

export const productKeys = {
  all: ['products'] as const,
  detail: (productId: string) => ['products', 'detail', productId] as const,
};

export function useProductsQuery() {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: fetchProducts,
  });
}

export function useProductQuery(productId: string) {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => fetchProduct(productId),
    enabled: productId.length > 0,
  });
}

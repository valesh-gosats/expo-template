import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '@/core/store/useAuthStore';
import { submitOrder } from '@/features/checkout/services/checkoutApi';
import { useCartStore } from '@/features/checkout/store/useCartStore';

export const orderKeys = {
  all: ['orders'] as const,
};

export function useSubmitOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { user } = useAuthStore.getState();
      const { lines } = useCartStore.getState();
      if (!user) {
        throw new Error('Sign in required');
      }
      if (lines.length === 0) {
        throw new Error('Cart is empty');
      }

      return submitOrder({
        userId: user.id,
        lines: lines.map((line) => ({
          productId: line.productId,
          quantity: line.quantity,
        })),
      });
    },
    onSuccess: async () => {
      useCartStore.getState().reset();
      await queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
}

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { mmkvStateStorage } from '@/core/storage/mmkv';
import { registerStoreReset } from '@/core/store/storeRegistry';
import type { CartLine, ShippingDetails } from '@/features/checkout/types/checkout.types';

type CartState = {
  lines: CartLine[];
  shipping: ShippingDetails | null;
  addItem: (item: Omit<CartLine, 'quantity'>) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeLine: (productId: string) => void;
  setShipping: (shipping: ShippingDetails) => void;
  reset: () => void;
};

const initialState = {
  lines: [],
  shipping: null,
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      ...initialState,
      addItem: (item) =>
        set((state) => {
          const existing = state.lines.find((line) => line.productId === item.productId);
          if (!existing) {
            return { lines: [...state.lines, { ...item, quantity: 1 }] };
          }

          return {
            lines: state.lines.map((line) =>
              line.productId === item.productId ? { ...line, quantity: line.quantity + 1 } : line,
            ),
          };
        }),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((line) => line.productId !== productId)
              : state.lines.map((line) => (line.productId === productId ? { ...line, quantity } : line)),
        })),
      removeLine: (productId) =>
        set((state) => ({
          lines: state.lines.filter((line) => line.productId !== productId),
        })),
      setShipping: (shipping) => set({ shipping }),
      reset: () => set(initialState),
    }),
    {
      name: 'checkout-cart',
      storage: createJSONStorage(() => mmkvStateStorage),
      partialize: (state) => ({
        lines: state.lines,
        shipping: state.shipping,
      }),
    },
  ),
);

export function registerCartStore(): void {
  registerStoreReset('cart', () => {
    useCartStore.getState().reset();
  });
}

registerCartStore();

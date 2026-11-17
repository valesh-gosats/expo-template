import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSubmitOrderMutation } from '@/features/checkout/hooks/useSubmitOrderMutation';
import { useCartStore } from '@/features/checkout/store/useCartStore';
import type { CheckoutStackParamList, ShippingDetails } from '@/features/checkout/types/checkout.types';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';

const shippingSchema = z.object({
  fullName: z.string().min(2, 'Enter the recipient name'),
  address: z.string().min(5, 'Enter a street address'),
  city: z.string().min(2, 'Enter a city'),
});

let lastAppliedPendingKey: string | null = null;

export function useCheckoutFlow() {
  const navigation = useNavigation<NativeStackNavigationProp<CheckoutStackParamList>>();
  const route = useRoute<RouteProp<CheckoutStackParamList>>();
  const lines = useCartStore((state) => state.lines);
  const shipping = useCartStore((state) => state.shipping);
  const addItem = useCartStore((state) => state.addItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeLine = useCartStore((state) => state.removeLine);
  const setShipping = useCartStore((state) => state.setShipping);
  const mutation = useSubmitOrderMutation();
  const form = useForm<ShippingDetails>({
    resolver: zodResolver(shippingSchema),
    defaultValues: shipping ?? {
      fullName: '',
      address: '',
      city: '',
    },
  });
  const pendingItem = route.name === 'Cart' ? route.params?.pendingItem : undefined;
  const pendingKey = pendingItem ? `${pendingItem.nonce}:${pendingItem.productId}` : null;
  const subtotal = lines.reduce((total, line) => total + line.price * line.quantity, 0);

  useEffect(() => {
    if (!pendingItem || !pendingKey || lastAppliedPendingKey === pendingKey) {
      return;
    }

    lastAppliedPendingKey = pendingKey;
    addItem({
      productId: pendingItem.productId,
      title: pendingItem.title,
      price: pendingItem.price,
    });

    if (route.name === 'Cart') {
      navigation.setParams({ pendingItem: undefined });
    }
  }, [addItem, navigation, pendingItem, pendingKey, route.name]);

  return {
    lines,
    subtotalLabel: formatCurrency(subtotal),
    increase: (productId: string) => {
      const current = useCartStore.getState().lines.find((line) => line.productId === productId);
      setQuantity(productId, (current?.quantity ?? 0) + 1);
    },
    decrease: (productId: string) => {
      const current = useCartStore.getState().lines.find((line) => line.productId === productId);
      setQuantity(productId, (current?.quantity ?? 1) - 1);
    },
    removeLine,
    shipping,
    control: form.control,
    errors: form.formState.errors,
    goToShipping: () => navigation.navigate('Shipping'),
    submitShipping: form.handleSubmit((values) => {
      setShipping(values);
      navigation.navigate('Payment');
    }),
    canPay: lines.length > 0 && shipping !== null && !mutation.isPending,
    pay: () => {
      mutation.mutate();
    },
    isPaying: mutation.isPending,
    paymentError: mutation.error ? getErrorMessage(mutation.error) : null,
    order: mutation.data ?? null,
  };
}

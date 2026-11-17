import { View } from 'react-native';

import { OrderSummaryCard } from '@/features/checkout/components/OrderSummaryCard';
import { useCheckoutFlow } from '@/features/checkout/hooks/useCheckoutFlow';
import { AppButton } from '@/shared/components/AppButton';
import { AppText } from '@/shared/components/AppText';
import { ScreenWrapper } from '@/shared/components/ScreenWrapper';

export function CartScreen() {
  const { lines, subtotalLabel, increase, decrease, removeLine, goToShipping } = useCheckoutFlow();

  return (
    <ScreenWrapper scroll>
      <AppText variant="title">Cart</AppText>
      {lines.length === 0 ? <AppText variant="caption">Your cart is empty.</AppText> : null}
      <View style={{ gap: 12 }}>
        {lines.map((line) => (
          <OrderSummaryCard
            key={line.productId}
            line={line}
            onDecrease={decrease}
            onIncrease={increase}
            onRemove={removeLine}
          />
        ))}
      </View>
      <AppText>Subtotal {subtotalLabel}</AppText>
      <AppButton disabled={lines.length === 0} label="Shipping" onPress={goToShipping} />
    </ScreenWrapper>
  );
}

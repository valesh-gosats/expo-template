import { useCheckoutFlow } from '@/features/checkout/hooks/useCheckoutFlow';
import { AppButton } from '@/shared/components/AppButton';
import { AppText } from '@/shared/components/AppText';
import { ScreenWrapper } from '@/shared/components/ScreenWrapper';
import { formatCurrency } from '@/shared/utils/formatCurrency';

export function PaymentScreen() {
  const { shipping, subtotalLabel, canPay, pay, isPaying, paymentError, order } = useCheckoutFlow();

  return (
    <ScreenWrapper scroll>
      <AppText variant="title">Payment</AppText>
      {shipping ? (
        <AppText>
          {shipping.fullName}, {shipping.address}, {shipping.city}
        </AppText>
      ) : (
        <AppText variant="caption">Add a shipping address before paying.</AppText>
      )}
      <AppText>Total {subtotalLabel}</AppText>
      {paymentError ? <AppText variant="error">{paymentError}</AppText> : null}
      {order ? (
        <AppText>
          Order {order.id} placed for {formatCurrency(order.total)}.
        </AppText>
      ) : null}
      <AppButton disabled={!canPay} label="Place order" loading={isPaying} onPress={pay} />
    </ScreenWrapper>
  );
}

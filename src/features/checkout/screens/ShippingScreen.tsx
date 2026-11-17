import { Controller } from 'react-hook-form';

import { useCheckoutFlow } from '@/features/checkout/hooks/useCheckoutFlow';
import { AppButton } from '@/shared/components/AppButton';
import { AppInput } from '@/shared/components/AppInput';
import { AppText } from '@/shared/components/AppText';
import { ScreenWrapper } from '@/shared/components/ScreenWrapper';

export function ShippingScreen() {
  const { control, errors, submitShipping } = useCheckoutFlow();

  return (
    <ScreenWrapper scroll>
      <AppText variant="title">Shipping</AppText>
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            error={errors.fullName?.message}
            label="Full name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="address"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            error={errors.address?.message}
            label="Address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="city"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            error={errors.city?.message}
            label="City"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <AppButton label="Continue to payment" onPress={submitShipping} />
    </ScreenWrapper>
  );
}

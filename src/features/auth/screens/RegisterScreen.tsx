import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { useRegisterForm } from '@/features/auth/hooks/useRegisterForm';
import { AppButton } from '@/shared/components/AppButton';
import { AppText } from '@/shared/components/AppText';
import { ScreenWrapper } from '@/shared/components/ScreenWrapper';

export function RegisterScreen() {
  const { control, errors, onSubmit } = useRegisterForm();

  return (
    <ScreenWrapper scroll>
      <AppText variant="title">Create account</AppText>
      <AppText variant="caption">
        This checks the form locally, then returns you to sign in. The demo API has no register
        endpoint.
      </AppText>
      <RegisterForm control={control} errors={errors} />
      <AppButton label="Continue to sign in" onPress={onSubmit} />
    </ScreenWrapper>
  );
}

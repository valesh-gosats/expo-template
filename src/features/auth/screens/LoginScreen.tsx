import { LoginForm } from '@/features/auth/components/LoginForm';
import { useLoginForm } from '@/features/auth/hooks/useLoginForm';
import { AppButton } from '@/shared/components/AppButton';
import { AppText } from '@/shared/components/AppText';
import { ScreenWrapper } from '@/shared/components/ScreenWrapper';

export function LoginScreen() {
  const { control, errors, onSubmit, isSubmitting, submitError, goToRegister } = useLoginForm();

  return (
    <ScreenWrapper scroll>
      <AppText variant="title">Welcome back</AppText>
      <AppText variant="caption">Demo user: emilys / emilyspass</AppText>
      <LoginForm control={control} errors={errors} />
      {submitError ? <AppText variant="error">{submitError}</AppText> : null}
      <AppButton label="Sign in" loading={isSubmitting} onPress={onSubmit} />
      <AppButton label="Create account" onPress={goToRegister} variant="secondary" />
    </ScreenWrapper>
  );
}

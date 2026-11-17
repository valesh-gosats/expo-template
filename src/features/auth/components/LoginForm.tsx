import { Controller, type Control, type FieldErrors } from 'react-hook-form';

import type { LoginCredentials } from '@/features/auth/types/auth.types';
import { AppInput } from '@/shared/components/AppInput';

type LoginFormProps = {
  control: Control<LoginCredentials>;
  errors: FieldErrors<LoginCredentials>;
};

export function LoginForm({ control, errors }: LoginFormProps) {
  return (
    <>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.username?.message}
            label="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            autoCapitalize="none"
            error={errors.password?.message}
            label="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry
            value={value}
          />
        )}
      />
    </>
  );
}

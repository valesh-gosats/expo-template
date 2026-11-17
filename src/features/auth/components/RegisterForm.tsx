import { Controller, type Control, type FieldErrors } from 'react-hook-form';

import { AppInput } from '@/shared/components/AppInput';

type RegisterValues = {
  username: string;
  email: string;
  password: string;
};

type RegisterFormProps = {
  control: Control<RegisterValues>;
  errors: FieldErrors<RegisterValues>;
};

export function RegisterForm({ control, errors }: RegisterFormProps) {
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
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.email?.message}
            keyboardType="email-address"
            label="Email"
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

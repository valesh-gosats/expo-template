import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';

import { loginRequestSchema } from '@/features/auth/services/authApi';
import type { AuthStackParamList, LoginCredentials } from '@/features/auth/types/auth.types';
import { useLoginMutation } from '@/features/auth/hooks/useLoginMutation';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';

export function useLoginForm() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList, 'Login'>>();
  const mutation = useLoginMutation();
  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return {
    control: form.control,
    errors: form.formState.errors,
    onSubmit: form.handleSubmit((values) => {
      mutation.mutate(values);
    }),
    isSubmitting: mutation.isPending,
    submitError: mutation.error ? getErrorMessage(mutation.error) : null,
    goToRegister: () => navigation.navigate('Register'),
  };
}

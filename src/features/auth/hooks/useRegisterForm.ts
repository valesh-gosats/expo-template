import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { AuthStackParamList } from '@/features/auth/types/auth.types';

const registerSchema = z.object({
  username: z.string().min(3, 'Use at least 3 characters'),
  email: z.email('Enter a valid email'),
  password: z.string().min(8, 'Use at least 8 characters'),
});

type RegisterValues = z.infer<typeof registerSchema>;

export function useRegisterForm() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList, 'Register'>>();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  return {
    control: form.control,
    errors: form.formState.errors,
    onSubmit: form.handleSubmit(() => {
      navigation.navigate('Login');
    }),
  };
}

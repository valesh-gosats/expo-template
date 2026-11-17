import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '@/core/store/useAuthStore';
import { login } from '@/features/auth/services/authApi';

export function useLoginMutation() {
  return useMutation({
    mutationFn: login,
    onSuccess: (session) => {
      useAuthStore.getState().setSession(session);
    },
  });
}

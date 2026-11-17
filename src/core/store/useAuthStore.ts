import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { mmkvStateStorage } from '@/core/storage/mmkv';
import { registerStoreReset } from '@/core/store/storeRegistry';
import type { Session, User } from '@/shared/types/user';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setSession: (session: Session) => void;
  reset: () => void;
};

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setSession: (session) =>
        set({
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
          user: session.user,
        }),
      reset: () => set(initialState),
    }),
    {
      name: 'auth-session',
      storage: createJSONStorage(() => mmkvStateStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    },
  ),
);

registerStoreReset('auth', () => {
  useAuthStore.getState().reset();
});

import type { Session } from '@/shared/types/user';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type { Session };

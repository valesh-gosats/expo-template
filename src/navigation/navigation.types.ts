import type { NavigatorScreenParams } from '@react-navigation/native';

import type { AuthStackParamList } from '@/features/auth/types/auth.types';
import type { CheckoutStackParamList } from '@/features/checkout/types/checkout.types';
import type { HomeStackParamList } from '@/features/home/types/home.types';

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  CheckoutTab: NavigatorScreenParams<CheckoutStackParamList>;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  About: undefined;
};

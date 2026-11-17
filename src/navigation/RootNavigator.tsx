import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthStore } from '@/core/store/useAuthStore';
import { useTheme } from '@/core/theme/ThemeProvider';
import { AuthNavigator } from '@/features/auth/navigation/AuthNavigator';
import { AboutModal } from '@/navigation/AboutModal';
import { MainTabNavigator } from '@/navigation/MainTabNavigator';
import type { RootStackParamList } from '@/navigation/navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const theme = useTheme();
  const accessToken = useAuthStore((state) => state.accessToken);
  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.border,
      primary: theme.colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator key={accessToken ? 'main' : 'auth'}>
        {accessToken ? (
          <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
        )}
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="About" component={AboutModal} options={{ title: 'About' }} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from '@/core/theme/ThemeProvider';
import { CheckoutNavigator } from '@/features/checkout/navigation/CheckoutNavigator';
import { useCartStore } from '@/features/checkout/store/useCartStore';
import { HomeNavigator } from '@/features/home/navigation/HomeNavigator';
import type { MainTabParamList } from '@/navigation/navigation.types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  const theme = useTheme();
  const itemCount = useCartStore((state) =>
    state.lines.reduce((total, line) => total + line.quantity, 0),
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeNavigator} options={{ title: 'Home' }} />
      <Tab.Screen
        name="CheckoutTab"
        component={CheckoutNavigator}
        options={{ title: 'Cart', tabBarBadge: itemCount > 0 ? itemCount : undefined }}
      />
    </Tab.Navigator>
  );
}

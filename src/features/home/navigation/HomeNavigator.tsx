import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '@/features/home/screens/HomeScreen';
import { ProductDetailsScreen } from '@/features/home/screens/ProductDetailsScreen';
import type { HomeStackParamList } from '@/features/home/types/home.types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Shop' }} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: 'Product' }}
      />
    </Stack.Navigator>
  );
}

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CartScreen } from '@/features/checkout/screens/CartScreen';
import { PaymentScreen } from '@/features/checkout/screens/PaymentScreen';
import { ShippingScreen } from '@/features/checkout/screens/ShippingScreen';
import type { CheckoutStackParamList } from '@/features/checkout/types/checkout.types';

const Stack = createNativeStackNavigator<CheckoutStackParamList>();

export function CheckoutNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
      <Stack.Screen name="Shipping" component={ShippingScreen} options={{ title: 'Shipping' }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Payment' }} />
    </Stack.Navigator>
  );
}

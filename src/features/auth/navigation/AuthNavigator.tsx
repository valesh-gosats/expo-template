import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { RegisterScreen } from '@/features/auth/screens/RegisterScreen';
import type { AuthStackParamList } from '@/features/auth/types/auth.types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Sign in' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Create account' }} />
    </Stack.Navigator>
  );
}

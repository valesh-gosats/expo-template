import { AppProviders } from '@/core/providers/AppProviders';
import { registerCartStore } from '@/features/checkout/store/useCartStore';
import { RootNavigator } from '@/navigation/RootNavigator';

registerCartStore();

export default function App() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}

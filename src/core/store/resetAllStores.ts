import { queryClient } from '@/core/api/queryClient';
import { resetRegisteredStores } from '@/core/store/storeRegistry';

export function resetAllStores(): void {
  queryClient.clear();
  resetRegisteredStores();
}

import { useEffect, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

const statuses: readonly AppStateStatus[] = ['active', 'background', 'inactive', 'extension', 'unknown'];

function readAppState(): AppStateStatus {
  const current = AppState.currentState;
  if (current && statuses.includes(current as AppStateStatus)) {
    return current as AppStateStatus;
  }

  return 'active';
}

export function useAppState(): AppStateStatus {
  const [status, setStatus] = useState<AppStateStatus>(readAppState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', setStatus);
    return () => {
      subscription.remove();
    };
  }, []);

  return status;
}

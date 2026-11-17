const resets = new Map<string, () => void>();

export function registerStoreReset(key: string, reset: () => void): void {
  resets.set(key, reset);
}

export function resetRegisteredStores(): void {
  resets.forEach((reset) => {
    reset();
  });
}

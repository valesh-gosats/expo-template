import { createMMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';
import { z } from 'zod';

export const appStorage = createMMKV({ id: 'app-storage' });

export const mmkvStateStorage: StateStorage = {
  getItem: (name) => appStorage.getString(name) ?? null,
  setItem: (name, value) => {
    appStorage.set(name, value);
  },
  removeItem: (name) => {
    appStorage.remove(name);
  },
};

export function setJson(key: string, value: unknown): void {
  appStorage.set(key, JSON.stringify(value));
}

export function getJson<T>(key: string, schema: z.ZodType<T>): T | null {
  const raw = appStorage.getString(key);
  if (raw === undefined) {
    return null;
  }

  try {
    return schema.parse(JSON.parse(raw));
  } catch {
    return null;
  }
}

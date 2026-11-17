import { create, isAxiosError, type InternalAxiosRequestConfig } from 'axios';
import { z } from 'zod';

import { env } from '@/core/config/env';
import { resetAllStores } from '@/core/store/resetAllStores';
import { useAuthStore } from '@/core/store/useAuthStore';

const refreshResponseSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
});

type RetriableConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const apiTimeoutMs = 15_000;

function isAuthEndpoint(url: string | undefined): boolean {
  if (!url) {
    return false;
  }

  return url.includes('/auth/login') || url.includes('/auth/refresh');
}

const refreshClient = create({
  baseURL: env.EXPO_PUBLIC_API_URL,
  timeout: apiTimeoutMs,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

async function refreshAccessToken(): Promise<string> {
  const { refreshToken, user, setSession } = useAuthStore.getState();
  if (!refreshToken || !user) {
    throw new Error('Missing refresh token');
  }

  const response = await refreshClient.post('/auth/refresh', { refreshToken });
  const parsed = refreshResponseSchema.parse(response.data);
  setSession({
    accessToken: parsed.accessToken,
    refreshToken: parsed.refreshToken,
    user,
  });
  return parsed.accessToken;
}

let refreshPromise: Promise<string> | null = null;

function refreshOnce(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken()
      .catch((error: unknown) => {
        resetAllStores();
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export const apiClient = create({
  baseURL: env.EXPO_PUBLIC_API_URL,
  timeout: apiTimeoutMs,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (isAuthEndpoint(config.url)) {
    return config;
  }

  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!isAxiosError(error) || !error.config) {
      return Promise.reject(error);
    }

    const config = error.config as RetriableConfig;
    const shouldRefresh =
      error.response?.status === 401 && !config._retry && !isAuthEndpoint(config.url);

    if (!shouldRefresh) {
      return Promise.reject(error);
    }

    config._retry = true;
    const token = await refreshOnce();
    config.headers.set('Authorization', `Bearer ${token}`);
    return apiClient.request(config);
  },
);

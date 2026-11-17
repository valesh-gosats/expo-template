import { z } from 'zod';

import { apiClient } from '@/core/api/client';
import type { LoginCredentials, Session } from '@/features/auth/types/auth.types';

export const loginRequestSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

const loginResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
});

function toSession(dto: z.infer<typeof loginResponseSchema>): Session {
  return {
    accessToken: dto.accessToken,
    refreshToken: dto.refreshToken,
    user: {
      id: String(dto.id),
      username: dto.username,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
    },
  };
}

export async function login(credentials: LoginCredentials): Promise<Session> {
  const body = loginRequestSchema.parse(credentials);
  const response = await apiClient.post('/auth/login', body);
  return toSession(loginResponseSchema.parse(response.data));
}

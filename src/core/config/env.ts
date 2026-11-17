import { z } from 'zod';

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.url(),
});

const parsed = envSchema.safeParse({
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
});

if (!parsed.success) {
  const details = parsed.error.issues.map((issue) => issue.message).join(', ');
  throw new Error(`Invalid environment configuration: ${details}`);
}

export const env = parsed.data;

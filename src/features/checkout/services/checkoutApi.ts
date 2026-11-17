import { z } from 'zod';

import { apiClient } from '@/core/api/client';
import type { Order, SubmitOrderInput } from '@/features/checkout/types/checkout.types';

const orderDtoSchema = z.object({
  id: z.number(),
  total: z.number(),
  discountedTotal: z.number().optional(),
});

function toOrder(dto: z.infer<typeof orderDtoSchema>): Order {
  return {
    id: String(dto.id),
    total: dto.total,
  };
}

export async function submitOrder(input: SubmitOrderInput): Promise<Order> {
  const userId = Number(input.userId);
  if (!Number.isInteger(userId)) {
    throw new Error('A numeric user id is required to place this order');
  }

  const response = await apiClient.post('/carts/add', {
    userId,
    products: input.lines.map((line) => ({
      id: Number(line.productId),
      quantity: line.quantity,
    })),
  });

  return toOrder(orderDtoSchema.parse(response.data));
}

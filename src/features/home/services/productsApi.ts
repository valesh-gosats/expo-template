import { z } from 'zod';

import { apiClient } from '@/core/api/client';
import type { Product } from '@/features/home/types/home.types';

const productDtoSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  thumbnail: z.string(),
});

const productListDtoSchema = z.object({
  products: z.array(productDtoSchema),
});

function toProduct(dto: z.infer<typeof productDtoSchema>): Product {
  return {
    id: String(dto.id),
    title: dto.title,
    price: dto.price,
    thumbnailUrl: dto.thumbnail,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await apiClient.get('/products');
  return productListDtoSchema.parse(response.data).products.map(toProduct);
}

export async function fetchProduct(productId: string): Promise<Product> {
  const response = await apiClient.get(`/products/${productId}`);
  return toProduct(productDtoSchema.parse(response.data));
}

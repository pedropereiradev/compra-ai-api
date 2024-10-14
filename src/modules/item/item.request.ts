import { z } from 'zod';

export const createItemSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().optional(),
  price: z.number().optional(),
  description: z.string().optional(),
});

export type CreateItemSchema = z.infer<typeof createItemSchema>;

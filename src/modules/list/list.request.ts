import { z } from 'zod';

export const createSchema = z.object({
  name: z.string().min(1).max(15, 'Name must be less than 15 characters'),
  emoji: z.string(),
  maxSpend: z.number().nullable().optional(),
});

export type CreateSchema = z.infer<typeof createSchema>;

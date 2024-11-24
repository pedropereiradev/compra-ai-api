import { z } from 'zod';

export const createSchema = z.object({
  name: z.string().min(1).max(15, 'Name must be less than 15 characters'),
  emoji: z.string(),
  maxSpend: z.number().nullable().optional(),
});

export const updateSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(15, 'Name must be less than 15 characters')
    .optional(),
  emoji: z.string().optional(),
  maxSpend: z.number().nullable().optional(),
});

export const inviteSchema = z.object({
  email: z.string().email(),
});

export const acceptInviteSchema = z.object({
  inviteId: z.number(),
  accepted: z.boolean(),
});

export type CreateSchema = z.infer<typeof createSchema>;
export type InviteSchema = z.infer<typeof inviteSchema>;
export type AcceptInviteSchema = z.infer<typeof acceptInviteSchema>;
export type UpdateSchema = z.infer<typeof updateSchema>;

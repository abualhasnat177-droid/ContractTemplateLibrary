import { z } from 'zod';

export const CreateSignatureRequestSchema = z.object({
  draftId: z.string().min(1),
  subject: z.string().max(200).optional(),
  message: z.string().max(1000).optional(),
  signers: z.array(z.object({
    name:  z.string().min(1).max(100),
    email: z.string().email(),
    order: z.number().int().min(1),
  })).min(1).max(10),
});

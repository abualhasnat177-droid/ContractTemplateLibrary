import { z } from 'zod';

export const DownloadSchema = z.object({
  templateId:       z.string().min(1),
  fieldValues:      z.record(z.string(), z.string()),
  enabledClauses:   z.record(z.string(), z.boolean()),
  aiCustomizations: z.record(z.string(), z.string()).default({}),
  format:           z.enum(['pdf', 'docx']),
  brandOptions: z.object({
    brandName:    z.string().max(80).optional(),
    brandLogoUrl: z.string().url().optional(),
  }).optional(),
});

import { z } from 'zod';

export const CreateDraftSchema = z.object({
  templateId: z.string().min(1),
  name:        z.string().max(100).default('Untitled Draft'),
  fieldValues: z.record(z.string(), z.string()),
  enabledClauses: z.record(z.string(), z.boolean()),
  aiCustomizations: z.record(z.string(), z.string()).default({}),
});

export const UpdateDraftSchema = CreateDraftSchema.partial().omit({ templateId: true });

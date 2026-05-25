import { z } from 'zod';

export const CreateTeamSchema = z.object({
  name: z.string().min(2).max(80),
});

export const InviteMemberSchema = z.object({
  email: z.string().email(),
  role:  z.enum(['ADMIN', 'MEMBER', 'VIEWER']),
});

export const UpdateBrandKitSchema = z.object({
  brandName:         z.string().max(80).optional(),
  brandLogoUrl:      z.string().url().optional(),
  brandPrimaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
});

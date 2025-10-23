import { z } from "zod";
export const organizationSchema = z.object({
  name: z.string().min(1),
  email: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  state: z.string().optional().or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
  postal_code: z.string().optional().or(z.literal("")),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type OrganizationFormData = z.infer<typeof organizationSchema>;

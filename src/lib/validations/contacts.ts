import { z } from "zod";

export const contactFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  organization_id: z.string().min(1, "Organization is required"),
  organization_name: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  state: z.string().optional().or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
  postal_code: z.string().optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

import z from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "minimum 2 symbol"),
  email: z.email("invalid email"),
  phone: z.string().regex(/^\+374\d{8}$/, { error: "invalid phone" }),
  company: z.string().optional(),
  message: z.string(),
});

export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;

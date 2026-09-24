import { z } from "zod";

export const formCheckoutSchema = z.object({
  firstName: z.string().min(2, "minimum 2 symbols"),
  lastName: z.string().min(2, "minimum 2 symbols"),
  email: z.email("invalid email"),
  phone: z.string().regex(/^\+374\d{8}$/, { error: "invalid phone number" }),
  address: z.string().min(5, "minimum 5 symbols"),
  message: z.any().optional(),
});

export type FormCheckoutSchemaType = z.infer<typeof formCheckoutSchema>;

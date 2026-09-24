import z from "zod";
import { emailFormShema } from "./allowed-domains";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .regex(/[a-z]/, "Must contain a lowercase letter.")
  .regex(/[A-Z]/, "Must contain an uppercase letter.")
  .regex(/\d/, "Must contain a number.")
  .regex(/[!@#$%^&*(),.?":{}|<>_\-]/, "Must contain a special character.");

export const authRegisterSchema = z
  .object({
    name: z.string().min(2, { message: "minimum 2 symbol" }),
    email: emailFormShema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "not correct",
  });
export const authLoginSchema = z.object({
  email: emailFormShema,
  password: passwordSchema,
});

export type AuthRegisterSchemaType = z.infer<typeof authRegisterSchema>;
export type AuthLoginSchemaType = z.infer<typeof authLoginSchema>;

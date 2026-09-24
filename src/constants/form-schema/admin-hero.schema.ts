import z from "zod";
import { imgSchema } from "./profile.schema";

export const adminHeroSchema = z.object({
  title: z.string(),
  color: z.string(),
  imgUrlDesktop: imgSchema,
  imgUrlMobile: imgSchema,
});

export type AdminHeroSchemaType = z.infer<typeof adminHeroSchema>;

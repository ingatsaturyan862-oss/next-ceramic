import z from "zod";
export const imgSchema = z
  .union([
    z.string(),
    z.null(),
    z
      .file()
      .refine((data) => data.size <= 5 * 1024 * 1024, "Max size 5mb")
      .refine((data) => data.type.includes("image/"), "Only Image"),
  ])
  .optional();
export const profileFormSchema = z.object({
  name: z.string(),
  email: z.email(),
  avatar: imgSchema,
});

export type ProfileFormSchemaType = z.infer<typeof profileFormSchema>;

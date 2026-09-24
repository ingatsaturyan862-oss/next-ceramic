"use server";
import {
  adminHeroSchema,
  AdminHeroSchemaType,
} from "@/constants/form-schema/admin-hero.schema";
import { prisma } from "@/prisma/prisma-client";
import z from "zod";
import { createImage } from "@/lib/create-image";

export const adminHeroAction = async (
  value: AdminHeroSchemaType,
  type: "home" | "contact",
) => {
  const parsed = z.safeParse(adminHeroSchema, value);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const data = parsed.data;

  const imgUrlDesktop = await createImage(data.imgUrlDesktop);
  const imgUrlMobile = await createImage(data.imgUrlMobile);

  if (type === "home") {
    await prisma.homeHero.update({
      where: { id: 1 },
      data: {
        title: data.title,
        color: data.color,
        imgUrlDesktop,
        imgUrlMobile,
      },
    });
  }

  if (type === "contact") {
    await prisma.contactHero.update({
      where: { id: 1 },
      data: {
        title: data.title,
        color: data.color,
        imgUrlDesktop,
        imgUrlMobile,
      },
    });
  }
};

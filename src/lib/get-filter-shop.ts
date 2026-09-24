import { prisma } from "@/prisma/prisma-client";
import { unstable_cache } from "next/cache";

export const getFilterShop = unstable_cache(
  async () => {
    const [category, priceRange, color] = await Promise.all([
      prisma.category.findMany(),
      prisma.priceRange.findMany(),
      prisma.color.findMany(),
    ]);
    return { category, priceRange, color };
  },
  ["shop"],
  { revalidate: 3600 },
);

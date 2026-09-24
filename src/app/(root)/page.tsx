import { Home } from "@/components/home";
import { prisma } from "@/prisma/prisma-client";
import { unstable_cache } from "next/cache";

// export const revalidate = 3600;
// ISR - jam@ mek tarmacum

const cachedData = unstable_cache(
  async () => await Promise.all([prisma.product.findMany(),
  prisma.homeHero.findFirst()]),
  ["home"],
  { revalidate: 3600 },
);

export default async function HomePage() {
  const [products, hero] = await cachedData();

  return <Home products={products} hero={hero} />;
}

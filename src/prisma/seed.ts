import { UserRole } from "@prisma/client";
import { prisma } from "./prisma-client";
import {
  filter,
  filterCategory,
  filterColor,
  filterPriceRange,
} from "@/constants/filter";
import { products } from "@/constants/products";

async function create() {
  await prisma.user.create({
    data: {
      email: "gvidon1234@gmail.com",
      emailVerified: true,
      name: "Gvidon",
      role: UserRole.ADMIN,
    },
  });
  await prisma.user.create({
    data: {
      email: "patrisia1234@gmail.com",
      emailVerified: true,
      name: "Patrisia",
    },
  });
  await prisma.category.createMany({
    data: filterCategory,
  });
  await prisma.priceRange.createMany({
    data: filterPriceRange,
  });
  await prisma.color.createMany({
    data: filterColor,
  });
  for (const product of products) {
    await prisma.product.create({
      data: {
        ...product,
        color: {
          connect: filter.color.map((el) => ({ id: el.id })),
        },
      },
    });
  }

  await prisma.homeHero.create({
    data: {
      title: "BAT TRANG DINNER SET",
      color: "#826f66",
      imgUrlDesktop: "/hero/1.jpg",
      imgUrlMobile: "/hero/1-mobile.jpg",
    },
  });

  await prisma.contactHero.create({
    data: {
      title: "BAT TRANG DINNER SET",
      color: "#3a3845",
      imgUrlDesktop: "/hero/2.jpg",
      imgUrlMobile: "/hero/2-mobile.jpg",
    },
  });
}

async function reset() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Color" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "PriceRange" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "HomeHero" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ContactHero" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await reset();
    await create();
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });

import { PostBasketValue } from "@/@types/basket";
import { prisma } from "@/prisma/prisma-client";

export const basketMerge = async (
  localItems: PostBasketValue[],
  userId: string,
) => {
  const basket = await prisma.basket.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
  const filterItems = localItems.filter(
    (el) =>
      Number.isFinite(el.productId) &&
      Number.isFinite(el.quantity) &&
      Number.isFinite(el.colorId),
  );
  if (filterItems.length === 0) {
    return;
  }
  const productIds = filterItems.map((el) => el.productId);
  const existingProducts = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true },
  });
  const validIds = new Set(existingProducts.map((el) => el.id));
  const items = filterItems.filter((el) => validIds.has(el.productId));
  if (items.length === 0) {
    return;
  }

  await prisma.$transaction(
    items.map((el) =>
      prisma.basketCard.upsert({
        where: {
          basketId_productId_colorId: {
            basketId: basket.id,
            productId: el.productId,
            colorId: el.colorId,
          },
        },
        create: {
          basketId: basket.id,
          productId: el.productId,
          colorId: el.colorId,
          quantity: el.quantity,
        },
        update: { quantity: el.quantity },
      }),
    ),
  );
};

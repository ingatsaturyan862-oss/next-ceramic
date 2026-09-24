import { prisma } from "@/prisma/prisma-client";

export const updateBasket = async (userId: string) => {
  const basket = await prisma.basket.findUnique({
    where: { userId },
    include: {
      basketCard: {
        orderBy: { createdAt: "desc" },
        include: {
          product: true,
        },
      },
    },
  });
  if (!basket) return;
  const totalAmount = basket.basketCard.reduce(
    (acc, el) => acc + el.product.price * el.quantity,
    0,
  );

  await prisma.basket.update({
    where: { id: basket.id },
    data: { totalAmount },
  });
  const items = basket.basketCard.map((el) => ({
    id: el.id,
    name: el.product.name,
    price: el.product.price,
    imgUrl: el.product.imgUrl,
    quantity: el.quantity,
    subtotal: el.quantity * el.product.price,
    colorId: el.colorId,
  }));
  return { items, totalAmount };
};

import { PostBasketValue } from "@/@types/basket";
import { getUser } from "@/lib/get-user";
import { updateBasket } from "@/lib/update-basket";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ totalAmount: 0, items: [] }, { status: 200 });
    }
    const userId = user.id;
    const basket = await updateBasket(userId);
    console.log(basket);

    return NextResponse.json(basket, { status: 200 });
  } catch (error) {
    console.error("Internal Server Error GET BASKET " + error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = user.id;
    const body = (await req.json()) as PostBasketValue;
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    const productId = Number(body.productId);
    const colorId = Number(body.colorId);
    const quantity = body.quantity === undefined ? 1 : Number(body.quantity);
    if (
      !Number.isFinite(productId) ||
      !Number.isFinite(colorId) ||
      !Number.isFinite(quantity)
    ) {
      return NextResponse.json(
        { error: "productId | colorId | quantity bad request" },
        { status: 400 },
      );
    }
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });
    if (!product) {
      return NextResponse.json({ error: "product not found" }, { status: 404 });
    }
    const basket = await prisma.basket.findUnique({
      where: { userId },
    });

    if (!basket) {
      return NextResponse.json({ error: "basket not found" }, { status: 404 });
    }

    await prisma.basketCard.upsert({
      where: {
        basketId_productId_colorId: { basketId: basket.id, productId, colorId },
      },
      update: { quantity: { increment: quantity } },
      create: { basketId: basket.id, productId, colorId, quantity },
    });
    const upBasket = await updateBasket(userId);
    return NextResponse.json(upBasket, { status: 200 });
  } catch (error) {
    console.error("Internal Server Error POST BASKET " + error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
export async function DELETE() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = user.id;
    const findBasket = await prisma.basket.findUnique({
      where: { userId },
    });
    if (!findBasket) {
      return NextResponse.json({ error: "basket not found" }, { status: 404 });
    }
    await prisma.basketCard.deleteMany({
      where: { basketId: findBasket.id },
    });
    const upBasket = await updateBasket(userId);
    return NextResponse.json(upBasket, { status: 200 });
  } catch (error) {
    console.error("Internal Server Error CLEAR BASKET " + error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

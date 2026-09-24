import { ParamsProps } from "@/@types/params";
import { getUser } from "@/lib/get-user";
import { updateBasket } from "@/lib/update-basket";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: ParamsProps) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = user.id;
    const paramsId = (await params).id;
    if (!paramsId) {
      return NextResponse.json(
        { error: "params id bad request" },
        { status: 400 },
      );
    }
    const id = Number(paramsId);
    const body = (await req.json()) as {
      quantityType: "increment" | "decrement";
    };

    if (!body) {
      return NextResponse.json({ error: "bad request" }, { status: 400 });
    }

    if (
      !("quantityType" in body) ||
      (body.quantityType !== "increment" && body.quantityType !== "decrement")
    ) {
      return NextResponse.json({ error: "bad request" }, { status: 400 });
    }
    const quantityType = body.quantityType;

    const findBasketCard = await prisma.basketCard.findUnique({
      where: { id },
    });
    if (!findBasketCard) {
      return NextResponse.json(
        { error: "basket card not found" },
        { status: 404 },
      );
    }
    if (quantityType === "increment") {
      await prisma.basketCard.update({
        where: { id },
        data: { quantity: { increment: 1 } },
      });
    }
    if (quantityType === "decrement" && findBasketCard.quantity > 1) {
      await prisma.basketCard.update({
        where: { id },
        data: { quantity: { decrement: 1 } },
      });
    }
    const upBasket = await updateBasket(userId);
    return NextResponse.json(upBasket, { status: 200 });
  } catch (error) {
    console.error("Internal Server Error PATCH BASKET " + error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: NextRequest, { params }: ParamsProps) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = user.id;
    const paramsId = (await params).id;
    if (!paramsId) {
      return NextResponse.json(
        { error: "params id bad request" },
        { status: 400 },
      );
    }
    const id = Number(paramsId);

    const findBasketCard = await prisma.basketCard.findUnique({
      where: { id },
    });
    if (!findBasketCard) {
      return NextResponse.json(
        { error: "basket card not found" },
        { status: 404 },
      );
    }

    await prisma.basketCard.delete({
      where: { id },
    });

    const upBasket = await updateBasket(userId);
    return NextResponse.json(upBasket, { status: 200 });
  } catch (error) {
    console.error("Internal Server Error DELETE BASKET " + error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

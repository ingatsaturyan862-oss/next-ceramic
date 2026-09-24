import { PostBasketValue } from "@/@types/basket";
import { basketMerge } from "@/lib/basket-merge";
import { getUser } from "@/lib/get-user";
import { updateBasket } from "@/lib/update-basket";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = user.id;
    const body = (await req.json()) as { localItems: PostBasketValue[] };

    if (!body) {
      return NextResponse.json({ error: "bad request" }, { status: 400 });
    }
    if (!("localItems" in body) || !Array.isArray(body.localItems)) {
      return NextResponse.json({ error: "bad request" }, { status: 400 });
    }

    await basketMerge(body.localItems, userId);
    const upBasket = await updateBasket(userId);
    return NextResponse.json(upBasket, { status: 200 });
  } catch (error) {
    console.error("Internal Server Error POST MERGE BASKET " + error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

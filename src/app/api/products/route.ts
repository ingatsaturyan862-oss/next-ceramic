import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const idsParams = req.nextUrl.searchParams.get("ids");

    if (idsParams !== null) {
      const ids = idsParams?.split(",").map(Number);
      if (ids.length === 0) {
        return NextResponse.json([], { status: 200 });
      }
      if (ids.length > 30) {
        return NextResponse.json({ message: "limit 30" }, { status: 200 });
      }
      const productsItems = await prisma.product.findMany({
        where: {
          id: { in: ids },
        },
        include: {
          color: true,
        },
      });

      return NextResponse.json(productsItems, { status: 200 });
    }

    const limit = req.nextUrl.searchParams.get("limit");
    const search = req.nextUrl.searchParams.get("search") || " ";
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      take: Number(limit),
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Internal Server Error GET PRODUCTS" + error);
    return NextResponse.json(
      { message: "Internal Serever Error" },
      { status: 500 },
    );
  }
}

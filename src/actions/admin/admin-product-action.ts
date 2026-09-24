"use server";
import { AdminState } from "@/@types/admin";
import { isAdmin } from "@/lib/is-admin";
import { prisma } from "@/prisma/prisma-client";

type Payload = {
  type: AdminState;
  id: number;
  name: string;
  price: number;
  text: string;
  categoryId: number;
  colorIds: number[];
  imgUrl?: string;
  images: string[];
};

const productMode = {
  async create({
    name,
    price,
    text,
    imgUrl,
    images,
    categoryId,
    colorIds,
  }: Payload) {
    if (!name) throw new Error("name is required");
    if (!imgUrl) throw new Error("imgUrl is required");
    if (!categoryId) throw new Error("categoryId is required");
    await prisma.product.create({
      data: {
        name,
        price,
        text,
        imgUrl,
        images,
        categoryId,
        color: { connect: colorIds.map((id) => ({ id })) },
      },
    });
  },
  async update({
    id,
    name,
    price,
    text,
    imgUrl,
    images,
    categoryId,
    colorIds,
  }: Payload) {
    if (!name) throw new Error("name is required");
    await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        text,
        categoryId,
        images,
        ...(imgUrl ? { imgUrl } : {}),
        color: { set: colorIds.map((id) => ({ id })) },
      },
    });
  },
  async delete({ id }: Payload) {
    await prisma.product.delete({ where: { id } });
  },
};

export async function AdminProductAction(payload: Payload) {
  if (!(await isAdmin())) {
    throw new Error("Forbidden");
  }
  await productMode[payload.type](payload);
}

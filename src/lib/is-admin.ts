import { headers } from "next/headers";
import { auth } from "./auth";
import { prisma } from "@/prisma/prisma-client";

export const isAdmin = async () => {
  try {
    const data = await auth.api.getSession({ headers: await headers() });
    if (!data?.user) {
      return false;
    }
    const findUser = await prisma.user.findUnique({
      where: { id: data.user.id },
    });

    if (!findUser || findUser.role !== "ADMIN") {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

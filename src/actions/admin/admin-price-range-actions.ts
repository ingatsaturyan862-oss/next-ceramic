"use server"
import { AdminState } from "@/@types/admin";
import { isAdmin } from "@/lib/is-admin";
import { prisma } from "@/prisma/prisma-client";
interface Props {
    from: number;
    to: number | null;
    state: AdminState;
    id?: number;
}

export const adminPriceRangeAction = async (data: Props) => {
    if (!(await isAdmin())) {
        throw new Error("Forbidden");
    }
    if (data.state === "create" && data.from > 0) {
        await prisma.priceRange.create({
            data:

                { from: data.from, to: data.to }
            ,
        })
    } else if (data.state === "update" && data.id) {
        const findPriceRange = await prisma.priceRange.findUnique({
            where: {
                id: data.id
            },
        })
        if (!findPriceRange) {
            throw new Error("price range not found")
        }
        await prisma.priceRange.update({
            where: { id: findPriceRange.id },
            data: {
                from: data.from,
                to: data.to
            },
        })
    } else if (data.state === "delete" && data.id) {
        const findPriceRange = await prisma.priceRange.findUnique({
            where: {
                id: data.id
            },
        })
        if (!findPriceRange) {
            throw new Error("price range not found")
        }
        await prisma.priceRange.delete({
            where: { id: findPriceRange.id },

        })
    }

}

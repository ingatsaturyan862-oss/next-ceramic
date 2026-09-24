import { isAdmin } from "@/lib/is-admin";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        if (!(await isAdmin())) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const users = await prisma.user.findMany();

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Internal Server Error GET USERS " + error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
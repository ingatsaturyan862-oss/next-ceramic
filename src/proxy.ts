import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
export function proxy(req: NextRequest) {
    const session = getSessionCookie(req)
    if (req.nextUrl.pathname === "/profile" && !session) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher: "/profile/:path*",

}

//midleware - coockies e stugum,
// hxum e stugum, kanxel minchev ej@ generacnel@
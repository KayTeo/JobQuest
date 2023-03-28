import { NextResponse } from "next/server";

export default function middleware(req) {
    const verify = req.cookies.get("loggedin");
    const { pathname, origin } = req.nextUrl;

    const openRoutes =
        pathname === "/" || pathname === "/login" || pathname === "/signup";

    const protectedRoutes = pathname.includes("/user");

    if (verify && openRoutes) {
        return NextResponse.redirect(`${origin}/user/tracker`);
    }

    if (!verify && protectedRoutes) {
        return NextResponse.redirect(`${origin}/`);
    }
}

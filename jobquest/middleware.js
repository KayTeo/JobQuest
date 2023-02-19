import { NextResponse } from "next/server";

export default function middleware(req) {
    const verify = req.cookies.get("loggedin");
    const url = req.url;

    const openRoutes =
        url === "http://localhost:3000/" ||
        url === "http://localhost:3000/login" ||
        url === "http://localhost:3000/signup";

    const protectedRoutes = url.includes("/user");

    if (verify && openRoutes) {
        return NextResponse.redirect("http://localhost:3000/user/home");
    }

    if (!verify && protectedRoutes) {
        return NextResponse.redirect("http://localhost:3000/");
    }
}

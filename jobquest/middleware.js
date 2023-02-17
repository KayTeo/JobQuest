import { NextResponse } from "next/server";

export default function middleware(req) {
    const verify = req.cookies.get("loggedin");
    const url = req.url;

    if (!verify && url.includes("/user/home")) {
        return NextResponse.redirect("http://localhost:3000/");
    }

    if (verify && url === "http://localhost:3000/") {
        return NextResponse.redirect("http://localhost:3000/user/home");
    }
}

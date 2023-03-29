"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

export default function Main() {
    const router = useRouter();
    if (Cookies.get("loggedin")) {
        router.push("/user/tracker");
    }
    return (
        <div className="flex flex-col items-center justify-center gap-10 pt-10 sm:pt-0">
            <Hero />
            <Features />
        </div>
    );
}

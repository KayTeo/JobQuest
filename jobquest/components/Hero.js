"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <div className="flex flex-col items-center justify-center gap-2 text-center">
            <Image
                alt="logo"
                priority={true}
                className="w-80 sm:w-11/12"
                src={"/LogoSmall.png"}
                width={500}
                height={500}
            ></Image>
            <div className="flex flex-row justify-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Find Your&nbsp;
                </h1>
                <h1 className="text-4xl font-bold tracking-tight text-accent-500 sm:text-5xl">
                    Dream Job
                </h1>
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                    href="/login"
                    className="w-24 rounded-full bg-accent-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-accent-300"
                >
                    Log In
                </Link>
                <Link
                    href="/signup"
                    className="w-24 rounded-full bg-accent-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-accent-300"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

"use client";

import firebase from "@/firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const options = [
    { name: "Home", route: "/user/home" },
    { name: "Tracker", route: "/user/tracker" },
    { name: "Searcher", route: "/user/searcher" },
    { name: "Booster", route: "/user/booster" },
    { name: "Forum", route: "/user/forum" },
];

export default function NavBar() {
    const [user] = useAuthState(firebase.auth());
    const pathname = usePathname();

    return (
        <div className="flex flex-row gap-10 h-16 bg-light-500 py-2 px-4 shadow-md justify-between items-center">
            <div className="flex flex-row gap-10">
                <Image
                    alt="logo"
                    className="w-52"
                    src={"/LogoSmall.png"}
                    width={1000}
                    height={1000}
                ></Image>
                <div className="flex flex-row gap-4 justify-center items-center">
                    {options.map((e) => (
                        <Link
                            className={`rounded-full ${
                                pathname === e.route
                                    ? "bg-accent-500 hover:bg-accent-300"
                                    : "bg-dark-400 hover:bg-dark-300"
                            } text-white font-semibold text-lg text-center leading-8 w-24 h-8`}
                            href={e.route}
                        >
                            {e.name}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-4">
                <Link
                    className="rounded-full bg-dark-400 hover:bg-dark-300 text-white font-semibold text-lg text-center leading-8 w-24 h-8"
                    href="/"
                    onClick={() => {
                        signOut(auth).catch((error) => {
                            console.log(error);
                        });
                    }}
                >
                    Sign Out
                </Link>
                <div className="rounded-full bg-black w-10 h-10"></div>
            </div>
        </div>
    );
}

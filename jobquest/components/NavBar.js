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
        <div className="flex h-16 flex-row items-center justify-between gap-10 bg-light-500 py-2 px-4 shadow-md">
            <div className="flex flex-row gap-10">
                <Image
                    alt="logo"
                    className="w-52"
                    src={"/LogoSmall.png"}
                    width={1000}
                    height={1000}
                ></Image>
                <div className="flex flex-row items-center justify-center gap-4">
                    {options.map((e) => (
                        <Link
                            className={`rounded-full ${
                                pathname === e.route
                                    ? "bg-accent-500 hover:bg-accent-300"
                                    : "bg-dark-400 hover:bg-dark-300"
                            } h-8 w-24 text-center text-lg font-semibold leading-8 text-white`}
                            href={e.route}
                        >
                            {e.name}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
                <Link
                    className="h-8 w-24 rounded-full bg-dark-400 text-center text-lg font-semibold leading-8 text-white hover:bg-dark-300"
                    href="/"
                    onClick={() => {
                        signOut(firebase.auth()).catch((error) => {
                            console.log(error);
                        });
                    }}
                >
                    Sign Out
                </Link>
                <div className="h-10 w-10 rounded-full bg-black"></div>
            </div>
        </div>
    );
}

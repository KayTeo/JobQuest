"use client";

import firebase from "@/firebase/firebase-config";
import { signOut } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const options = [
    { name: "Home", route: "/user/home" },
    { name: "Tracker", route: "/user/tracker" },
    { name: "Searcher", route: "/user/searcher" },
    { name: "Booster", route: "/user/booster" },
    { name: "Forum", route: "/user/forum" },
];

export default function NavBar() {
    const router = useRouter();
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
                            key={e.name}
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
                <button
                    className="h-8 w-24 rounded-full bg-dark-400 text-center text-lg font-semibold leading-8 text-white hover:bg-dark-300"
                    onClick={() => {
                        signOut(firebase.auth())
                            .then(Cookies.remove("loggedin"))
                            .then(router.push("/"))
                            .catch((error) => {
                                console.log(error);
                            });
                    }}
                >
                    Sign Out
                </button>
                <div className="h-10 w-10 rounded-full bg-black"></div>
            </div>
        </div>
    );
}

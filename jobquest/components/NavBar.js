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
        <div className="flex h-16 flex-row items-center justify-center bg-light-500 py-2 px-4 shadow-md">
            <div className="flex w-[900px] flex-row justify-between">
                <Image
                    alt="logo"
                    priority={true}
                    className="hidden w-52 md:block"
                    src={"/LogoSmall.png"}
                    width={1000}
                    height={1000}
                ></Image>
                <Image
                    alt="logo"
                    priority={true}
                    className="w-12 md:hidden"
                    src={"/SuitCaseLogo.png"}
                    width={200}
                    height={200}
                ></Image>
                <div className="flex flex-row items-center justify-center gap-1">
                    {options.map((e) => (
                        <Link
                            key={e.name}
                            className={`rounded-full ${
                                pathname.includes(e.route)
                                    ? "bg-accent-500 text-white hover:bg-accent-300"
                                    : "text-dark-500 hover:bg-accent-500 hover:text-white"
                            }  text-dark h-8 w-14 text-center text-xs font-semibold leading-8 md:w-20 md:text-base md:leading-8`}
                            href={e.route}
                        >
                            {e.name}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center justify-end gap-1">
                    <button
                        className="h-8 w-14 rounded-full bg-dark-400 text-center text-xs font-semibold leading-8 text-white hover:bg-dark-300 md:w-20 md:text-base md:leading-8"
                        onClick={() => {
                            signOut(firebase.auth())
                                .then(Cookies.remove("loggedin"))
                                .then(router.push("/"))
                                .catch((error) => {
                                    console.log(error);
                                });
                        }}
                    >
                        Log Out
                    </button>
                    <div className="h-10 w-10 rounded-full bg-black"></div>
                </div>
            </div>
        </div>
    );
}

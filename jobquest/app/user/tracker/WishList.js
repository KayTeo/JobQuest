"use client";

import WishEntry from "./WishEntry";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

export default function WishList({ viewMode, userID, wishData }) {
    const [search, setSearch] = useState("");

    const filteredWish = wishData.filter((job) =>
        job.company.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div
            className={`${
                viewMode === "right" && "hidden"
            } flex flex-col items-center justify-center gap-4`}
        >
            <div className="flex items-center justify-center gap-1">
                <h1 className="text-2xl font-bold text-accent-500">Wishlist</h1>
                <Link
                    href="/user/searcher"
                    className="rounded-full bg-accent-500 px-2 text-center font-bold text-white hover:bg-accent-300"
                >
                    +
                </Link>
            </div>
            <SearchBar search={search} setSearch={setSearch} />
            <div
                className={` ${
                    viewMode === "left" && "xl:w-[900px]"
                }  h-[60vh] w-[600px] overflow-hidden rounded-xl border border-black bg-light-500`}
            >
                <div className="flex h-full w-full flex-col items-center gap-2 overflow-y-scroll p-2 pr-1">
                    {filteredWish.map((e) => (
                        <WishEntry key={e.uuid} data={e} userID={userID} />
                    ))}
                </div>
            </div>
        </div>
    );
}

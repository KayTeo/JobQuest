"use client";

import { wish } from "./tempdata";
import WishEntry from "./WishEntry";

export default function WishList({ viewMode, userID, wishData }) {
    return (
        <div
            className={`${
                viewMode === "right" && "hidden"
            } flex flex-col items-center justify-center gap-4`}
        >
            <div className="flex items-center justify-center gap-1">
                <h1 className="text-2xl font-bold text-accent-500">Wishlist</h1>
                <button className="rounded-full bg-accent-500 px-2 text-center font-bold text-white hover:bg-accent-300">
                    +
                </button>
            </div>

            <div
                className={` ${
                    viewMode === "left" && "xl:w-[900px]"
                }  h-[60vh] w-[600px] overflow-hidden rounded-xl border border-black bg-light-500`}
            >
                <div className="flex h-full w-full flex-col items-center gap-2 overflow-y-scroll p-2 pr-1">
                    {wishData.map((e) => (
                        <WishEntry key={e.uuid} data={e} />
                    ))}
                </div>
            </div>
        </div>
    );
}

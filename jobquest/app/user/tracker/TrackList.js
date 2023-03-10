"use client";

import { TrackWrapper } from "./DataWrappers";

export default function TrackList({ viewMode }) {
    return (
        <div
            className={`${
                viewMode === "left" && "hidden"
            } flex flex-col items-center justify-center gap-4`}
        >
            <div className="flex items-center justify-center gap-1">
                <h1 className="text-2xl font-bold text-accent-500">
                    Applications
                </h1>
                <button className="rounded-full bg-accent-500 px-2 text-center font-bold text-white hover:bg-accent-300">
                    +
                </button>
            </div>
            <div
                className={` ${
                    viewMode === "right" && "xl:w-[900px]"
                }  h-[60vh] w-[600px] overflow-hidden rounded-xl border border-black bg-light-500`}
            >
                <TrackWrapper />
            </div>
        </div>
    );
}

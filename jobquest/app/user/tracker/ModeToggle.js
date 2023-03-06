"use client";

import {
    Bars3Icon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/20/solid";

export default function ModeToggle({ viewMode, setViewMode }) {
    return (
        <div className="flex h-9 gap-0 rounded-r-full rounded-l-full border border-black bg-white">
            <button
                className={`${
                    viewMode === "left" && "bg-light-500"
                } w-8 rounded-l-full `}
                onClick={() => {
                    setViewMode("left");
                }}
            >
                <ChevronLeftIcon aria-hidden="true" />
            </button>
            <button
                className={`${
                    viewMode === "both" && "bg-light-500"
                } w-7 border-r border-l border-black px-px`}
                onClick={() => {
                    setViewMode("both");
                }}
            >
                <Bars3Icon aria-hidden="true" />
            </button>
            <button
                className={`${
                    viewMode === "right" && "bg-light-500"
                } w-8 rounded-r-full`}
                onClick={() => {
                    setViewMode("right");
                }}
            >
                <ChevronRightIcon aria-hidden="true" />
            </button>
        </div>
    );
}

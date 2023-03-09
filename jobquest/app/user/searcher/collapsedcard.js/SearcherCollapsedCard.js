"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function SearcherCollapsedCard() {
    return (
        <div className="my-7 flex flex-col items-center justify-center gap-3 pb-10 md:p-10">
            <header className="text-3xl font-bold text-accent-500">
                Jobs For You
            </header>

            <div className="rounded-lg bg-gray-700 p-6 shadow-lg">
                <button className="w-15 h-5 rounded-full bg-accent-500 text-center text-xs font-semibold leading-6 text-white shadow-sm hover:bg-accent-300">
                    View More
                </button>
            </div>

            <button className="h-5 w-20 rounded-full bg-accent-500 text-center text-xs font-semibold leading-6 text-white shadow-sm hover:bg-accent-300">
                Update Your Details
            </button>
        </div>
    );
}

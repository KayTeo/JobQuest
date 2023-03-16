"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function SearcherCollapsedCard({ data }) {
    return (
        <div className="flex h-80 w-1/3 flex-col rounded-lg bg-blue-900 p-6 shadow-lg">
            <div className="flex h-16 w-full items-center justify-center">
                <div
                    className="flex h-full w-3/4 overflow-clip text-2xl font-semibold text-white"
                    title={data.company.name}
                >
                    {data.company.name}
                </div>
                <div className="flex h-full w-1/4 items-start justify-start font-semibold text-white">
                    {data.company.logo}
                </div>
            </div>

            <hr className="my-2 flex border-white border-opacity-100"></hr>

            <div className="flex h-10 w-full items-center justify-center">
                <div className="flex h-full w-44 text-white ">
                    <p>Role:</p>
                </div>

                <div className="flex h-full w-full items-start justify-start font-semibold text-white">
                    {data.jobTitle}
                </div>

                <div className="flex h-full w-full text-white ">
                    <p>Position:</p>
                </div>

                <div className="flex h-full w-44 text-white ">
                    <p>Type:</p>
                </div>

                <div className="flex h-full w-full items-start justify-start font-semibold text-white">
                    {data.jobType}
                </div>
            </div>

            <div className="flex h-10 w-full items-center justify-center">
                <div className="mr-40 flex h-full w-44 text-white ">
                    <p>Salary (monthly):</p>
                </div>
                <div className="flex h-full w-20 text-white ">
                    <p>Location:</p>
                </div>
                <div className="flex h-full w-44 items-start justify-start font-semibold text-white">
                    {data.location.locality}
                </div>
            </div>

            <div className="my-2 flex h-20 w-full items-center justify-center">
                <div className="flex h-full w-32 text-white ">
                    <p>Skills required:</p>
                </div>
            </div>

            <div className="flex h-full w-full items-end justify-center">
                <button className="flex h-5 w-20 items-center justify-center rounded-full bg-accent-500 text-center text-xs font-semibold leading-6 text-white shadow-sm hover:bg-accent-300">
                    View More
                </button>
            </div>
        </div>
    );
}

"use client";

import { useState, useRef } from "react";
import Link from "next/link";
//import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Skill from "@/components/Skill";

export default function SearcherCollapsedCard({ data }) {
    const [expandFlag, setExpandFlag] = useState(false);

    return (
        <div className="flex h-96 w-[600px] flex-col rounded-lg bg-blue-900 p-6 shadow-lg">
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

            <div className="flex h-full w-full items-center justify-center">
                <div className="flex w-[50px] text-white ">
                    <p>Role:</p>
                </div>

                <div className="flex w-[200px] items-start justify-start font-semibold text-white">
                    {data.jobTitle}
                </div>

                <div className="flex w-[50px] text-white ">
                    <p>Type:</p>
                </div>

                <div className="flex w-[250px] items-start justify-start font-semibold text-white">
                    {data.jobType}
                </div>
            </div>

            <div className="flex h-full w-full items-center justify-center">
                <div className="flex w-[150px] text-white ">
                    <p>Salary (monthly):</p>
                </div>
                <div className="flex w-[225px] items-start justify-start font-semibold text-white">
                    <p>
                        {data.salaryRange.minValue && data.salaryRange.minValue}
                        {data.salaryRange.minValue &&
                            data.salaryRange.maxValue &&
                            " - "}
                        {data.salaryRange.maxValue && data.salaryRange.maxValue}{" "}
                        {data.salaryRange.currency &&
                            (data.salaryRange.minValue ||
                                data.salaryRange.maxValue) &&
                            data.salaryRange.currency}
                    </p>
                </div>
                <div className="flex w-[75px] text-white ">
                    <p>Location:</p>
                </div>
                <div className="flex w-[100px] items-start justify-start font-semibold text-white">
                    {data.location.locality}
                </div>
            </div>

            <div className="my-10 flex h-full w-full items-center justify-between">
                <div className="flex h-full items-start justify-center">
                    <button className="flex h-14 w-14 items-center justify-center rounded-full border bg-blue-900 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-accent-300">
                        <ChevronLeftIcon />
                    </button>
                </div>

                <div className="flex h-full flex-1 items-center justify-center text-lg text-white ">
                    <p>Skills required:</p>
                </div>
                <div className="flex h-full items-end justify-center">
                    <button className="flex h-14 w-14 items-center justify-center rounded-full border bg-blue-900 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-accent-300">
                        <ChevronRightIcon />
                    </button>
                </div>
            </div>
            <div className="my-2 flex h-10 w-full items-center justify-center">
                <div className="flex max-h-32 w-full flex-wrap gap-2 overflow-auto">
                    {data.skills.map((e) => (
                        <Skill
                            className="min-w-[50px] px-2 py-1"
                            key={e}
                            name={e}
                        />
                    ))}
                </div>
            </div>

            <div className="flex h-full w-full items-end justify-center">
                <button
                    onClick={() => {
                        setExpandFlag(!expandFlag);
                    }}
                    className="flex h-6 w-20 items-center justify-center rounded-full bg-accent-500 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-accent-300"
                >
                    View More
                </button>
            </div>
            {expandFlag && (
                <div className="flex h-10 w-full items-center justify-center">
                    <div className="flex h-10 w-full items-center justify-center">
                        <div className="flex h-full w-full text-black ">
                            <p>Job Description:</p>
                        </div>
                    </div>

                    <div className="flex h-10 w-full items-center justify-center">
                        <div className="flex h-full w-full items-start justify-start font-semibold text-black">
                            {data.description}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

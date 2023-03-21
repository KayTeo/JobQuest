"use client";

import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Skill from "@/components/Skill";
import { useState } from "react";

export default function SearcherCard({ data }) {
    const [expand, setExpand] = useState(false);

    return (
        <>
            {expand ? (
                <div className="flex h-[200px] w-[300px] items-center justify-center rounded-lg bg-dark-500 p-6 text-white shadow-lg md:w-[600px]">
                    Test
                </div>
            ) : (
                <div className="flex h-[300px] w-[300px] items-center justify-between gap-2 rounded-2xl bg-dark-500 p-3 text-white shadow-lg md:w-[600px]">
                    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white pr-1 shadow-sm hover:bg-accent-300 md:h-14 md:w-14">
                        <ChevronLeftIcon />
                    </button>
                    <div className="flex h-full w-full flex-col items-center justify-between gap-5">
                        <div className="flex w-full flex-col items-center justify-center">
                            <header className="flex w-full items-center justify-between pb-1">
                                <div
                                    title={data.company.name}
                                    className="md:max-w-[400px] max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-xl md:text-2xl font-bold"
                                >
                                    {data.company.name}
                                </div>
                                <div className="h-8 w-8 md:h-10 md:w-10">
                                    {data.company.logo ? (
                                        <img
                                            alt="logo"
                                            src={data.company.logo}
                                        ></img>
                                    ) : (
                                        <BriefcaseIcon />
                                    )}
                                </div>
                            </header>
                            <hr className="w-full bg-white"></hr>
                        </div>
                        <main className="flex flex-wrap items-center justify-center gap-y-1 md:gap-y-2 gap-x-5">
                            <div className="flex gap-1">
                                <p className="font-bold">Role:</p>
                                <p>{data.jobTitle}</p>
                            </div>
                            <div className="flex gap-1">
                                <p className="font-bold">Salary:</p>
                                <p>
                                    {data.salaryRange.minValue &&
                                        data.salaryRange.minValue}
                                    {data.salaryRange.minValue &&
                                        data.salaryRange.maxValue &&
                                        " - "}
                                    {data.salaryRange.maxValue &&
                                        data.salaryRange.maxValue}{" "}
                                    {data.salaryRange.currency &&
                                        (data.salaryRange.minValue ||
                                            data.salaryRange.maxValue) &&
                                        data.salaryRange.currency}
                                </p>
                            </div>
                            <div className="flex gap-1">
                                <p className="font-bold">Location:</p>
                                <p>{data.location.locality}</p>
                            </div>
                        </main>
                        <section className="flex w-full flex-col items-start justify-start">
                            <h1 className="text-base font-bold">Skills</h1>
                            <div className="flex max-h-[50px] w-full flex-wrap gap-2 overflow-auto">
                                {data.skills.map((e) => (
                                    <Skill
                                        className="min-w-[50px] px-2 text-xs"
                                        key={e}
                                        name={e}
                                    />
                                ))}
                            </div>
                        </section>
                        <button
                            onClick={() => {
                                setExpand(true);
                            }}
                            className="flex h-6 w-20 items-center justify-center rounded-full bg-accent-500 text-center text-sm font-semibold text-white shadow-sm hover:bg-accent-300"
                        >
                            View More
                        </button>
                    </div>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white pl-1 shadow-sm hover:bg-accent-300 md:h-14 md:w-14">
                        <ChevronRightIcon />
                    </button>
                </div>
            )}
        </>
    );
}

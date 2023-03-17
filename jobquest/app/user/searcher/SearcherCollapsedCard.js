"use client";

import { useState, useRef } from "react";
import Link from "next/link";
//import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Skill from "@/components/Skill";

export default function SearcherCollapsedCard({ data }) {
    const [expandFlag, setExpandFlag] = useState(false);
    const [expand, setExpand] = useState(null);

    return (
        <div className="flex h-96 w-1/3 flex-col rounded-lg bg-blue-900 p-6 shadow-lg">
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

                <div className="flex h-full w-44 text-white ">
                    <p>Type:</p>
                </div>

                <div className="flex h-full w-full items-start justify-start font-semibold text-white">
                    {data.jobType}
                </div>
            </div>

            <div className="flex h-10 w-full items-center justify-center">
                <div className="flex h-full w-44 text-white ">
                    <p>Salary (monthly):</p>
                </div>
                <div className="flex h-full w-full items-start justify-start font-semibold text-white">
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
                <div className="flex h-full w-44 text-white ">
                    <p>Location:</p>
                </div>
                <div className="flex h-full w-full items-start justify-start font-semibold text-white">
                    {data.location.locality}
                </div>
            </div>

            <div className="my-10 flex h-20 w-full items-center justify-between">
                <div className="flex h-full items-start justify-center">
                    <button className="flex h-14 w-14 items-center justify-center rounded-full border bg-blue-900 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-accent-300">
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                </div>

                <div className="flex h-full flex-1 items-center justify-center text-lg text-white ">
                    <p>Skills required:</p>
                </div>
                <div className="flex h-full items-end justify-center">
                    <button className="flex h-14 w-14 items-center justify-center rounded-full border bg-blue-900 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-accent-300">
                        <FontAwesomeIcon icon={faAngleRight} />
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
                        setExpand(null);
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

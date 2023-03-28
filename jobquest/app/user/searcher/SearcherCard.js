"use client";

import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Skill from "@/components/Skill";
import { useState } from "react";
import GoogleMap from "./GoogleMap";
import { useRouter } from "next/navigation";

import firebase from "@/firebase/firebase-config";
const db = firebase.firestore();

async function moveToWishList(userID, data) {
    await db
        .collection("users")
        .doc(userID)
        .collection("wishlist")
        .doc(data.uuid)
        .set(data);
}

export default function SearcherCard({ jobs, userID }) {
    console.log(jobs);
    const [data, setData] = useState(jobs ? jobs[0] : null);
    const [expand, setExpand] = useState(false);
    const [jobEnd, setJobEnd] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        const index = jobs.findIndex((e) => {
            return e.uuid == data.uuid;
        });
        if (index + 1 >= jobs.length) {
            setJobEnd(true);
            router.refresh();
            return;
        } else setData(jobs[index + 1]);
    };

    return (
        <>
            {jobEnd ? (
                <div className="p-5 text-2xl font-bold text-accent-500 md:text-3xl">
                    Please Reload to Fetch New Set of Job Entries...
                </div>
            ) : (
                data &&
                (expand ? (
                    <div className="flex h-[550px] w-[1000px] flex-col items-center justify-between rounded-lg bg-dark-500 p-6 text-white shadow-lg">
                        <div className="flex w-full flex-col items-center justify-center gap-2">
                            <header className="flex w-full items-center justify-between">
                                <div
                                    title={data.company.name}
                                    className="max-w-[800px] overflow-hidden text-ellipsis whitespace-nowrap text-3xl font-bold"
                                >
                                    {data.company.name}
                                </div>
                                <div className="h-14 w-14">
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
                            <hr className="mb-3 w-full bg-white"></hr>
                        </div>
                        <div className="flex max-h-[160px] items-center justify-between gap-2">
                            <main className="flex w-1/2 flex-wrap items-start justify-start gap-y-1 gap-x-5 text-xl">
                                <div className="flex max-w-full gap-1">
                                    <p className="font-bold">Role:</p>
                                    <p
                                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={data.jobTitle}
                                    >
                                        {data.jobTitle}
                                    </p>
                                </div>
                                <div className="flex max-w-full gap-1">
                                    <p className="font-bold">Salary:</p>
                                    <p className="overflow-hidden text-ellipsis whitespace-nowrap">
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
                                <div className="flex max-w-full gap-1">
                                    <p className="font-bold">Type:</p>
                                    <p
                                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={data.jobType}
                                    >
                                        {data.jobType}
                                    </p>
                                </div>
                                <div className="flex max-w-full gap-1">
                                    <p className="font-bold">Location:</p>
                                    <p
                                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={data.location.locality}
                                    >
                                        {data.location.locality}
                                    </p>
                                </div>
                                <div className="flex w-full gap-1">
                                    <p className="font-bold">Address:</p>
                                    <p
                                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={data.location.address}
                                    >
                                        {data.location.address}
                                    </p>
                                </div>
                                <div className="flex max-w-full gap-1">
                                    <p className="font-bold">Date Posted:</p>
                                    <p
                                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={data.datePosted}
                                    >
                                        {data.datePosted}
                                    </p>
                                </div>
                                <div className="flex max-w-full gap-1">
                                    <p className="font-bold">Due Date:</p>
                                    <p
                                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={data.dueDate}
                                    >
                                        {data.dueDate}
                                    </p>
                                </div>
                            </main>
                            <section className="flex w-1/2 items-start justify-start gap-2">
                                <h1 className="text-xl font-bold">Skills:</h1>
                                <div className="flex max-h-[130px] w-full flex-wrap gap-1 overflow-auto">
                                    {data.skills.map((e) => (
                                        <Skill
                                            className="min-w-[95px] px-2 text-xl"
                                            key={e}
                                            name={e}
                                        />
                                    ))}
                                </div>
                            </section>
                        </div>
                        <div className="flex w-full flex-col items-start justify-start py-3">
                            <div className="w-full text-xl font-bold">
                                Job Description:
                            </div>
                            <div className="flex w-full items-start justify-between gap-5">
                                <div className="flex max-h-[170px] w-3/5 flex-wrap overflow-auto">
                                    {data.description}
                                </div>
                                <section className="h-[170px] w-2/5">
                                    <>
                                        <GoogleMap
                                            address={data.location.address}
                                        />
                                    </>
                                </section>
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-evenly">
                            <button className="flex h-12 w-32 items-center justify-center rounded-full bg-accent-500 text-center text-lg font-semibold text-white shadow-sm hover:bg-accent-300">
                                Go To Listing
                            </button>
                            <button
                                onClick={() => {
                                    setExpand(false);
                                }}
                                className="flex h-12 w-32 items-center justify-center rounded-full bg-accent-500 text-center text-lg font-semibold text-white shadow-sm hover:bg-accent-300"
                            >
                                View Less
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-[300px] w-[300px] items-center justify-between gap-2 rounded-2xl bg-dark-500 p-3 text-white shadow-lg md:w-[600px]">
                        <div className="flex flex-col items-center justify-center">
                            <button
                                onClick={handleClick}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white pr-1 shadow-sm hover:bg-accent-300 md:h-14 md:w-14"
                            >
                                <ChevronLeftIcon />
                            </button>
                            <div className="text-sm font-bold md:text-base">
                                Next
                            </div>
                        </div>
                        <div className="flex h-full w-[180px] flex-col items-center justify-between gap-5 md:w-[400px]">
                            <div className="flex w-full flex-col items-center justify-center gap-1">
                                <header className="flex w-full items-center justify-between">
                                    <div
                                        title={data.company.name}
                                        className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold md:max-w-[400px] md:text-2xl"
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
                            <main className="flex w-full flex-wrap items-center justify-center gap-y-1 gap-x-5 md:gap-y-2">
                                <div className="flex max-w-full gap-1">
                                    <p className="font-bold">Role:</p>
                                    <p
                                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={data.jobTitle}
                                    >
                                        {data.jobTitle}
                                    </p>
                                </div>
                                <div className="flex max-w-full gap-1">
                                    <p className="font-bold">Salary:</p>
                                    <p className="overflow-hidden text-ellipsis whitespace-nowrap">
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
                                <div className="flex max-w-full gap-1">
                                    <p className="font-bold">Location:</p>
                                    <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                                        {data.location.locality}
                                    </p>
                                </div>
                            </main>
                            <section className="flex w-full flex-col items-start justify-start">
                                <h1 className="text-base font-bold">Skills:</h1>
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
                        <div className="flex flex-col items-center justify-center">
                            <button
                                onClick={() => {
                                    moveToWishList(userID, data);
                                    handleClick();
                                }}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white pl-1 shadow-sm hover:bg-accent-300 md:h-14 md:w-14"
                            >
                                <ChevronRightIcon />
                            </button>
                            <div className="text-sm font-bold md:text-base">
                                Add
                            </div>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}

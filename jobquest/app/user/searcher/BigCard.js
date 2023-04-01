"use client";

import GoogleMap from "@/components/GoogleMap";
import { Suspense } from "react";
import Skill from "@/components/Skill";
import { BriefcaseIcon } from "@heroicons/react/24/outline";

export default function BigCard({ setExpand, data, className }) {
    return (
        <div
            className={`${className} flex h-[550px] w-[1000px] flex-col items-center justify-between rounded-lg bg-dark-500 p-6 text-white shadow-lg`}
        >
            <div className="flex w-full flex-col items-center justify-center gap-2">
                <header className="flex w-full items-center justify-between">
                    <div
                        title={data.company.name}
                        className="max-w-[800px] overflow-hidden text-ellipsis whitespace-nowrap text-3xl font-bold"
                    >
                        {data.company.name}
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center">
                        {data.company.logo ? (
                            <img alt="logo" src={data.company.logo}></img>
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
                <div className="w-full text-xl font-bold">Job Description:</div>
                <div className="flex w-full items-start justify-between gap-5">
                    <div className="flex max-h-[170px] w-3/5 flex-wrap overflow-auto">
                        {data.description}
                    </div>
                    <section className="flex h-[170px] w-2/5 items-center justify-center">
                        <Suspense
                            fallback={
                                <svg
                                    aria-hidden="true"
                                    className="ml-1 h-12 w-12 animate-spin fill-accent-500 text-white"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                            }
                        >
                            <>
                                <GoogleMap address={data.location.address} />
                            </>
                        </Suspense>
                    </section>
                </div>
            </div>
            <div className="flex w-full items-center justify-evenly">
                <a href={data.jobLink} target="_blank">
                    <button className="flex h-12 w-32 items-center justify-center rounded-full bg-accent-500 text-center text-lg font-semibold text-white shadow-sm hover:bg-accent-300">
                        Visit Job Site
                    </button>
                </a>
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
    );
}

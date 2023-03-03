import React from "react";
import Link from "next/link";

export default function SearcherSetUp() {
    // TODO: react stuff
    return (
        <div className="flex h-full flex-col items-center justify-center gap-2 py-8">
            <header className="text-3xl font-bold tracking-tight text-accent-500 sm:text-4xl">
                Setup Job Searcher
            </header>
            <article className="w-96 text-center text-base text-black sm:text-lg">
                In order to match you with the best jobs available, we need your
                help to fill in the details below!
            </article>
            <form className="flex h-full w-4/6 flex-col items-center rounded-xl border-2 border-black bg-light-200 py-5">
                <div className="grid grid-cols-3 gap-x-10 gap-y-5 px-10">
                    {/* School */}
                    <div className="flex flex-col">
                        <label for="school" className="font-bold">
                            School:
                        </label>
                        <select
                            id="school"
                            className="rounded-xl border border-black"
                        >
                            <option value="NTU">
                                Nanyang Technological University
                            </option>
                            <option value="NUS">
                                National University of Singapore
                            </option>
                            <option value="SMU">
                                Singapore Management University
                            </option>
                            <option value="SUTD">
                                Singapore University of Technology and Design
                            </option>
                        </select>
                    </div>

                    {/* Major */}
                    <div className="flex flex-col">
                        <label for="major" className="font-bold">
                            Major:
                        </label>
                        <select
                            id="major"
                            className="rounded-xl border border-black"
                        >
                            <option value="CE">Computer Engineering</option>
                            <option value="CS">Computer Science</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col">
                        <label for="Location" className="font-bold">
                            Location:
                        </label>
                        <select
                            id="location"
                            className="rounded-xl border border-black"
                        >
                            <option value="west">West</option>
                            <option value="east">East</option>
                            <option value="north">North</option>
                            <option value="south">South</option>
                            <option value="central">Central</option>
                        </select>
                    </div>

                    {/* Type of Job */}
                    <div className="flex flex-col">
                        <label for="typeJob" className="font-bold">
                            Type of Job:
                        </label>
                        <select
                            id="typeJob"
                            className="rounded-xl border border-black"
                        >
                            <option value="internship">Internship</option>
                            <option value="contract">Contract</option>
                            <option value="partTime">Part-Time</option>
                            <option value="fullTime">Full-Time</option>
                        </select>
                    </div>

                    {/* Citizenship */}
                    <div className="flex flex-col">
                        <label for="citizenship" className="font-bold">
                            Citizenship:
                        </label>
                        <select
                            id="citizenship"
                            className="rounded-xl border border-black"
                        >
                            <option value="singaporean">Singaporean</option>
                            <option value="PR">Permanent Resident</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    {/* Minimum Interested Salary */}
                    <div className="flex flex-col">
                        <label for="salary" className="font-bold">
                            Minimum Interested Salary:
                        </label>
                        <input
                            type="number"
                            id="salary"
                            name="salary"
                            min="0"
                            max="20000"
                            className="rounded-xl border border-black required:border-red-500 out-of-range:border-red-500"
                        ></input>
                    </div>
                </div>

                {/* Skills */}
                <div className="mt-2 flex justify-start">
                    <div className="font-bold">Skills:</div>
                    {/* TODO: crud skills and show */}
                    <div>+</div>
                </div>
                <div className="mb-2 h-full w-5/6 rounded-xl border border-black bg-white"></div>
                <div className="flex items-end justify-center">
                    <Link
                        href="/user/searcher"
                        className="h-10 w-24 rounded-full bg-accent-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-accent-300"
                    >
                        Searcher
                    </Link>
                </div>
            </form>
        </div>
    );
}

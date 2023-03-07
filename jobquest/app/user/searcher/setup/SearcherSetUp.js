"use client";

import { useState } from "react";
import Link from "next/link";

export default function SearcherSetUp() {
    const [skills, setSkills] = useState([]);
    const [addSkills, setAddSkills] = useState(false);

    const school = [
        { name: "Nanyang Technological University" },
        { name: "National University of Singapore" },
        { name: "Singapore Management University" },
        { name: "Singapore University of Technology and Design" },
    ];

    const major = [
        { name: "Computer Engineering" },
        { name: "Computer Science" },
        { name: "Accountancy" },
        { name: "Aerospace Engineering" },
        { name: "Art, Design & Media" },
        { name: "Arts (Education)" },
        { name: "Bioengineering" },
        { name: "Biological Sciences" },
        { name: "Business" },
        { name: "Chemical & Biomolecular Engineering" },
        { name: "Chemistry & Biological Chemistry" },
        { name: "Chinese" },
        { name: "Civil Engineering" },
        { name: "Communication Studies" },
        { name: "Data Science & Artificial Intelligence" },
        { name: "Double Major Programmes (Humanities)" },
        { name: "Double Major Programmes (Science)" },
        { name: "Double Major Programmes (Social Sciences)" },
        { name: "Economics" },
        { name: "Economics and Data Science" },
        { name: "Electrical and Electronic Engineering" },
        { name: "Engineering" },
        { name: "English" },
        { name: "Environmental Earth Systems Science" },
        { name: "Environmental Engineering" },
        { name: "History" },
        { name: "Information Engineering & Media" },
        { name: "Linguistics & Multilingual Studies" },
        { name: "Maritime Studies" },
        { name: "Materials Engineering" },
        { name: "Mathematical Sciences" },
        { name: "Mechanical Engineering" },
        { name: "Medicine" },
        { name: "Philosophy" },
        { name: "Physics / Applied Physics" },
        { name: "Public Policy & Global Affairs" },
        { name: "Renaissance Engineering" },
        { name: "Science (Education)" },
        { name: "Sociology" },
        { name: "Sport Science & Management" },
    ];

    const location = [
        { name: "North" },
        { name: "South" },
        { name: "East" },
        { name: "West" },
        { name: "Central" },
    ];

    const typeJob = [
        { name: "Internship" },
        { name: "Contract" },
        { name: "Part-Time" },
        { name: "Full-Time" },
    ];

    const citizenship = [
        { name: "Singaporean" },
        { name: "PR" },
        { name: "Others" },
    ];

    const selections = [
        { options: school, title: "School" },
        { options: major, title: "Major" },
        { options: location, title: "Location" },
        { options: typeJob, title: "Type of Job" },
        { options: citizenship, title: "Citizenship" },
    ];

    return (
        <div className="my-8 flex flex-col items-center justify-center gap-2 pb-10 md:p-10">
            <header className="text-3xl font-bold text-accent-500">
                Setup Job Searcher
            </header>
            <article className="w-96 text-center text-base text-black">
                In order to match you with the best jobs available, we need your
                help to fill in the details below!
            </article>
            <form className="flex h-[450px] w-[400px] flex-col items-center rounded-xl border border-black bg-light-200 py-5 text-xs md:h-72 md:w-[750px]">
                <div className="flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-x-10 md:gap-y-5 md:px-10">
                    {selections.map((e) => (
                        <div key={e.title} className="flex flex-col">
                            <label htmlFor={e.title} className="font-bold">
                                {e.title + ":"}
                            </label>
                            <select
                                id={e.title}
                                className="rounded-xl border border-black p-1"
                            >
                                {e.options.map((e) => (
                                    <option key={e.name} value={e.name}>
                                        {e.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <div className="flex flex-col">
                        <label htmlFor="salary" className="font-bold">
                            Minimum Salary:
                        </label>
                        <input
                            type="number"
                            id="salary"
                            name="salary"
                            min="0"
                            max="20000"
                            className="rounded-xl border border-black p-1 required:border-red-500 out-of-range:border-red-500"
                        ></input>
                    </div>
                </div>
                <div className="m-2 flex w-5/6 justify-start gap-1">
                    <div className="font-bold">Skills:</div>
                    {!addSkills && (
                        <button
                            className="rounded-full bg-accent-500 px-2 text-center font-bold text-white hover:bg-accent-300"
                            onClick={(e) => {
                                e.preventDefault(0);
                                setAddSkills(!addSkills);
                            }}
                        >
                            +
                        </button>
                    )}
                </div>
                {addSkills ? (
                    <>
                        <label for="skill" className="font-bold">
                            Add New Skill:
                        </label>
                        <input
                            type="text"
                            id="skill"
                            name="skill"
                            className="rounded-xl border border-black p-1"
                        ></input>
                        <button
                            className="my-2 rounded-full bg-accent-500 px-2 text-center font-bold text-white hover:bg-accent-300"
                            onClick={(e) => {
                                e.preventDefault(0);
                                setAddSkills(!addSkills);
                            }}
                        >
                            +
                        </button>
                    </>
                ) : (
                    <>
                        <div className="mb-2 h-full w-5/6"></div>
                        <Link
                            href="/user/searcher"
                            className="h-6 w-16 rounded-full bg-accent-500 text-center text-xs font-semibold leading-6 text-white shadow-sm hover:bg-accent-300"
                        >
                            Searcher
                        </Link>
                    </>
                )}
            </form>
        </div>
    );
}

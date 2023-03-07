"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Skill from "@/components/Skill";

export default function SearcherSetUp() {
    const [skills, setSkills] = useState([]);
    const [addingSkills, setAddingSkills] = useState(false);
    const skillsInputRef = useRef();

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
            <form className="flex w-[400px] flex-col items-center gap-2 rounded-xl border border-black bg-light-200 py-5 text-xs md:w-[750px]">
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
                {addingSkills ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex w-[280px] items-center justify-between gap-1 md:w-[750px] md:px-10">
                            <div className="flex items-center justify-center gap-1">
                                <label htmlFor="skill" className="font-bold">
                                    Add Skill:
                                </label>
                                <input
                                    ref={skillsInputRef}
                                    type="text"
                                    id="skill"
                                    name="skill"
                                    className="w-16 rounded-xl border border-black p-1 md:w-36"
                                ></input>
                                <button
                                    className="my-2 rounded-full bg-accent-500 px-2 text-center font-bold text-white hover:bg-accent-300"
                                    onClick={(e) => {
                                        e.preventDefault(0);
                                        const value =
                                            skillsInputRef.current.value;
                                        if (
                                            value === "" ||
                                            skills.includes(value)
                                        ) {
                                            return;
                                        }
                                        setSkills([...skills, value]);
                                        skillsInputRef.current.value = "";
                                    }}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault(0);
                                    setAddingSkills(!addingSkills);
                                }}
                                className="h-6 w-16 rounded-full bg-accent-500 text-center text-xs font-semibold leading-6 text-white shadow-sm hover:bg-accent-300"
                            >
                                Back
                            </button>
                        </div>
                        <div className="flex w-[280px] flex-wrap items-center justify-start gap-1 md:w-[750px] md:px-10">
                            {skills.map((e) => (
                                <Skill
                                    name={e}
                                    key={e}
                                    className="min-w-[30px] p-1 text-[10px] font-bold"
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="m-2 flex w-[400px] justify-start gap-1 px-[60px] md:w-[750px] md:px-10">
                            <div className="font-bold">Skills:</div>
                            <button
                                className="rounded-full bg-accent-500 px-2 text-center font-bold text-white hover:bg-accent-300"
                                onClick={(e) => {
                                    e.preventDefault(0);
                                    setAddingSkills(!addingSkills);
                                }}
                            >
                                +
                            </button>
                        </div>
                        <div className="flex w-[280px] flex-wrap items-center justify-start gap-1 md:w-[750px] md:px-10">
                            {skills.map((e) => (
                                <Skill
                                    name={e}
                                    key={e}
                                    className="min-w-[30px] p-1 text-[10px] font-bold"
                                />
                            ))}
                        </div>
                        <div className="mb-2 h-full"></div>
                        <Link
                            href="/user/searcher"
                            className="h-6 w-16 rounded-full bg-accent-500 text-center text-xs font-semibold leading-6 text-white shadow-sm hover:bg-accent-300"
                        >
                            Submit
                        </Link>
                    </>
                )}
            </form>
        </div>
    );
}

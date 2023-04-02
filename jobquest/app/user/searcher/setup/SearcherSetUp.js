"use client";

import { useState, useRef } from "react";
import Skill from "@/components/Skill";
import { useRouter } from "next/navigation";

import firebase from "@/firebase/firebase-config";
const db = firebase.firestore();

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

const jobType = [
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
    { options: school, title: "School", id: "school" },
    { options: major, title: "Major", id: "major" },
    { options: location, title: "Location", id: "location" },
    { options: jobType, title: "Type of Job", id: "jobType" },
    { options: citizenship, title: "Citizenship", id: "citizenship" },
];

async function addSearcherData(userID, data) {
    await db
        .collection("users")
        .doc(userID)
        .update({ searcherData: data, searcherBoolean: true });
}

export default function SearcherSetUp({ userID, userData }) {
    const router = useRouter();
    const [skills, setSkills] = useState(
        userData.skills ? userData.skills : []
    );
    const skillsInputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            citizenship: e.target.citizenship.value,
            location: e.target.location.value,
            major: e.target.major.value,
            school: e.target.school.value,
            minSalary: e.target.salary.value,
            jobType: e.target.jobType.value,
            skills: skills,
        };

        addSearcherData(userID, data);
        router.push("/user/searcher");
    }

    return (
        <div className="my-8 flex flex-col items-center justify-center gap-2 pb-10 md:p-10">
            <header className="text-3xl font-bold text-accent-500">
                Setup Job Searcher
            </header>
            <article className="w-96 text-center text-base text-black">
                In order to match you with the best jobs available, we need your
                help to fill in the details below!
            </article>
            <form
                id="searcherForm"
                onSubmit={handleSubmit}
                action="submit"
                className="flex w-[400px] flex-col items-center gap-2 rounded-xl border border-black bg-light-200 py-5 text-xs md:w-[750px]"
            >
                <div className="flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-x-10 md:gap-y-5 md:px-10">
                    {selections.map((e) => {
                        const filled = `${e.id}`
                            .split(".")
                            .reduce((r, k) => r?.[k], userData);
                        return (
                            <div key={e.title} className="flex flex-col">
                                <label htmlFor={e.id} className="font-bold">
                                    {e.title + ":"}
                                </label>
                                <select
                                    id={e.id}
                                    className="rounded-xl border border-black p-1"
                                    defaultValue={filled ? filled : ""}
                                    required
                                >
                                    <option
                                        disabled
                                        className="hidden"
                                        value=""
                                    ></option>
                                    {e.options.map((e) => (
                                        <option key={e.name} value={e.name}>
                                            {e.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    })}
                    <div className="flex flex-col">
                        <label htmlFor="salary" className="font-bold">
                            Minimum Salary:
                        </label>
                        <input
                            type="number"
                            id="salary"
                            name="salary"
                            defaultValue={userData ? userData.minSalary : ""}
                            min="0"
                            max="20000"
                            className="rounded-xl border border-black p-1 out-of-range:border-red-500"
                            required
                        ></input>
                    </div>
                </div>
                <div className="m-2 flex w-[400px] justify-center gap-1 px-[60px] md:w-[750px] md:px-10">
                    <div className="flex items-center justify-center gap-1">
                        <label htmlFor="skill" className="font-bold">
                            Skills:
                        </label>
                        <input
                            ref={skillsInputRef}
                            type="text"
                            id="skill"
                            className="w-36 rounded-xl border border-black p-1"
                        ></input>
                        <button
                            className="rounded-full bg-accent-500 px-3 py-[5px] text-center font-bold text-white hover:bg-accent-300"
                            onClick={(e) => {
                                e.preventDefault(0);
                                const value = skillsInputRef.current.value;
                                if (value.trim() === "" || skills.includes(value)) {
                                    return;
                                }
                                setSkills([...skills, value]);
                                skillsInputRef.current.value = "";
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="flex w-[280px] flex-wrap items-center justify-center gap-1 md:w-[750px] md:px-10">
                    {skills.map((e) => (
                        <button
                            key={e}
                            onClick={(evt) => {
                                evt.preventDefault(0);
                                const newSkill = skills.filter((skill) => {
                                    return skill !== e;
                                });
                                setSkills(newSkill);
                            }}
                        >
                            <Skill
                                name={e}
                                className="min-w-[40px] p-1 text-[10px] font-bold hover:border-red-500 hover:text-red-500"
                            />
                        </button>
                    ))}
                </div>
                <div className="mb-2 h-full"></div>
                <button
                    type="submit"
                    form="searcherForm"
                    className="h-6 w-16 rounded-full bg-accent-500 text-center text-xs font-semibold leading-6 text-white shadow-sm hover:bg-accent-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

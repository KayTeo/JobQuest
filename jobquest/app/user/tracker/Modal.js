"use client";

import { Dialog } from "@headlessui/react";
import { useState, useRef } from "react";
import Skill from "@/components/Skill";

export default function Modal({ setIsOpen, trackData, setTrackData }) {
    const [skills, setSkills] = useState([]);
    const skillsInputRef = useRef();

    const test = {
        uuid: 11231231232,
        company: {
            logo: "https://static.mycareersfuture.gov.sg/images/company/logos/6e75040574f0e00a8948d6cd7248f3f4/rapsys-technologies.png",
            name: "RAPSYS TECHNOLOGIES PTE. LTD.",
        },
        datePosted: "2023-02-17",
        description:
            "Role:Data Tech Lead  Job Descriptions:    Development of new data management layers and build data processes.   Solutioning and Tech Designing for Data Systems   Tech Led to drive data engineering activities   Provide support for enhancements and any BAU issues on the new data management layers and existing data lakes.   Support and migration of existing on-premises databases to AWS cloud.   Understanding the existing applications, data architecture, and suggest improvements   Lead business requirements and plan deliveries.   Handle data extractions and data analysis for the requirements.  Job Requirements:    Minimum of 10+ years of experience with Information Technology using RDBMS and Non-RDBMS and Cloud databases.   8+ years of strong hands-on experience on any of the databases like SQL/PLSQL, Oracle, MS-SQL server, Postgres, and Snowflake.   3+ years of strong experience in AWS Cloud.   Good understanding of Data integration, Data Flows, Data Quality, Data Architecture and Data Engineering.   Technical expertise in data models, data mining and segmentation techniques.   Experience in Tech Design and Solution Designing for data systems   Experience with full SDLC lifecycle and Lean or Agile development methodologies.   AWS tools and components knowledge is a plus.   CI/CD and GIT exposure   Experience on UNIX shell scripts.   Ability to work in team in diverse/multiple stakeholder environment   Ability to communicate complex technology solutions to diverse teams namely, technical, business and management teams ",
        dueDate: "2023-03-19",
        jobTitle: "Data Tech Lead",
        jobType: ["FULL_TIME"],
        location: {
            address: "FORTUNE CENTRE, 190 MIDDLE ROAD",
            country: "SG",
            locality: "Singapore",
        },
        salaryRange: {
            currency: "SGD",
            maxValue: 9000,
            minValue: 7000,
            payPeriod: "MONTH",
        },
        skills: [
            "Oracle",
            "Solutioning",
            "Segmentation",
            "Job Descriptions",
            "Unix shell",
            "Data Integration",
            "SDLC",
            "Information Technology",
            "Data Quality",
            "Data Engineering",
            "Data Mining",
            "Data Architecture",
            "GCP",
            "Databases",
            "Business Requirements",
            "Agile Development",
        ],
    };

    let newEntry = {
        uuid: null,
        company: {
            logo: null,
            name: null,
        },
        datePosted: null,
        description: null,
        dueDate: null,
        jobTitle: null,
        jobType: [null],
        location: {
            address: null,
            country: null,
            locality: null,
        },
        salaryRange: {
            currency: null,
            maxValue: null,
            minValue: null,
            payPeriod: null,
        },
        skills: [],
    };
    return (
        <Dialog.Panel className="flex w-[500px] flex-col items-center justify-start gap-5 overflow-auto rounded-xl border border-black bg-light-500 p-5 lg:w-[900px]">
            <h1 className="text-2xl font-bold text-accent-500">Job Entry</h1>
            <form
                id="newEntryForm"
                action="submit"
                className="flex h-full w-full flex-col justify-between px-10 font-semibold"
            >
                <div className="flex w-full flex-wrap justify-center gap-y-2 gap-x-5">
                    <div className="flex flex-col items-start">
                        <label htmlFor="company">Company </label>
                        <input
                            name="company"
                            className="w-36 rounded-lg border border-black px-2 font-normal"
                        ></input>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="jobTitle">Job Title</label>
                        <input
                            name="jobTitle"
                            className="w-36 rounded-lg border border-black px-2 font-normal"
                        ></input>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="country">Country</label>
                        <input
                            name="country"
                            className="w-36 rounded-lg border border-black px-2 font-normal"
                        ></input>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="address">Address</label>
                        <input
                            name="address"
                            className="w-36 rounded-lg border border-black px-2 font-normal"
                        ></input>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="minPay">Minimum Pay</label>
                        <input
                            name="minPay"
                            type="number"
                            className="w-36 rounded-lg border border-black px-2 font-normal"
                        ></input>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="maxPay">Maximum Pay</label>
                        <input
                            name="maxPay"
                            type="number"
                            className="w-36 rounded-lg border border-black px-2 font-normal"
                        ></input>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="currency">Currency</label>
                        <input
                            name="currency"
                            className="w-36 rounded-lg border border-black px-2 font-normal"
                        ></input>
                    </div>
                    <div className="flex w-[85%] flex-col">
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            className="rounded-lg border border-black px-2 font-normal"
                        ></textarea>
                    </div>
                </div>
            </form>
            <div className="flex h-5 w-full flex-col justify-start gap-2 px-[7.5%]">
                <div className="flex items-center justify-center gap-2">
                    <h1>Skills:</h1>
                    <input
                        ref={skillsInputRef}
                        className="w-36 rounded-lg border border-black px-1"
                    ></input>
                    <button
                        className="inline-flex rounded-lg bg-accent-500 px-3 py-px text-center font-bold text-white hover:bg-accent-300"
                        onClick={(e) => {
                            e.preventDefault(0);
                            const value = skillsInputRef.current.value;
                            if (value === "" || skills.includes(value)) {
                                return;
                            }
                            setSkills([...skills, value]);
                            skillsInputRef.current.value = "";
                        }}
                    >
                        +
                    </button>
                </div>
                <div className="flex w-full flex-wrap justify-center gap-2">
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
            </div>
        </Dialog.Panel>
    );
}

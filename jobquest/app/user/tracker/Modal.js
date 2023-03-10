"use client";

import { Dialog } from "@headlessui/react";

export default function Modal({ setIsOpen, setNewEntry }) {
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
    return (
        <Dialog.Panel className="flex h-[475px] w-[1000px] flex-col items-center justify-center gap-2 rounded-xl bg-white">
            <h1 className="text-lg font-bold">I AM A MODAL</h1>
            <button
                onClick={() => {
                    setNewEntry(test);
                    setIsOpen(false);
                }}
            >
                Test
            </button>
            <button onClick={() => setIsOpen(false)}>Close</button>
        </Dialog.Panel>
    );
}

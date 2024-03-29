"use client";

import { Dialog } from "@headlessui/react";
import { useState, useRef } from "react";
import Skill from "@/components/Skill";
import { generateUUID } from "@/utils/uuid";
import { useRouter } from "next/navigation";

import firebase from "@/firebase/firebase-config";
const db = firebase.firestore();

async function createEntry(userID, entry) {
    await db
        .collection("users")
        .doc(userID)
        .collection("tracker")
        .doc(entry.uuid)
        .set(entry);
}

export default function Modal({ setIsOpen, userID, defaultData }) {
    const [skills, setSkills] = useState(defaultData.skills);
    const router = useRouter();
    const skillsInputRef = useRef();
    // console.log(defaultData);

    async function handleSubmit(e) {
        e.preventDefault();
        // const newEntry = { ...defaultData };
        const newEntry = {
            uuid: defaultData.uuid,
            company: {
                logo: defaultData.company.logo,
                name: e.target.company.value,
            },
            datePosted: defaultData.company.logo,
            description: e.target.description.value,
            dueDate: defaultData.dueDate,
            jobTitle: e.target.jobTitle.value,
            jobType: defaultData.jobType,
            location: {
                address: e.target.address.value,
                country: defaultData.location.country,
                locality: e.target.country.value,
            },
            salaryRange: {
                currency: e.target.currency.value,
                maxValue: e.target.maxPay.value,
                minValue: e.target.minPay.value,
                payPeriod: defaultData.salaryRange.payPeriod,
            },
            jobLink: e.target.url.value,
            skills: skills,
            status: defaultData.status,
        };

        if (!defaultData.uuid) {
            newEntry.status = { name: "Preparing", color: "bg-fuchsia-500" };
            newEntry.uuid = generateUUID();
        }
        // newEntry.company.name = e.target.company.value;
        // newEntry.jobTitle = e.target.jobTitle.value;
        // newEntry.location.locality = e.target.country.value;
        // newEntry.location.address = e.target.address.value;
        // newEntry.description = e.target.description.value;
        // newEntry.salaryRange.maxValue = e.target.maxPay.value;
        // newEntry.salaryRange.minValue = e.target.minPay.value;
        // newEntry.salaryRange.currency = e.target.currency.value;
        // newEntry.jobLink = e.target.url.value;
        // newEntry.skills = skills;

        setIsOpen(false);
        await createEntry(userID, newEntry);
        // setTrackData([...trackData, newEntry]);
        router.refresh();
    }

    return (
        <Dialog.Panel className="flex w-[500px] flex-col items-center justify-start gap-5 rounded-xl border border-black bg-light-500 p-5 lg:w-[900px]">
            <h1 className="text-2xl font-bold text-accent-500">Job Entry</h1>
            <form
                id="newEntryForm"
                onSubmit={handleSubmit}
                action="submit"
                className="flex w-full flex-col justify-between px-10 font-semibold"
            >
                <div className="flex w-full flex-wrap justify-center gap-y-2 gap-x-5">
                    <div className="flex flex-col items-start">
                        <label htmlFor="company">Company:</label>
                        <input
                            name="company"
                            className="w-36 rounded-lg border border-black px-2 font-normal"
                            defaultValue={defaultData.company.name}
                            required
                            pattern=".*\S+.*"
                        ></input>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="jobTitle">Job Title:</label>
                        <input
                            name="jobTitle"
                            className="w-36 rounded-lg border border-black px-2 font-normal"
                            defaultValue={defaultData.jobTitle}
                            required
                            pattern=".*\S+.*"
                        ></input>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="country">Country:</label>
                        <input
                            name="country"
                            className="w-36 rounded-lg border border-black px-2 font-normal"
                            defaultValue={defaultData.location.locality}
                            required
                            pattern=".*\S+.*"
                        ></input>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="address">Address:</label>
                        <input
                            name="address"
                            className="w-36 rounded-lg border border-black px-2 font-normal"
                            defaultValue={defaultData.location.address}
                            pattern=".*\S+.*"
                        ></input>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="minPay">Minimum Pay:</label>
                        <input
                            name="minPay"
                            type="number"
                            className="w-36 rounded-lg border border-black px-2 font-normal out-of-range:border-red-500"
                            min="0"
                            max="20000"
                            defaultValue={defaultData.salaryRange.minValue}
                        ></input>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="maxPay">Maximum Pay:</label>
                        <input
                            name="maxPay"
                            type="number"
                            className="w-36 rounded-lg border border-black px-2 font-normal out-of-range:border-red-500"
                            min="0"
                            max="20000"
                            defaultValue={defaultData.salaryRange.maxValue}
                        ></input>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="currency">Currency:</label>
                        <input
                            name="currency"
                            className="w-36 rounded-lg border border-black px-2 font-normal"
                            defaultValue={defaultData.salaryRange.currency}
                            pattern=".*\S+.*"
                        ></input>
                    </div>
                    <div className="flex w-[85%] flex-col">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            name="description"
                            className="h-[400px] resize-none rounded-lg border border-black px-2 font-normal"
                            defaultValue={defaultData.description}
                        ></textarea>
                    </div>
                    <div className="flex w-[85%] flex-col items-start">
                        <label htmlFor="url">Url:</label>
                        <input
                            name="url"
                            className="w-full rounded-lg border border-black px-2 font-normal"
                            defaultValue={defaultData.jobLink}
                            pattern=".*\S+.*"
                        ></input>
                    </div>
                </div>
            </form>
            <div className="flex w-full flex-col items-center justify-start gap-2 px-[7.5%]">
                <div className="flex items-center justify-center gap-2">
                    <label htmlFor="skills">Skills:</label>
                    <input
                        ref={skillsInputRef}
                        name="skills"
                        type="text"
                        className="w-36 rounded-lg border border-black px-1"
                    ></input>
                    <button
                        className="inline-flex rounded-lg bg-accent-500 px-3 py-px text-center font-bold text-white hover:bg-accent-300"
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
                <div className="flex max-h-[60px] w-full flex-wrap justify-center gap-x-2 gap-y-1 overflow-auto">
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
            <div className="flex items-center justify-center gap-2">
                <button
                    type="submit"
                    form="newEntryForm"
                    className="h-8 w-28 items-center justify-center rounded-full bg-accent-500 px-2 py-1 font-semibold text-white hover:bg-accent-300"
                >
                    Save Details
                </button>
                <button
                    onClick={() => {
                        setIsOpen(false);
                    }}
                    className="h-8 w-28 items-center justify-center rounded-full bg-accent-500 px-2 py-1 font-semibold text-white hover:bg-accent-300"
                >
                    Close
                </button>
            </div>
        </Dialog.Panel>
    );
}

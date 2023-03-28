"use client";

import { Dialog } from "@headlessui/react";

import firebase from "@/firebase/firebase-config";
const db = firebase.firestore();

async function setResumeData(userID, data) {
    await db.collection("users").doc(userID).update({ resumeData: data });
}

export default function Modal({ setIsOpen, userID, defaultData }) {
    function handleSubmit(e) {
        e.preventDefault();
        const project = e.target.project.value;
        const work = e.target.work.value;
        const cca = e.target.cca.value;
        const achievement = e.target.achievement.value;
        const skills = e.target.skills.value;

        const resumeData = {
            projectData: project,
            workData: work,
            ccaData: cca,
            achievementsData: achievement,
            skillsData: skills,
        };

        setResumeData(userID, resumeData);
        setIsOpen(false);
    }

    return (
        <Dialog.Panel className="flex w-[500px] flex-col items-center justify-center gap-5 rounded-xl border border-black bg-light-500 p-5 lg:w-[900px]">
            <h1 className="text-2xl font-bold text-accent-500">Resume</h1>
            <form
                id="resumeForm"
                onSubmit={handleSubmit}
                action="submit"
                className="flex w-full flex-wrap justify-center gap-x-5 gap-y-2 px-10 font-semibold"
            >
                <div className="flex flex-col items-start">
                    <label htmlFor="project">Project Experience</label>
                    <textarea
                        name="project"
                        defaultValue={defaultData && defaultData.projectData}
                        className="h-32 w-72 resize-none rounded-lg border border-black px-2 text-xs font-normal"
                    />
                </div>
                <div className="flex flex-col items-start">
                    <label htmlFor="work">Work Experience</label>
                    <textarea
                        name="work"
                        defaultValue={defaultData && defaultData.workData}
                        className="h-32 w-72 resize-none rounded-lg border border-black px-2 text-xs font-normal"
                    />
                </div>
                <div className="flex flex-col items-start">
                    <label htmlFor="cca">Co Curriculars</label>
                    <textarea
                        name="cca"
                        defaultValue={defaultData && defaultData.ccaData}
                        className="h-32 w-72 resize-none rounded-lg border border-black px-2 text-xs font-normal"
                    />
                </div>
                <div className="flex flex-col items-start">
                    <label htmlFor="achievement">Achievements</label>
                    <textarea
                        name="achievement"
                        defaultValue={
                            defaultData && defaultData.achievementsData
                        }
                        className="h-32 w-72 resize-none rounded-lg border border-black px-2 text-xs font-normal"
                    />
                </div>
                <div className="flex flex-col items-start">
                    <label htmlFor="skills">Skills</label>
                    <textarea
                        name="skills"
                        defaultValue={defaultData && defaultData.skillsData}
                        className="h-32 w-72 resize-none rounded-lg border border-black px-2 text-xs font-normal"
                    />
                </div>
            </form>
            <div className="flex items-center justify-center gap-2">
                <button
                    type="submit"
                    form="resumeForm"
                    className="h-8 w-28 items-center justify-center rounded-full bg-accent-500 px-2 py-1 font-semibold text-white hover:bg-accent-300"
                >
                    Submit
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

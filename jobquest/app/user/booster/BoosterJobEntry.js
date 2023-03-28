"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import firebase from "@/firebase/firebase-config";
const db = firebase.firestore();

async function sendRequest(url, data) {
    return await fetch(url, {
        cache: "no-store",
        method: "POST",
        body: JSON.stringify(data),
    }).then((res) => res.json());
}

async function boostResume(userID, resumeData, jobData) {
    const payload = {
        resumeData: resumeData,
        jobData: jobData,
    };
    console.log(payload);
    const boostedData = await sendRequest("/api/resumeboost", payload);

    const storedData = { ...boostedData, uuid: jobData.uuid };
    await db
        .collection("users")
        .doc(userID)
        .collection("booster")
        .doc(storedData.uuid)
        .set(storedData);
}

export default function BoosterJobEntry({
    jobData,
    resumeData,
    userID,
    boostData,
}) {
    const [resumeFlag, setResumeFlag] = useState(false);
    const router = useRouter();

    return (
        <div className="flex w-[350px] flex-col items-center justify-center gap-1 rounded-3xl border border-black bg-light-200 px-7 pt-2 pb-5 text-black md:w-[550px]">
            <section
                title={jobData.company.name}
                className="flex w-full items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold"
            >
                {jobData.company.name}
            </section>
            <section
                title={jobData.jobTitle}
                className="flex w-full items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold"
            >
                {jobData.jobTitle}
            </section>
            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={async () => {
                        await boostResume(userID, resumeData, jobData);
                        router.refresh();
                    }}
                    className="h-6 w-32 rounded-full bg-accent-500 text-center text-xs font-bold leading-6 text-white shadow-sm hover:bg-accent-300"
                >
                    Boost Resume
                </button>
                <button
                    onClick={() => {
                        setResumeFlag(!resumeFlag);
                    }}
                    className="h-6 w-32 rounded-full bg-accent-500 text-center text-xs font-bold leading-6 text-white shadow-sm hover:bg-accent-300"
                >
                    View Boost
                </button>
            </div>
            {resumeFlag && (
                <div className="mt-2 flex w-full flex-col items-center justify-center gap-3">
                    <div className="flex w-full flex-col items-center justify-center">
                        <h1 className="text-xl font-bold">Cover Letter</h1>
                        <p className="h-[200px] w-full overflow-auto rounded-lg border border-black bg-white p-2 text-start text-xs">
                            {boostData
                                ? boostData.coverLetter
                                : "No Boosted Data"}
                        </p>
                        <h1 className="text-xl font-bold">
                            Project Experience
                        </h1>
                        <p className="h-[200px] w-full overflow-auto rounded-lg border border-black bg-white p-2 text-start text-xs">
                            {boostData
                                ? boostData.resumeData.projectData
                                : "No Boosted Data"}
                        </p>
                        <h1 className="text-xl font-bold">Work Experience</h1>
                        <p className="h-[200px] w-full overflow-auto rounded-lg border border-black bg-white p-2 text-start text-xs">
                            {boostData
                                ? boostData.resumeData.workData
                                : "No Boosted Data"}
                        </p>
                        <h1 className="text-xl font-bold">Co-Curriculars</h1>
                        <p className="h-[200px] w-full overflow-auto rounded-lg border border-black bg-white p-2 text-start text-xs">
                            {boostData
                                ? boostData.resumeData.ccaData
                                : "No Boosted Data"}
                        </p>
                        <h1 className="text-xl font-bold">Achievements</h1>
                        <p className="h-[200px] w-full overflow-auto rounded-lg border border-black bg-white p-2 text-start text-xs">
                            {boostData
                                ? boostData.resumeData.achievementsData
                                : "No Boosted Data"}
                        </p>
                        <h1 className="text-xl font-bold">Skills</h1>
                        <p className="h-[200px] w-full overflow-auto rounded-lg border border-black bg-white p-2 text-start text-xs">
                            {boostData
                                ? boostData.resumeData.skillsData
                                : "No Boosted Data"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

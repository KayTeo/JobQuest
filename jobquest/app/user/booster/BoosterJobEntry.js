"use client";

import { BriefcaseIcon } from "@heroicons/react/24/outline";
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
    const [viewFlag, setViewFlag] = useState(false);
    const router = useRouter();

    return (
        <div className="flex min-h-[120px] w-[350px] flex-col items-center gap-3 rounded-3xl border border-black bg-blue-900 py-5 px-6 text-white shadow-lg md:min-h-[130px] md:w-[650px] md:px-8">
            <div className="flex items-center justify-between gap-5">
                <div className="h-14 w-14 md:h-20 md:w-20">
                    {jobData.company.logo ? (
                        <img alt="logo" src={jobData.company.logo}></img>
                    ) : (
                        <BriefcaseIcon />
                    )}
                </div>
                <div className=" flex w-[230px] items-end justify-between md:w-[480px]">
                    <div className="flex w-[100px] flex-col md:w-[330px]">
                        <section
                            title={jobData.company.name}
                            className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold md:text-2xl"
                        >
                            {jobData.company.name}
                        </section>
                        <section
                            title={jobData.jobTitle}
                            className="text-md max-w-full overflow-hidden text-ellipsis whitespace-nowrap md:text-lg"
                        >
                            {jobData.jobTitle}
                        </section>
                        <section
                            title={jobData.dueDate}
                            className="text-md max-w-full overflow-hidden text-ellipsis whitespace-nowrap md:text-lg"
                        >
                            Salary:{" "}
                            {jobData.salaryRange.minValue &&
                                jobData.salaryRange.minValue}
                            {jobData.salaryRange.minValue &&
                                jobData.salaryRange.maxValue &&
                                " - "}
                            {jobData.salaryRange.maxValue &&
                                jobData.salaryRange.maxValue}{" "}
                            {jobData.salaryRange.currency &&
                                (jobData.salaryRange.minValue ||
                                    jobData.salaryRange.maxValue) &&
                                jobData.salaryRange.currency}
                        </section>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setViewFlag(!viewFlag);
                            }}
                            className="text:sm h-[24px] rounded-full bg-accent-500 px-2 font-bold text-white hover:bg-accent-300 md:h-[28px] md:text-base"
                        >
                            {viewFlag ? "Back" : "View"}
                        </button>
                        <button
                            onClick={async () => {
                                await boostResume(userID, resumeData, jobData);
                                router.refresh();
                            }}
                            className="text:sm h-[24px] rounded-full bg-accent-500 px-2 font-bold text-white hover:bg-accent-300 md:h-[28px] md:text-base"
                        >
                            Boost
                        </button>
                    </div>
                </div>
            </div>
            {viewFlag && (
                <>
                    <div className="font-bold">
                        {boostData ? "" : "Boost First!"}
                    </div>
                    {
                        //boostData && (
                        <div className="min-h-[200px] w-11/12 bg-gray-100 px-10 py-7 shadow-2xl md:min-h-[500px]">
                            <div className="flex w-full flex-col items-center bg-red-50">
                                
                            </div>
                        </div>
                        //)
                    }
                </>
            )}
        </div>
    );

    {
        /* {resumeFlag && (
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
            )} */
    }
}

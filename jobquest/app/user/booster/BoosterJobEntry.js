"use client";

import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import firebase from "@/firebase/firebase-config";
import { toast } from "react-toastify";
const db = firebase.firestore();

async function sendRequest(url, data) {
    return await fetch(url, {
        cache: "no-store",
        method: "POST",
        body: JSON.stringify(data),
    }).then((res) => res.json());
}

async function boostResume(userID, resumeData, jobData) {
    await db
        .collection("users")
        .doc(userID)
        .collection("booster")
        .doc(jobData.uuid)
        .delete();

    const payload = {
        resumeData: resumeData,
        jobData: jobData,
    };
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
    const [loadingBoost, setLoadingBoost] = useState(false);
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [loadingBoost, viewFlag]);

    let formattedBoostData = {
        coverLetter: [],
        skillsData: [],
        workData: [],
        ccaData: [],
        achievementsData: [],
        projectData: [],
    };

    if (boostData) {
        formattedBoostData.coverLetter = boostData.coverLetter.split(/\r?\n/);
        formattedBoostData.skillsData =
            boostData.resumeData.skillsData.split(/\r?\n/);
        formattedBoostData.workData =
            boostData.resumeData.workData.split(/\r?\n/);
        formattedBoostData.ccaData =
            boostData.resumeData.ccaData.split(/\r?\n/);
        formattedBoostData.achievementsData =
            boostData.resumeData.achievementsData.split(/\r?\n/);
        formattedBoostData.projectData =
            boostData.resumeData.projectData.split(/\r?\n/);
    }

    return (
        <div className="flex min-h-[120px] w-[350px] flex-col items-center gap-3 rounded-3xl border border-black bg-blue-900 px-6 pt-5 pb-8 text-white shadow-lg md:min-h-[130px] md:w-[650px] md:px-8">
            <div className="flex items-center justify-between gap-5">
                <div className="flex h-14 w-14 items-center justify-center md:h-20 md:w-20">
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
                    <div className="flex items-center justify-center gap-2">
                        {loadingBoost && (
                            <svg
                                aria-hidden="true"
                                className="h-6 w-6 animate-spin fill-accent-500 text-light-500"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        )}
                        {boostData && !loadingBoost && (
                            <button
                                onClick={() => {
                                    setViewFlag(!viewFlag);
                                }}
                                className="text:sm h-[24px] rounded-full bg-accent-500 px-2 font-bold text-white hover:bg-accent-300 md:h-[28px] md:text-base"
                            >
                                {viewFlag ? "Close" : "View"}
                            </button>
                        )}
                        <button
                            onClick={async () => {
                                setViewFlag(false);
                                setLoadingBoost(true);
                                await boostResume(
                                    userID,
                                    resumeData,
                                    jobData
                                ).catch((err) => {
                                    toast.error(
                                        "OpenAI API is currently down. Try again later."
                                    );
                                });
                                setLoadingBoost(false);
                                router.refresh();
                            }}
                            className="text:sm h-[24px] rounded-full bg-accent-500 px-2 font-bold text-white hover:bg-accent-300 md:h-[28px] md:text-base"
                        >
                            Boost
                        </button>
                    </div>
                </div>
            </div>
            {viewFlag && boostData && (
                <div className="min-h-[500px] w-11/12 bg-gray-100 px-10 py-7 text-black shadow-2xl">
                    <div className="flex w-full flex-col items-center gap-5">
                        <div className="flex w-full flex-col gap-2">
                            <section className="w-full rounded-md bg-emerald-200 p-1 font-bold shadow-lg">
                                Cover Letter
                            </section>
                            <section className="flex flex-col">
                                {formattedBoostData.coverLetter.map((e) => (
                                    <div key={e}>{e}</div>
                                ))}
                            </section>
                        </div>
                        <div className="flex w-full flex-col gap-2">
                            <section className="w-full rounded-md bg-cyan-200 p-1 font-bold shadow-lg">
                                Project Experiences
                            </section>
                            <section className="flex flex-col">
                                {formattedBoostData.projectData.map((e) => (
                                    <div key={e}>{e}</div>
                                ))}
                            </section>
                        </div>
                        <div className="flex w-full flex-col gap-2">
                            <section className="w-full rounded-md bg-indigo-200 p-1 font-bold shadow-lg">
                                Work Experiences
                            </section>
                            <section className="flex flex-col">
                                {formattedBoostData.workData.map((e) => (
                                    <div key={e}>{e}</div>
                                ))}
                            </section>
                        </div>
                        <div className="flex w-full flex-col gap-2">
                            <section className="w-full rounded-md bg-fuchsia-200 p-1 font-bold shadow-lg">
                                Co-Curricular Activities
                            </section>
                            <section className="flex flex-col">
                                {formattedBoostData.ccaData.map((e) => (
                                    <div key={e}>{e}</div>
                                ))}
                            </section>
                        </div>
                        <div className="flex w-full flex-col gap-2">
                            <section className="w-full rounded-md bg-rose-200 p-1 font-bold shadow-lg">
                                Achievements
                            </section>
                            <section className="flex flex-col">
                                {formattedBoostData.achievementsData.map(
                                    (e) => (
                                        <div key={e}>{e}</div>
                                    )
                                )}
                            </section>
                        </div>
                        <div className="flex w-full flex-col gap-2">
                            <section className="w-full rounded-md bg-amber-200 p-1 font-bold shadow-lg">
                                Skills
                            </section>
                            <section className="flex flex-col">
                                {formattedBoostData.skillsData.map((e) => (
                                    <div key={e}>{e}</div>
                                ))}
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

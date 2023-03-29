"use client";

import BoosterJobEntry from "./BoosterJobEntry";
import { use, useContext, useState } from "react";
import DataWrapper from "./DataWrapper";
import { UserContext } from "@/utils/UserContext";
import SearchPost from "../forum/SearchPost";

import firebase from "@/firebase/firebase-config";
const db = firebase.firestore();

async function getResumeAndTrackData(userID) {
    const resumeData = await db
        .collection("users")
        .doc(userID)
        .get()
        .then((doc) => {
            return doc.data().resumeData;
        });

    const jobArr = [];
    await db
        .collection("users")
        .doc(userID)
        .collection("tracker")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                jobArr.push(doc.data());
            });
        });

    const boostArr = [];
    await db
        .collection("users")
        .doc(userID)
        .collection("booster")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                boostArr.push(doc.data());
            });
        });
    return [resumeData, jobArr, boostArr];
}

export default function BoosterPage() {
    const [search, setSearch] = useState("");
    const userID = useContext(UserContext);
    const [resumeData, jobData, boostData] = use(getResumeAndTrackData(userID));

    function findBoostData(jobID, boostData) {
        const boost = boostData.find((e) => e.uuid === jobID);
        if (boost === undefined) return null;
        return boost;
    }

    const filteredJobs = jobData.filter((job) =>
        job.company.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-[calc(100vh-64px)] overflow-auto">
            <div className="flex justify-center">
                <div className="flex w-[384px] flex-col items-center justify-center gap-2 py-5 md:w-[690px]">
                    <div className="flex w-full items-center justify-between">
                        <header className="text-2xl font-bold text-accent-500 md:text-3xl">
                            Choose Job Target
                        </header>
                        <DataWrapper resumeData={resumeData} userID={userID} />
                    </div>
                    <SearchPost search={search} setSearch={setSearch} />
                    <main className="flex flex-col items-center gap-2 pt-2">
                        {filteredJobs.map((e) => (
                            <BoosterJobEntry
                                key={e.uuid}
                                jobData={e}
                                userID={userID}
                                resumeData={resumeData}
                                boostData={findBoostData(e.uuid, boostData)}
                            />
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
}

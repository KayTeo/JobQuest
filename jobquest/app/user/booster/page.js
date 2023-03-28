"use client";

import BoosterJobEntry from "./boosterJobEntry";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "@/app/user/loading";
import { use } from "react";
import DataWrapper from "./DataWrapper";

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
    const [user, loading, error] = useAuthState(firebase.auth());

    if (loading) return <Loading />;
    const userID = user.uid;
    const [resumeData, jobData, boostData] = use(getResumeAndTrackData(userID));

    function findBoostData(jobID, boostData) {
        const boost = boostData.find((e) => e.uuid === jobID);
        if (boost === undefined) return null;
        return boost;
    }

    return (
        <>
            <div className="h-[calc(100vh-64px)] overflow-auto">
                <div className="flex flex-col items-center justify-center gap-2 py-10">
                    <header className="text-2xl font-bold text-accent-500 md:text-3xl">
                        Choose Job Target
                    </header>
                    <DataWrapper resumeData={resumeData} userID={userID} />
                    <main className="text-black">
                        <section className="flex flex-col items-center justify-center gap-2">
                            {jobData.map((e) => (
                                <BoosterJobEntry
                                    key={e.uuid}
                                    jobData={e}
                                    userID={userID}
                                    resumeData={resumeData}
                                    boostData={findBoostData(e.uuid, boostData)}
                                />
                            ))}
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}

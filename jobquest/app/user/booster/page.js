"use client";

import { use, useContext } from "react";
import DataWrapper from "./DataWrapper";
import { UserContext } from "@/utils/UserContext";

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
    const userID = useContext(UserContext);
    const [resumeData, jobData, boostData] = use(getResumeAndTrackData(userID));

    return (
        <div className="h-[calc(100vh-64px)] overflow-auto">
            <div className="flex justify-center">
                <DataWrapper
                    resumeData={resumeData}
                    userID={userID}
                    jobData={jobData}
                    boostData={boostData}
                />
            </div>
        </div>
    );
}

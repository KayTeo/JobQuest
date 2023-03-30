"use client";

import { use, useContext } from "react";
import { UserContext } from "@/utils/UserContext";
import firebase from "@/firebase/firebase-config";
import DataWrapper from "./DataWrapper";

const db = firebase.firestore();

async function getData(userID) {
    const trackArr = [];
    await db
        .collection("users")
        .doc(userID)
        .collection("tracker")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                trackArr.push(doc.data());
            });
        });

    const wishArr = [];
    await db
        .collection("users")
        .doc(userID)
        .collection("wishlist")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                wishArr.push(doc.data());
            });
        });
    return [wishArr, trackArr];
}

export default function TrackerPage() {
    const userID = useContext(UserContext);
    const [wishData, trackData] = use(getData(userID));

    return (
        <div className="flex h-[calc(100vh-64px)] flex-col items-center p-10">
            <DataWrapper
                userID={userID}
                trackData={trackData}
                wishData={wishData}
            />
        </div>
    );
}

"use client";

import WishList from "./WishList";
import TrackList from "./TrackList";
import ModeToggle from "./ModeToggle";
import { useState, use, useContext } from "react";
import { UserContext } from "@/utils/UserContext";
import firebase from "@/firebase/firebase-config";

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
    const [viewMode, setViewMode] = useState("both");
    const [wishData, trackData] = use(getData(userID));

    return (
        <div className="flex h-[calc(100vh-64px)] flex-col items-center p-10">
            <ModeToggle viewMode={viewMode} setViewMode={setViewMode} />
            <div className="flex flex-col items-center justify-center gap-10 py-10 xl:flex-row">
                <WishList
                    viewMode={viewMode}
                    userID={userID}
                    wishData={wishData}
                />
                <TrackList
                    viewMode={viewMode}
                    userID={userID}
                    trackData={trackData}
                />
            </div>
        </div>
    );
}

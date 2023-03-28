"use client";

import SearcherSetUp from "@/app/user/searcher/setup/SearcherSetUp";
import { use, useContext } from "react";
import { UserContext } from "@/utils/UserContext";

import firebase from "@/firebase/firebase-config";
const db = firebase.firestore();

async function getSearcherData(userID) {
    const data = await db
        .collection("users")
        .doc(userID)
        .get()
        .then((doc) => doc.data().searcherData);
    return data;
}

export default function SearcherSetUpPage() {
    const userID = useContext(UserContext);

    const userData = use(getSearcherData(userID));
    return (
        <div className="h-[calc(100vh-64px)]">
            <SearcherSetUp userID={userID} userData={userData} />
        </div>
    );
}

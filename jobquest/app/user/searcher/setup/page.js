"use client";

import SearcherSetUp from "@/app/user/searcher/setup/SearcherSetUp";
import { use } from "react";
import Loading from "@/app/user/loading";
import { useAuthState } from "react-firebase-hooks/auth";

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
    const [user, loading, error] = useAuthState(firebase.auth());
    if (loading) return <Loading />;
    const userID = user.uid;

    const userData = use(getSearcherData(userID));
    return (
        <div className="h-[calc(100vh-64px)]">
            <SearcherSetUp userID={userID} userData={userData} />
        </div>
    );
}

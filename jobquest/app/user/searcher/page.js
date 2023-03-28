"use client";

import SearcherCard from "./SearcherCard";
import Link from "next/link";
import Loading from "@/app/user/loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { use } from "react";

import firebase from "@/firebase/firebase-config";
const db = firebase.firestore();

async function getUserData(userID) {
    const data = await db
        .collection("users")
        .doc(userID)
        .get()
        .then((doc) => {
            return doc.data();
        });
    return data;
}

async function getJobData(userID) {
    const searcherData = await db
        .collection("users")
        .doc(userID)
        .get()
        .then((doc) => {
            return doc.data().searcherData;
        });

    const payload = {
        keywords: "software engineer",
        pages: 1,
        searcherData: searcherData,
    };

    return await fetch("/api/getJobs", {
        cache: "no-store",
        method: "POST",
        body: JSON.stringify(payload),
    }).then((res) => res.json());
}
export default function SearcherPage() {
    const [user, loading, error] = useAuthState(firebase.auth());
    const router = useRouter();

    if (loading) return <Loading />;

    const userID = user.uid;
    const userData = use(getUserData(userID));
    if (!userData.searcherBoolean) {
        router.push("user/searcher/setup");
    }

    const jobsList = getJobData(userID);

    return (
        <>
            {user && userData.searcherBoolean && (
                <div className="h-[calc(100vh-64px)] overflow-auto">
                    <div className="flex flex-col items-center gap-3 p-5">
                        <header className="text-2xl font-bold text-accent-500 md:text-3xl">
                            Jobs For You
                        </header>
                        <main>
                            <SearcherCard jobs={jobsList} userID={userID} />
                        </main>
                        <Link
                            href="/user/searcher/setup"
                            className="flex h-9 w-44 items-center justify-center rounded-full bg-accent-500 text-center text-base font-semibold leading-6 text-white shadow-sm hover:bg-accent-300 md:h-10 md:w-52 md:text-lg"
                        >
                            Update Your Details
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}

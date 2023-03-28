"use client";

import { UserContext } from "@/utils/UserContext";
import { useRouter } from "next/navigation";
import { use, useContext, useState } from "react";
import Search from "./Search";
import Link from "next/link";

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

async function getJobData(userID, keywords) {
    const searcherData = await db
        .collection("users")
        .doc(userID)
        .get()
        .then((doc) => {
            return doc.data().searcherData;
        });

    const payload = {
        keywords: keywords,
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
    const userID = useContext(UserContext);
    const [jobsData, setJobsData] = useState(null);
    const router = useRouter();
    const userData = use(getUserData(userID));
    if (!userData.searcherBoolean) {
        router.push("user/searcher/setup");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const keywords = e.target.keywords.value;
        const data = await getJobData(userID, keywords);
        setJobsData(data.jobs);
    }

    return (
        <>
            <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center overflow-auto">
                <Link
                    href="/user/searcher/setup"
                    className="flex h-9 w-44 items-center justify-center rounded-full bg-accent-500 text-center text-base font-semibold leading-6 text-white shadow-sm hover:bg-accent-300 md:h-10 md:w-52 md:text-lg"
                >
                    Update Your Details
                </Link>
                <form
                    id="keywords"
                    action="submit"
                    onSubmit={handleSubmit}
                    className="flex items-center justify-center gap-3"
                >
                    <input
                        name="keywords"
                        type="text"
                        className="w-[300px] rounded-xl border border-black px-2"
                    />
                    <button
                        type="submit"
                        form="keywords"
                        className="h-[28px] rounded-full bg-accent-500 px-2 font-semibold text-white hover:bg-accent-300"
                    >
                        Search
                    </button>
                </form>
                {jobsData && <Search userID={userID} jobsData={jobsData} />}
            </div>
        </>
    );
}

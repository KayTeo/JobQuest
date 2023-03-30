"use client";

import { UserContext } from "@/utils/UserContext";
import { useRouter } from "next/navigation";
import { use, useContext, useState } from "react";
import Search from "./Search";
import Loading from "./loading";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";


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
    const [loadingJobs, setLoadingJobs] = useState(false);
    const router = useRouter();
    const userData = use(getUserData(userID));
    if (!userData.searcherBoolean) {
        router.push("user/searcher/setup");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const keywords = e.target.keywords.value;
        setLoadingJobs(true);
        const data = await getJobData(userID, keywords);
        setJobsData(data.jobs);
        setLoadingJobs(false);
    }

    return (
        <>
            {loadingJobs ? (
                <Loading />
            ) : (
                <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-start gap-5 overflow-auto py-10">
                    <Link
                        href="/user/searcher/setup"
                        className="flex items-center justify-center rounded-full bg-accent-500 px-2 py-1 text-center text-base font-semibold text-white  hover:bg-accent-300"
                    >
                        Update Your Details
                    </Link>
                    <form
                        id="keywords"
                        action="submit"
                        onSubmit={handleSubmit}
                        className="flex items-center justify-center gap-2"
                    >
                        <div className="block h-[28px] w-[28px]"></div>
                        <input
                            name="keywords"
                            type="text"
                            className="h-[28px] w-[500px] rounded-xl border border-black px-2"
                        />
                        <button
                            type="submit"
                            form="keywords"
                            className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-accent-500 font-semibold text-white hover:bg-accent-300"
                        >
                            <MagnifyingGlassIcon className="w-4 font-bold" />
                        </button>
                    </form>
                    {jobsData && (
                        <Search
                            key={jobsData}
                            userID={userID}
                            jobsData={jobsData}
                        />
                    )}
                </div>
            )}
        </>
    );
}

"use client";

import { jobList } from "./tempdata";
import SearcherCard from "./SearcherCard";
import Link from "next/link";
import firebase from "@/firebase/firebase-config";
import Loading from "@/app/user/loading";
import { useAuthState } from "react-firebase-hooks/auth";

export default function SearcherPage() {
    const [user, loading, error] = useAuthState(firebase.auth());
    if (loading) return <Loading />;

    const userID = user.uid;
    //fetching from database
    const jobsList = jobList;

    return (
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
    );
}

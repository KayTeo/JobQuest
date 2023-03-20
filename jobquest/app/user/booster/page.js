"use client";

import BoosterJobEntry from "./boosterJobEntry";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "@/app/user/loading";
import { use } from "react";

import firebase from "@/firebase/firebase-config";
const db = firebase.firestore();

async function getData(userID) {
    const arr = [];
    await db
        .collection("users")
        .doc(userID)
        .collection("tracker")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
            });
        });
    return arr;
}

export default function BoosterPage() {
    const [user, loading, error] = useAuthState(firebase.auth());
    
    if (loading) return <Loading />;

    const boostData = use(getData(user.uid));

    return (
        <div className="h-[calc(100vh-64px)] overflow-auto">
            <div className="flex flex-col items-center justify-center gap-2 py-10">
                <header className="text-2xl font-bold text-accent-500 md:text-3xl">
                    Choose Job Target
                </header>
                <main className="text-black">
                    <section className="flex flex-col items-center justify-center gap-2">
                        {boostData.map((e) => (
                            <BoosterJobEntry key={e.uuid} data={e} />
                        ))}
                    </section>
                </main>
            </div>
        </div>
    );
}

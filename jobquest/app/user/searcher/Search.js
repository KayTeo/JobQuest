import SearcherCard from "./SearcherCard";

import firebase from "@/firebase/firebase-config";
const db = firebase.firestore();

export default function Search({ jobsData, userID }) {
    return (
        <div className="flex flex-col items-center gap-3 p-5">
            <header className="text-2xl font-bold text-accent-500 md:text-3xl">
                Jobs For You
            </header>
            <main>
                <SearcherCard jobs={jobsData} userID={userID} />
            </main>
        </div>
    );
}

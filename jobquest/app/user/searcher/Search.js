import SearcherCard from "./SearcherCard";
import { motion } from "framer-motion";

export default function Search({ jobsData, userID }) {
    return (
        <>
            <header className="text-2xl font-bold text-accent-500 md:text-3xl">
                Jobs For You
            </header>
            <main className="flex w-full items-start justify-center overflow-hidden pt-10">
                    <SearcherCard jobs={jobsData} userID={userID} />
            </main>
        </>
    );
}

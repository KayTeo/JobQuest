import { jobList } from "./tempdata";
import SearcherCard from "./SearcherCard";
import Link from "next/link";

export default function SearcherPage() {
    //fetching from database
    const jobsList = jobList;

    return (
        <div className="h-[calc(100vh-64px)] overflow-auto">
            <div className="flex flex-col items-center gap-3 p-5">
                <header className="text-2xl font-bold text-accent-500 md:text-3xl">
                    Jobs For You
                </header>
                <main>
                    <SearcherCard jobs={jobsList} />
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

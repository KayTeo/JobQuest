import SearcherCollapsedCard from "./SearcherCollapsedCard";
import { jobData } from "./tempdata";

export default function SearcherCollapsedCardPage() {
    //fetching from database
    const jobs = jobData;

    return (
        <div className="h-[calc(100vh-64px)]">
            <div className="my-7 flex flex-col items-center justify-center gap-3 pb-10 md:p-10">
                <header className="text-3xl font-bold text-accent-500">
                    Jobs For You
                </header>

                {jobs.map((e) => (
                    <SearcherCollapsedCard key={e.uuid} data={e} />
                ))}

                <button className="flex h-7 w-52 items-center justify-center rounded-full bg-accent-500 text-center text-lg font-semibold leading-6 text-white shadow-sm hover:bg-accent-300">
                    Update Your Details
                </button>
            </div>
        </div>
    );
}

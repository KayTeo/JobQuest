"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import SearchPost from "../forum/SearchPost";
import BoosterJobEntry from "./BoosterJobEntry";

export default function DataWrapper({ resumeData, userID, jobData, boostData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    
    const router = useRouter();

    const filteredJobs = jobData.filter((job) =>
        job.company.name.toLowerCase().includes(search.toLowerCase())
    );

    function findBoostData(jobID, boostData) {
        const boost = boostData.find((e) => e.uuid === jobID);
        if (boost === undefined) return null;
        return boost;
    }

    useEffect(() => {
        router.refresh();
    }, [isOpen]);

    return (
        <>
            <div className="flex w-[384px] flex-col items-center justify-center gap-2 py-5 md:w-[690px]">
                <div className="flex w-full items-center justify-between">
                    <header className="text-2xl font-bold text-accent-500 md:text-3xl">
                        Choose Job Target
                    </header>
                    <div className="pt-1">
                        <button
                            className="h-8 w-24 rounded-full bg-accent-500 text-center text-sm font-bold leading-6 text-white shadow-sm hover:bg-accent-300 md:h-10 md:w-28 md:text-base"
                            onClick={() => {
                                setIsOpen(!isOpen);
                            }}
                        >
                            Set Resume
                        </button>
                    </div>
                </div>
                <SearchPost search={search} setSearch={setSearch} />
                <main className="flex flex-col items-center gap-2 pt-2">
                    {filteredJobs.map((e) => (
                        <BoosterJobEntry
                            key={e.uuid}
                            jobData={e}
                            userID={userID}
                            resumeData={resumeData}
                            boostData={findBoostData(e.uuid, boostData)}
                        />
                    ))}
                </main>
            </div>
            {isOpen && (
                <Dialog
                    className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-dark-500 bg-opacity-50"
                    open={true}
                    onClose={() => setIsOpen(false)}
                >
                    <Modal
                        setIsOpen={setIsOpen}
                        userID={userID}
                        defaultData={resumeData}
                    />
                </Dialog>
            )}
        </>
    );
}

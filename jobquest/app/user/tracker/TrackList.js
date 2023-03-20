"use client";

import { Dialog } from "@headlessui/react";
import Modal from "./Modal";
import TrackEntry from "./TrackEntry";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const emptyEntry = {
    uuid: null,
    company: {
        logo: null,
        name: null,
    },
    datePosted: null,
    description: null,
    dueDate: null,
    jobTitle: null,
    jobType: [null],
    location: {
        address: null,
        country: null,
        locality: null,
    },
    salaryRange: {
        currency: null,
        maxValue: null,
        minValue: null,
        payPeriod: null,
    },
    skills: [],
};

export default function TrackList({ viewMode, userID, trackData }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [isOpen]);

    return (
        <>
            <div
                className={`${
                    viewMode === "left" && "hidden"
                } flex flex-col items-center justify-center gap-4`}
            >
                <div className="flex items-center justify-center gap-1">
                    <h1 className="text-2xl font-bold text-accent-500">
                        Applications
                    </h1>
                    <button
                        className="rounded-full bg-accent-500 px-2 text-center font-bold text-white hover:bg-accent-300"
                        onClick={() => setIsOpen(true)}
                    >
                        +
                    </button>
                </div>
                <div
                    className={` ${
                        viewMode === "right" && "xl:w-[900px]"
                    }  h-[60vh] w-[600px] overflow-hidden rounded-xl border border-black bg-light-500`}
                >
                    <div className="flex h-full w-full flex-col items-center gap-2 overflow-y-scroll p-2 pr-1">
                        {trackData.map((e) => (
                            <TrackEntry key={e.uuid} data={e} userID={userID} />
                        ))}
                    </div>
                </div>
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
                        defaultData={emptyEntry}
                    />
                </Dialog>
            )}
        </>
    );
}

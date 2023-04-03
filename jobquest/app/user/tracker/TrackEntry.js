"use client";

import { Dialog } from "@headlessui/react";
import Modal from "./Modal";
import { ArrowDownCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useState, useEffect, useMemo } from "react";
import Skill from "@/components/Skill";
import { useRouter } from "next/navigation";
import GoogleMap from "@/components/GoogleMap";
import { Suspense } from "react";

import firebase from "@/firebase/firebase-config";
const db = firebase.firestore();

const statusOptions = [
    { name: "Preparing", color: "bg-fuchsia-500" },
    { name: "Applied", color: "bg-amber-500" },
    { name: "Replied", color: "bg-green-500" },
    { name: "OA Due", color: "bg-rose-500" },
    { name: "OA Done", color: "bg-sky-500" },
    { name: "Interview", color: "bg-teal-500" },
    { name: "Offered", color: "bg-violet-500" },
    { name: "Rejected", color: "bg-stone-500" },
    { name: "Ghosted", color: "bg-slate-500" },
];

async function updateEntry(userID, entry) {
    await db
        .collection("users")
        .doc(userID)
        .collection("tracker")
        .doc(entry.uuid)
        .set(entry);
}

async function deleteEntry(userID, entry) {
    await db
        .collection("users")
        .doc(userID)
        .collection("tracker")
        .doc(entry.uuid)
        .delete();

    await db
        .collection("users")
        .doc(userID)
        .collection("booster")
        .doc(entry.uuid)
        .delete();
}

export default function TrackEntry({ data, userID }) {
    const [isOpen, setIsOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [status, setStatus] = useState(data.status);
    const [expandCard, setExpandCard] = useState(false);
    const router = useRouter();
    const formattedDescription = data.description.split(/\r?\n/);

    useEffect(() => {
        router.refresh();
    }, [isOpen]);

    const gmap = useMemo(() => {
        return (
            <section className="flex h-[170px] w-full items-center justify-center">
                <Suspense
                    fallback={
                        <svg
                            aria-hidden="true"
                            className="ml-1 h-12 w-12 animate-spin fill-accent-500 text-white"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                    }
                >
                    <>
                        <GoogleMap address={data.location.address} />
                    </>
                </Suspense>
            </section>
        );
    }, [data]);

    function nextStatus() {
        const index = statusOptions.findIndex((e) => {
            return e.name === status.name;
        });

        if (index === 8) {
            updateEntry(userID, { ...data, status: statusOptions[0] });
            setStatus(statusOptions[0]);
        } else {
            updateEntry(userID, { ...data, status: statusOptions[index + 1] });
            setStatus(statusOptions[index + 1]);
        }
    }

    return (
        <>
            {isOpen && (
                <Dialog
                    className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-dark-500 bg-opacity-50"
                    open={true}
                    onClose={() => setIsOpen(false)}
                >
                    <Modal
                        setIsOpen={setIsOpen}
                        userID={userID}
                        defaultData={data}
                    />
                </Dialog>
            )}
            {!deleting && (
                <div
                    className={`flex ${
                        expandCard && "pb-2"
                    } w-full flex-col items-center justify-start rounded-xl border border-black bg-white text-center text-xs font-bold text-dark-500`}
                >
                    <div className="flex h-10 w-full items-center justify-between">
                        <button
                            onClick={() => {
                                setDeleting(true);
                                deleteEntry(userID, data);
                                router.refresh();
                            }}
                            className="inline-flex"
                        >
                            <XCircleIcon className="w-7 text-red-500 hover:text-red-300" />
                        </button>

                        <div
                            className="h-5 w-[30%] overflow-hidden text-ellipsis whitespace-nowrap"
                            title={data.company.name}
                        >
                            {data.company.name}
                        </div>
                        <div
                            className="h-5 w-[25%] overflow-hidden text-ellipsis whitespace-nowrap"
                            title={data.jobTitle}
                        >
                            {data.jobTitle}
                        </div>
                        <div
                            className="h-5 w-24 overflow-hidden text-ellipsis whitespace-nowrap"
                            title={data.location.locality}
                        >
                            {data.location.locality}
                        </div>
                        <div className="flex items-center justify-end gap-1">
                            <button
                                className={`inline-flex h-6 w-20 items-center justify-center rounded-full ${status.color} px-2 py-1 text-white`}
                                onClick={nextStatus}
                            >
                                {status.name}
                            </button>
                            <button
                                className="inline-flex"
                                onClick={() => {
                                    setExpandCard(!expandCard);
                                }}
                            >
                                <ArrowDownCircleIcon
                                    className={`${
                                        expandCard && "rotate-180"
                                    } w-7 text-accent-500 hover:text-accent-300`}
                                />
                            </button>
                        </div>
                    </div>
                    {expandCard && (
                        <div className="flex w-full flex-col items-center justify-start gap-2 p-2">
                            <div className="flex max-h-48 w-full flex-col items-start justify-start gap-1">
                                <h1 className="text-base font-bold">
                                    Description
                                </h1>
                                <div className="w-full overflow-auto break-words pr-2 text-left font-normal">
                                    <section className="flex flex-col">
                                        {formattedDescription.map((e) => (
                                            <div key={e}>{e}</div>
                                        ))}
                                    </section>
                                </div>
                            </div>

                            <div className="flex w-full flex-col items-start justify-start">
                                <h1 className="text-base font-bold">Skills</h1>
                                <div className="flex max-h-32 w-full flex-wrap gap-2 overflow-auto">
                                    {data.skills.map((e) => (
                                        <Skill
                                            className="min-w-[50px] px-2 py-1"
                                            key={e}
                                            name={e}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex w-full flex-col items-start">
                                <h1 className="text-base font-bold">Pay:</h1>
                                <p className="font-normal">
                                    {data.salaryRange.minValue &&
                                        data.salaryRange.minValue}
                                    {data.salaryRange.minValue &&
                                        data.salaryRange.maxValue &&
                                        " - "}
                                    {data.salaryRange.maxValue &&
                                        data.salaryRange.maxValue}{" "}
                                    {data.salaryRange.currency &&
                                        (data.salaryRange.minValue ||
                                            data.salaryRange.maxValue) &&
                                        data.salaryRange.currency}
                                </p>
                            </div>

                            <div className="flex w-full flex-col items-start">
                                <h1 className="text-base font-bold">
                                    Address:
                                </h1>
                                <p className="font-normal">
                                    {data.location.address
                                        ? data.location.address
                                        : "NIL"}
                                </p>
                            </div>

                            {gmap}

                            <div className="mt-3 flex w-full items-center justify-center gap-2">
                                {data.jobLink && (
                                    <a
                                        href={
                                            data.jobLink.includes("//")
                                                ? data.jobLink
                                                : "//" + data.jobLink
                                        }
                                        target="_blank"
                                    >
                                        <button className="h-8 w-28 items-center justify-center rounded-full bg-accent-500 px-2 py-1 text-white hover:bg-accent-300">
                                            Visit Job Site
                                        </button>
                                    </a>
                                )}

                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="h-8 w-28 items-center justify-center rounded-full bg-accent-500 px-2 py-1 text-white hover:bg-accent-300"
                                >
                                    Edit Details
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

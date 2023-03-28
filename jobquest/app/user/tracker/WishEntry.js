"use client";

import { ArrowDownCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Skill from "@/components/Skill";
import { useRouter } from "next/navigation";

import firebase from "@/firebase/firebase-config";
const db = firebase.firestore();

async function updateEntry(userID, entry) {
    await db
        .collection("users")
        .doc(userID)
        .collection("tracker")
        .doc(entry.uuid)
        .set(entry);

    await db
        .collection("users")
        .doc(userID)
        .collection("wishlist")
        .doc(entry.uuid)
        .delete();
}

export default function WishEntry({ data, userID }) {
    const [expandCard, setExpandCard] = useState(false);
    const router = useRouter();

    async function movetoTrack() {
        await updateEntry(userID, {
            ...data,
            status: { name: "Preparing", color: "bg-fuchsia-500" },
        });
    }
    return (
        <div
            className={`flex ${
                expandCard && "pb-2"
            } w-full flex-col items-center justify-start rounded-xl border border-black bg-white text-center text-xs font-bold text-dark-500`}
        >
            <div className="flex h-10 w-full items-center justify-between">
                <button className="inline-flex">
                    <XCircleIcon className="w-7 text-red-500 hover:text-red-300" />
                </button>
                <div className="h-5 w-[30%] overflow-clip">
                    {data.company.name}
                </div>
                <div className="h-5 w-[40%] overflow-clip">{data.jobTitle}</div>
                <div className="h-5 w-24 overflow-clip">
                    {data.location.locality}
                </div>
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
            {expandCard && (
                <div className="flex w-full flex-col items-center justify-start gap-2 p-2">
                    <div className="flex max-h-48 w-full flex-col items-start justify-start gap-1">
                        <h1 className="text-base font-bold">Description</h1>
                        <p className="overflow-auto pr-2 text-left font-normal">
                            {data.description}
                        </p>
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
                        <h1 className="text-base font-bold">Address:</h1>
                        <p className="font-normal">
                            {data.location.address
                                ? data.location.address
                                : "NIL"}
                        </p>
                    </div>

                    <div className="mt-3 flex w-full items-center justify-center gap-2">
                        <button className="h-8 w-28 items-center justify-center rounded-full bg-accent-500 px-2 py-1 text-white hover:bg-accent-300">
                            Visit Job Site
                        </button>
                        <button className="h-8 w-28 items-center justify-center rounded-full bg-accent-500 px-2 py-1 text-white hover:bg-accent-300">
                            Find Similar
                        </button>
                        <button
                            onClick={async () => {
                                await movetoTrack();
                                router.refresh();
                            }}
                            className="h-8 w-28 items-center justify-center rounded-full bg-accent-500 px-2 py-1 text-white hover:bg-accent-300"
                        >
                            Add to Tracker
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

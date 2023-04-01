"use client";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";
import Skill from "@/components/Skill";
import { motion } from "framer-motion";

async function moveToWishList(userID, data) {
    await db
        .collection("users")
        .doc(userID)
        .collection("wishlist")
        .doc(data.uuid)
        .set(data);
}

import firebase from "@/firebase/firebase-config";
const db = firebase.firestore();

export default function SmallCard({
    userID,
    data,
    setExpand,
    nextCard,
    className,
}) {
    return (
        <motion.div
            drag="x"
            dragConstraints={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
            onDragEnd={(event, info) => {
                if (info.point.x > 0.8 * window.innerWidth) {
                    moveToWishList(userID, data);
                    nextCard();
                } else if (info.point.x < 0.2 * window.innerWidth) {
                    nextCard();
                }
            }}
        >
            <div
                className={`${className} flex h-[300px] w-[300px] items-center justify-between gap-2 rounded-2xl bg-dark-500 p-3 text-white shadow-lg md:w-[600px]`}
            >
                <div className="flex flex-col items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center md:h-14 md:w-14">
                        <ChevronDoubleLeftIcon />
                    </div>
                    <div className="text-sm font-bold md:text-base">Next</div>
                </div>
                <div className="flex h-full w-[180px] flex-col items-center justify-between gap-5 md:w-[400px]">
                    <div className="flex w-full flex-col items-center justify-center gap-1">
                        <header className="flex w-full items-center justify-between">
                            <div
                                title={data.company.name}
                                className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold md:max-w-[400px] md:text-2xl"
                            >
                                {data.company.name}
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center md:h-10 md:w-10">
                                {data.company.logo ? (
                                    <img
                                        alt="logo"
                                        src={data.company.logo}
                                    ></img>
                                ) : (
                                    <BriefcaseIcon />
                                )}
                            </div>
                        </header>
                        <hr className="w-full bg-white"></hr>
                    </div>
                    <main className="flex w-full flex-wrap items-center justify-center gap-y-1 gap-x-5 md:gap-y-2">
                        <div className="flex max-w-full gap-1">
                            <p className="font-bold">Role:</p>
                            <p
                                className="overflow-hidden text-ellipsis whitespace-nowrap"
                                title={data.jobTitle}
                            >
                                {data.jobTitle}
                            </p>
                        </div>
                        <div className="flex max-w-full gap-1">
                            <p className="font-bold">Salary:</p>
                            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
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
                        <div className="flex max-w-full gap-1">
                            <p className="font-bold">Location:</p>
                            <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                                {data.location.locality}
                            </p>
                        </div>
                    </main>
                    <section className="flex w-full flex-col items-start justify-start">
                        <h1 className="text-base font-bold">Skills:</h1>
                        <div className="flex max-h-[50px] w-full flex-wrap gap-2 overflow-auto">
                            {data.skills.map((e) => (
                                <Skill
                                    className="min-w-[50px] px-2 text-xs"
                                    key={e}
                                    name={e}
                                />
                            ))}
                        </div>
                    </section>
                    <button
                        onClick={() => {
                            setExpand(true);
                        }}
                        className="flex h-6 w-20 items-center justify-center rounded-full bg-accent-500 text-center text-sm font-semibold text-white shadow-sm hover:bg-accent-300"
                    >
                        View More
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center md:h-14 md:w-14">
                        <ChevronDoubleRightIcon />
                    </div>
                    <div className="text-sm font-bold md:text-base">Add</div>
                </div>
            </div>
        </motion.div>
    );
}

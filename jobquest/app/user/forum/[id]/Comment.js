"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import CommentModal from "./CommentModal";

export default function Comment({ commentData, authorPic }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ul className="min-h-[100px] rounded-xl bg-accent-100 px-5 text-xs md:min-h-[125px]">
                <div className="flex">
                    <div className="flex flex-col items-center pt-3">
                        <li className="h-14 w-14 md:h-16 md:w-16">
                            {authorPic}
                        </li>
                        <li className="whitespace-nowrap font-bold text-accent-500 md:text-sm">
                            {commentData.author}
                        </li>
                    </div>
                    <div className="flex min-h-[100px] w-[374px] flex-col justify-between gap-2 pl-3 pt-3 pb-5 md:min-h-[125px] md:w-[674px]">
                        <main className="md:text-sm">
                            {commentData.content}
                        </main>
                        <div className="flex justify-between text-[8px] font-light md:text-[10px]">
                            <section className="flex items-center justify-center gap-1 md:gap-2">
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="font-semibold text-orange-500"
                                >
                                    edit
                                </button>
                                <button className="font-semibold text-red-500">
                                    delete
                                </button>
                            </section>
                            <li>{commentData.commentDate}</li>
                        </div>
                    </div>
                </div>
            </ul>
            <Dialog
                className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-dark-500 bg-opacity-50"
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <CommentModal />
            </Dialog>
        </>
    );
}

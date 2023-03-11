"use client";

import { useState } from "react";
import {
    ArrowUpIcon,
    ArrowDownIcon,
    ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import PostModal from "./PostModal";

export default function Post({ postData }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ul className="flex w-[430px] flex-col items-start justify-center gap-1 rounded-xl bg-accent-100 px-5 md:w-[730px]">
                <div className="flex w-full flex-col items-start justify-center pt-3">
                    <Link
                        href={"/user/forum/" + postData.postID}
                        className="text-xl font-bold md:text-2xl"
                    >
                        {postData.title}
                    </Link>
                    <div className="flex w-full items-center justify-between text-[9px] md:text-xs">
                        <div className="flex items-center justify-center gap-2 leading-3">
                            <li className="font-bold text-accent-500">
                                {postData.author}
                            </li>
                            <li className="font-light">
                                {postData.datePublished}
                            </li>
                        </div>
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
                    </div>
                </div>
                <li className="max-w-sm overflow-hidden text-ellipsis whitespace-nowrap md:max-w-2xl">
                    {postData.content}
                </li>
                <li className="flex w-full items-center justify-between pt-2 pb-6">
                    <div className="flex gap-2">
                        <div className="flex gap-1">
                            <button className="h-3 w-3 md:h-4 md:w-4">
                                <ArrowUpIcon />
                            </button>
                            <button className="h-3 w-3 md:h-4 md:w-4">
                                <ArrowDownIcon />
                            </button>
                        </div>
                        <div className="text-[9px] md:text-xs">
                            {postData.upvotesNum}
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-3 w-3 md:h-5 md:w-5">
                            <ChatBubbleBottomCenterIcon />
                        </div>
                        <div className="text-[9px] md:text-xs">
                            {postData.commentNum}
                        </div>
                    </div>
                </li>
            </ul>
            <Dialog
                className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-dark-500 bg-opacity-50"
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <PostModal />
            </Dialog>
        </>
    );
}

"use client";

import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Post({ postData }) {
    return (
        <Link
            href={"/user/forum/" + postData.postID}
            prefetch={false}
            className="flex h-[104px] w-[340px] items-center justify-between gap-3 rounded-lg p-2 text-xs hover:bg-accent-100 md:w-[620px]"
        >
            <div className="flex h-6 w-6 items-center justify-center md:h-8 md:w-8">
                <img
                    alt="logo"
                    className="rounded-full"
                    src={postData.photoURL}
                    referrerPolicy="no-referrer"
                ></img>
            </div>
            <div className="flex w-full flex-col gap-1">
                <div className="flex flex-col">
                    <div className="max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold text-accent-500 md:max-w-[530px]">
                        {postData.title}
                    </div>
                    <div className="flex max-w-[230px] items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs md:max-w-[530px]">
                        <section>by</section>
                        <section className="font-bold text-accent-500">
                            {postData.author}
                        </section>
                    </div>
                </div>
                <main className="max-w-[230px] overflow-hidden text-ellipsis whitespace-nowrap md:max-w-[530px]">
                    {postData.content}
                </main>
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-3 w-3 md:h-5 md:w-5">
                            <ChatBubbleBottomCenterIcon />
                        </div>
                        <div className="text-[9px] md:text-xs">
                            {postData.commentNum}
                        </div>
                    </div>
                    <div className="font-light">{postData.datePublished}</div>
                </div>
            </div>
        </Link>
    );
}

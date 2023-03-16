"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
//temp user picture
import { UserCircleIcon } from "@heroicons/react/24/outline";
//temp data
import { commentData1 } from "./../tempforumdata";
import { postData1 } from "../tempforumdata";
import Comment from "./Comment";
import CommentPost from "./CommentPost";
import CommentModal from "./CommentModal";

export default function page({ params }) {
    const [isOpen, setIsOpen] = useState(false);
    const [commentsData, setCommentsData] = useState(commentData1);
    const post1 = postData1;

    const handleDelete = (id) => {
        const comments = commentsData.filter(
            (comment) => comment.commentID !== id
        );
        setCommentsData(comments);
    };

    return (
        <>
            <div className="h-[calc(100vh-64px)] overflow-auto">
                <div className="flex flex-col items-center justify-center gap-3 py-5 md:gap-4">
                    <div className="flex flex-col gap-1">
                        <header className="w-[430px] overflow-hidden text-ellipsis px-3 text-2xl font-bold md:w-[730px] md:text-3xl">
                            {post1.title}
                        </header>
                        <section className="w-[430px] md:w-[730px]">
                            <CommentPost
                                postContent={post1.content}
                                postDate={post1.datePublished}
                                postAuthor={post1.author}
                                postScore={post1.upvotesNum}
                                authorPic={<UserCircleIcon />}
                            />
                        </section>
                    </div>
                    <main className="flex w-[390px] flex-col gap-2 md:w-[690px]">
                        {commentsData.map((e) => (
                            <Comment
                                key={e.commentID}
                                commentData={e}
                                authorPic={<UserCircleIcon />}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </main>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="fixed top-20 left-3/4 h-8 w-20 rounded-full bg-accent-500 text-center text-[10px] font-bold leading-6 text-white shadow-sm hover:bg-accent-300 md:h-9 md:w-24 md:text-xs"
                    >
                        + Comment
                    </button>
                </div>
            </div>
            <Dialog
                className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-dark-500 bg-opacity-50"
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <CommentModal
                    commentsData={commentsData}
                    setCommentsData={setCommentsData}
                    setIsOpen={setIsOpen}
                />
            </Dialog>
        </>
    );
}

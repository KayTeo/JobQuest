"use client";

import { useState } from "react";
import CommentList from "./CommentList";
import { Dialog } from "@headlessui/react";
import CommentModal from "./CommentModal";

export default function page({ params }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="h-[calc(100vh-64px)] overflow-auto">
                <div className="flex flex-col items-center justify-center gap-3 py-5 md:gap-4">
                    <CommentList postID={params.id} />
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
                <CommentModal />
            </Dialog>
        </>
    );
}

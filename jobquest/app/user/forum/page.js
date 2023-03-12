"use client";

import { useState } from "react";
import SearchPost from "./SearchPost";
import PostList from "./PostList";
import { Dialog } from "@headlessui/react";
import PostModal from "./PostModal";

export default function ForumPage() {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [newEntry, setNewEntry] = useState(null);

    return (
        <>
            <div className="h-[calc(100vh-64px)]">
                <div className="flex flex-col items-center justify-center gap-2 py-5 text-xs text-black">
                    <header className="flex items-center justify-center gap-1">
                        <SearchPost search={search} setSearch={setSearch} />
                        <button
                            onClick={() => setIsOpen(true)}
                            className="h-6 w-16 rounded-full bg-accent-500 text-center text-xs font-bold leading-6 text-white shadow-sm hover:bg-accent-300"
                        >
                            + Post
                        </button>
                    </header>
                    <PostList searchedTitle={search} />
                </div>
            </div>
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

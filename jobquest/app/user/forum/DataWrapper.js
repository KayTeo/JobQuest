import { useState, useEffect } from "react";
import SearchPost from "./SearchPost";
import Post from "./Post";
import PostModal from "./PostModal";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function DataWrapper({ userID, postsData }) {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [isOpen]);

    const filteredPosts = postsData.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
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
                <main className="flex flex-col items-center justify-center gap-2">
                    {filteredPosts.map((e) => (
                        <Post key={e.postID} postData={e} />
                    ))}
                </main>
            </div>
            {isOpen && (
                <Dialog
                    className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-dark-500 bg-opacity-50"
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <PostModal
                        postsData={postsData}
                        setIsOpen={setIsOpen}
                        userID={userID}
                    />
                </Dialog>
            )}
        </>
    );
}

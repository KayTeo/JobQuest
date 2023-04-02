import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
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

    postsData.sort((a, b) => {
        return a.dateTime > b.dateTime ? -1 : 1;
    });

    postsData.sort((a, b) => {
        return a.commentNum > b.commentNum ? -1 : 1;
    });

    const filteredPosts = postsData.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4 py-10 text-black">
                <header className="flex w-[384px] items-center justify-center gap-1 md:w-[690px]">
                    <SearchBar search={search} setSearch={setSearch} />
                    <button
                        onClick={() => setIsOpen(true)}
                        className="h-6 w-16 rounded-full bg-accent-500 text-center text-xs font-bold leading-6 text-white shadow-sm hover:bg-accent-300"
                    >
                        + Post
                    </button>
                </header>
                <div className="flex min-h-[100px] w-[350px] flex-col gap-1 rounded-2xl bg-accent-200 pb-3 shadow-2xl md:w-[630px]">
                    <section className="h-[50px] w-full rounded-t-2xl bg-blue-900 px-5 py-2 text-xl font-bold text-white md:text-2xl ">
                        General Forum
                    </section>
                    <main className="flex w-full flex-col items-center justify-center gap-2">
                        {filteredPosts.map((e) => (
                            <div key={e.postID}>
                                <Post postData={e} />
                                <hr className="w-full bg-gray-500"></hr>
                            </div>
                        ))}
                    </main>
                </div>
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

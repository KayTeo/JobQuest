import Post from "./Post";
import CommentModal from "./CommentModal";
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DataWrapper({ postData, commentsData, userID }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    commentsData.sort((a, b) => {
        return a.dateTime > b.dateTime ? 1 : -1;
    });

    useEffect(() => {
        router.refresh();
    }, [isOpen]);

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-3 py-5 md:gap-4">
                <div className="flex flex-col gap-2">
                    <header className="w-[430px] overflow-hidden text-ellipsis px-3 text-2xl font-bold md:w-[730px] md:text-3xl">
                        {postData.title}
                    </header>
                    <section className="w-[430px] md:w-[730px]">
                        <Post postData={postData} />
                    </section>
                </div>
                <main className="flex w-[390px] flex-col gap-2 md:w-[690px]">
                    {commentsData.map((e) => (
                        <Post key={e.commentID} postData={e} />
                    ))}
                </main>
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed top-20 right-5 h-8 w-20 rounded-full bg-accent-500 text-center text-[10px] font-bold leading-6 text-white shadow-sm hover:bg-accent-300 md:h-9 md:w-24 md:text-xs"
                >
                    + Comment
                </button>
            </div>
            {isOpen && (
                <Dialog
                    className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-dark-500 bg-opacity-50"
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <CommentModal
                        setIsOpen={setIsOpen}
                        userID={userID}
                        postID={postData.postID}
                    />
                </Dialog>
            )}
        </>
    );
}

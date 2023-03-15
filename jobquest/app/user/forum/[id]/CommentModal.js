import { Dialog } from "@headlessui/react";
import { getCurrentDate } from "@/utils/date";

export default function CommentModal({
    commentsData,
    setCommentsData,
    setIsOpen,
}) {
    let newComment = {
        author: null,
        content: null,
        commentID: null,
        commentDate: null,
    };

    function handleSubmit(e) {
        e.preventDefault();
        newComment.author = "test";
        newComment.content = e.target.content.value;
        newComment.commentDate = getCurrentDate();
        // get last comment id and add 1
        let lastID = 0;
        try {
            lastID = parseInt(commentsData[commentsData.length - 1].commentID);
        } catch (e) {}
        newComment.commentID = (lastID + 1).toString();
        setCommentsData([...commentsData, newComment]);
        setIsOpen(false);
    }

    return (
        <Dialog.Panel className="flex w-[500px] flex-col items-center justify-start gap-2 overflow-auto rounded-2xl border border-black bg-light-100 p-5 shadow md:w-[900px]">
            <h1 className="text-2xl font-bold text-accent-500 md:text-3xl">
                Comment
            </h1>
            <form
                id="newCommentForm"
                onSubmit={handleSubmit}
                action="submit"
                className="flex w-[430px] flex-col gap-2 md:w-[730px]"
            >
                <section className="flex flex-col gap-1">
                    <label htmlFor="content" className="font-bold">
                        Content:
                    </label>
                    <textarea
                        id="content"
                        rows="8"
                        placeholder="Insert Your Message..."
                        className="rounded-xl border border-black p-1"
                    ></textarea>
                </section>
                <section className="flex items-center justify-between">
                    <div></div>
                    <button
                        type="submit"
                        form="newCommentForm"
                        className="h-7 w-16 rounded-full bg-accent-500 text-center text-xs font-bold leading-6 text-white shadow-sm hover:bg-accent-300 md:h-8 md:w-20 md:text-sm"
                    >
                        Comment
                    </button>
                </section>
            </form>
        </Dialog.Panel>
    );
}

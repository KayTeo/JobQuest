import Comment from "./Comment";
import CommentPost from "./CommentPost";
import { postData1 } from "../tempforumdata";
import { commentData1 } from "./../tempforumdata";
//temp user picture
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function page({ params }) {
    const comments1 = commentData1;
    const post1 = postData1;

    return (
        <div className="h-[calc(100vh-64px)]">
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
                            //temp user picture
                            authorPic={<UserCircleIcon />}
                        />
                    </section>
                </div>
                <main className="flex w-[430px] flex-col gap-2 md:w-[730px]">
                    {comments1.map((e) => (
                        <Comment
                            key={e.commentID}
                            commentData={e}
                            //temp user picture
                            authorPic={<UserCircleIcon />}
                        />
                    ))}
                </main>
                <div className="flex items-center justify-center">
                    <div></div>
                    <button className="h-8 w-20 rounded-full bg-accent-500 text-center text-[10px] font-bold leading-6 text-white shadow-sm hover:bg-accent-300 md:h-9 md:w-24 md:text-xs">
                        + Comment
                    </button>
                </div>
            </div>
        </div>
    );
}

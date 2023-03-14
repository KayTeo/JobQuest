import { postData1 } from "../tempforumdata";
import { commentData1 } from "./../tempforumdata";
import Comment from "./Comment";
import CommentPost from "./CommentPost";
//temp user picture
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function CommentList({ postID }) {
    //fetch data from api based on postID
    const comments1 = commentData1;
    const post1 = postData1;

    return (
        <>
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
            <main className="flex w-[390px] flex-col gap-2 md:w-[690px]">
                {comments1.map((e) => (
                    <Comment
                        key={e.commentID}
                        commentData={e}
                        //temp user picture
                        authorPic={<UserCircleIcon />}
                    />
                ))}
            </main>
        </>
    );
}

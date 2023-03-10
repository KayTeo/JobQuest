import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

export default function CommentPost({
    postContent,
    postDate,
    postAuthor,
    postScore,
    authorPic,
}) {
    return (
        <div className="min-h-[100px] rounded-xl border border-accent-500 bg-accent-100 px-5 text-xs md:min-h-[150px]">
            <div className="flex">
                <div className="flex flex-col items-center pt-3">
                    <section className="h-14 w-14 md:h-16 md:w-16">
                        {authorPic}
                    </section>
                    <section className="whitespace-nowrap font-bold text-accent-500 md:text-sm">
                        {postAuthor}
                    </section>
                </div>
                <div className="flex min-h-[100px] w-[374px] flex-col justify-between gap-2 pl-3 pt-2 pb-5 md:min-h-[150px] md:w-[674px]">
                    <main className="md:text-sm">{postContent}</main>
                    <div className="flex justify-between">
                        <div className="flex items-center gap-1">
                            <button className="h-3 w-3 md:h-4 md:w-4">
                                <ArrowUpIcon />
                            </button>
                            <button className="h-3 w-3 md:h-4 md:w-4">
                                <ArrowDownIcon />
                            </button>
                            <section className="md:text-sm">
                                {postScore}
                            </section>
                        </div>
                        <section className="text-[8px] font-light md:text-[10px]">
                            {postDate}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

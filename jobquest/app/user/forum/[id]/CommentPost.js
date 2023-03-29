export default function CommentPost({ postData }) {
    return (
        <>
            <div className="min-h-[100px] rounded-xl border border-accent-500 bg-accent-100 px-5 text-xs md:min-h-[150px]">
                <div className="flex">
                    <div className="flex flex-col items-center gap-1 pt-3">
                        <div>
                            <section className="h-14 w-14 md:h-16 md:w-16">
                                <img
                                    alt="logo"
                                    className="rounded-full"
                                    src={postData.photoURL}
                                    referrerPolicy="no-referrer"
                                ></img>
                            </section>
                            <section className="whitespace-nowrap font-bold text-accent-500 md:text-sm">
                                {postData.author}
                            </section>
                        </div>
                    </div>
                    <div className="flex min-h-[100px] w-[374px] flex-col justify-between gap-2 pl-3 pt-3 pb-5 md:min-h-[150px] md:w-[674px]">
                        <main className="md:text-sm">{postData.content}</main>
                        <div className="flex items-center justify-end text-[8px] font-light md:text-[10px]">
                            <section>{postData.datePublished}</section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

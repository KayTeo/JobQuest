import { getCurrentDate } from "@/utils/date";

export default function CommentPost({ postData }) {
    const formattedPostContent = postData.content.split(/\r?\n/);

    return (
        <div className="flex h-[125px] w-full justify-between gap-3 rounded-xl bg-accent-100 px-3 py-4 text-xs shadow-lg md:h-[150px]">
            <div className="flex w-[100px] flex-col items-center justify-center gap-1">
                <section className="flex h-14 w-14 items-center justify-center md:h-16 md:w-16">
                    <img
                        alt="logo"
                        className="rounded-full"
                        src={postData.photoURL}
                        referrerPolicy="no-referrer"
                    ></img>
                </section>
                <section
                    title={postData.author}
                    className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold text-accent-500 md:text-sm"
                >
                    {postData.author}
                </section>
            </div>
            <div className="flex w-[calc(100vw-100px)] flex-col justify-between gap-1 overflow-auto">
                <main className="break-words md:text-sm">
                    <section className="flex flex-col">
                        {formattedPostContent.map((e) => (
                            <div key={e}>{e}</div>
                        ))}
                    </section>
                </main>
                <div className="flex items-center justify-end text-[8px] font-light md:text-[10px]">
                    <section>{getCurrentDate(postData.dateTime)}</section>
                </div>
            </div>
        </div>
    );
}

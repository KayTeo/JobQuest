export default function Comment({ commentData }) {
    return (
        <>
            <ul className="min-h-[100px] rounded-xl bg-accent-100 px-5 text-xs md:min-h-[125px]">
                <div className="flex">
                    <div className="flex flex-col items-center pt-3">
                        <li className="h-14 w-14 md:h-16 md:w-16">
                            <img
                                alt="logo"
                                className="rounded-full"
                                src={commentData.photoURL}
                                referrerPolicy="no-referrer"
                            ></img>
                        </li>
                        <li className="whitespace-nowrap font-bold text-accent-500 md:text-sm">
                            {commentData.author}
                        </li>
                    </div>
                    <div className="flex min-h-[100px] w-[374px] flex-col justify-between gap-2 pl-3 pt-3 pb-5 md:min-h-[125px] md:w-[674px]">
                        <main className="md:text-sm">
                            {commentData.content}
                        </main>
                        <div className="flex justify-end text-[8px] font-light md:text-[10px]">
                            <li>{commentData.commentDate}</li>
                        </div>
                    </div>
                </div>
            </ul>
        </>
    );
}

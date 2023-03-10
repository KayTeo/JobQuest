import {
    ArrowUpIcon,
    ArrowDownIcon,
    ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Post({ postData }) {
    return (
        <ul className="flex w-[430px] flex-col items-start justify-center gap-1 rounded-xl bg-accent-100 px-5 md:w-[730px]">
            <div className="flex w-full flex-col items-start justify-center pt-3">
                <Link
                    href={"/user/forum/" + postData.postID}
                    className="text-xl font-bold md:text-2xl"
                >
                    {postData.title}
                </Link>
                <div className="flex items-center justify-center gap-2 text-[9px] leading-3 md:text-xs">
                    <li className="font-bold text-accent-500">
                        {postData.author}
                    </li>
                    <li className="font-light">{postData.datePublished}</li>
                </div>
            </div>
            <li className="max-w-sm overflow-hidden text-ellipsis whitespace-nowrap md:max-w-2xl">
                {postData.content}
            </li>
            <li className="flex w-full items-center justify-between pt-2 pb-6">
                <div className="flex gap-2">
                    <div className="flex gap-1">
                        <button className="h-3 w-3 md:h-4 md:w-4">
                            <ArrowUpIcon />
                        </button>
                        <button className="h-3 w-3 md:h-4 md:w-4">
                            <ArrowDownIcon />
                        </button>
                    </div>
                    <div className="text-[9px] md:text-xs">
                        {postData.upvotesNum}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <div className="h-3 w-3 md:h-5 md:w-5">
                        <ChatBubbleBottomCenterIcon />
                    </div>
                    <div className="text-[9px] md:text-xs">
                        {postData.commentNum}
                    </div>
                </div>
            </li>
        </ul>
    );
}

"use client";

import { useState } from "react";
import SearchPost from "./SearchPost";
import AddPost from "./AddPost";
import PostList from "./PostList";

export default function ForumPage() {
    const [addingPost, setAddingPost] = useState(false);
    const [search, setSearch] = useState("");

    return (
        <div className="h-[calc(100vh-64px)]">
            <div className="flex flex-col items-center justify-center gap-2 py-5 text-xs text-black">
                <header className="flex items-center justify-center gap-1">
                    <SearchPost search={search} setSearch={setSearch} />
                    <AddPost
                        addingPost={addingPost}
                        setAddingPost={setAddingPost}
                    />
                </header>
                <PostList />
            </div>
        </div>
    );
}

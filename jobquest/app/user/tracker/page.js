"use client";

import WishList from "./WishList";
import TrackList from "./TrackList";
import ModeToggle from "./ModeToggle";
import { useState } from "react";

export default function TrackerPage() {
    const [viewMode, setViewMode] = useState("both");

    return (
        <div className="flex h-[calc(100vh-64px)] flex-col items-center p-10">
            <ModeToggle viewMode={viewMode} setViewMode={setViewMode} />
            <div className="flex flex-col items-center justify-center gap-10 py-10 xl:flex-row">
                <WishList viewMode={viewMode} />
                <TrackList viewMode={viewMode} />
            </div>
        </div>
    );
}

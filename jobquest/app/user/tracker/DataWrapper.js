"use client";
import WishList from "./WishList";
import TrackList from "./TrackList";
import ModeToggle from "./ModeToggle";
import { useState } from "react";

export default function DataWrapper({ userID, trackData, wishData }) {
    const [viewMode, setViewMode] = useState("both");
    return (
        <>
            <ModeToggle viewMode={viewMode} setViewMode={setViewMode} />
            <div className="flex flex-col items-center justify-center gap-10 py-10 xl:flex-row">
                <WishList
                    viewMode={viewMode}
                    userID={userID}
                    wishData={wishData}
                />
                <TrackList
                    viewMode={viewMode}
                    s
                    userID={userID}
                    trackData={trackData}
                />
            </div>
        </>
    );
}

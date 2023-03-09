import React from "react";
import { track } from "./tempdata";
import TrackEntry from "./TrackEntry";
import WishEntry from "./WishEntry";

export function TrackWrapper() {
    // replace with fetch from api later
    const trackData = track;

    return (
        <div className="flex h-full w-full flex-col items-center gap-2 overflow-auto p-2">
            {trackData.map((e) => (
                <TrackEntry key={e.uuid} data={e} />
            ))}
        </div>
    );
}

export function WishWrapper() {
    const wishData = [];
    return (
        <div className="flex h-full w-full flex-col items-center gap-2 overflow-auto p-2">
            {wishData.map((e) => (
                <WishEntry key={e.uuid} data={e} />
            ))}
        </div>
    );
}

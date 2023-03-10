import React from "react";
import { track , wish} from "./tempdata";
import TrackEntry from "./TrackEntry";
import WishEntry from "./WishEntry";
import TrackerPage from "./page";

export function TrackWrapper() {
    // replace with fetch from api later
    const trackData = track;

    return (
        <div className="flex h-full w-full flex-col items-center gap-2 overflow-y-scroll p-2 pr-1">
            {trackData.map((e) => (
                <TrackEntry key={e.uuid} data={e} />
            ))}
        </div>
    );
}

export function WishWrapper() {
    // replace with fetch from api later
    const wishData = wish;
    return (
        <div className="flex h-full w-full flex-col items-center gap-2 overflow-y-scroll p-2 pr-1">
            {wishData.map((e) => (
                <WishEntry key={e.uuid} data={e} />
            ))}
        </div>
    );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import BigCard from "./BigCard";
import SmallCard from "./SmallCard";

export default function SearcherCard({ jobs, userID }) {
    const [index, setIndex] = useState(0);
    const [expand, setExpand] = useState(false);
    const [jobEnd, setJobEnd] = useState(jobs.length <= 0 ? true : false);
    const router = useRouter();

    const nextCard = () => {
        if (index + 1 >= jobs.length) {
            setJobEnd(true);
            router.refresh();
            return;
        } else setIndex(index + 1);
    };

    function checkIndex(data) {
        return jobs.findIndex((e) => {
            return e.uuid === data.uuid;
        });
    }

    return (
        <>
            {jobEnd && (
                <div className="p-5 text-xl font-semibold text-accent-500">
                    End of search results. Try searching again.
                </div>
            )}
            <div key={index}>
                {!jobEnd &&
                    jobs &&
                    jobs.map((e) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            key={e.uuid}
                        >
                            {expand ? (
                                <BigCard
                                    className={
                                        index === checkIndex(e) ? "" : "hidden"
                                    }
                                    data={e}
                                    setExpand={setExpand}
                                />
                            ) : (
                                <SmallCard
                                    nextCard={nextCard}
                                    userID={userID}
                                    setExpand={setExpand}
                                    data={e}
                                    className={
                                        index === checkIndex(e) ? "" : "hidden"
                                    }
                                />
                            )}
                        </motion.div>
                    ))}
            </div>
        </>
    );
}

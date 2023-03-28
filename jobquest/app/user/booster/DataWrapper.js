import { useState, useEffect } from "react";
import Modal from "./Modal";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function DataWrapper({ resumeData, userID }) {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [isOpen]);

    return (
        <>
            <button
                className="h-6 w-32 rounded-full bg-accent-500 text-center text-xs font-bold leading-6 text-white shadow-sm hover:bg-accent-300"
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                Set Resume
            </button>
            {isOpen && (
                <Dialog
                    className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-dark-500 bg-opacity-50"
                    open={true}
                    onClose={() => setIsOpen(false)}
                >
                    <Modal
                        setIsOpen={setIsOpen}
                        userID={userID}
                        defaultData={resumeData}
                    />
                </Dialog>
            )}
        </>
    );
}

"use client";

import { useState } from "react";

export default function BoosterJobEntry({ data }) {
    const [letterFlag, setLetterFlag] = useState(false);
    const [resumeFlag, setResumeFlag] = useState(false);
    const [resume, setResume] = useState(null);
    const [letter, setLetter] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        let resumeFlag = false;
        //boost resume/letter here
        try {
            console.log(e.target.resume.value);
            resumeFlag = true;
        } catch (e) {}
        try {
            console.log(e.target.letter.value);
        } catch (e) {}
        if (resumeFlag) {
            setResume(e.target.resume.value);
        } else {
            setLetter(e.target.letter.value);
        }
    }

    return (
        <div className="flex w-[350px] flex-col items-center justify-center gap-1 rounded-3xl border border-black bg-light-200 pt-2 pb-5 text-black md:w-[550px]">
            <section className="flex w-[320px] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap font-bold md:w-[520px]">
                {data.jobTitle}
            </section>
            <section className="flex w-[320px] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap md:w-[520px]">
                {data.company.name}
            </section>
            <section className="flex gap-2 px-5">
                <button
                    onClick={() => {
                        setResumeFlag(!resumeFlag);
                        setLetterFlag(false);
                        setLetter(null);
                        setResume(null);
                    }}
                    className="h-6 w-32 rounded-full bg-accent-500 text-center text-xs font-bold leading-6 text-white shadow-sm hover:bg-accent-300"
                >
                    Boost Resume
                </button>
                <button
                    onClick={() => {
                        setLetterFlag(!letterFlag);
                        setResumeFlag(false);
                        setLetter(null);
                        setResume(null);
                    }}
                    className="h-6 w-32 rounded-full bg-accent-500 text-center text-xs font-bold leading-6 text-white shadow-sm hover:bg-accent-300"
                >
                    Boost Cover Letter
                </button>
            </section>
            {resumeFlag && (
                <form
                    id="resumeForm"
                    onSubmit={handleSubmit}
                    action="submit"
                    className="flex flex-col gap-2"
                >
                    <div className="flex w-64 flex-col gap-1 md:w-80">
                        <label htmlFor="resume" className="font-bold">
                            Resume:
                        </label>
                        <textarea
                            id="resume"
                            rows="8"
                            placeholder="Insert Your Resume..."
                            className="rounded-xl border border-black p-1 text-xs"
                        ></textarea>
                    </div>
                    <div className="flex w-full justify-between">
                        <div></div>
                        <button
                            type="submit"
                            form="resumeForm"
                            className="h-7 w-16 rounded-full bg-accent-500 text-center text-xs font-bold leading-6 text-white shadow-sm hover:bg-accent-300 md:h-8 md:w-20 md:text-sm"
                        >
                            Boost
                        </button>
                    </div>
                </form>
            )}
            {letterFlag && (
                <form
                    id="letterForm"
                    onSubmit={handleSubmit}
                    action="submit"
                    className="flex flex-col gap-2"
                >
                    <div className="flex w-64 flex-col gap-1 md:w-80">
                        <label htmlFor="letter" className="font-bold">
                            Cover Letter:
                        </label>
                        <textarea
                            id="letter"
                            rows="8"
                            placeholder="Insert Your Cover Letter..."
                            className="rounded-xl border border-black p-1 text-xs"
                        ></textarea>
                    </div>
                    <div className="flex w-full justify-between">
                        <div></div>
                        <button
                            type="submit"
                            form="letterForm"
                            className="h-7 w-16 rounded-full bg-accent-500 text-center text-xs font-bold leading-6 text-white shadow-sm hover:bg-accent-300 md:h-8 md:w-20 md:text-sm"
                        >
                            Boost
                        </button>
                    </div>
                </form>
            )}
            {(resume || letter) && (
                <div className="flex flex-col gap-5 pb-8 pt-3">
                    <div className="flex w-64 flex-col gap-1 md:w-80">
                        <div className="font-bold">
                            {resume
                                ? "Boosted Resume:"
                                : "Boosted Cover Letter:"}
                        </div>
                        <div className="rounded-xl border border-black bg-white p-1 text-xs">
                            {resume ? resume : letter}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

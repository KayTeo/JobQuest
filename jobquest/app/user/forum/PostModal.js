import { Dialog } from "@headlessui/react";

export default function PostModal() {
    return (
        <Dialog.Panel className="flex w-[500px] flex-col items-center justify-start gap-2 overflow-auto rounded-2xl border border-black bg-light-100 p-5 shadow md:w-[900px]">
            <h1 className="text-2xl font-bold text-accent-500 md:text-3xl">
                Post
            </h1>
            <form
                action="submit"
                className="flex w-[430px] flex-col gap-2 md:w-[730px]"
            >
                <section className="flex flex-col gap-1">
                    <label htmlFor="title" className="font-bold">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Insert Title"
                        className="rounded-xl border border-black p-1"
                    ></input>
                </section>
                <section className="flex flex-col gap-1">
                    <label htmlFor="content" className="font-bold">
                        Content:
                    </label>
                    <textarea id="content" rows="8" placeholder="Insert Your Message..." className="rounded-xl border border-black p-1"></textarea>
                </section>
                <section className="flex items-center justify-between">
                    <div></div>
                    <button className="h-7 w-16 rounded-full bg-accent-500 text-center text-xs font-bold leading-6 text-white shadow-sm hover:bg-accent-300 md:h-8 md:w-20 md:text-sm">
                        Post
                    </button>
                </section>
            </form>
        </Dialog.Panel>
    );
}

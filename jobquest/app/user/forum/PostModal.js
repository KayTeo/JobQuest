"use client";

import { Dialog } from "@headlessui/react";
import { getCurrentDate } from "@/utils/date";
import { getCurrentTime } from "@/utils/time"
import { generateUUID } from "@/utils/uuid";

import firebase from "@/firebase/firebase-config";
const db = firebase.firestore();

async function addPost(userID, newPost) {
    const user = await db
        .collection("users")
        .doc(userID)
        .get()
        .then((doc) => {
            return {
                displayName: doc.data().displayName,
                photoURL: doc.data().photoURL,
            };
        });

    await db.collection("posts").doc(newPost.postID).set({
        title: newPost.title,
        content: newPost.content,
        datePublished: newPost.datePublished,
        dateTime: newPost.dateTime,
        postID: newPost.postID,
        commentNum: 0,
        author: user.displayName,
        photoURL: user.photoURL,
    });
}

export default function PostModal({ userID, setIsOpen }) {
    function handleSubmit(e) {
        e.preventDefault();

        const newPost = {
            title: e.target.title.value,
            content: e.target.content.value,
            datePublished: getCurrentDate(),
            dateTime: getCurrentTime(),
            postID: generateUUID(),
        };
        addPost(userID, newPost);
        setIsOpen(false);
    }

    return (
        <Dialog.Panel className="flex w-[500px] flex-col items-center justify-start gap-2 overflow-auto rounded-2xl border border-black bg-light-100 p-5 shadow md:w-[900px]">
            <h1 className="text-2xl font-bold text-accent-500 md:text-3xl">
                Post
            </h1>
            <form
                id="newPostForm"
                onSubmit={handleSubmit}
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
                        required
                        pattern=".*\S+.*"
                    ></input>
                </section>
                <section className="flex flex-col gap-1">
                    <label htmlFor="content" className="font-bold">
                        Content:
                    </label>
                    <textarea
                        id="content"
                        rows="8"
                        placeholder="Insert Your Message..."
                        className="break-words rounded-xl border border-black p-1"
                        minLength="5"
                        required
                    ></textarea>
                </section>
                <section className="flex items-center justify-between">
                    <div></div>
                    <button
                        type="submit"
                        form="newPostForm"
                        className="h-7 w-16 rounded-full bg-accent-500 text-center text-xs font-bold leading-6 text-white shadow-sm hover:bg-accent-300 md:h-8 md:w-20 md:text-sm"
                    >
                        Post
                    </button>
                </section>
            </form>
        </Dialog.Panel>
    );
}

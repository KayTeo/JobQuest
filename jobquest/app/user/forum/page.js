"use client";

import { useContext, use } from "react";
import { UserContext } from "@/utils/UserContext";
import DataWrapper from "./DataWrapper";

import firebase from "@/firebase/firebase-config";
const db = firebase.firestore();

async function getAllPosts() {
    const postsArr = [];
    await db
        .collection("posts")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                postsArr.push(doc.data());
            });
        });
    return postsArr;
}

export default function ForumPage() {
    const userID = useContext(UserContext);
    const unorderedPostsData = use(getAllPosts());

    const postsData = unorderedPostsData.sort((a, b) => {
        a.commentNum > b.commentNum ? 1 : -1;
    });

    return (
        <>
            <div className="h-[calc(100vh-64px)] overflow-auto">
                <DataWrapper userID={userID} postsData={postsData} />
            </div>
        </>
    );
}

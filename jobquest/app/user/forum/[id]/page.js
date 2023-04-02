"use client";

import { use, useContext } from "react";
import { UserContext } from "@/utils/UserContext";
import DataWrapper from "./DataWrapper";

import firebase from "@/firebase/firebase-config";
const db = firebase.firestore();

async function getPostAndCommentsData(postID) {
    const post = await db
        .collection("posts")
        .doc(postID)
        .get()
        .then((doc) => doc.data());

    const commentsArr = [];
    await db
        .collection("posts")
        .doc(postID)
        .collection("comments")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                commentsArr.push(doc.data());
            });
        });
    return [post, commentsArr];
}

export default function page({ params }) {
    const userID = useContext(UserContext);

    const [postData, commentsData] = use(getPostAndCommentsData(params.id));

    return (
        <div className="h-[calc(100vh-64px)] overflow-auto">
            <DataWrapper
                userID={userID}
                postData={postData}
                commentsData={commentsData}
            />
        </div>
    );
}

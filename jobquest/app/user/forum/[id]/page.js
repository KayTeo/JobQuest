"use client";

import { useState, use, useContext } from "react";
import { UserContext } from "@/utils/UserContext";
import DataWrapper from "./DataWrapper";
import Comment from "./Comment";
import CommentPost from "./CommentPost";
import CommentModal from "./CommentModal";
import { Dialog } from "@headlessui/react";

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

    const [postData, rawComments] = use(getPostAndCommentsData(params.id));

    const commentsData = rawComments.sort((a, b) => {
        a.author > b.author ? 1 : -1;
    });

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

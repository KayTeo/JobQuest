"use client";

import "./globals.css";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyAOe7TiFlTzxGpCCMosSLEyD5XjKGk83-Q",
    authDomain: "jobquest-d9d5b.firebaseapp.com",
    projectId: "jobquest-d9d5b",
    storageBucket: "jobquest-d9d5b.appspot.com",
    messagingSenderId: "551305935673",
    appId: "1:551305935673:web:4293266f9d463c1fa806e8",
    measurementId: "G-PRQ874C390",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function RootLayout({ children }) {
    const [user] = useAuthState(auth);

    return (
        <html lang="en">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body>
                {user ? (
                    <nav>
                        <h1>Test 1</h1>
                        <h1>Test 2</h1>
                    </nav>
                ) : (
                    <SignIn />
                )}
                {children}
            </body>
        </html>
    );
}

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    };
    return <button onClick={signInWithGoogle}>Sign In</button>;
}

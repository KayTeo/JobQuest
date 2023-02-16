"use client";

import firebase from "@/firebase/firebase-config";
import { useRouter } from "next/navigation";

const auth = firebase.auth();

export default function GoogleLogIn() {
    const router = useRouter();

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
        router.push("/user/home");
    }

    return (
        <button
            className="bg-accent-500 hover:bg-accent-700 text-white p-4 rounded-md"
            onClick={signInWithGoogle}
        >
            Sign In With Google
        </button>
    );
}

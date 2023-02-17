"use client";

import firebase from "@/firebase/firebase-config";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const auth = firebase.auth();

export default function GoogleLogIn() {
    const router = useRouter();

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
        Cookies.set("loggedin", true);
        router.push("/user/home");
    }

    return (
        <button
            className="rounded-md bg-accent-500 p-4 text-white hover:bg-accent-700"
            onClick={signInWithGoogle}
        >
            Sign In With Google
        </button>
    );
}

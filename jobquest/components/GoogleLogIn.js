"use client";

import firebase from "@/firebase/firebase-config";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const auth = firebase.auth();

export default function GoogleLogIn({ text }) {
    const router = useRouter();

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
        Cookies.set("loggedin", true);
        router.push("/user/home");
    }

    return (
        <button
            className="w-40 rounded-full bg-accent-500 p-2 text-sm font-semibold text-white hover:bg-accent-700"
            onClick={signInWithGoogle}
        >
            {text}
        </button>
    );
}

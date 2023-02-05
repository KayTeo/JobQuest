"use client";

import firebase from "@/firebase/firebase-config";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const auth = firebase.auth();

export default function GoogleSignIn() {
    const router = useRouter();

    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
        router.push("/home");
    };

    return (
        <Button colorScheme="blue" onClick={signInWithGoogle}>
            Sign In
        </Button>
    );
}

"use client";

import { Button } from "@chakra-ui/react";
import firebase from "@/firebase/firebase-config";

const auth = firebase.auth();

export default function GoogleSignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    };
    return (
        <Button colorScheme="blue" onClick={signInWithGoogle}>
            Sign In
        </Button>
    );
}

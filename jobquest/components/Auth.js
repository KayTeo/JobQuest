"use client";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "@/firebase/firebase-config";

// Configure FirebaseUI.
const uiConfig = {
    // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInFlow: "popup",
    signInSuccessUrl: "/",
    // We will display GitHub as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
};

export default function Auth() {
    return (
        <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
        />
    );
}

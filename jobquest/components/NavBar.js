"use client";

import firebase from "@/firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import Link from "next/link";

export default function NavBar() {
    const [user] = useAuthState(firebase.auth());

    return <>{user ? <div className="h-12 bg-accent-500"></div> : null}</>;
}

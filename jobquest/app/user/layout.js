"use client";

import NavBar from "@/components/NavBar";
import { UserContext } from "@/utils/UserContext";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "@/firebase/firebase-config";
import Loading from "./loading";

export default function UserLayout({ children }) {
    const [user, loading, error] = useAuthState(firebase.auth());
    if (loading) return <Loading />;
    const userID = user.uid;

    return (
        <UserContext.Provider value={userID}>
            <div className="h-full w-full overflow-auto bg-light-100 font-sans">
                <NavBar />
                {children}
            </div>
        </UserContext.Provider>
    );
}

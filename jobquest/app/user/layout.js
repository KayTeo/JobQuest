"use client";

import NavBar from "@/components/NavBar";
import { UserContext } from "@/utils/UserContext";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "@/firebase/firebase-config";
import Loading from "./loading";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function UserLayout({ children }) {
    const router = useRouter();
    const [user, loading, error] = useAuthState(firebase.auth());

    if (loading) {
        return <Loading />;
    }

    if (!Cookies.get("loggedin")) {
        router.push("/");
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <UserContext.Provider value={user ? user.uid : null}>
                    <div className="h-full w-full overflow-auto bg-light-100 font-sans">
                        <NavBar />
                        {children}
                    </div>
                </UserContext.Provider>
            )}
        </>
    );
}

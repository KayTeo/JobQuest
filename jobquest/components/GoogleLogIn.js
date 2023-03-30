"use client";

import firebase from "@/firebase/firebase-config";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const auth = firebase.auth();
const db = firebase.firestore();

export default function GoogleLogIn({ text }) {
    const router = useRouter();

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider).then(async (res) => {
            const user = res.user;

            const userDoc = await db
                .collection("users")
                .doc(user.uid)
                .get()
                .then((doc) => doc.exists);

            if (!userDoc) {
                await db
                    .collection("users")
                    .doc(user.uid)
                    .set({
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        searcherBoolean: false,
                        searcherData: {
                            school: null,
                            major: null,
                            location: null,
                            jobType: null,
                            citizenship: null,
                            minSalary: null,
                            skills: null,
                        },
                        resumeData: {
                            projectData: null,
                            workData: null,
                            ccaData: null,
                            achievementsData: null,
                            skillsData: null,
                        },
                    });
            }
            Cookies.set("loggedin", true);
            router.push("/user/searcher");
        });
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

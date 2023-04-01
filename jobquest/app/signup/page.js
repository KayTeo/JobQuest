"use client";

import Image from "next/image";
import GoogleLogIn from "@/components/GoogleLogIn";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";

import firebase from "@/firebase/firebase-config";
const auth = firebase.auth();
const db = firebase.firestore();

export default function SignInPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    if (Cookies.get("loggedin")) {
        router.push("/user/searcher");
    }

    function handleSubmit(e) {
        e.preventDefault();
        const email = e.target.email.value;
        const username = e.target.username.value;
        const password = e.target.password.value;
        const cfmpassword = e.target.cfmpassword.value;

        const emailRegex = new RegExp(
            "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
        );
        const passwordRegex = new RegExp(
            "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"
        );

        if (!emailRegex.test(e.target.email.value)) {
            alert("Please enter a valid email.");
        } else if (e.target.username.value == "") {
            alert("Username cannot be empty.");
        } else if (!passwordRegex.test(e.target.password.value)) {
            alert(
                "Password should be minimum 8 characters, containing at least 1 letter, number and special character."
            );
        } else if (!(e.target.password.value === e.target.cfmpassword.value)) {
            alert("Two passwords do not match.");
        } else {
            auth.createUserWithEmailAndPassword(email, password).then(
                async (userCredential) => {
                    setLoading(true);
                    const user = userCredential.user;

                    await db
                        .collection("users")
                        .doc(user.uid)
                        .set({
                            uid: user.uid,
                            displayName: username,
                            email: user.email,
                            photoURL:
                                "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg",
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
                    Cookies.set("loggedin", true);
                    router.push("/user/searcher");
                }
            );
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-3 pt-10 sm:pt-0">
            <h1 className="text-4xl font-bold tracking-tight text-accent-500 sm:text-5xl">
                Get started on the
            </h1>
            <Image
                alt="logo"
                className="w-80 sm:w-96"
                src={"/LogoSmall.png"}
                width={500}
                height={500}
            ></Image>
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-dark-500 py-4 px-10 sm:px-28">
                <form
                    onSubmit={handleSubmit}
                    action="submit "
                    className="flex flex-col items-center justify-center gap-4"
                >
                    <div className="flex flex-col items-center justify-center gap-px">
                        <label
                            className="font-semibold text-white"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="rounded-lg px-2 text-xl"
                            type="text"
                            id="email"
                            name="email"
                            //pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            required
                        />
                        <label
                            className="font-semibold text-white"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="rounded-lg px-2 text-xl"
                            type="text"
                            id="username"
                            name="username"
                            required
                        />
                        <label
                            className="font-semibold text-white"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="rounded-lg px-2 text-xl"
                            type="password"
                            id="password"
                            name="password"
                            //pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                            required
                        />
                        <label
                            className="font-semibold text-white"
                            htmlFor="cfmpassword"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="rounded-lg px-2 text-xl"
                            type="password"
                            id="cfmpassword"
                            name="cfmpassword"
                            //pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                            required
                        />
                    </div>
                    {!loading && (
                        <button
                            className="h-9 w-40 rounded-full bg-accent-500 p-2 text-sm font-semibold text-white hover:bg-accent-700"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    )}
                    {loading && (
                        <div className="flex h-9 w-40 items-center justify-center">
                            <svg
                                aria-hidden="true"
                                className="h-7 w-7 animate-spin fill-accent-500 text-white"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        </div>
                    )}
                </form>
                <GoogleLogIn text="Sign Up With Google" />
            </div>
        </div>
    );
}

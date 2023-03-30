"use client";

import Image from "next/image";
import GoogleLogIn from "@/components/GoogleLogIn";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import firebase from "@/firebase/firebase-config";
const auth = firebase.auth();
const db = firebase.firestore();

export default function SignInPage() {
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
                            //required
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
                            //required
                        />
                        <label
                            className="font-semibold text-white"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="rounded-lg px-2 text-xl"
                            type="text"
                            id="password"
                            name="password"
                            //pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                            //required
                        />
                        <label
                            className="font-semibold text-white"
                            htmlFor="cfmpassword"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="rounded-lg px-2 text-xl"
                            type="text"
                            id="cfmpassword"
                            name="cfmpassword"
                            //pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                            //required
                        />
                    </div>
                    <button
                        className="w-40 rounded-full bg-accent-500 p-2 text-sm font-semibold text-white hover:bg-accent-700"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>
                <GoogleLogIn text="Sign Up With Google" />
            </div>
        </div>
    );
}

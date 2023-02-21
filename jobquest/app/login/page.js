import GoogleLogIn from "@/components/GoogleLogIn";
import Image from "next/image";

export default function LogInPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-3 pt-10 sm:pt-40">
            <h1 className="text-4xl font-bold tracking-tight text-accent-500 sm:text-5xl">
                Continue the
            </h1>
            <Image
                alt="logo"
                className="w-80 sm:w-96"
                src={"/LogoSmall.png"}
                width={500}
                height={500}
            ></Image>
            <form
                action="/send-data-here"
                method="post"
                className="flex w-96 flex-col items-center justify-center gap-4 rounded-xl bg-dark-500 p-4"
            >
                <div className="flex flex-col items-center justify-center gap-px">
                    <label className="font-semibold text-white" for="username">
                        Username:
                    </label>
                    <input
                        className="rounded-lg px-2"
                        type="text"
                        id="username"
                        name="username"
                    />
                </div>
                <div className="flex flex-col items-center justify-center gap-px">
                    <label className="font-semibold text-white" for="password">
                        Password:
                    </label>
                    <input
                        className="rounded-lg px-2"
                        type="text"
                        id="password"
                        name="password"
                    />
                </div>
                <button
                    className="w-40 rounded-full bg-accent-500 p-2 text-sm font-semibold text-white hover:bg-accent-700"
                    type="submit"
                >
                    Log In
                </button>

                <GoogleLogIn text="Log In With Google" />
            </form>
        </div>
    );
}

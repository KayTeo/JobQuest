import GoogleLogIn from "@/components/GoogleLogIn";
import Image from "next/image";

export default function LogInPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-3 pt-10 sm:pt-0">
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
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-dark-500 py-4 px-10 sm:px-28">
                <form
                    action="submit "
                    className="flex flex-col items-center justify-center gap-4"
                >
                    <div className="flex flex-col items-center justify-center gap-px">
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
                        />
                    </div>
                    <button
                        className="w-40 rounded-full bg-accent-500 p-2 text-sm font-semibold text-white hover:bg-accent-700"
                        type="submit"
                    >
                        Log In
                    </button>
                </form>
                <GoogleLogIn text="Log In With Google" />
            </div>
        </div>
    );
}

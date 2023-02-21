import "./globals.css";
import NavBar from "@/components/NavBar";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body>
                {/* <NavBar /> */}
                <main className="flex-col items-center justify-center bg-light-500 font-sans sm:flex">
                    {children}
                </main>
            </body>
        </html>
    );
}

"use client"

import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
    title: "JobQuest",
    description: "Find your dream job",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <main className="flex-col items-center justify-center bg-light-500 font-sans sm:flex">
                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                    {children}
                </main>
            </body>
        </html>
    );
}

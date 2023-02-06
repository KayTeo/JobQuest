"use client";

import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";

import firebase from "@/firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

import "./globals.css";

export default function RootLayout({ children }) {
    // const [user] = useAuthState(firebase.auth());

    return (
        <html lang="en">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body>
                <ChakraProvider>
                    <main>
                        <Navbar />
                        {children}
                    </main>
                </ChakraProvider>
            </body>
        </html>
    );
}

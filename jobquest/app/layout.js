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
                <main className="bg-light-500 font-sans">{children}</main>
            </body>
        </html>
    );
}

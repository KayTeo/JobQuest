import "./globals.css";
import AlertContainer from "@/components/AlertContainer";

export const metadata = {
    title: "JobQuest",
    description: "Find your dream job",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <main className="flex-col items-center justify-center bg-light-500 font-sans sm:flex">
                    <AlertContainer />
                    {children}
                </main>
            </body>
        </html>
    );
}

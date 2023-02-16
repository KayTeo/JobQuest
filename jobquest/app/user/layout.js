import NavBar from "@/components/NavBar";

export default function UserLayout({ children }) {
    return (
        <div className="bg-light-100 font-sans h-full">
            <NavBar />
            {children}
        </div>
    );
}

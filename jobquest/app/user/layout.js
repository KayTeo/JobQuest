import NavBar from "@/components/NavBar";

export default function UserLayout({ children }) {
    return (
        <div className="h-full bg-light-100 font-sans">
            <NavBar />
            {children}
        </div>
    );
}

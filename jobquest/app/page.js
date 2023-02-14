import Hero from "@/components/Hero";
import Features from "@/components/Features";

export default function Main() {
    return (
        <div className="flex flex-col justify-center items-center h-full gap-10">
            <Hero />
            <Features />
        </div>
    );
}

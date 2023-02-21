import Hero from "@/components/Hero";
import Features from "@/components/Features";

export default function Main() {
    return (
        <div className="flex flex-col items-center justify-center gap-10 pt-10 sm:pt-0">
            <Hero />
            <Features />
        </div>
    );
}

import Hero from "@/components/Hero";
import Features from "@/components/Features";

export default function Main() {
    return (
        <div className="flex flex-col justify-center items-center pt-10 gap-10 sm:pt-40">
            <Hero />
            <Features />
        </div>
    );
}

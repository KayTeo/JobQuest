import { track } from "../tracker/tempdata";
import BoosterJobEntry from "./boosterJobEntry";

export default function BoosterPage() {
    const trackData = track;

    return (
        <div className="h-[calc(100vh-64px)] overflow-auto">
            <div className="flex flex-col items-center justify-center gap-2 py-10">
                <header className="text-2xl font-bold text-accent-500 md:text-3xl">
                    Choose Job Target
                </header>
                <main className="text-black">
                    <section className="flex flex-col items-center justify-center gap-2">
                        {trackData.map((e) => (
                            <BoosterJobEntry key={e.uuid} data={e} />
                        ))}
                    </section>
                </main>
            </div>
        </div>
    );
}

import {
    ClipboardIcon,
    DocumentTextIcon,
    MagnifyingGlassCircleIcon,
} from "@heroicons/react/20/solid";

const features = [
    {
        name: "Job Searcher",
        description:
            "Find your dream job with just a few clicks! Match yourself with the perfect job based on your skills and preferences.",
        icon: MagnifyingGlassCircleIcon,
    },
    {
        name: "Job Tracker",
        description:
            "Keep your applications in one place and never miss an opportunity! Stay organized and on top of your job search.",
        icon: ClipboardIcon,
    },
    {
        name: "Resume Booster",
        description:
            "Get noticed by potential employers! Create a professional-looking resume that highlights your skills and experience.",
        icon: DocumentTextIcon,
    },
];

export default function Features() {
    return (
        <div className="flex flex-col items-center justify-center">
            <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Our features
            </p>

            <dl className="mt-8 flex w-full flex-col gap-5 text-gray-600 sm:flex-row sm:gap-8">
                {features.map((feature) => (
                    <div
                        key={feature.name}
                        className="flex w-48 flex-col items-center justify-center gap-2"
                    >
                        <feature.icon
                            className="h-7 w-7 text-accent-500"
                            aria-hidden="true"
                        />
                        <dt className="text-lg font-semibold text-gray-900">
                            {feature.name}
                        </dt>
                        <dd className="text-center">{feature.description}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

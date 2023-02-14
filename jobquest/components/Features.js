import {
    ClipboardIcon,
    DocumentTextIcon,
    MagnifyingGlassCircleIcon,
} from "@heroicons/react/20/solid";

const features = [
    {
        name: "Track Your Applications",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        icon: ClipboardIcon,
    },
    {
        name: "Search For Jobs",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        icon: MagnifyingGlassCircleIcon,
    },
    {
        name: "Boost Your Resume",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        icon: DocumentTextIcon,
    },
];

export default function Features() {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Our features
            </p>

            <dl className="flex flex-col gap-5 mt-8 w-full text-gray-600 sm:flex-row sm:gap-8">
                {features.map((feature) => (
                    <div
                        key={feature.name}
                        className="flex flex-col justify-center items-center gap-2 w-48"
                    >
                        <feature.icon
                            className="w-7 h-7 text-accent-500"
                            aria-hidden="true"
                        />
                        <dt className="font-semibold text-lg text-gray-900">
                            {feature.name}
                        </dt>
                        <dd className="text-center">{feature.description}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

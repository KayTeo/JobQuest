export default function Skill({ name, className }) {
    return (
        <div
            className={`rounded-full border border-accent-500 bg-white text-center text-accent-500 ${className}`}
        >
            {name}
        </div>
    );
}

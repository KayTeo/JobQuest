export default function AddPost({ addingPost, setAddingPost }) {
    return (
        <button
            className="h-6 w-16 rounded-full bg-accent-500 text-center text-xs font-semibold leading-6 text-white shadow-sm hover:bg-accent-300"
            onClick={(e) => {
                setAddingPost(!addingPost);
            }}
        >
            New Post
        </button>
    );
}

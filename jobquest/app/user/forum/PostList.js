import Post from "./Post";
import { postData } from "./tempforumdata";

export default function PostList({ searchedTitle }) {
    //fetch data from api
    const posts = postData;

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchedTitle.toLowerCase())
    );

    return (
        <main className="flex flex-col items-center justify-center gap-2">
            {filteredPosts.map((e) => (
                <Post key={e.postID} postData={e} />
            ))}
        </main>
    );
}

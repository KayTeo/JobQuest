export default function Post({ postData }) {
    return (
        <ul className="flex w-[430px] flex-col items-center justify-center rounded-xl bg-accent-100 md:w-[730px]">
            <li key={postData.postID}>{postData.title}</li>
            <li>{postData.author}</li>
            <li>{postData.DatePublished}</li>
            <li>{postData.content}</li>
        </ul>
    );
}

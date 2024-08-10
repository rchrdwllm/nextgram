import { getPostIds } from "@/lib/post";
import Post from "./post";

const FeedPosts = async () => {
  const { success: postIds, error } = await getPostIds();

  if (error) return <div>Error: {error}</div>;

  if (!postIds) return <div>No posts</div>;

  return (
    <div className="flex flex-col gap-4">
      {postIds.map((postId) => (
        <Post key={postId} postId={postId} />
      ))}
    </div>
  );
};

export default FeedPosts;

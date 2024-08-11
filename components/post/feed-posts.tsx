import { getPostsByFollowing } from "@/lib/post";
import Post from "./post";
import { auth } from "@/server/auth";

const FeedPosts = async () => {
  const session = await auth();

  if (!session) {
    return <div>You must be logged in to view this page</div>;
  }

  const { success: postIds, error } = await getPostsByFollowing(
    session.user.id
  );

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

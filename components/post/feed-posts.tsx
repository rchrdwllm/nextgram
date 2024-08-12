import { getPostsByFollowing, getUserPostIds } from "@/lib/post";
import Post from "./post";
import { auth } from "@/server/auth";
import { getUserFollowingIds } from "@/lib/follow";
import SuggestedAccounts from "../feed/suggested-accounts";

const FeedPosts = async () => {
  const session = await auth();

  if (!session) {
    return <div>You must be logged in to view this page</div>;
  }

  const { success: followingIds, error: followingError } =
    await getUserFollowingIds(session.user.id);

  if (followingError) {
    return <div>Error: {followingError}</div>;
  }

  const { success: userPosts, error: userPostsError } = await getUserPostIds(
    session.user.id
  );

  if (userPostsError) {
    return <div>Error: {userPostsError}</div>;
  }

  if (userPosts && followingIds) {
    if (!userPosts.length && !followingIds.length) {
      return <SuggestedAccounts />;
    }
  }

  const { success: postIds, error: postError } = await getPostsByFollowing(
    session.user.id
  );

  if (postError) return <div>Error: {postError}</div>;

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

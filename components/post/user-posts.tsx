import Post from "@/components/post/post";
import { getUserPostIds } from "@/lib/post";
import UserPostsLinkScroller from "./user-posts-link-scroller";
import { getUserLikes } from "@/lib/like";
import { getUserBookmarks } from "@/lib/bookmark";

const UserPosts = async ({
  userId,
  tab,
}: {
  userId: string;
  tab: "postLikes" | "postBookmarks" | "posts";
}) => {
  if (tab === "postLikes" || tab === "postBookmarks") {
    const { success: ids, error } =
      tab === "postLikes"
        ? await getUserLikes(userId)
        : await getUserBookmarks(userId);

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!ids) {
      return <div>Posts not found</div>;
    }

    return (
      <UserPostsLinkScroller>
        <div className="flex flex-col gap-4">
          {ids.map((id) => (
            <Post key={id.id} postId={id.postId} />
          ))}
        </div>
      </UserPostsLinkScroller>
    );
  }

  const { success: postIds, error } = await getUserPostIds(userId);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!postIds) {
    return <div>Posts not found</div>;
  }

  return (
    <UserPostsLinkScroller>
      <div className="flex flex-col gap-4">
        {postIds.map((postId) => (
          <Post key={postId} postId={postId} />
        ))}
      </div>
    </UserPostsLinkScroller>
  );
};

export default UserPosts;

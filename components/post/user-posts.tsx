import Post from "@/components/post/post";
import { getPostsByUserId } from "@/lib/post";
import { getLikesByUserId } from "@/lib/like";
import { getBookmarksByUserId } from "@/lib/bookmark";
import UserPostsLinkScroller from "./user-posts-link-scroller";

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
        ? await getLikesByUserId(userId)
        : await getBookmarksByUserId(userId);

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

  const { success: postIds, error } = await getPostsByUserId(userId);

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

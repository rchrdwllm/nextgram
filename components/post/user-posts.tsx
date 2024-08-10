import Post from "@/components/post/post";
import {
  getPostsByUserId,
  getPostsByUserLike,
  getPostsByUserBookmark,
} from "@/lib/post";
import UserPostsLinkScroller from "./user-posts-link-scroller";

const UserPosts = async ({
  userId,
  tab,
}: {
  userId: string;
  tab: "postLikes" | "postBookmarks" | "posts";
}) => {
  const { success: posts, error } =
    tab === "posts"
      ? await getPostsByUserId(userId)
      : tab === "postLikes"
      ? await getPostsByUserLike(userId)
      : await getPostsByUserBookmark(userId);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!posts) {
    return <div>Posts not found</div>;
  }

  return (
    <UserPostsLinkScroller>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </UserPostsLinkScroller>
  );
};

export default UserPosts;

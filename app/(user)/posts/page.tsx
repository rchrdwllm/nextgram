import Post from "@/components/post/post";
import {
  getPostsByUserId,
  getPostsByUserLike,
  getPostsByUserBookmark,
} from "@/lib/post";

const UserPostsPage = async ({
  searchParams: { userId, tab },
}: {
  searchParams: {
    userId: string;
    tab: "postLikes" | "postBookmarks" | "posts";
  };
}) => {
  const { success: posts, error } =
    tab === "posts"
      ? await getPostsByUserId(userId)
      : tab === "postLikes"
      ? await getPostsByUserLike(userId)
      : await getPostsByUserBookmark(userId);

  console.log(tab);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!posts) {
    return <div>Posts not found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default UserPostsPage;

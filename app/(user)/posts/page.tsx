import Post from "@/components/post/post";
import { getPostsByUserId } from "@/lib/post";

const UserPostsPage = async ({
  searchParams: { userId },
}: {
  searchParams: { userId: string };
}) => {
  const { success: posts, error } = await getPostsByUserId(userId);

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

import { Post } from "@/lib/infer-type";
import PostsGrid from "../post/posts-grid";
import PostPreview from "../post/post-preview";
import { getPostsByIds } from "@/lib/post";

const UserPosts = async ({ postIds }: { postIds: string[] }) => {
  const { success: posts, error } = await getPostsByIds(postIds);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!posts) {
    return <div>Posts not found</div>;
  }

  return (
    <PostsGrid>
      {posts.map((post) => (
        <PostPreview tab="posts" key={post.id} postId={post.id} />
      ))}
    </PostsGrid>
  );
};

export default UserPosts;

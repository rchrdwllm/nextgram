import { Post } from "@/lib/infer-type";
import PostsGrid from "../post/posts-grid";
import PostPreview from "../post/post-preview";

const UserPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <PostsGrid>
      {posts.map((post) => (
        <PostPreview key={post.id} postId={post.id} />
      ))}
    </PostsGrid>
  );
};

export default UserPosts;

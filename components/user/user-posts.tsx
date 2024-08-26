import { Post } from "@/lib/infer-type";
import PostsGrid from "../post/posts-grid";
import PostPreview from "../post/post-preview";

const UserPosts = ({ postIds }: { postIds: string[] }) => {
  return (
    <PostsGrid>
      {postIds.map((postId) => (
        <PostPreview key={postId} postId={postId} />
      ))}
    </PostsGrid>
  );
};

export default UserPosts;

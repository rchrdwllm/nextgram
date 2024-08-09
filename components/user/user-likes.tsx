import { PostLike } from "@/lib/infer-type";
import PostsGrid from "../post/posts-grid";
import PostPreview from "../post/post-preview";

const UserLikes = ({ postLikes }: { postLikes: PostLike[] }) => {
  return (
    <PostsGrid>
      {postLikes.map((postLike) => (
        <PostPreview key={postLike.id} postId={postLike.postId} />
      ))}
    </PostsGrid>
  );
};

export default UserLikes;

import PostsGrid from "../post/posts-grid";
import PostPreview from "../post/post-preview";

const UserLikes = ({ postIds }: { postIds: string[] }) => {
  return (
    <PostsGrid>
      {postIds.map((postId) => (
        <PostPreview tab="postLikes" key={postId} postId={postId} />
      ))}
    </PostsGrid>
  );
};

export default UserLikes;

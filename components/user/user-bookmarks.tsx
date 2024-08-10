import PostsGrid from "../post/posts-grid";
import PostPreview from "../post/post-preview";

const UserBookmarks = ({ postIds }: { postIds: string[] }) => {
  return (
    <PostsGrid>
      {postIds.map((postId) => (
        <PostPreview tab="postBookmarks" key={postId} postId={postId} />
      ))}
    </PostsGrid>
  );
};

export default UserBookmarks;

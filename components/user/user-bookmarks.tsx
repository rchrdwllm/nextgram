import { PostBookmark } from "@/lib/infer-type";
import PostsGrid from "../post/posts-grid";
import PostPreview from "../post/post-preview";

const UserBookmarks = ({
  postBookmarks,
}: {
  postBookmarks: PostBookmark[];
}) => {
  return (
    <PostsGrid>
      {postBookmarks.map((postBookmark) => (
        <PostPreview key={postBookmark.id} postId={postBookmark.postId} />
      ))}
    </PostsGrid>
  );
};

export default UserBookmarks;

import LikeButton from "./like-button";
import ReplyButton from "./reply-button";
import ShareButton from "./share-button";
import BookmarkButton from "./bookmark-button";
import { PostWithDetails } from "@/lib/infer-type";

type PostActionsProps = {
  post: PostWithDetails;
  isLiked: boolean;
};

const PostActions = ({ post, isLiked }: PostActionsProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <LikeButton postId={post.id} isLiked={isLiked} />
        <ReplyButton />
        <ShareButton />
      </div>
      <BookmarkButton />
    </div>
  );
};

export default PostActions;

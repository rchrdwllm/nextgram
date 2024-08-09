"use client";

import LikeButton from "./like-button";
import ReplyButton from "./reply-button";
import ShareButton from "./share-button";
import BookmarkButton from "./bookmark-button";
import { PostWithDetails } from "@/lib/infer-type";
import LikeCount from "./like-count";
import { useOptimistic } from "react";

type PostActionsProps = {
  post: PostWithDetails;
  isLiked: boolean;
};

const PostActions = ({ post, isLiked }: PostActionsProps) => {
  const [optimisticLikeCount, setOptimisticLikeCount] = useOptimistic(
    post.postLikes.length,
    (currentPostLikes, newPostLike: "like" | "unlike") => {
      if (newPostLike === "like") {
        return currentPostLikes + 1;
      } else {
        return currentPostLikes - 1;
      }
    }
  );

  return (
    <>
      <div className="flex justify-between">
        <div className="flex">
          <LikeButton
            setOptimisticLikeCount={setOptimisticLikeCount}
            postId={post.id}
            isLiked={isLiked}
          />
          <ReplyButton />
          <ShareButton />
        </div>
        <BookmarkButton />
      </div>
      <LikeCount postLikes={optimisticLikeCount} />
    </>
  );
};

export default PostActions;

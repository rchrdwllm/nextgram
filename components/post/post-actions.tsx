"use client";

import LikeButton from "./like-button";
import ShareButton from "./share-button";
import BookmarkButton from "./bookmark-button";
import { PostWithDetails } from "@/lib/infer-type";
import LikeCount from "./like-count";
import { ReactNode, useOptimistic } from "react";

type PostActionsProps = {
  post: PostWithDetails;
  isLiked: boolean;
  isBookmarked: boolean;
  children: ReactNode;
  profileCards: ReactNode;
};

const PostActions = ({
  post,
  isLiked,
  isBookmarked,
  children,
  profileCards,
}: PostActionsProps) => {
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
          {children}
          <ShareButton />
        </div>
        <BookmarkButton isBookmarked={isBookmarked} postId={post.id} />
      </div>
      <LikeCount
        profileCards={profileCards}
        postLikeCount={optimisticLikeCount}
      />
    </>
  );
};

export default PostActions;

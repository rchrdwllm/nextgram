"use client";

import { Heart } from "lucide-react";
import { Toggle } from "../ui/toggle";
import { likeReply } from "@/server/actions/like-reply";
import { useAction } from "next-safe-action/hooks";
import { startTransition, useContext } from "react";
import { OptimisticLikeContext } from "./optimistic-like-wrapper";

type LikeReplyButtonProps = {
  replyId: number;
  isLiked: boolean;
};

const LikeReplyButton = ({ replyId, isLiked }: LikeReplyButtonProps) => {
  const [_, setOptimisticLikeCount, setLikeCount] = useContext(
    OptimisticLikeContext
  );
  const { execute } = useAction(likeReply);

  const handleLike = (isLiked: boolean) => {
    startTransition(() => {
      setOptimisticLikeCount(isLiked ? "like" : "unlike");

      setLikeCount((currentLike) =>
        isLiked ? currentLike + 1 : currentLike - 1
      );

      execute({ replyId });
    });
  };

  return (
    <Toggle defaultPressed={isLiked} onPressedChange={handleLike}>
      <Heart className="h-4 w-4" />
    </Toggle>
  );
};

export default LikeReplyButton;

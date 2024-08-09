"use client";

import { useAction } from "next-safe-action/hooks";
import { Toggle } from "../ui/toggle";
import { Heart } from "lucide-react";
import { likePost } from "@/server/actions/like-post";
import { startTransition, useContext, useState } from "react";

type LikeButtonProps = {
  postId: string;
  isLiked: boolean;
};

const LikeButton = ({ postId, isLiked: defaultLiked }: LikeButtonProps) => {
  const [isLiked] = useState(defaultLiked);
  const { execute } = useAction(likePost);

  const handleLike = (isLiked: boolean) => {
    execute({ postId });
  };

  return (
    <Toggle defaultPressed={isLiked} onPressedChange={handleLike}>
      <Heart className="w-4 h-4" />
    </Toggle>
  );
};

export default LikeButton;

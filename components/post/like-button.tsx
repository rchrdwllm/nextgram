import { useAction } from "next-safe-action/hooks";
import { Toggle } from "../ui/toggle";
import { Heart } from "lucide-react";
import { likePost } from "@/server/actions/like-post";
import { startTransition, useState } from "react";

type LikeButtonProps = {
  postId: string;
  isLiked: boolean;
  setOptimisticLikeCount: (action: "like" | "unlike") => void;
};

const LikeButton = ({
  postId,
  isLiked: defaultLiked,
  setOptimisticLikeCount,
}: LikeButtonProps) => {
  const [isLiked] = useState(defaultLiked);
  const { execute } = useAction(likePost);

  const handleLike = (isLiked: boolean) => {
    startTransition(() => {
      setOptimisticLikeCount(isLiked ? "like" : "unlike");

      execute({ postId });
    });
  };

  return (
    <Toggle defaultPressed={isLiked} onPressedChange={handleLike}>
      <Heart className="w-4 h-4" />
    </Toggle>
  );
};

export default LikeButton;

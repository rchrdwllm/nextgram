"use client";

import { useAction } from "next-safe-action/hooks";
import { Button } from "../ui/button";
import { follow } from "@/server/actions/follow";
import { startTransition, useEffect, useOptimistic, useState } from "react";

type FollowButtonProps = {
  followerId: string;
  followingId: string;
  isDefaultFollowing?: boolean;
};

const FollowButton = ({
  followerId,
  followingId,
  isDefaultFollowing,
}: FollowButtonProps) => {
  const { execute } = useAction(follow);
  const [isFollowing, setIsFollowing] = useState(isDefaultFollowing);
  const [isFollowingOptimistic, setIsFollowingOptimistic] = useOptimistic(
    isFollowing,
    (_, newState: boolean) => newState
  );

  const handleFollow = () => {
    startTransition(() => {
      setIsFollowingOptimistic(!isFollowingOptimistic);
      setIsFollowing(!isFollowing);
    });

    execute({ followerId, followingId });
  };

  return (
    <Button
      variant={isFollowingOptimistic ? "secondary" : "default"}
      onClick={handleFollow}
    >
      {isFollowingOptimistic ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;

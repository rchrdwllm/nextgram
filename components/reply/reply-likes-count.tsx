"use client";

import { useContext } from "react";
import { OptimisticLikeContext } from "./optimistic-like-wrapper";

const ReplyLikesCount = () => {
  const [optimisticLikeCount] = useContext(OptimisticLikeContext);

  if (!optimisticLikeCount) return null;

  return (
    <p>
      {optimisticLikeCount === 1 ? "1 like" : `${optimisticLikeCount} likes`}
    </p>
  );
};

export default ReplyLikesCount;

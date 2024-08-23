"use client";

import { useContext } from "react";
import { OptimisticLikeContext } from "./optimistic-like-wrapper";

const ReplyLikesCount = () => {
  const [optimisticLikeCount] = useContext(OptimisticLikeContext);

  return <p>{optimisticLikeCount} likes</p>;
};

export default ReplyLikesCount;

"use client";

import { PostReplyWithLikes } from "@/lib/infer-type";
import { createContext, ReactNode, useOptimistic, useState } from "react";

export const OptimisticLikeContext = createContext<
  [
    number,
    (action: "like" | "unlike") => void,
    React.Dispatch<React.SetStateAction<number>>
  ]
>([0, () => {}, () => {}]);

type OptimisticLikeWrapperProps = {
  children: ReactNode;
  postReply: PostReplyWithLikes;
};

const OptimisticLikeWrapper = ({
  children,
  postReply,
}: OptimisticLikeWrapperProps) => {
  const [likeCount, setLikeCount] = useState(postReply.postReplyLikes.length);
  const [optimisticLikeCount, setOptimisticLikeCount] = useOptimistic(
    likeCount,
    (currentPostLikes, newPostLike: "like" | "unlike") => {
      if (newPostLike === "like") {
        return currentPostLikes + 1;
      } else {
        return currentPostLikes - 1;
      }
    }
  );

  return (
    <OptimisticLikeContext.Provider
      value={[optimisticLikeCount, setOptimisticLikeCount, setLikeCount]}
    >
      {children}
    </OptimisticLikeContext.Provider>
  );
};

export default OptimisticLikeWrapper;

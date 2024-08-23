import { db } from "@/server";
import { postReplyLikes } from "@/server/schema";
import { and, eq } from "drizzle-orm";

export const getReplyLikeByIdAndUserId = async (
  replyId: number,
  userId: string
) => {
  const replyLike = await db.query.postReplyLikes.findFirst({
    where: and(
      eq(postReplyLikes.postReplyId, replyId),
      eq(postReplyLikes.userId, userId)
    ),
  });

  return replyLike;
};

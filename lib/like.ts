import { db } from "@/server";
import { postLikes } from "@/server/schema";
import { and, eq } from "drizzle-orm";

export const getPostLikeByIdAndUserId = async (
  postId: string,
  userId: string
) => {
  const likedPost = await db.query.postLikes.findFirst({
    where: and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)),
  });

  return likedPost;
};

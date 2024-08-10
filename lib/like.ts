import { db } from "@/server";
import { auth } from "@/server/auth";
import { postLikes } from "@/server/schema";
import { and, desc, eq } from "drizzle-orm";

export const getPostLikeByIdAndUserId = async (
  postId: string,
  userId: string
) => {
  const likedPost = await db.query.postLikes.findFirst({
    where: and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)),
  });

  return likedPost;
};

export const getUserLikes = async (userId: string) => {
  try {
    const likes = await db.query.postLikes.findMany({
      where: eq(postLikes.userId, userId),
      orderBy: desc(postLikes.createdAt),
    });

    if (!likes) {
      return { error: "Failed to get likes" };
    }

    return { success: likes };
  } catch (error) {
    return { error: "Failed to get likes" };
  }
};

export const getCurrentUserLikes = async () => {
  const session = await auth();

  if (!session) {
    return { error: "You are not logged in" };
  }

  try {
    const likes = await db.query.postLikes.findMany({
      where: eq(postLikes.userId, session.user.id),
      orderBy: desc(postLikes.createdAt),
    });

    if (!likes) {
      return { error: "Failed to get likes" };
    }

    return { success: likes };
  } catch (error) {
    return { error: "Failed to get likes" };
  }
};

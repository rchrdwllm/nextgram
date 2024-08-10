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

export const getCurrentUserLikes = async () => {
  const session = await auth();

  if (!session) {
    return { error: "You need to be logged in to view this page" };
  }

  try {
    const userPostLikes = await db.query.postLikes.findMany({
      where: eq(postLikes.userId, session.user.id),
      orderBy: desc(postLikes.createdAt),
    });

    if (!userPostLikes) {
      return { error: "Failed to get posts" };
    }

    return { success: userPostLikes };
  } catch (error) {
    return { error: "Failed to get posts" };
  }
};

export const getLikesByUserId = async (userId: string) => {
  try {
    const userPostLikes = await db.query.postLikes.findMany({
      where: eq(postLikes.userId, userId),
      orderBy: desc(postLikes.createdAt),
    });

    if (!userPostLikes) {
      return { error: "Failed to get post likes" };
    }

    return { success: userPostLikes };
  } catch (error) {
    return { error: "Failed to get post likes" };
  }
};

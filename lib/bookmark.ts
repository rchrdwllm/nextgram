import { db } from "@/server";
import { auth } from "@/server/auth";
import { postBookmarks } from "@/server/schema";
import { and, desc, eq } from "drizzle-orm";

export const getBookmarkByIdAndUserId = async (
  postId: string,
  userId: string
) => {
  const bookmarkedPost = await db.query.postBookmarks.findFirst({
    where: and(
      eq(postBookmarks.postId, postId),
      eq(postBookmarks.userId, userId)
    ),
  });

  return bookmarkedPost;
};

export const getCurrentUserBookmarks = async () => {
  const session = await auth();

  if (!session) {
    return { error: "You need to be logged in to view this page" };
  }

  try {
    const userPostBookmarks = await db.query.postBookmarks.findMany({
      where: eq(postBookmarks.userId, session.user.id),
      orderBy: desc(postBookmarks.createdAt),
    });

    if (!userPostBookmarks) {
      return { error: "Failed to get posts" };
    }

    return { success: userPostBookmarks };
  } catch (error) {
    return { error: "Failed to get posts" };
  }
};

export const getBookmarksByUserId = async (userId: string) => {
  try {
    const userPostBookmarks = await db.query.postBookmarks.findMany({
      where: eq(postBookmarks.userId, userId),
      orderBy: desc(postBookmarks.createdAt),
    });

    if (!userPostBookmarks) {
      return { error: "Failed to get post bookmarks" };
    }

    return { success: userPostBookmarks };
  } catch (error) {
    return { error: "Failed to get post bookmarks" };
  }
};

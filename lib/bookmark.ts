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

export const getUserBookmarks = async (userId: string) => {
  try {
    const bookmarks = await db.query.postBookmarks.findMany({
      where: eq(postBookmarks.userId, userId),
      orderBy: desc(postBookmarks.createdAt),
    });

    if (!bookmarks) {
      return { error: "Failed to get bookmarks" };
    }

    return { success: bookmarks };
  } catch (error) {
    return { error: "Failed to get bookmarks" };
  }
};

export const getCurrentUserBookmarks = async () => {
  const session = await auth();

  if (!session) {
    return { error: "You are not logged in" };
  }

  try {
    const bookmarks = await db.query.postBookmarks.findMany({
      where: eq(postBookmarks.userId, session.user.id),
      orderBy: desc(postBookmarks.createdAt),
    });

    if (!bookmarks) {
      return { error: "Failed to get bookmarks" };
    }

    return { success: bookmarks };
  } catch (error) {
    return { error: "Failed to get bookmarks" };
  }
};

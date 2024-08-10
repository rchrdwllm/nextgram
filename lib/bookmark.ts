import { db } from "@/server";
import { postBookmarks } from "@/server/schema";
import { and, eq } from "drizzle-orm";

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

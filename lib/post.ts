import { db } from "@/server";
import { posts } from "@/server/schema";
import { desc } from "drizzle-orm";

export const getPosts = async () => {
  const allPosts = await db.query.posts.findMany({
    with: {
      postImages: true,
      user: true,
      postLikes: true,
      postBookmarks: true,
    },
    orderBy: desc(posts.createdAt),
  });

  if (!allPosts) {
    return { error: "Failed to fetch posts" };
  }

  return { success: allPosts };
};

import { db } from "@/server";
import { posts } from "@/server/schema";
import { desc, eq } from "drizzle-orm";

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

export const getPostById = async (postId: string) => {
  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
      with: {
        postImages: true,
      },
    });

    return { success: post };
  } catch (error) {
    return { error: "Failed to get post" };
  }
};

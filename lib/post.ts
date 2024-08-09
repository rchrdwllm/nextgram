import { db } from "@/server";
import { posts } from "@/server/schema";
import { and, desc, eq } from "drizzle-orm";

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
        postLikes: true,
        postBookmarks: true,
        user: true,
      },
    });

    return { success: post };
  } catch (error) {
    return { error: "Failed to get post" };
  }
};

export const getPostsByUserId = async (userId: string) => {
  try {
    const userPosts = await db.query.posts.findMany({
      where: eq(posts.userId, userId),
      with: {
        postImages: true,
        postLikes: true,
        postBookmarks: true,
        user: true,
      },
      orderBy: desc(posts.createdAt),
    });

    return { success: userPosts };
  } catch (error) {
    return { error: "Failed to get posts" };
  }
};

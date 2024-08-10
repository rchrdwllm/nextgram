import { db } from "@/server";
import { posts } from "@/server/schema";
import { desc, eq } from "drizzle-orm";

export const getPostIds = async () => {
  try {
    const result = await db
      .select({
        postIds: posts.id,
      })
      .from(posts)
      .orderBy(desc(posts.createdAt));

    if (!result) {
      return { error: "Failed to fetch post IDs" };
    }

    const postIds = result.map((post) => post.postIds);

    return { success: postIds };
  } catch (error) {
    return { error: "Failed to fetch post IDs" };
  }
};

export const getPostById = async (postId: string) => {
  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
      with: {
        postImages: true,
        postLikes: true,
        postBookmarks: true,
      },
    });

    return { success: post };
  } catch (error) {
    return { error: "Failed to get post" };
  }
};

export const getUserPostIds = async (userId: string) => {
  try {
    const result = await db
      .select({
        postId: posts.id,
      })
      .from(posts)
      .orderBy(desc(posts.createdAt))
      .where(eq(posts.userId, userId));

    if (!result) {
      return { error: "Failed to fetch post IDs" };
    }

    const postIds = result.map((post) => post.postId);

    return { success: postIds };
  } catch (error) {
    return { error: "Failed to get post IDs" };
  }
};

export const getPostIdsByUserLike = async (userId: string) => {
  try {
    const result = await db
      .select({
        postId: posts.id,
      })
      .from(posts)
      .orderBy(desc(posts.createdAt))
      .where(eq(posts.userId, userId));

    if (!result) {
      return { error: "Failed to fetch post IDs" };
    }

    const postIds = result.map((post) => post.postId);

    return { success: postIds };
  } catch (error) {
    return { error: "Failed to get post IDs" };
  }
};

export const getPostIdsByUserBookmark = async (userId: string) => {
  try {
    const result = await db
      .select({
        postId: posts.id,
      })
      .from(posts)
      .orderBy(desc(posts.createdAt))
      .where(eq(posts.userId, userId));

    if (!result) {
      return { error: "Failed to fetch post IDs" };
    }

    const postIds = result.map((post) => post.postId);

    return { success: postIds };
  } catch (error) {
    return { error: "Failed to get post IDs" };
  }
};

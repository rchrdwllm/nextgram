import { db } from "@/server";
import { follows, posts } from "@/server/schema";
import { desc, eq, inArray } from "drizzle-orm";
import { unstable_cache } from "next/cache";

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

export const getPostById = unstable_cache(async (postId: string) => {
  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
      with: {
        postImages: true,
        postLikes: true,
        postBookmarks: true,
      },
    });

    if (!post) {
      return { error: "Post not found" };
    }

    return { success: post };
  } catch (error) {
    return { error: "Failed to get post" };
  }
});

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

export const getPostsByFollowing = async (userId: string) => {
  try {
    const userFollowingIds = await db
      .select({
        followingId: follows.followingId,
      })
      .from(follows)
      .where(eq(follows.followerId, userId));

    if (!userFollowingIds) {
      return { error: "Failed to fetch user following IDs" };
    }

    const userFollowingIdsArray = userFollowingIds.map(
      (userFollowingId) => userFollowingId.followingId
    );

    const postIdsResult = await db
      .select({
        postId: posts.id,
      })
      .from(posts)
      .where(inArray(posts.userId, [...userFollowingIdsArray, userId]))
      .orderBy(desc(posts.createdAt));

    if (!postIdsResult) {
      return { error: "Failed to fetch post IDs" };
    }

    const postIds = postIdsResult.map((postId) => postId.postId);

    return { success: postIds };
  } catch (error) {
    return { error: "Failed to get posts" };
  }
};
